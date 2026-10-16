import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { useStore } from "@nanostores/react";
import { $mySchedule, toggleSchedule } from "@/stores/myschedule";

interface AddToMySchedulelProps {
  talkId: string;
  trackColor: string;
}

function AddToMySchedule({ talkId, trackColor }: AddToMySchedulelProps) {
  const schedule = useStore($mySchedule);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  
  const isScheduled = hasMounted && schedule.includes(talkId);

  return (
    <button
      aria-label={isScheduled ? "Remove from my schedule" : "Add to my schedule"}
      aria-pressed={isScheduled}
      onClick={() => toggleSchedule(talkId)}
      className="bg-neutral-900 grid place-items-center rounded-full p-2 text-(--track) hover:text-green hover:scale-110 transition-all duration-450"
      style={{ "--track": "" + trackColor } as React.CSSProperties}
    >
      <Star fill={isScheduled ? "currentColor" : "none"} />
    </button>
  );
}

export default AddToMySchedule;
