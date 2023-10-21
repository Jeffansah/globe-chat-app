"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

const UserButton = ({ session }: { session: Session | null }) => {
  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-0">
        <UserAvatar name={session.user?.name} image={session?.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="cursor-pointer">
          Hi, {session.user?.name?.split(" ")[0]}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="outline" onClick={() => signIn()}>
      Sign in
    </Button>
  );
};

export default UserButton;
