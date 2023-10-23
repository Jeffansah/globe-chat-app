import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "fr"
  | "es"
  | "de"
  | "ja"
  | "hi"
  | "hu"
  | "is"
  | "ig"
  | "id"
  | "ga"
  | "it"
  | "ja"
  | "kk"
  | "ko"
  | "la"
  | "lv"
  | "lt"
  | "lb"
  | "mk"
  | "mt"
  | "mn"
  | "ne"
  | "no"
  | "fa"
  | "pl"
  | "ro"
  | "ru"
  | "sm"
  | "sr"
  | "sk"
  | "so"
  | "su"
  | "sw"
  | "sv"
  | "th"
  | "tr"
  | "ak"
  | "uk"
  | "uz"
  | "vi"
  | "cy"
  | "yo"
  | "zu";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  ja: "Japanese",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  kk: "Kazakh",
  ko: "Korean",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mt: "Maltese",
  mn: "Mongolian",
  ne: "Nepali",
  no: "Norwegian",
  fa: "Persian",
  pl: "Polish",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  sr: "Serbian",
  sk: "Slovak",
  so: "Somali",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  th: "Thai",
  tr: "Turkish",
  ak: "Akan",
  uk: "Ukrainian",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  yo: "Yoruba",
  zu: "Zulu",
};

interface SubscriptionState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  subscription: null,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
