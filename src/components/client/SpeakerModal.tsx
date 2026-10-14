import { Dialog } from "@base-ui/react/dialog";
import Close from "@assets/images/icon-cross.svg";
import Barcode from "@assets/images/pattern-barcode.svg";
import { Star } from "lucide-react";
import AvatarBG from "@assets/images/pattern-avatar-bg.svg";

import type { Track } from "@/lib/types/track";
import type { Talk } from "@/lib/types/talk";
import type { Speaker } from "@/lib/types/speaker";

import { useStore } from "@nanostores/react";
import { $mySchedule, toggleSchedule } from "@/stores/myschedule";

interface SpeakerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  speaker: Speaker | null;
  talk: Talk | undefined;
  track: Track | undefined;
}

export default function SpeakerModal({ open, setOpen, speaker, talk, track }: SpeakerModalProps) {
  const schedule = useStore($mySchedule);
  const isScheduled = talk ? schedule.includes(talk.id) : false;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-neutral-900 opacity-70 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 flex w-full lg:w-180 max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-neutral-900 p-6 text-neutral-200 border border-neutral-600 shadow-[0.25rem_0.25rem_0] shadow-black/12  transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <div className="relative border-b border-b-neutral-600 pb-4">
            <Dialog.Close className="flex h-8 items-center justify-center border border-neutral-100 bg-transparent px-3 select-none hover:not-data-disabled:bg-neutral-900 active:not-data-disabled:bg-neutral-600 data-disabled:border-neutral-500 data-disabled:text-neutral-500 disabled:border-neutral-500 disabled:text-neutral-500 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-100 absolute top-0 right-0">
              <img src={Close.src} alt="" /> <span className="sr-only">Close</span>
            </Dialog.Close>

            <figure className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative overflow-hidden size-36" style={{ backgroundColor: track?.color }}>
                <img src={AvatarBG.src} alt="" className="absolute inset-0 size-full object-cover" />
                <img alt={speaker?.name} src={speaker?.avatar} className="relative size-full object-cover max-w-full" />
              </div>
              <figcaption className="flex flex-col gap-1">
                <h2 className="preset-3 text-neutral-100 lowercase">{speaker?.name}</h2>
                <p className="preset-6-medium uppercase">
                  {speaker?.role} @ {speaker?.company}
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="pb-4 border-b border-b-neutral-600">
            <p className="preset-6">{speaker?.bio}</p>
          </div>

          <div>
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
                    aria-label="Add to my schedule"
                    aria-pressed={isScheduled}
                    onClick={() => talk && toggleSchedule(talk.id)}
                    className="bg-neutral-900 grid place-items-center rounded-full p-2 text-(--track) hover:text-green hover:scale-110 transition-all duration-450"
                    style={{ "--track": track?.color } as React.CSSProperties}
                  >
                    <Star fill={isScheduled ? "currentColor" : "none"} />
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
