import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MAX_WIDTH = 1024;
const JPEG_QUALITY = 62;
const PNG_TO_JPEG_THRESHOLD = 200 * 1024;

const IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

async function walkImages(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walkImages(entryPath, files);
      continue;
    }

    if (IMAGE_PATTERN.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

async function optimizeFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const originalSize = fs.statSync(filePath).size;
  const metadata = await sharp(filePath, { failOn: "none" }).metadata();

  if (!metadata.width || !metadata.height) {
    return null;
  }

  let pipeline = sharp(filePath).rotate();

  if (metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });
  }

  const temporaryPath = `${filePath}.optim.tmp`;

  try {
    if (extension === ".png" && originalSize >= PNG_TO_JPEG_THRESHOLD) {
      const jpegPath = filePath.replace(/\.png$/i, ".jpg");

      await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toFile(temporaryPath);

      const optimizedSize = fs.statSync(temporaryPath).size;

      if (optimizedSize < originalSize) {
        fs.renameSync(temporaryPath, jpegPath);

        if (jpegPath !== filePath) {
          fs.unlinkSync(filePath);
        }

        return {
          file: path.relative(PUBLIC_DIR, jpegPath),
          before: originalSize,
          after: optimizedSize,
        };
      }

      fs.unlinkSync(temporaryPath);
      return null;
    }

    if (extension === ".png") {
      await pipeline
        .png({ compressionLevel: 9, effort: 10 })
        .toFile(temporaryPath);
    } else if (extension === ".webp") {
      await pipeline.webp({ quality: JPEG_QUALITY }).toFile(temporaryPath);
    } else {
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toFile(temporaryPath);
    }

    const optimizedSize = fs.statSync(temporaryPath).size;
    const shouldReplace =
      optimizedSize < originalSize * 0.95 || metadata.width > MAX_WIDTH;

    if (!shouldReplace) {
      fs.unlinkSync(temporaryPath);
      return null;
    }

    fs.renameSync(temporaryPath, filePath);

    return {
      file: path.relative(PUBLIC_DIR, filePath),
      before: originalSize,
      after: optimizedSize,
    };
  } catch (error) {
    if (fs.existsSync(temporaryPath)) {
      fs.unlinkSync(temporaryPath);
    }

    throw error;
  }
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  return `${Math.round(bytes / 1024)}KB`;
}

const files = await walkImages(PUBLIC_DIR);
const results = [];

for (const filePath of files) {
  const result = await optimizeFile(filePath);
  if (result) {
    results.push(result);
  }
}

const savedBytes = results.reduce(
  (total, result) => total + (result.before - result.after),
  0,
);

console.log(`Optimized ${results.length} images, saved ${formatSize(savedBytes)}.`);

for (const result of results
  .sort((a, b) => b.before - b.after - (a.before - a.after))
  .slice(0, 20)) {
  console.log(
    `${result.file}: ${formatSize(result.before)} -> ${formatSize(result.after)}`,
  );
}
