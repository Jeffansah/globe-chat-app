import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "fr"
  | "es"
  | "de"
  | "it"
  | "pt"
  | "zh"
  | "ja"
  | "hi"
  | "ko"
  | "la"
  | "ar"
  | "no"
  | "ru"
  | "sw"
  | "tr"
  | "ak"
  | "yo"
  | "zu";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  zh: "Chinese",
  ja: "Japanese",
  hi: "Hindi",
  ko: "Korean",
  la: "Latin",
  ar: "Arabic",
  no: "Norwegian",
  ru: "Russian",
  sw: "Swahili",
  tr: "Turkish",
  ak: "Akan",
  yo: "Yoruba",
  zu: "Zulu",
};

const FREE_LANGUAGES_NUMBER = 2;

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    return Object.keys(LanguagesSupportedMap).slice(
      0,
      FREE_LANGUAGES_NUMBER
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];

    return Object.keys(LanguagesSupportedMap).slice(
      FREE_LANGUAGES_NUMBER
    ) as LanguagesSupported[];
  },
}));

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
