'use client';

import { useState, useRef } from 'react';
import { useDevTodo } from '../model/dev-todo-provider';
import useLocalStorage from '../model/useLocalStorage';

function DevTodoTracker() {
  const { todos } = useDevTodo();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(true);
  const [pos, setPos] = useState({ x: 5, y: 5 });
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    'dev-todo',
    {},
  );

  const toggleCheck = (todo: string) => {
    setChecked((prev) => ({
      ...prev,
      [todo]: !prev[todo],
    }));
  };

  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const toggleGroup = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    });
  };

  const handleMouseUp = () => {
    dragRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="fixed z-[9999] rounded-lg border bg-white p-3 text-xs shadow-lg"
      style={{ top: pos.y, left: pos.x }}
    >
      <div
        className="mb-2 flex cursor-move items-center justify-between gap-2"
        onMouseDown={handleMouseDown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setOpen(!open);
          }
        }}
      >
        <h2 className="font-bold select-none">📍 Issue Tracker</h2>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Collapse tracker' : 'Expand tracker'}
          className="cursor-pointer rounded text-[20px]"
        >
          {open ? '▾' : '▸'}
        </button>
      </div>

      {open && (
        <ul className="max-h-60 space-y-2 overflow-auto">
          {todos.map((t) => {
            const isCollapsed = collapsed[t.id] ?? false;
            return (
              <li key={t.id} className="border-b pb-1 last:border-none">
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => toggleGroup(t.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      toggleGroup(t.id);
                    }
                  }}
                >
                  <div className="truncate text-[10px] text-gray-500">
                    {t.url}
                  </div>
                  <span className="cursor-pointer text-[15px] text-blue-500">
                    {isCollapsed ? '▸' : '▾'}
                  </span>
                </div>

                {!isCollapsed && (
                  <ul className="mt-1 list-inside list-disc">
                    {t.todos.map((todo) => (
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
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DevTodoTracker;
