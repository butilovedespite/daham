"use client";

import { useEffect, useState } from "react";

const LERP = 0.11;
const MOBILE_MAX_WIDTH = 768;
const DETAIL_SCROLL_SELECTOR = ".project-detail__scroll, .project-detail__gallery";

export function useMieumScroll(sensitivity = 0.3, max = 64) {
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let frameId = 0;
    let enabled = false;
    const lastScrollPositions = new Map<EventTarget, number>();
    const attachedElements = new Set<Element>();
    let observer: MutationObserver | null = null;

    const tick = () => {
      if (!enabled) {
        return;
      }

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

    const enable = () => {
      if (enabled) {
        return;
      }

      enabled = true;
      target = 0;
      current = 0;
      setTranslateX(0);
      lastScrollPositions.clear();
      lastScrollPositions.set(window, window.scrollY);
      onWindowScroll();
      syncDetailContainers();

      observer = new MutationObserver(syncDetailContainers);
      observer.observe(document.body, { childList: true, subtree: true });

      window.addEventListener("scroll", onWindowScroll, { passive: true });
      frameId = requestAnimationFrame(tick);
    };

    const disable = () => {
      if (!enabled) {
        return;
      }

      enabled = false;
      window.removeEventListener("scroll", onWindowScroll);
      attachedElements.forEach((element) => {
        detachElement(element);
      });
      attachedElements.clear();
      lastScrollPositions.clear();
      observer?.disconnect();
      observer = null;
      cancelAnimationFrame(frameId);
      target = 0;
      current = 0;
      setTranslateX(0);
    };

    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const syncViewport = () => {
      if (mobileQuery.matches) {
        disable();
        return;
      }

      enable();
    };

    syncViewport();
    mobileQuery.addEventListener("change", syncViewport);

    return () => {
      mobileQuery.removeEventListener("change", syncViewport);
      disable();
    };
  }, [max, sensitivity]);

  return translateX;
}
