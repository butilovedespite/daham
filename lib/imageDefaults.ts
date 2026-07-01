export const IMAGE_QUALITY = {
  grid: 60,
  detailThumb: 65,
  detailGallery: 58,
} as const;

export const IMAGE_SIZES = {
  grid: "(max-width: 768px) 348px, (max-width: 1024px) 50vw, 444px",
  detailThumb: "(max-width: 1024px) 92vw, 47vw",
  detailGallery: "(max-width: 1024px) 88vw, 520px",
} as const;
