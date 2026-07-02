import FadeInImage from "@/components/FadeInImage";
import { getMaterialColor } from "@/lib/materialPalette";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageDefaults";
import { CATEGORY_LABELS, type Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  onClick?: (project: Project) => void;
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { accent } = getMaterialColor(project.category);

  const media = (
    <FadeInImage
      src={project.image}
      alt={project.title}
      width={888}
      height={1110}
      quality={IMAGE_QUALITY.grid}
      className="project-card__image"
      sizes={IMAGE_SIZES.grid}
    />
  );

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
        <button
          type="button"
          className="project-card__media"
          onClick={() => onClick?.(project)}
          aria-label={`${project.title} 상세 보기`}
        >
          {media}
        </button>

        <div className="project-card__meta">
          <span className="project-card__category">
            {CATEGORY_LABELS[project.category]}
          </span>

          {project.year ? (
            <span className="project-card__year">{project.year}</span>
          ) : null}

          <span className="project-card__title">{project.title}</span>
        </div>
      </div>
    </article>
  );
}
