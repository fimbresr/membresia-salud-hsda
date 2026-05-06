import { useCallback, useRef } from 'react';

interface SwipeBackOptions {
  onSwipeBack: () => void;
  edgeThreshold?: number;
  distanceThreshold?: number;
}

export function useSwipeBack({ onSwipeBack, edgeThreshold = 30, distanceThreshold = 80 }: SwipeBackOptions) {
  const startX = useRef(0);
  const startY = useRef(0);
  const isEdgeSwipe = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    isEdgeSwipe.current = touch.clientX < edgeThreshold;
  }, [edgeThreshold]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isEdgeSwipe.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startX.current;
    const deltaY = Math.abs(touch.clientY - startY.current);

    if (deltaX > distanceThreshold && deltaY < 100) {
      onSwipeBack();
    }
  }, [onSwipeBack, distanceThreshold]);

  return { onTouchStart, onTouchEnd };
}
