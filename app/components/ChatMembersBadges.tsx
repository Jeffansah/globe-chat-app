"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useAdminId from "@/hooks/useAdminId";
import { ChatMembers, chatMembersRef } from "@/lib/converters/chatconvertor";
import { CircularProgress } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const ChatMembersBadges = ({ chatId }: { chatId: string }) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const [memberToDeleteId, setMemberToDeleteId] = useState("");

  const [open, setOpen] = useState(false);

  const adminId = useAdminId({ chatId });

  const { data: session } = useSession();

  if (loading && !members)
    return (
      <div className="w-full py-2 flex justify-center">
        <CircularProgress sx={{ color: "#4F46E5 !important" }} />
      </div>
    );

  const handleDelete = async () => {
    toast({
      title: "Removing user",
      description: "Please wait whilst we remove this user...",
    });

    console.log("Sent ID: ", memberToDeleteId);

    await fetch("/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId, memberToDeleteId }),
    })
      .then((res) => {
        toast({
          title: "Success",
          description: "User has been deleted",
          className: "bg-green-600 text-white",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "An error occured whilst removing the user.",
          variant: "destructive",
        });
      })
      .finally(() => setOpen(false));
  };

  return (
    !loading && (
      <div className="p-2 border rounded-xl m-5">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2 ">
          {members?.map((member) => (
            <Badge
              variant="secondary"
              key={member.userId}
              className="h-14 p-5 pl-2 pr-5 flex space-x-2 group transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <UserAvatar name={member.email} image={member.image} />
              </div>
              <div>
                <p>{member.email}</p>
                {member.userId === adminId && (
                  <p className="text-indigo-400 animate-pulse">Admin</p>
                )}
              </div>
              {session?.user.id === adminId && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <X
                      onClick={() => setMemberToDeleteId(member.userId)}
                      className={`hidden ${
                        member.userId !== adminId
                          ? "group-hover:inline"
                          : "hidden "
                      } w-4 h-4 ml-2 cursor-pointer`}
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This will remove this user permanently from this chat.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-x-2">
                      <Button variant="destructive" onClick={handleDelete}>
                        Remove
                      </Button>
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </Badge>
          ))}
        </div>
      </div>
    )
  );
};

export default ChatMembersBadges;
