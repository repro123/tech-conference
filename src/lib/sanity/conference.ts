import { sanityClient } from "sanity:client";
import type { Conference } from "@lib/sanity/types";

const CONFERENCE_QUERY = `*[_type == "conference"][0]`;

export function getConference() {
  return sanityClient.fetch<Conference>(CONFERENCE_QUERY);
}
