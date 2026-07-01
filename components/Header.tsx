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
};

export default function Header({
  activeCategory,
  onCategoryChange,
  activeNav,
  onNavChange,
}: HeaderProps) {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-10 z-40">
        <div className="page-container">
          <SiteLogo />
        </div>
      </div>

      <header className="page-container relative z-50 pb-12 pt-10">
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
    </>
  );
}
