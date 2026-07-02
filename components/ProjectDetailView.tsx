"use client";

import FadeInImage from "@/components/FadeInImage";
import { useEffect, useState } from "react";
import { getMaterialColor } from "@/lib/materialPalette";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageDefaults";
import { CATEGORY_LABELS, type Project } from "@/lib/projects";

type ProjectDetailViewProps = {
  project: Project;
};

function useIsDesktopDetailLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1025px)");
    const update = () => setIsDesktop(desktopQuery.matches);

    update();
    desktopQuery.addEventListener("change", update);

    return () => {
      desktopQuery.removeEventListener("change", update);
    };
  }, []);

  return isDesktop;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const isDesktopDetailLayout = useIsDesktopDetailLayout();
  const [detailImages, setDetailImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { accent } = getMaterialColor(project.category);

  useEffect(() => {
    let cancelled = false;
    setImagesLoaded(false);
    setDetailImages([]);

    async function loadDetailImages() {
      try {
        const response = await fetch(
          `/api/project-details?image=${encodeURIComponent(project.image)}`,
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { images: string[] };

        if (!cancelled) {
          setDetailImages(data.images);
        }
      } finally {
        if (!cancelled) {
          setImagesLoaded(true);
        }
      }
    }

    void loadDetailImages();

    return () => {
      cancelled = true;
    };
  }, [project.image]);

  return (
    <section
      className="project-detail"
      style={{ "--project-accent": accent } as React.CSSProperties}
    >
      <div className="project-detail__left">
        <div className="project-detail__scroll">
          <div className="project-detail__info">
            <span className="project-detail__category">
              {CATEGORY_LABELS[project.category]}
            </span>

            <div className="project-detail__rule" aria-hidden="true" />

            <div className="project-detail__title-row">
              <span className="project-detail__title">{project.title}</span>
              {project.year ? (
                <span className="project-detail__year">{project.year}</span>
              ) : null}
            </div>

            <div className="project-detail__rule" aria-hidden="true" />
          </div>

          <FadeInImage
            src={project.image}
            alt={project.title}
            width={960}
            height={1200}
            quality={IMAGE_QUALITY.detailThumb}
            className="project-detail__thumbnail-image"
            sizes={IMAGE_SIZES.detailThumb}
            priority
          />
        </div>
      </div>

      {isDesktopDetailLayout ? (
        <div className="project-detail__divider" aria-hidden="true">
          <span />
          <span />
        </div>
      ) : null}

      <div className="project-detail__gallery">
        {imagesLoaded
          ? detailImages.map((image, index) => (
              <div key={image} className="project-detail__gallery-item">
                <span className="project-detail__gallery-index">
                  {project.detailImageLabels?.[index] ?? index + 1}
                </span>
                <div className="project-detail__gallery-image-wrap">
                  <FadeInImage
                    src={image}
                    alt={`${project.title} 상세 ${index + 1}`}
                    width={1040}
                    height={1300}
                    quality={IMAGE_QUALITY.detailGallery}
                    className="project-detail__gallery-image"
                    sizes={IMAGE_SIZES.detailGallery}
                    loading="lazy"
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </section>
  );
}
