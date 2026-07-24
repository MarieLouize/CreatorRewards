// ─── Image Asset Resolver ────────────────────────────────────
// Dynamically imports all images from src/assets/ at build time.
// Use getImageSrc("logo.png") to get the resolved Vite URL.

const imageModules = import.meta.glob(
  "/src/assets/*.(png|jpe?g|svg|jpg|webp|gif)",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

/**
 * Retrieves the resolved image URL by filename.
 * @param filename - The image filename, e.g. "logo.png", "hero.jpg"
 * @returns The Vite-processed image URL, or empty string if not found
 */
export function getImageSrc(filename: string): string {
  if (!filename) {
    console.warn("[getImageSrc] No filename provided");
    return "";
  }

  const path = Object.keys(imageModules).find((key) =>
    key.endsWith(`/${filename}`),
  );

  if (!path) {
    console.warn(`[getImageSrc] Image not found: "${filename}"`);
    return "";
  }

  return imageModules[path];
}

/**
 * Retrieves multiple image URLs by filenames.
 * @param filenames - Array of image filenames
 * @returns Record mapping filename → URL (or empty string if not found)
 */
export function getImageSrcMap(filenames: string[]): Record<string, string> {
  return filenames.reduce(
    (acc, name) => {
      acc[name] = getImageSrc(name);
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Checks if an image exists in the assets folder.
 * @param filename - The image filename to check
 * @returns boolean
 */
export function imageExists(filename: string): boolean {
  return Object.keys(imageModules).some((key) => key.endsWith(`/${filename}`));
}

// ─── Preloaded common images (optional) ──────────────────────
// Export frequently used images directly for convenience:
export const LOGO = getImageSrc("logo.png");
export const HERO_BG = getImageSrc("hero-bg.jpg");
