"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

function isAboutOpenInUrl() {
  if (typeof window === "undefined") {
    return false;
  }

  return new URLSearchParams(window.location.search).has("about");
}

function findProjectById(projectId: string) {
  return PROJECTS.find((project) => project.id === projectId) ?? null;
}

function resetPageScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function HomePage() {
  const [detailProjectId, setDetailProjectId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");
  const [activeNav, setActiveNav] = useState<"WORKS" | "ABOUT">("WORKS");
  const [portfolioColumns, setPortfolioColumns] = useState(3);
  const wasInDetailRef = useRef(false);

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

  const syncFromHistory = () => {
    const projectId = readProjectIdFromUrl();
    const aboutOpen = isAboutOpenInUrl();

    if (projectId && !findProjectById(projectId)) {
      closeDetail();
      return;
    }

    if (projectId) {
      setDetailProjectId(projectId);
      setActiveNav("WORKS");
      return;
    }

    setDetailProjectId(null);

    if (aboutOpen) {
      setActiveNav("ABOUT");
      return;
    }

    setActiveCategory("ALL");
    setActiveNav("WORKS");
  };

  useEffect(() => {
    const projectId = readProjectIdFromUrl();
    const aboutOpen = isAboutOpenInUrl();

    if (projectId) {
      if (!findProjectById(projectId)) {
        closeDetail();
      } else if (window.history.state?.daham !== "detail") {
        window.history.replaceState({ daham: "home" }, "", "/");
        window.history.pushState(
          { daham: "detail", projectId },
          "",
          `/?p=${encodeURIComponent(projectId)}`,
        );
        setDetailProjectId(projectId);
        setActiveNav("WORKS");
      } else {
        setDetailProjectId(projectId);
        setActiveNav("WORKS");
      }
    } else if (aboutOpen) {
      if (window.history.state?.daham !== "about") {
        window.history.replaceState({ daham: "home" }, "", "/");
        window.history.pushState({ daham: "about" }, "", "/?about");
      }
      setDetailProjectId(null);
      setActiveNav("ABOUT");
    } else {
      if (!window.history.state?.daham) {
        window.history.replaceState({ daham: "home" }, "", "/");
      }
      setDetailProjectId(null);
      setActiveCategory("ALL");
      setActiveNav("WORKS");
    }

    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, []);

  useLayoutEffect(() => {
    if (wasInDetailRef.current && !detailProjectId) {
      resetPageScroll();
    }

    wasInDetailRef.current = detailProjectId !== null;
  }, [detailProjectId]);

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
    if (nav === "ABOUT") {
      if (detailProjectId) {
        window.history.replaceState({ daham: "home" }, "", "/");
        setDetailProjectId(null);
      }

      if (activeNav !== "ABOUT") {
        window.history.pushState({ daham: "about" }, "", "/?about");
      }

      setActiveNav("ABOUT");
      return;
    }

    if (activeNav === "ABOUT" && window.history.state?.daham === "about") {
      window.history.back();
      return;
    }

    setActiveNav("WORKS");
  };

  const handleCloseAbout = () => {
    if (window.history.state?.daham === "about") {
      window.history.back();
      return;
    }

    setActiveNav("WORKS");
  };

  const goToHome = () => {
    window.history.replaceState({ daham: "home" }, "", "/");
    setDetailProjectId(null);
    setActiveCategory("ALL");
    setActiveNav("WORKS");
    resetPageScroll();

    document
      .querySelectorAll<HTMLElement>(
        ".project-detail__scroll, .project-detail__gallery",
      )
      .forEach((element) => {
        element.scrollTop = 0;
      });
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
        onClose={handleCloseAbout}
      />
    </div>
  );
}
