"use client";

import type { Category } from "@/lib/projects";
import CategoryDropdown from "@/components/CategoryDropdown";
import NavButtons from "@/components/NavButtons";
import SiteLogo from "@/components/SiteLogo";

type HeaderProps = {
  activeCategory: Category | "ALL";
  onCategoryChange: (category: Category | "ALL") => void;
  activeNav: "WORKS" | "ABOUT";
  onNavChange: (nav: "WORKS" | "ABOUT") => void;
  detailMode?: boolean;
  onLogoClick?: () => void;
};

export default function Header({
  activeCategory,
  onCategoryChange,
  activeNav,
  onNavChange,
  detailMode = false,
  onLogoClick,
}: HeaderProps) {
  return (
    <>
      <div className="site-header__logo-fixed pointer-events-none fixed inset-x-0 top-10 z-[60]">
        <div className="page-container">
          <button
            type="button"
            className="site-logo-button pointer-events-auto cursor-pointer border-0 bg-transparent p-0"
            onClick={onLogoClick}
            aria-label="첫 화면으로"
          >
            <SiteLogo />
          </button>
        </div>
      </div>

      {!detailMode ? (
        <header className="site-header--desktop page-container relative z-50 pb-12 pt-10">
          <div className="flex items-start justify-end">
            <div className="header-nav-group">
              <CategoryDropdown
                activeCategory={activeCategory}
                onCategoryChange={onCategoryChange}
              />
              <NavButtons activeNav={activeNav} onNavChange={onNavChange} />
            </div>
          </div>
        </header>
      ) : null}

      <header
        className={`site-header site-header--mobile${detailMode ? " site-header--detail" : ""}`}
      >
        <div className="page-container site-header__inner">
          <div className="site-header__brand-row">
            <button
              type="button"
              className="site-logo-button site-header__logo"
              onClick={onLogoClick}
              aria-label="첫 화면으로"
            >
              <SiteLogo />
            </button>

            {!detailMode ? (
              <NavButtons
                activeNav={activeNav}
                onNavChange={onNavChange}
                className="site-header__nav-mobile"
                aboutFirst
              />
            ) : null}
          </div>

          {!detailMode ? (
            <div className="site-header__filter-row">
              <CategoryDropdown
                activeCategory={activeCategory}
                onCategoryChange={onCategoryChange}
              />
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}
