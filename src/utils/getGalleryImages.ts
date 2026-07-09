import fs from "fs";
import path from "path";

const PUBLIC_ROOT = path.join(process.cwd(), "public");

export function getGalleryImages(brand: string): string[] {
  const optimizedDir = path.join(PUBLIC_ROOT, brand, "optimized");

  if (!fs.existsSync(optimizedDir)) {
    throw new Error(
      `[getGalleryImages] Missing "optimized" folder for brand "${brand}" at ${optimizedDir}. ` +
      `Refusing to fall back to another folder — images must come from /optimized only.`
    );
  }

  const files = fs
    .readdirSync(optimizedDir)
    .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));

  if (files.length === 0) {
    throw new Error(
      `[getGalleryImages] "optimized" folder for brand "${brand}" exists but is empty: ${optimizedDir}`
    );
  }

  return files.map((f) => `/${brand}/optimized/${f}`);
}
