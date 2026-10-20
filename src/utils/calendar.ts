import { createEvents } from "ics";
import type { Talk } from "@/lib/sanity/types";

function getConferenceDate(startDate: string, day: number) {
  const [year, month, date] = startDate.split("-").map(Number);

  const result = new Date(Date.UTC(year, month - 1, date + day - 1));

  return [result.getUTCFullYear(), result.getUTCMonth() + 1, result.getUTCDate()];
}

type DateTime = [number, number, number, number, number];

function getDateTime(date: number[], time: string): DateTime {
  const [hour, minute] = time.split(":").map(Number);

  return [date[0], date[1], date[2], hour, minute];
}

export function downloadCalendar(talks: Talk[], startDate: string, endDate: string): boolean {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  const events = talks.flatMap((talk) => {
    const date = getConferenceDate(startDate, talk.day);
    const eventDate = new Date(Date.UTC(date[0], date[1] - 1, date[2]));

    // Ignore invalid days outside the conference dates.
    if (eventDate < start || eventDate > end || talk.day < 1) {
      return [];
    }

    return [
      {
        uid: `${talk.id}@tech-conference-ashen.vercel.app/`,
        title: talk.title,
        description: talk.description,
        location: talk.location,
        start: getDateTime(date, talk.startTime),
        end: getDateTime(date, talk.endTime),
      },
    ];
  });

  if (events.length === 0) {
    console.error("No calendar events to export.");
    return false;
  }

  const { error, value } = createEvents(events, {
    calName: "Conference Schedule",
    productId: "//Conference Website//Schedule//EN",
  });

  if (error || !value) {
    console.error("Could not generate calendar:", error);
    return false;
  }

  const blob = new Blob([value], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "conference-schedule.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  return true;
}
