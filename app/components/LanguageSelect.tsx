"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
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
        <Select>
          <SelectTrigger className="w-[150px] dark:bg-gray-900 text-black dark:text-white">
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>
          <SelectContent>
            <div className="overflow-scroll">
              {subscription === undefined ? (
                <CircularProgress variant="soft" size="sm" />
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
                </>
              )}
            </div>
          </SelectContent>
        </Select>
      </div>
    )
  );
};

export default LanguageSelect;
