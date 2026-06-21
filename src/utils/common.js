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

export const createSlug = (val) => {
  const text = val.trim();
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars (including ?)
    .replace(/\s+/g, "-") // spaces → -
    .replace(/-+/g, "-");
};

export const getImageUrl = (publicId, options = "q_auto,f_auto") => {
  return `https://res.cloudinary.com/${"drfuaxa6d"}/image/upload/${options}/${publicId}`;
};

export const getSubmissionStatus = (status) => {
  if (status === "approved") return "Approved";
  if (status === "pending_review") return "Pending review";
  if (status === "declined") return "Declined";
  if (status === "withdrawn") return "Withdrawn";
  return status;
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};
