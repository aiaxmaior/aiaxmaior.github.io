import { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface TouchControlsConfig {
  containerRef: React.RefObject<HTMLElement>;
  onMove: (dx: number, dy: number) => void;
}

export function useTouchControls({ containerRef, onMove }: TouchControlsConfig) {
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState<Position | null>(null);
  const lastPosition = useRef<Position | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const pos = { x: touch.clientX, y: touch.clientY };
      setTouchStart(pos);
      lastPosition.current = pos;
      setIsTouching(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isTouching || !lastPosition.current || e.touches.length !== 1) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const currentPos = { x: touch.clientX, y: touch.clientY };
    
    const dx = (currentPos.x - lastPosition.current.x) * 0.1;
    const dy = (currentPos.y - lastPosition.current.y) * 0.1;
    
    onMove(dx, dy);
    lastPosition.current = currentPos;
  }, [isTouching, onMove]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    setTouchStart(null);
    lastPosition.current = null;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [containerRef, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    isTouching,
    touchStart,
  };
}
