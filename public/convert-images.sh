#!/usr/bin/env bash

# convert-images.sh
# Batch-converts large source images (TIFF, PNG, BMP, etc.) into web-optimized
# WebP files (with JPEG fallback) at multiple responsive breakpoints.
#
# Requirements: libvips-tools (vips), bash, coreutils
# Usage:
#   ./convert-images.sh <input_dir> <output_dir> [quality]
#
# Example:
#   ./convert-images.sh ./raw-photos ./optimized 82

set -euo pipefail

INPUT_DIR="${1:-}"
OUTPUT_DIR="${2:-}"
QUALITY="${3:-82}"

# Breakpoints: label:width_in_px
BREAKPOINTS=(
  "mobile:640"
  "tablet:1024"
  "desktop:1920"
)

if [[ -z "$INPUT_DIR" || -z "$OUTPUT_DIR" ]]; then
  echo "Usage: $0 <input_dir> <output_dir> [quality]"
  exit 1
fi

if ! command -v vips &> /dev/null; then
  echo "Error: 'vips' not found. Install with: sudo apt install libvips-tools"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# Supported source formats: TIFF, PNG, BMP, JPG/JPEG, GIF (first frame), HEIC/HEIF.
# This covers any raw/oversized original regardless of type — not just TIFF —
# since PNGs from design tools or camera exports can be just as heavy (e.g. 29MB+).
shopt -s nullglob nocaseglob
FILES=(
  "$INPUT_DIR"/*.tif "$INPUT_DIR"/*.tiff
  "$INPUT_DIR"/*.png
  "$INPUT_DIR"/*.bmp
  "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.jpeg
  "$INPUT_DIR"/*.gif
  "$INPUT_DIR"/*.heic "$INPUT_DIR"/*.heif
)
shopt -u nocaseglob

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No image files found in $INPUT_DIR"
  exit 0
fi

echo "Found ${#FILES[@]} file(s). Quality: $QUALITY"
echo "---"

for f in "${FILES[@]}"; do
  filename=$(basename "$f")
  name="${filename%.*}"
  original_size=$(du -h "$f" | cut -f1)

  echo "Processing: $filename ($original_size)"

  for bp in "${BREAKPOINTS[@]}"; do
    label="${bp%%:*}"
    width="${bp##*:}"

    webp_out="$OUTPUT_DIR/${name}-${label}.webp"
    jpg_out="$OUTPUT_DIR/${name}-${label}.jpg"

    # WebP (primary format) — quality is passed via bracket options on the filename,
    # which is the standard libvips CLI convention (e.g. output.webp[Q=82]).
    vips thumbnail "$f" "${webp_out}[Q=${QUALITY}]" "$width"

    # JPEG fallback (for older browsers / <picture> fallback source)
    vips thumbnail "$f" "${jpg_out}[Q=${QUALITY}]" "$width"

    webp_size=$(du -h "$webp_out" 2>/dev/null | cut -f1 || echo "?")
    jpg_size=$(du -h "$jpg_out" 2>/dev/null | cut -f1 || echo "?")

    echo "  [$label / ${width}px]  webp: $webp_size  |  jpg: $jpg_size"
  done

  echo "---"
done

echo "Done. Output in: $OUTPUT_DIR"
