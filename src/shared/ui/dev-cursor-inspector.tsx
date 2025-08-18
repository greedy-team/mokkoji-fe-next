'use client';

import { useEffect, useState } from 'react';

interface Coord {
  x: number;
  y: number;
}

function DevCursorInspector() {
  const [coords, setCoords] = useState<Coord | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== 'development') return undefined;

    function handler(e: MouseEvent) {
      if (e.altKey && e.type === 'click') {
        setCoords({ x: e.clientX, y: e.clientY });
      }
    }

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  return (
    coords && (
      <div
        className="absolute z-[9999] rounded bg-yellow-200 px-2 py-1 font-mono text-xs text-black shadow"
        style={{ top: coords.y + 8, left: coords.x + 8 }}
      >
        x: {coords.x}, y: {coords.y}
      </div>
    )
  );
}

export default DevCursorInspector;
