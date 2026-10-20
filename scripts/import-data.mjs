import "dotenv/config";
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";

const projectId = "7xq89tus";
const dataset = "production";
const confirmed = process.argv.includes("--confirm");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const dataPath = path.resolve("src/lib/data/data.json");
const imagesDirectory = path.resolve("public/images");

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN is missing from your .env file.");
  }

  if (!existsSync(dataPath)) {
    throw new Error(`JSON file not found: ${dataPath}`);
  }

  const data = JSON.parse(readFileSync(dataPath, "utf8"));

  if (!data.conference || !Array.isArray(data.tracks) || !Array.isArray(data.speakers) || !Array.isArray(data.talks)) {
    throw new Error("The JSON does not have the expected data structure.");
  }

  // Validate all speaker image paths before making changes.
  for (const speaker of data.speakers) {
    const imagePath = path.resolve(imagesDirectory, path.basename(speaker.avatar));

    if (!existsSync(imagePath)) {
      throw new Error(`Image missing for ${speaker.name}: ${imagePath}`);
    }
  }

  console.log("Project:", projectId);
  console.log("Dataset:", dataset);
  console.log("Conference:", data.conference.name);
  console.log("Tracks:", data.tracks.length);
  console.log("Speakers:", data.speakers.length);
  console.log("Talks:", data.talks.length);
  console.log("All speaker images exist.");

  if (!confirmed) {
    console.log("\nDry run complete. Nothing was uploaded or changed.");
    console.log("Review the output, then run with --confirm to import.");
    return;
  }

  // 1. Create the conference document.
  await client.createOrReplace({
    _id: "conference-devhorizon-2026",
    _type: "conference",
    ...data.conference,
  });

  console.log("Imported conference.");

  // 2. Create tracks, preserving their original IDs.
  for (const track of data.tracks) {
    const { id, ...fields } = track;

    await client.createOrReplace({
      _id: id,
      _type: "track",
      ...fields,
    });
  }

  console.log("Imported tracks.");

  // 3. Upload speaker images and create speaker documents.
  for (const speaker of data.speakers) {
    const { id, avatar, ...fields } = speaker;
    const imagePath = path.resolve(imagesDirectory, path.basename(avatar));

    // Reuse an existing image asset if this speaker was imported before.
    const existingAssetId = await client.fetch("*[_id == $id][0].avatar.asset._ref", { id });

    let assetId = existingAssetId;

    if (!assetId) {
      const asset = await client.assets.upload("image", createReadStream(imagePath), {
        filename: path.basename(imagePath),
      });

      assetId = asset._id;
    }

    await client.createOrReplace({
      _id: id,
      _type: "speaker",
      ...fields,
      avatar: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    });

    console.log(`Imported speaker: ${speaker.name}`);
  }

  // 4. Create talks with references to speakers and tracks.
  for (const talk of data.talks) {
    const { id, speakerId, trackId, ...fields } = talk;

    await client.createOrReplace({
      _id: id,
      _type: "talk",
      ...fields,
      startTime: talk.startTime.padStart(5, "0"),
      endTime: talk.endTime.padStart(5, "0"),
      speaker: {
        _type: "reference",
        _ref: speakerId,
      },
      track: {
        _type: "reference",
        _ref: trackId,
      },
    });

    console.log(`Imported talk: ${talk.title}`);
  }

  console.log("\nImport completed successfully!");
}

main().catch((error) => {
  console.error("\nImport failed:", error.message);
  process.exitCode = 1;
});
