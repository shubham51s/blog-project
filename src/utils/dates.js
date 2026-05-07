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

export function formatUTCToLocalDate(dateInput) {
  try {
    if (!dateInput) return "-";

    const date = new Date(dateInput);

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

export function getMonthsTillToday(utcDate) {
  try {
    if (!utcDate) return [];

    const startDate = new Date(utcDate);

    if (isNaN(startDate.getTime())) return [];

    // Local date values
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();

    const today = new Date();
    const endMonth = today.getMonth();
    const endYear = today.getFullYear();

    const result = [];

    let currentMonth = startMonth;
    let currentYear = startYear;

    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
      result.push({
        month: currentMonth,
        year: currentYear,
      });

      currentMonth++;

      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }

    return result.reverse();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function getYearsTillToday(utcDate) {
  try {
    if (!utcDate) return [];

    const startDate = new Date(utcDate);

    if (isNaN(startDate.getTime())) return [];

    const startYear = startDate.getFullYear();
    const currentYear = new Date().getFullYear();

    const result = [];

    for (let year = startYear; year <= currentYear; year++) {
      result.push(year);
    }

    return result.reverse();
  } catch (err) {
    console.error(err);
    return [];
  }
}
