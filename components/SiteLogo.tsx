"use client";

import { useMieumScroll } from "@/hooks/useMieumScroll";

export default function SiteLogo() {
  const mieumX = useMieumScroll();

  return (
    <div className="site-logo pointer-events-auto flex w-fit items-start gap-5">
      <span
        className="logo-yangpyeong logo-yangpyeong--main leading-none text-black"
        aria-label="다함"
      >
        <span className="logo-yangpyeong__anchor" aria-hidden="true">
          다함
        </span>
        <span className="logo-yangpyeong__face">
          다
          <span className="logo-ham">
            <span className="logo-ham__anchor" aria-hidden="true">
              함
            </span>
            <span className="logo-ham__upper" aria-hidden="true">
              함
            </span>
            <span
              className="logo-ham__mieum"
              aria-hidden="true"
              style={{ transform: `translateX(${mieumX}px)` }}
            >
              함
            </span>
          </span>
        </span>
      </span>
      <span className="logo-subtitle logo-subtitle--main leading-none text-black">
        건축사사무소
      </span>
    </div>
  );
}
