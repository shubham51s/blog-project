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

export function formatDateInMonthDayYear(utcDateString) {
  try {
    const date = new Date(utcDateString);
    const now = new Date();

    const isSameYear = date.getFullYear() === now.getFullYear();

    const options = {
      month: "short",
      day: "numeric",
      ...(isSameYear ? {} : { year: "numeric" }),
    };

    return date.toLocaleDateString(undefined, options);
  } catch (err) {
    console.error(err);
    return "-";
  }
}
