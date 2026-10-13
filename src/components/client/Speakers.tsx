import type { Track } from "@/lib/types/track";
import type { Talk } from "@/lib/types/talk";
import type { Speaker } from "@/lib/types/speaker";

import AvatarBG from "@assets/images/pattern-avatar-bg.svg";
import { useState } from "react";

import SpeakerModal from "@/components/client/SpeakerModal";

interface SpeakersProps {
  speakers: Speaker[];
  talks: Talk[];
  tracks: Track[];
}

function Speakers({ speakers, talks, tracks }: SpeakersProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const selectedTalk = talks.find((t) => t.speakerId === selectedSpeaker?.id);
  const selectedTrack = tracks.find((t) => t.id === selectedTalk?.trackId);

  function openSpeakerModal(speaker: Speaker) {
    setSelectedSpeaker(speaker);
    setOpen(true);
  }

  return (
    <>
      <ul className="mt-6 grid justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4">
        {speakers.map((speaker, i) => {
          const talk = talks.find((talk) => talk.speakerId === speaker.id);
          const track = tracks.find((track) => track.id === talk?.trackId);
          return (
            <li
              key={speaker.id}
              className="preset-6-medium w-full border border-neutral-600 flex flex-col relative hover:border-neutral-100 shadow-[2px_2px_0] shadow-neutral-900 hover:shadow-neutral-100 hover:shadow-[2px_2px_0] has-focus-within:shadow-neutral-100 has-focus-within:border-neutral-100 group transition-all duration-450"
            >
              <div
                className="relative aspect-4/3 overflow-hidden sm:aspect-square"
                style={{ backgroundColor: track?.color }}
              >
                <img src={AvatarBG.src} alt="" className="absolute inset-0 size-full object-cover" />
                <img
                  alt=""
                  src={speaker.avatar}
                  className="relative size-full object-cover max-w-full group-hover:scale-110 transition-all duration-450"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="">
                  <button
                    onClick={() => openSpeakerModal(speaker)}
                    className="text-neutral-100 preset-3 lowercase after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {speaker.name}
                  </button>
                </h3>
                <p className="text-neutral-200 my-4">
                  {speaker.role} @ {speaker.company}
                </p>

                <div className="border-t border-neutral-600 mt-auto pt-4">
                  {talk && <p className="text-green uppercase">{talk.title}</p>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <SpeakerModal open={open} setOpen={setOpen} speaker={selectedSpeaker} talk={selectedTalk} track={selectedTrack} />
    </>
  );
}

export default Speakers;
