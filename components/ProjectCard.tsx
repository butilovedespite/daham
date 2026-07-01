import Image from "next/image";

import { getMaterialColor } from "@/lib/materialPalette";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageDefaults";
import { CATEGORY_LABELS, type Project } from "@/lib/projects";



type ProjectCardProps = {

  project: Project;

  hasDetail?: boolean;

  onClick?: (project: Project) => void;

};



export default function ProjectCard({

  project,

  hasDetail = false,

  onClick,

}: ProjectCardProps) {

  const { accent } = getMaterialColor(project.category);



  const media = (

    <Image
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
      className={`project-card${hasDetail ? "" : " project-card--no-detail"}`}
      style={

        {

          gridColumn: project.gridColumn,

          "--project-accent": accent,

        } as React.CSSProperties

      }

    >

      <div className="project-card__unit">

        {hasDetail ? (

          <button

            type="button"

            className="project-card__media"

            onClick={() => onClick?.(project)}

            aria-label={`${project.title} 상세 보기`}

          >

            {media}

          </button>

        ) : (

          <div className="project-card__media project-card__media--static">

            {media}

          </div>

        )}



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

