import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: "7xq89tus",
  dataset: "production",
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
