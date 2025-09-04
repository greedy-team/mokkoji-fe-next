'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import SafeDevForm from './dev-safe-form';

export default function DevTodoGlobalClient() {
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const pathname = usePathname();

  const [relativePath, setRelativePath] = useState('');

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!e.altKey) return;
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
      setOpen(true);
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    const normalized = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    setRelativePath(normalized || 'page');
  }, [pathname]);

  const addTodo = () => {
    const t = newTodo.trim();
    if (!t) return;

    if (todos.includes(t)) {
      setNewTodo('');
      return;
    }
    setTodos((prev) => [...prev, t]);
    setNewTodo('');
  };

  const removeTodo = (idx: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const props = {
      relativePath,
      name,
      description,
      todos,
      x,
      y,
    };

    try {
      const res = await fetch('/api/devtodo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props),
      });
      const data = await res.json();
      console.log('✅ DevTodo 저장 완료:', data);
      setOpen(false);
      setName('');
      setDescription('');
      setTodos([]);
      setNewTodo('');
    } catch (err) {
      console.error('❌ 전송 실패', err);
    }
  };

  if (!open) return null;

  return (
    <SafeDevForm
      title="저장"
      buttonClassName="rounded bg-blue-600 px-2 py-1 text-xs text-white disabled:opacity-50"
      onSubmit={handleSubmit}
      handleClose={handleClose}
      style={{
        position: 'absolute',
        top: Math.max(y, 200),
        left: x,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
      formClassName="w-80 rounded-md border border-gray-200 bg-white shadow-lg"
    >
      <div className="mb-2 w-full rounded-t-md bg-[#ddf4ff] p-2">
        <h2 className="text-xs font-bold text-gray-800">Issue</h2>
      </div>

      <div className="p-4 pt-0">
        <p className="mb-1 block text-[11px] font-semibold text-gray-700">
          Name
        </p>
        <input
          type="text"
          placeholder="담당자"
          className="mb-2 w-full rounded border bg-white p-2 text-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <p className="mb-1 block text-[11px] font-semibold text-gray-700">
          Description
        </p>

        <input
          type="text"
          placeholder="설명"
          className="mb-2 w-full rounded border bg-white p-2 text-xs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="mb-2">
          <p className="mb-1 block text-[11px] font-semibold text-gray-700">
            Todo
          </p>
          <div className="flex items-center gap-2">
            <input
              id="todo-input"
              type="text"
              placeholder="해야 할 일 입력 후 +"
              className="w-full rounded border bg-white p-2 text-xs"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              type="button"
              onClick={addTodo}
              className="rounded bg-[#ddf4ff] px-2 py-1 text-xs font-bold text-blue-700 hover:bg-[#cbe9fb]"
              aria-label="Add todo"
              title="할 일 추가"
            >
              +
            </button>
          </div>

          <ul className="mt-2 max-h-40 space-y-1 overflow-auto">
            {todos.map((t, idx) => (
              <li
                key={t}
                className="flex items-center justify-between rounded border border-gray-100 px-2 py-1 text-xs"
              >
                <span className="truncate">{t}</span>
                <button
                  type="button"
                  onClick={() => removeTodo(idx)}
                  className="ml-2 rounded px-1 py-0.5 text-[11px] text-red-600 hover:bg-red-50"
                  aria-label="remove"
                  title="삭제"
                >
                  삭제
                </button>
              </li>
            ))}
            {todos.length === 0 && (
              <li className="text-[11px] text-gray-400">
                할 일을 추가해보세요.
              </li>
            )}
          </ul>
        </div>
      </div>
    </SafeDevForm>
  );
}
