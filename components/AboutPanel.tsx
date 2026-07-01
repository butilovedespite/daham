"use client";

import GoogleMap from "@/components/GoogleMap";

type AboutPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutPanel({ isOpen, onClose }: AboutPanelProps) {
  return (
    <aside
      className={`about-panel${isOpen ? " about-panel--open" : ""}`}
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
}
