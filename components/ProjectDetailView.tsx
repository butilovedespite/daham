"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getMaterialColor } from "@/lib/materialPalette";
import { CATEGORY_LABELS, type Project } from "@/lib/projects";

type ProjectDetailViewProps = {
  project: Project;
};

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [detailImages, setDetailImages] = useState<string[]>([]);
  const { accent } = getMaterialColor(project.category);

  useEffect(() => {
    let cancelled = false;

    async function loadDetailImages() {
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

          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={2000}
            className="project-detail__thumbnail-image"
            sizes="47vw"
            priority
          />
        </div>
      </div>

      <div className="project-detail__divider" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="project-detail__gallery">
        {detailImages.length > 0 ? (
          detailImages.map((image, index) => (
            <div key={image} className="project-detail__gallery-item">
              <span className="project-detail__gallery-index">
                {project.detailImageLabels?.[index] ?? index + 1}
              </span>
              <div className="project-detail__gallery-image-wrap">
                <Image
                  src={image}
                  alt={`${project.title} 상세 ${index + 1}`}
                  width={1600}
                  height={2000}
                  className="project-detail__gallery-image"
                  sizes="31vw"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="project-detail__empty">상세 이미지가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
