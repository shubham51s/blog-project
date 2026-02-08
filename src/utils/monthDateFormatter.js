export function formatMonthAndDayShort(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return diffSec <= 0 ? "just now" : `${diffSec}s ago`;
    }

    if (diffMin < 60) {
      return `${diffMin}m ago`;
    }

    if (diffHour < 24) {
      return `${diffHour}h ago`;
    }

    if (diffDay < 10) {
      return `${diffDay}d ago`;
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    if (date.getFullYear() === now.getFullYear()) {
      return `${month} ${day}`;
    }

    return `${day} ${month} ${year}`;
  } catch (err) {
    console.error(err);
    return "-";
  }
}
