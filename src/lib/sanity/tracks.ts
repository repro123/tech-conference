import { sanityClient } from "sanity:client";
import type { Track } from "@lib/sanity/types";

const TRACKS_QUERY = `
  *[_type == "track"] | order(name asc) {
    "id": _id,
    name,
    description,
    color
  }
`;

export function getTracks() {
  return sanityClient.fetch<Track[]>(TRACKS_QUERY);
}
