"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import PortfolioGrid from "@/components/PortfolioGrid";
import ProjectDetailView from "@/components/ProjectDetailView";
import AboutPanel from "@/components/AboutPanel";
import {
  PROJECTS,
  sortProjectsByYearDesc,
  type Category,
  type Project,
} from "@/lib/projects";

function readProjectIdFromUrl() {
  if (typeof window === "undefined") {
    return null;
  }

  return new URLSearchParams(window.location.search).get("p");
}

function findProjectById(projectId: string) {
  return PROJECTS.find((project) => project.id === projectId) ?? null;
}

export default function HomePage() {
  const [detailProjectId, setDetailProjectId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");
  const [activeNav, setActiveNav] = useState<"WORKS" | "ABOUT">("WORKS");
  const [portfolioColumns, setPortfolioColumns] = useState(3);

  const selectedProject = useMemo(
    () => (detailProjectId ? findProjectById(detailProjectId) : null),
    [detailProjectId],
  );

  const openDetail = (projectId: string) => {
    if (!findProjectById(projectId)) {
      return;
    }

    const url = `/?p=${encodeURIComponent(projectId)}`;
    window.history.pushState({ daham: "detail", projectId }, "", url);
    setDetailProjectId(projectId);
  };

  const closeDetail = () => {
    window.history.replaceState({ daham: "home" }, "", "/");
    setDetailProjectId(null);
    setActiveCategory("ALL");
    setActiveNav("WORKS");
  };

  useEffect(() => {
    const syncFromUrl = () => {
      const id = readProjectIdFromUrl();

      if (id && !findProjectById(id)) {
        closeDetail();
        return;
      }

      setDetailProjectId(id);

      if (!id) {
        setActiveCategory("ALL");
        setActiveNav("WORKS");
      }
    };

    const id = readProjectIdFromUrl();

    if (id) {
      if (!findProjectById(id)) {
        closeDetail();
      } else if (window.history.state?.daham !== "detail") {
        window.history.replaceState({ daham: "home" }, "", "/");
        window.history.pushState(
          { daham: "detail", projectId: id },
          "",
          `/?p=${encodeURIComponent(id)}`,
        );
        setDetailProjectId(id);
      } else {
        setDetailProjectId(id);
      }
    } else {
      if (!window.history.state?.daham) {
        window.history.replaceState({ daham: "home" }, "", "/");
      }
      setDetailProjectId(null);
    }

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const syncColumns = () => {
      setPortfolioColumns(mobileQuery.matches ? 1 : 3);
    };

    syncColumns();
    mobileQuery.addEventListener("change", syncColumns);
    return () => mobileQuery.removeEventListener("change", syncColumns);
  }, []);

  const handleCategoryChange = (category: Category | "ALL") => {
    setActiveCategory(category);
    setActiveNav("WORKS");

    if (detailProjectId) {
      window.history.replaceState({ daham: "home" }, "", "/");
      setDetailProjectId(null);
    }
  };

  const handleNavChange = (nav: "WORKS" | "ABOUT") => {
    setActiveNav(nav);

    if (detailProjectId) {
      window.history.replaceState({ daham: "home" }, "", "/");
      setDetailProjectId(null);
    }
  };

  const goToHome = () => {
    if (detailProjectId) {
      closeDetail();
      return;
    }

    setActiveCategory("ALL");
    setActiveNav("WORKS");
    window.history.replaceState({ daham: "home" }, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProjectClick = (project: Project) => {
    openDetail(project.id);
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
        detailMode={selectedProject !== null}
        onLogoClick={goToHome}
      />

      <main
        className={
          selectedProject ? "project-detail-section" : "works-section"
        }
      >
        <div
          className="page-container works-section__inner"
          hidden={selectedProject !== null}
        >
          <div className="works-section__content">
            <PortfolioGrid
              projects={filteredProjects}
              columns={portfolioColumns}
              sequentialLayout={activeCategory === "ALL"}
              onProjectClick={handleProjectClick}
            />
          </div>
        </div>

        {selectedProject ? (
          <ProjectDetailView project={selectedProject} />
        ) : null}
      </main>

      <AboutPanel
        isOpen={activeNav === "ABOUT" && selectedProject === null}
        onClose={() => setActiveNav("WORKS")}
      />
    </div>
  );
}
