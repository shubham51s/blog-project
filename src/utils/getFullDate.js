export function getFullDate(isoDate) {
  try {
    const formatted = new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formatted;
  } catch (err) {
    console.error(err);
    return "-";
  }
}
