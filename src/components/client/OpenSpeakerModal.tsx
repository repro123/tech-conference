import type { Speaker } from "@/lib/types/speaker";
import { useState } from "react";
import type { Track } from "@/lib/types/track";
import type { Talk } from "@/lib/types/talk";

import SpeakerModal from "@/components/client/SpeakerModal";

interface SpeakersProps {
  speaker: Speaker;
  talk: Talk;
  track: Track;
}

function OpenSpeakerModal({ speaker, talk, track }: SpeakersProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const selectedTalk = talk;
  const selectedTrack = track;

  function openSpeakerModal(speaker: Speaker) {
    setSelectedSpeaker(speaker);
    setOpen(true);
  }
  return (
    <>
      <button
        onClick={() => openSpeakerModal(speaker)}
        className="text-neutral-100 preset-3 lowercase after:absolute after:inset-0 focus-visible:outline-none"
      >
        {speaker.name}
      </button>

      {open && (
        <SpeakerModal
          open={open}
          setOpen={setOpen}
          speaker={selectedSpeaker}
          talk={selectedTalk}
          track={selectedTrack}
        />
      )}
    </>
  );
}

export default OpenSpeakerModal;
