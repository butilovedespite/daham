"use client";

import { useEffect, useState } from "react";

const LERP = 0.11;

export function useMieumScroll(sensitivity = 0.3, max = 64) {
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let current = 0;
    let target = 0;
    let frameId = 0;

    const tick = () => {
      current += (target - current) * LERP;

      if (Math.abs(target - current) < 0.05) {
        current = target;
      }

      setTranslateX(current);
      frameId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      if (y <= 0) {
        target = 0;
        return;
      }

      if (delta === 0) return;

      target = Math.max(-max, Math.min(max, target + delta * sensitivity));
    };

    onScroll();
    frameId = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, [max, sensitivity]);

  return translateX;
}
