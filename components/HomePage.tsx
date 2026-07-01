"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PortfolioGrid from "@/components/PortfolioGrid";
import AboutPanel from "@/components/AboutPanel";
import { PROJECTS, sortProjectsByYearDesc, type Category } from "@/lib/projects";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");
  const [activeNav, setActiveNav] = useState<"WORKS" | "ABOUT">("WORKS");

  const handleCategoryChange = (category: Category | "ALL") => {
    setActiveCategory(category);
    setActiveNav("WORKS");
  };

  const handleNavChange = (nav: "WORKS" | "ABOUT") => {
    setActiveNav(nav);
  };

  const filteredProjects =
    activeCategory === "ALL"
      ? sortProjectsByYearDesc(PROJECTS)
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        activeNav={activeNav}
        onNavChange={handleNavChange}
      />

      <main className="works-section">
        <div className="page-container works-section__inner">
          <PortfolioGrid
            projects={filteredProjects}
            sequentialLayout={activeCategory === "ALL"}
          />
        </div>
      </main>

      <AboutPanel
        isOpen={activeNav === "ABOUT"}
        onClose={() => setActiveNav("WORKS")}
      />
    </div>
  );
}
