'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

type TodoItem = {
  id: string;
  x: number;
  y: number;
  url: string;
  todos: string[];
};

type DevTodoContextType = {
  todos: TodoItem[];
  register: (item: TodoItem) => void;
  remove: (id: string) => void;
};

const DevTodoContext = createContext<DevTodoContextType | undefined>(undefined);

export function DevTodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const register = useCallback((item: TodoItem) => {
    setTodos((prev) => {
      const exists = prev.find((t) => t.id === item.id);
      if (exists) {
        return prev.map((t) => (t.id === item.id ? item : t));
      }
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({ todos, register, remove }),
    [todos, register, remove],
  );

  return (
    <DevTodoContext.Provider value={value}>{children}</DevTodoContext.Provider>
  );
}

export function useDevTodo() {
  const context = useContext(DevTodoContext);
  if (!context) {
    throw new Error('useDevTodo must be used within DevTodoProvider');
  }
  return context;
}
