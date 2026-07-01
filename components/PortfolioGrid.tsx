import ProjectCard from "@/components/ProjectCard";
import { chunkProjects } from "@/lib/chunkProjects";
import { getRowTemplateColumns } from "@/lib/portfolioColumns";
import type { Project } from "@/lib/projects";

type PortfolioGridProps = {
  projects: Project[];
  columns?: number;
  /** ALL view: assign columns 1→2→3 in chunk order (avoids gridColumn collisions). */
  sequentialLayout?: boolean;
  detailProjectIds?: ReadonlySet<string>;
  onProjectClick?: (project: Project) => void;
};

function sortByGridColumn(row: Project[]): Project[] {
  return [...row].sort(
    (a, b) =>
      (a.gridColumn ?? Number.MAX_SAFE_INTEGER) -
      (b.gridColumn ?? Number.MAX_SAFE_INTEGER),
  );
}

export default function PortfolioGrid({
  projects,
  columns = 3,
  sequentialLayout = false,
  detailProjectIds,
  onProjectClick,
}: PortfolioGridProps) {
  if (projects.length === 0) {
    return null;
  }

  const rows = chunkProjects(projects, columns);

  return (
    <div className="portfolio-grid">
      {rows.map((row, rowIndex) => {
        const orderedRow = sequentialLayout ? row : sortByGridColumn(row);
        const layoutRow = orderedRow.map((project, columnIndex) => ({
          ...project,
          gridColumn: columnIndex + 1,
        }));

        return (
          <div
            key={`portfolio-row-${rowIndex}`}
            className="portfolio-row"
            style={{ gridTemplateColumns: getRowTemplateColumns() }}
          >
            {layoutRow.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                hasDetail={detailProjectIds?.has(project.id) ?? false}
                onClick={onProjectClick}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
