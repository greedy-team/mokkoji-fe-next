'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from '@/shared/lib/session-context';
import type { UserRole } from '@/shared/model/type';
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

  // router를 의존성에 두면 router.refresh()가 router를 새로 만들어
  // effect가 재실행되고 연결이 중복으로 쌓인다
  const roleRef = useRef<UserRole | undefined>(session?.role);
  const routerRef = useRef(router);
  const queryClientRef = useRef(queryClient);
  routerRef.current = router;
  queryClientRef.current = queryClient;

  // 쿠키를 갱신해도 session은 그대로라, 매 렌더 덮어쓰면 이미 반영한 변경을
  // 또 적용하고 refresh()가 반복된다. 세션이 아직 비었을 때만 초기화한다.
  if (session?.role !== undefined && roleRef.current === undefined) {
    roleRef.current = session.role;
  }

  useEffect(() => {
    if (status !== 'authenticated') return undefined;

    let source: EventSource;
    let retryCount = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    // 실패하면 roleRef를 그대로 둬서 다음 connect에서 다시 시도하게 한다
    const syncSessionRole = async () => {
      const { ok, role, changed } = await patchSessionRole();
      if (!ok) return;
      roleRef.current = role;
      if (changed) routerRef.current.refresh();
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
          const { shouldUpdate } = resolveRoleChange(
            roleRef.current,
            payload.role,
          );
          if (shouldUpdate) syncSessionRole();
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

      // router.refresh()만 하면 쿠키의 낡은 role을 서버가 다시 읽어 화면이 그대로다
      source.addEventListener(SSE_EVENTS.ROLE_CHANGED, () => {
        syncSessionRole();
      });

      // EventSource의 자동 재연결은 끌 수도 횟수를 제한할 수도 없어서,
      // 직접 닫고 백오프로 다시 연다
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

    // 브라우저의 정리를 기다리면 서버가 다음 heartbeat(최대 30초)까지
    // 끊긴 줄 모르고 emitter를 들고 있다
    const closeOnLeave = () => {
      stopped = true;
      clearTimeout(retryTimer);
      source.close();
    };

    // bfcache로 복원되면 effect가 다시 돌지 않으므로, pagehide에서 닫은 연결을
    // 여기서 직접 되살린다. 그러지 않으면 뒤로가기 이후 알림이 끊긴다.
    const reopenOnRestore = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      stopped = false;
      retryCount = 0;
      connect();
    };

    window.addEventListener('pagehide', closeOnLeave);
    window.addEventListener('pageshow', reopenOnRestore);

    return () => {
      stopped = true;
      clearTimeout(retryTimer);
      window.removeEventListener('pagehide', closeOnLeave);
      window.removeEventListener('pageshow', reopenOnRestore);
      source.close();
    };
  }, [status]);
}

export default useNotificationStream;
