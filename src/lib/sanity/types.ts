export type Conference = {
  _id: string;
  id: string;
  name: string;
  brandCode: string;
  tagline: string;
  startDate: string;
  endDate: string;
  location: {
    venue: string;
    city: string;
    cityAbbreviation: string;
    state: string;
  };
};

export type SanityReference = {
  _ref: string;
  _type: "reference";
};

export type SanityImage = {
  _type: "image";
  asset: SanityReference;
};

export type Speaker = {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  featured: boolean;
  avatar: SanityImage;
};

export type Track = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type Talk = {
  id: string;
  title: string;
  day: number;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  highlighted: boolean;
  speaker: SanityReference;
  track: SanityReference;
};
