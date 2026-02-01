export function formatNumberCompact(value) {
  if (value < 1000) return String(value);

  if (value < 1_000_000) {
    return Math.floor(value / 1000) + "K";
  }

  if (value < 1_000_000_000) {
    return Math.floor(value / 1_000_000) + "M";
  }

  return Math.floor(value / 1_000_000_000) + "B";
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars (including ?)
    .replace(/\s+/g, "-") // spaces → -
    .replace(/-+/g, "-");
}
