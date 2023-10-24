import React from "react";
import Logo from "./Logo";
import { DarkModeToggle } from "./DarkModeToggle";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Link from "next/link";
import { MessageSquareIcon, MessagesSquare } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import { Button } from "@/components/ui/button";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "./LanguageSelect";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 max-sm:pb-1">
      <nav className="flex max-sm:flex-col items-center p-5 pl-2 max-lg:px-6 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex flex-grow justify-end items-center gap-4">
          <div className="max-sm:hidden">
            <LanguageSelect />
          </div>

          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <Button variant="ghost">
                  <MessagesSquare className="text-black dark:text-white" />
                </Button>
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
      <div className="sm:hidden flex justify-center w-full mb-2">
        <LanguageSelect />
      </div>
      <UpgradeBanner />
    </header>
  );
};

export default Header;
