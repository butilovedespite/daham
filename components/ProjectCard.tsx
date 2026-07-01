import Image from "next/image";
import { getMaterialColor } from "@/lib/materialPalette";
import { CATEGORY_LABELS, type Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { accent } = getMaterialColor(project.category);

  return (
    <article
      className="project-card"
      style={
        {
          gridColumn: project.gridColumn,
          "--project-accent": accent,
        } as React.CSSProperties
      }
    >
      <div className="project-card__unit">
        <div className="project-card__media">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={1500}
            className="project-card__image"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="project-card__meta">
          <span className="project-card__category">
            {CATEGORY_LABELS[project.category]}
          </span>
          <span className="project-card__title">{project.title}</span>
          {project.year ? (
            <span className="project-card__year">{project.year}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
