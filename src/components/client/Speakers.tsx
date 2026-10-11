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

interface SpeakersProps {
  speakers: Speaker[];
  talks: Talk[];
}
import AvatarBG from "@assets/images/pattern-avatar-bg.svg";

const bgColors = ["bg-yellow", "bg-cyan", "bg-purple", "bg-green", "bg-red-soft", "bg-blue"];

function Speakers({ speakers, talks }: SpeakersProps) {
  return (
    <ul className="mt-6 grid justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4">
      {speakers.map((speaker, i) => {
        const talk = talks.find((talk) => talk.speakerId === speaker.id);
        return (
          <li key={speaker.id} className="preset-6-medium w-full border border-neutral-600 flex flex-col">
            <div className={`relative aspect-4/3 overflow-hidden sm:aspect-square ${bgColors[i % bgColors.length]}`}>
              <img src={AvatarBG.src} alt="" className="absolute inset-0 size-full object-cover" />
              <img alt="" src={speaker.avatar} className="relative size-full object-cover max-w-full" loading="lazy" />
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="">
                <button className="text-neutral-100 preset-3 lowercase">{speaker.name}</button>
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
  );
}

export default Speakers;
