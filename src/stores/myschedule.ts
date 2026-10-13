import { persistentAtom } from "@nanostores/persistent";

export const $mySchedule = persistentAtom<string[]>("my-schedule", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function toggleSchedule(id: string) {
  const existing = $mySchedule.get().includes(id);

  if (existing) {
    $mySchedule.set($mySchedule.get().filter((item) => item !== id));
  } else {
    $mySchedule.set([...$mySchedule.get(), id]);
  }
}
