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
import { useSubscriptionStore } from "@/store/store";
import CircularProgress from "@mui/joy/CircularProgress/CircularProgress";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import ManageAccountBtn from "./ManageAccountBtn";

const UserButton = ({ session }: { session: Session | null }) => {
  const subscription = useSubscriptionStore((state) => state.subscription);

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-0">
        <UserAvatar name={session.user?.name} image={session?.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="cursor-pointer flex items-center gap-x-2">
          Hi, {session.user?.name?.split(" ")[0]}{" "}
          <div className="text-[10px] flex items-center justify-center gap-x-1 animate-pulse text-[#E935C1]">
            {!subscription
              ? null
              : subscription?.items[0]?.plan?.metadata?.role === "pro" && (
                  <>
                    <StarIcon fill="#E935C1" className="w-[10px] h-[10px]" />
                    <p>PRO</p>
                  </>
                )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subscription === null ? (
          <DropdownMenuItem>
            <Link href={"/register"}>
              Subscribe to <span className="text-indigo-600">PRO</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          subscription?.items[0]?.plan?.metadata?.role === "pro" && (
            <>
              <DropdownMenuItem>
                <ManageAccountBtn />
              </DropdownMenuItem>
            </>
          )
        )}
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
