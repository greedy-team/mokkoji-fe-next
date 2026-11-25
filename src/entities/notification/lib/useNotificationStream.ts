'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from '@/shared/lib/session-context';
import type { UserRole } from '@/shared/model/type';
import { notificationBaseKey } from '../api/queries';
import {
  SSE_EVENTS,
  type ConnectPayload,
  type NotificationPushPayload,
} from '../model/type';
import resolveRoleChange from './resolveRoleChange';

const SUBSCRIBE_URL = '/api/notifications/subscribe';

async function putSessionRole(role: UserRole): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/session/role', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result?.changed === true;
  } catch {
    return false;
  }
}

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

  // 콜백이 매 렌더마다 새 EventSource를 만들지 않도록 최신 role만 참조한다
  const roleRef = useRef<UserRole | undefined>(session?.role);
  roleRef.current = session?.role;

  useEffect(() => {
    if (status !== 'authenticated') return undefined;

    const source = new EventSource(SUBSCRIBE_URL);

    const syncRole = async (incoming: UserRole | null) => {
      const { shouldUpdate, role } = resolveRoleChange(
        roleRef.current,
        incoming,
      );
      if (!shouldUpdate || !role) return;

      const changed = await putSessionRole(role);
      if (changed) router.refresh();
    };

    const refetchRole = async () => {
      try {
        const response = await fetch('/api/users/role');
        if (!response.ok) return;
        const result = await response.json();
        const role: UserRole | undefined = result?.data?.role;
        if (role) await syncRole(role);
      } catch {
        // 조회 실패 시 다음 재연결의 connect 이벤트가 복구한다
      }
    };

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
      queryClient.invalidateQueries({ queryKey: notificationBaseKey });

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

    return () => source.close();
  }, [status, queryClient, router]);
}

export default useNotificationStream;
