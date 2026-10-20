import { sanityClient } from "sanity:client";
import type { Speaker } from "@lib/sanity/types";


const SPEAKERS_QUERY = `
  *[_type == "speaker"] | order(name asc) {
    "id": _id,
    name,
    role,
    company,
    bio,
    featured,
    avatar
  }
`;

export function getSpeakers() {
  return sanityClient.fetch<Speaker[]>(SPEAKERS_QUERY);
}
