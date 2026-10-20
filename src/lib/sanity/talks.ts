import { sanityClient } from "sanity:client";
import type { Talk } from "@lib/sanity/types";

const TALKS_QUERY = `
  *[_type == "talk"] | order(day asc, startTime asc) {
    "id": _id,
    title,
    day,
    description,
    startTime,
    endTime,
    location,
    highlighted,
    speaker,
    track
  }
`;

export function getTalks() {
  return sanityClient.fetch<Talk[]>(TALKS_QUERY);
}
