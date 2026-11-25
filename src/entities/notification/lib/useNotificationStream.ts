'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from '@/shared/lib/session-context';
import type { UserRole } from '@/shared/model/type';
import getClientUserRole from '../api/getClientUserRole';
import patchSessionRole from '../api/patchSessionRole';
import { notificationBaseKey } from '../api/queries';
import {
  SSE_EVENTS,
  type ConnectPayload,
  type NotificationPushPayload,
} from '../model/type';
import resolveRoleChange from './resolveRoleChange';

const SUBSCRIBE_URL = '/api/notifications/subscribe';

const MAX_RETRY_COUNT = 5;
const BASE_RETRY_DELAY = 3000;
const MAX_RETRY_DELAY = 60000;

/**
 * 알림 SSE를 구독한다. 루트에서 한 번만 마운트해 전역으로 연결을 유지한다.
 *
 * 비로그인은 구조적으로 알림을 받을 수 없어(백엔드가 userId로만 emitter를 관리)
 * 연결을 열지 않는다. 열면 401에서 EventSource가 무한 재연결한다.
 */
function useNotificationStream() {
  const { session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  // effect가 status에만 반응하도록 나머지는 ref로 넘긴다.
  // router를 의존성에 두면 router.refresh()가 router를 새로 만들어
  // effect가 재실행되고, 연결이 닫히기 전에 새로 열려 중복으로 쌓인다.
  const roleRef = useRef<UserRole | undefined>(session?.role);
  const routerRef = useRef(router);
  const queryClientRef = useRef(queryClient);
  routerRef.current = router;
  queryClientRef.current = queryClient;

  // 쿠키를 갱신해도 AppSessionProvider의 session은 그대로라, session?.role을
  // 그대로 쓰면 재연결마다 같은 변경을 다시 적용하고 refresh()가 반복된다.
  // 반복되는 refresh는 진행 중인 문서·API 요청을 계속 취소시킨다.
  // 이미 반영한 role은 여기 남겨두고, 세션이 실제로 따라잡으면 그때 맞춘다.
  if (session?.role !== undefined && roleRef.current === undefined) {
    roleRef.current = session.role;
  }

  useEffect(() => {
    if (status !== 'authenticated') return undefined;

    let source: EventSource;
    let retryCount = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    const syncRole = async (incoming: UserRole | null) => {
      const { shouldUpdate, role } = resolveRoleChange(
        roleRef.current,
        incoming,
      );
      if (!shouldUpdate || !role) return;

      // 서버에 보내기 전에 기록해, 응답을 기다리는 동안 들어온 같은 이벤트가
      // 같은 변경을 또 적용하지 않도록 한다
      roleRef.current = role;

      const changed = await patchSessionRole(role);
      if (changed) routerRef.current.refresh();
    };

    const refetchRole = async () => {
      // 조회 실패 시 다음 재연결의 connect 이벤트가 복구한다
      const role = await getClientUserRole();
      if (role) await syncRole(role);
    };

    const connect = () => {
      source = new EventSource(SUBSCRIBE_URL);

      source.addEventListener('open', () => {
        retryCount = 0;
      });

      source.addEventListener(SSE_EVENTS.CONNECT, (event) => {
        try {
          const payload: ConnectPayload = JSON.parse(
            (event as MessageEvent).data,
          );
          syncRole(payload.role);
        } catch {
          // connect 페이로드가 깨져도 연결 자체는 유지한다
        }
      });

      source.addEventListener(SSE_EVENTS.NOTIFICATION, (event) => {
        queryClientRef.current.invalidateQueries({
          queryKey: notificationBaseKey,
        });

        try {
          const payload: NotificationPushPayload = JSON.parse(
            (event as MessageEvent).data,
          );
          toast.info(`${payload.title}\n${payload.content}`);
        } catch {
          // 내용을 못 읽어도 목록은 이미 재조회를 걸었다
        }
      });

      // role-changed는 값이 없는 신호라 현재 role을 다시 조회해 쿠키에 반영한다.
      // router.refresh()만 하면 쿠키의 낡은 role을 서버가 다시 읽어 화면이 그대로다.
      source.addEventListener(SSE_EVENTS.ROLE_CHANGED, () => {
        refetchRole();
      });

      // EventSource의 자동 재연결은 끌 수도, 횟수를 제한할 수도 없다.
      // 연결이 계속 실패하면 3초마다 영원히 재시도하는데, 매 시도가 백엔드에서
      // DB 커넥션을 쓰기 때문에(subscribe → getUserRole) 풀이 고갈되고
      // 알림과 무관한 요청까지 타임아웃된다. 직접 닫고 백오프로 다시 연다.
      source.addEventListener('error', () => {
        source.close();
        if (stopped) return;

        retryCount += 1;
        if (retryCount > MAX_RETRY_COUNT) return;

        const delay = Math.min(
          BASE_RETRY_DELAY * 2 ** (retryCount - 1),
          MAX_RETRY_DELAY,
        );
        retryTimer = setTimeout(connect, delay);
      });
    };

    connect();

    // 새로고침·탭 닫기에서 브라우저가 연결을 정리하기를 기다리면, 서버는
    // 다음 heartbeat(최대 30초)까지 끊긴 줄 모르고 emitter를 들고 있는다.
    // 그동안 HTTP/1.1의 호스트당 연결 6개 제한을 SSE가 잠식해, 같은 호스트의
    // 다른 요청이 연결 수립 단계에서 대기한다. 떠나는 시점에 직접 닫는다.
    const closeOnLeave = () => {
      stopped = true;
      clearTimeout(retryTimer);
      source.close();
    };
    window.addEventListener('pagehide', closeOnLeave);

    return () => {
      stopped = true;
      clearTimeout(retryTimer);
      window.removeEventListener('pagehide', closeOnLeave);
      source.close();
    };
  }, [status]);
}

export default useNotificationStream;
