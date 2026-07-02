"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GoogleMap from "@/components/GoogleMap";

type AboutPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mobileQuery.matches);

    sync();
    mobileQuery.addEventListener("change", sync);
    return () => mobileQuery.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

export default function AboutPanel({ isOpen, onClose }: AboutPanelProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobileViewport();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !isMobile) {
      return;
    }

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    document.documentElement.classList.add("about-panel-open");
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      document.documentElement.classList.remove("about-panel-open");
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, isMobile]);

  const panel = (
    <aside
      className={[
        "about-panel",
        isOpen ? "about-panel--open" : "",
        isMobile ? "about-panel--fullscreen" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-cursor-theme={isOpen ? "light" : undefined}
      aria-hidden={!isOpen}
    >
      <div className="about-ref">
        <div className="about-ref__grid">
          <div className="about-ref__logo">
            <span className="about-ref__logo-main">다함</span>
            <span className="about-ref__logo-sub">건축사사무소</span>
          </div>

          <div className="about-ref__intro-col">
            <button
              type="button"
              className="about-ref__scroll-btn"
              onClick={onClose}
              aria-label="패널 닫기"
              tabIndex={isOpen ? 0 : -1}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6L8 11L13 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="about-ref__intro">
              다함 건축은 건축에 관한 기획·설계·감리를 하는 전문집단 입니다.
              유용하며 느낌있는 건축물 설계를 목표로 뜻과 정성을 다하는
              사무소가 되고자 합니다.
            </p>
          </div>

          <p className="about-ref__label">전형식</p>
          <div className="about-ref__detail">
            <p>대표/소장/건축사</p>
            <p>2002년 다함건축사 사무소 설립</p>
            <p>HP : 010-5359-2651</p>
          </div>

          <p className="about-ref__label">OFFICE</p>
          <div className="about-ref__detail">
            <p>수원시 팔달구 권광로 207번길 36, 602호</p>
            <p>16489</p>
          </div>
        </div>

        <GoogleMap className="about-ref__map" />
      </div>
    </aside>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(panel, document.body);
}
