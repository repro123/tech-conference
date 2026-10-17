import { persistentAtom } from "@nanostores/persistent";

export const $mySchedule = persistentAtom<string[]>("my-schedule", [], {
  encode: JSON.stringify,
  decode: (value) => {
    try {
      const parsed: unknown = JSON.parse(value);

      return Array.isArray(parsed) && parsed.every((item) => typeof item === "string") ? parsed : [];
    } catch {
      return [];
    }
  },
});

export function toggleSchedule(id: string) {
  const existing = $mySchedule.get().includes(id);

  if (existing) {
    $mySchedule.set($mySchedule.get().filter((item) => item !== id));
  } else {
    $mySchedule.set([...$mySchedule.get(), id]);
  }
}
