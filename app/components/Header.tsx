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

const Header = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex max-sm:flex-col items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex flex-grow justify-end items-center gap-4">
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
    </header>
  );
};

export default Header;
