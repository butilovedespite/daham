"use client";

import { useEffect, useState } from "react";

const LERP = 0.11;
const DETAIL_SCROLL_SELECTOR = ".project-detail__scroll, .project-detail__gallery";

export function useMieumScroll(sensitivity = 0.3, max = 64) {
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let frameId = 0;
    const lastScrollPositions = new Map<EventTarget, number>();
    const attachedElements = new Set<Element>();

    const tick = () => {
      current += (target - current) * LERP;

      if (Math.abs(target - current) < 0.05) {
        current = target;
      }

      setTranslateX(current);
      frameId = requestAnimationFrame(tick);
    };

    const applyScrollDelta = (scrollTop: number, delta: number) => {
      if (scrollTop <= 0) {
        target = 0;
        return;
      }

      if (delta === 0) {
        return;
      }

      target = Math.max(-max, Math.min(max, target + delta * sensitivity));
    };

    const handleScrollPosition = (source: EventTarget, scrollTop: number) => {
      const last = lastScrollPositions.get(source) ?? scrollTop;
      const delta = scrollTop - last;
      lastScrollPositions.set(source, scrollTop);
      applyScrollDelta(scrollTop, delta);
    };

    const onWindowScroll = () => {
      handleScrollPosition(window, window.scrollY);
    };

    const onElementScroll = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      handleScrollPosition(element, element.scrollTop);
    };

    const attachElement = (element: Element) => {
      if (attachedElements.has(element)) {
        return;
      }

      lastScrollPositions.set(element, (element as HTMLElement).scrollTop);
      element.addEventListener("scroll", onElementScroll, { passive: true });
      attachedElements.add(element);
    };

    const detachElement = (element: Element) => {
      element.removeEventListener("scroll", onElementScroll);
      lastScrollPositions.delete(element);
      attachedElements.delete(element);
    };

    const syncDetailContainers = () => {
      const containers = document.querySelectorAll(DETAIL_SCROLL_SELECTOR);
      const nextContainers = new Set(containers);

      attachedElements.forEach((element) => {
        if (!nextContainers.has(element)) {
          detachElement(element);
        }
      });

      containers.forEach((element) => {
        attachElement(element);
      });
    };

    lastScrollPositions.set(window, window.scrollY);
    onWindowScroll();
    syncDetailContainers();

    const observer = new MutationObserver(syncDetailContainers);
    observer.observe(document.body, { childList: true, subtree: true });

    frameId = requestAnimationFrame(tick);
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      attachedElements.forEach((element) => {
        detachElement(element);
      });
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [max, sensitivity]);

  return translateX;
}
