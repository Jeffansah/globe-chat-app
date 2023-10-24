"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import CircularProgress from "@mui/joy/CircularProgress/CircularProgress";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LanguageSelect = () => {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

  const router = useRouter();

  const subscription = useSubscriptionStore((state) => state.subscription);

  const isPro =
    subscription?.items[0]?.plan?.metadata?.role === "pro" &&
    subscription?.status === "active";

  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] dark:bg-gray-900 text-black dark:text-white">
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>
          <SelectContent className="relative overflow-y-auto max-h-[300px] scrollbar-default">
            {subscription === undefined ? (
              <CircularProgress />
            ) : (
              <>
                {getLanguages(isPro).map((language) => (
                  <SelectItem
                    key={language}
                    value={language}
                    className="cursor-pointer"
                  >
                    {LanguagesSupportedMap[language]}
                  </SelectItem>
                ))}
                {getNotSupportedLanguages(isPro).map((language) => (
                  <SelectItem
                    onClick={() => router.push("/register")}
                    key={language}
                    value={language}
                    disabled
                    className="bg-gray-300/5- text-gray-500 dark:text-white"
                  >
                    {LanguagesSupportedMap[language]} (PRO)
                  </SelectItem>
                ))}

                <div className="w-full h-4" />
                <div className="w-full dark:h-8 h-[34px] bg-gradient-to-t from-white via-white dark:via-[#040918] to-transparent dark:from-[#040918] fixed z-10 bottom-0 left-0" />
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
};

export default LanguageSelect;
