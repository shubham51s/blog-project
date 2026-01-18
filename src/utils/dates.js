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
