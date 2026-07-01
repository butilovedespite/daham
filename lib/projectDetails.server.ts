import fs from "fs";
import path from "path";
import { PROJECTS } from "@/lib/projects";

const IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;
const DETAIL_FOLDER = "0701";

function normalizeName(value: string): string {
  return value.replace(/\s+/g, "").toLowerCase();
}

function toPublicUrl(publicDir: string, filePath: string): string {
  return `/${path
    .relative(publicDir, filePath)
    .split(path.sep)
    .join("/")}`;
}

function getDetailOrder(filename: string): number {
  const match = filename.match(/\((\d+)\)/);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

function sortDetailFiles(a: string, b: string): number {
  const orderDiff = getDetailOrder(a) - getDetailOrder(b);
  if (orderDiff !== 0) {
    return orderDiff;
  }

  return a.localeCompare(b, "ko", { numeric: true });
}

function getLegacyDetailImagePaths(
  publicDir: string,
  imagePath: string,
): string[] {
  const imageFilePath = path.join(publicDir, ...imagePath.slice(1).split("/"));
  const directory = path.dirname(imageFilePath);

  if (!directory.startsWith(publicDir) || !fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.includes("상세") && IMAGE_PATTERN.test(file))
    .sort(sortDetailFiles)
    .map((file) => toPublicUrl(publicDir, path.join(directory, file)));
}

function find0701ProjectDirectory(
  publicDir: string,
  projectTitle: string,
  imageBasename: string,
): string | null {
  const titleKey = normalizeName(projectTitle);
  const basenameKey = normalizeName(imageBasename);

  const categoryRoots = fs
    .readdirSync(publicDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(publicDir, entry.name, DETAIL_FOLDER))
    .filter((folderPath) => fs.existsSync(folderPath));

  for (const root of categoryRoots) {
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }

      const folderKey = normalizeName(entry.name);
      const matchesProject =
        folderKey === titleKey ||
        folderKey === basenameKey ||
        folderKey.includes(titleKey) ||
        titleKey.includes(folderKey) ||
        folderKey.includes(basenameKey) ||
        basenameKey.includes(folderKey);

      if (matchesProject) {
        return path.join(root, entry.name);
      }
    }
  }

  return null;
}

function isDetailImageForProject(filename: string, projectTitle: string): boolean {
  if (!filename.includes("상세") || !IMAGE_PATTERN.test(filename)) {
    return false;
  }

  const stem = filename.replace(/\.[^.]+$/, "");
  const detailIndex = stem.indexOf("상세");
  if (detailIndex === -1) {
    return false;
  }

  const prefix = normalizeName(stem.slice(0, detailIndex).replace(/[_\s-]+$/u, ""));
  const titleKey = normalizeName(projectTitle);

  return (
    prefix === titleKey ||
    prefix.includes(titleKey) ||
    titleKey.includes(prefix)
  );
}

function get0701DetailImagePaths(
  publicDir: string,
  imagePath: string,
  projectTitle: string,
  imageBasename: string,
): string[] {
  const detailDirectory = find0701ProjectDirectory(
    publicDir,
    projectTitle,
    imageBasename,
  );

  if (!detailDirectory?.startsWith(publicDir) || !fs.existsSync(detailDirectory)) {
    return [];
  }

  return fs
    .readdirSync(detailDirectory)
    .filter((file) => isDetailImageForProject(file, projectTitle))
    .sort(sortDetailFiles)
    .map((file) => toPublicUrl(publicDir, path.join(detailDirectory, file)));
}

function mergeDetailImagePaths(...groups: string[][]): string[] {
  const merged: string[] = [];
  const seen = new Set<string>();

  for (const group of groups) {
    for (const imagePath of group) {
      if (seen.has(imagePath)) {
        continue;
      }

      seen.add(imagePath);
      merged.push(imagePath);
    }
  }

  return merged;
}

export function getDetailImagePaths(imagePath: string): string[] {
  if (!imagePath.startsWith("/")) {
    return [];
  }

  const publicDir = path.join(process.cwd(), "public");
  const project = PROJECTS.find((entry) => entry.image === imagePath);
  const projectTitle = project?.title ?? path.basename(imagePath, path.extname(imagePath));
  const imageBasename = path.basename(imagePath, path.extname(imagePath));

  const legacyImages = getLegacyDetailImagePaths(publicDir, imagePath);
  const detail0701Images = get0701DetailImagePaths(
    publicDir,
    imagePath,
    projectTitle,
    imageBasename,
  );

  return mergeDetailImagePaths(legacyImages, detail0701Images);
}

export function hasDetailImages(imagePath: string): boolean {
  return getDetailImagePaths(imagePath).length > 0;
}

export function getProjectIdsWithDetailImages(): string[] {
  return PROJECTS.filter((project) => hasDetailImages(project.image)).map(
    (project) => project.id,
  );
}
