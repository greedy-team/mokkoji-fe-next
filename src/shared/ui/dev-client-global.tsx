'use client';

import { useEffect, useState } from 'react';

export default function DevTodoGlobalClient() {
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState('');
  const [relativePath, setRelativePath] = useState('');

  // Alt+Click → 해당 위치에 입력창 열기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!e.altKey) return;
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
      setOpen(true);
    };
    const path = window.location.pathname;
    const normalized = path.startsWith('/') ? path.slice(1) : path;
    setRelativePath(normalized || 'page');
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const props = {
      relativePath,
      name,
      description,
      todos: todos.split(',').map((t) => t.trim()),
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
      setTodos('');
    } catch (err) {
      console.error('❌ 전송 실패', err);
    }
  };

  if (!open) return null;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
      className="w-80 rounded-md border border-gray-200 bg-white shadow-lg"
    >
      {/* 헤더 영역만 하늘색 */}
      <div className="mb-2 w-full rounded-t-md bg-[#ddf4ff] p-2">
        <h2 className="text-xs font-bold text-gray-800">Issue</h2>
      </div>

      <div className="p-4 pt-0">
        <input
          type="text"
          placeholder="Name"
          className="mb-2 w-full rounded border bg-white p-2 text-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          className="mb-2 w-full rounded border bg-white p-2 text-xs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Todos (쉼표 구분)"
          className="mb-2 w-full rounded border bg-white p-2 text-xs"
          value={todos}
          onChange={(e) => setTodos(e.target.value)}
          required
        />

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded bg-gray-300 px-2 py-1 text-xs"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
          >
            저장
          </button>
        </div>
      </div>
    </form>
  );
}
