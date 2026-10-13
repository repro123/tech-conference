import { Dialog } from "@base-ui/react/dialog";
import Close from "@assets/images/icon-cross.svg";
import Barcode from "@assets/images/pattern-barcode.svg";
import { Star } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  featured: boolean;
}

interface Talk {
  id: string;
  title: string;
  speakerId: string;
  day: number;
  trackId: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  highlighted: boolean;
}

interface Track {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface SpeakersProps {
  speakers: Speaker[];
  talks: Talk[];
  tracks: Track[];
}
import AvatarBG from "@assets/images/pattern-avatar-bg.svg";
import { useState } from "react";

function Speakers({ speakers, talks, tracks }: SpeakersProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const selectedTalk = talks.find((t) => t.speakerId === selectedSpeaker?.id);
  const selectedTrack = tracks.find((t) => t.id === selectedTalk?.trackId);

  console.log(selectedSpeaker);
  console.log(selectedTalk);
  console.log(selectedTrack);

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

interface SpeakerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  speaker: Speaker | null;
  talk: Talk | undefined;
  track: Track | undefined;
}

function SpeakerModal({ open, setOpen, speaker, talk, track }: SpeakerModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-neutral-900 opacity-70 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 flex w-full lg:w-240 max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-neutral-900 p-6 text-neutral-200 border border-neutral-600 shadow-[0.25rem_0.25rem_0] shadow-black/12  transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <div className="relative border-b border-b-neutral-600 pb-4">
            <Dialog.Close className="flex h-8 items-center justify-center border border-neutral-100 bg-transparent px-3 select-none hover:not-data-disabled:bg-neutral-900 active:not-data-disabled:bg-neutral-600 data-disabled:border-neutral-500 data-disabled:text-neutral-500 disabled:border-neutral-500 disabled:text-neutral-500 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-white absolute top-0 right-0">
              <img src={Close.src} alt="" /> <span className="sr-only">Close</span>
            </Dialog.Close>

            <figure className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative overflow-hidden size-48" style={{ backgroundColor: track?.color }}>
                <img src={AvatarBG.src} alt="" className="absolute inset-0 size-full object-cover" />
                <img
                  alt={speaker?.name}
                  src={speaker?.avatar}
                  className="relative size-full object-cover max-w-full"
                  loading="lazy"
                />
              </div>
              <figcaption className="flex flex-col gap-1">
                <h2 className="preset-3 text-neutral-100 lowercase">{speaker?.name}</h2>
                <p className="preset-6-medium uppercase">
                  {speaker?.role} @ {speaker?.company}
                </p>
              </figcaption>
            </figure>

            <div></div>
          </div>

          <div className="py-4 border-b border-b-neutral-600">
            <p className="preset-6">{speaker?.bio}</p>
          </div>

          <div className="pt-4">
            <h3 className="flex flex-row uppercase gap-2 text-green preset-6">
              <span>//</span>
              <span>talk</span>
            </h3>

            <div className="border mt-4 flex flex-col md:flex-row" style={{ borderColor: track?.color }}>
              <div className="text-center flex items-center justify-center p-1 md:w-8">
                <span className="uppercase preset-6-medium md:-rotate-90" style={{ color: track?.color }}>
                  {track?.name}
                </span>
              </div>
              <div
                className="text-neutral-900 flex flex-col md:flex-row w-full"
                style={{ backgroundColor: track?.color }}
              >
                <div className="p-4 w-full">
                  <p className="preset-2-mobile md:preset-2 lowercase">{talk?.title}</p>

                  <div className="flex items-center gap-2 preset-5 uppercase mt-4">
                    <p className="preset-5-bold">{speaker?.name}</p>
                    <span>//</span>
                    <p>{speaker?.company}</p>
                  </div>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-dashed border-neutral-900 p-4 flex md:flex-col items-center justify-between gap-4">
                  <div className="flex flex-col items-center">
                    <span aria-label="start time" className="preset-4">
                      {talk?.startTime}
                    </span>
                    <span aria-label="end time" className="preset-7">
                      {talk?.endTime}
                    </span>
                  </div>

                  <div>
                    <img src={Barcode.src} alt="" />
                  </div>

                  <button
                    className="bg-neutral-900 grid place-items-center rounded-full p-2 text-(--track) hover:text-green hover:scale-110 transition-all duration-450"
                    style={{ "--track": track?.color } as React.CSSProperties}
                  >
                    <Star />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Speakers;
