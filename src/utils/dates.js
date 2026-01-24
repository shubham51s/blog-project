export function formatMonthYearFromUTC(utcDateString) {
  try {
    const date = new Date(utcDateString); // auto converts UTC → local

    return new Intl.DateTimeFormat(undefined, {
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (err) {
    return "-";
  }
}

export function formatUTCToLocalDate(utcString) {
  try {
    if (!utcString) return "-";

    const date = new Date(utcString);

    // Invalid date check
    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return "-";
  }
}
