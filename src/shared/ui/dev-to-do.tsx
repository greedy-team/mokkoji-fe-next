'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import useLocalStorage from '../model/useLocalStorage';
import { useDevTodo } from '../model/dev-todo-provider';

interface DevTodoProps {
  id: string;
  profileImg?: string;
  name: string;
  description?: string;
  x?: number;
  y?: number;
  todos: string[];
}

function DevTodo({
  id,
  profileImg,
  name,
  description,
  x = 20,
  y = 20,
  todos,
}: DevTodoProps) {
  const [todoOpen, setTodoOpen] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { register } = useDevTodo();

  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    `dev-todo-${id}`,
    {},
  );

  const toggleCheck = (todo: string) => {
    setChecked((prev) => ({
      ...prev,
      [todo]: !prev[todo],
    }));
  };

  useEffect(() => {
    register({
      id,
      x,
      y,
      url: window.location.pathname,
      todos,
    });
  }, [id, x, y, todos, register]);

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    // 현재 페이지 경로 → relativePath 생성
    const path = window.location.pathname;
    const normalized = path.startsWith('/') ? path.slice(1) : path;
    const relativePath = normalized || 'page';

    try {
      const res = await fetch('/api/devtodo/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, relativePath, run: true }),
      });
      const data = await res.json();
      console.log('🗑️ DevTodo 삭제 요청:', data);
      // 성공 시 화면에서 숨기기
      setRemoved(true);
    } catch (err) {
      console.error('❌ 삭제 실패', err);
    } finally {
      setDeleting(false);
    }
  };

  if (removed) return null;

  return (
    <div
      className="absolute z-[9999]"
      style={{ top: y, left: x }}
      onMouseEnter={() => setTodoOpen(true)}
      onMouseLeave={() => setTodoOpen(false)}
    >
      {todoOpen ? (
        <>
          <div className="flex h-8 w-full items-center justify-between rounded-t-md bg-[#ddf4ff] p-2 text-xs">
            <p className="font-semibold">{name}</p>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-red-600 disabled:opacity-60"
              title="이 DevTodo 삭제"
            >
              {deleting ? '삭제중…' : '삭제'}
            </button>
          </div>

          <div className="w-60 rounded-b-md border border-[#ddf4ff] bg-white p-2 text-xs shadow-sm">
            <h2 className="mb-2 border-b border-gray-200 font-bold text-gray-800">
              Dev Issue
            </h2>

            {description && <p className="mb-3">{description}</p>}

            <h3 className="mb-2 border-b border-gray-200 font-bold text-gray-800">
              Todo
            </h3>
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!checked[todo]}
                    onChange={() => toggleCheck(todo)}
                    className="h-3.5 w-3.5 cursor-pointer accent-blue-600"
                  />
                  <span
                    className={`text-sm ${
                      checked[todo]
                        ? 'text-gray-400 line-through'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="relative inline-flex items-center">
          <div className="relative rounded-full bg-black p-1 shadow">
            <Image
              src={
                profileImg ||
                'https://api.dicebear.com/6.x/avataaars/png?seed=default'
              }
              alt={name || '프로필 이미지'}
              width={20}
              height={20}
              className="rounded-full"
            />
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-[8px] border-r-[6px] border-l-[6px] border-transparent border-t-black" />
          </div>
        </div>
      )}
    </div>
  );
}

export default DevTodo;
