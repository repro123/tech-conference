export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const month = start.toLocaleDateString("en-US", {
    month: "short",
  });

  const endMonth = end.toLocaleDateString("en-US", {
    month: "short",
  });

  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${month} ${startDay}-${endDay}, ${year}`;
  }

  return `${month} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

export function formatStartDate(date: string): string {
  const [, month, day] = date.split("-");

  const formattedDate = new Date(2026, Number(month) - 1, Number(day)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return formattedDate;
}
