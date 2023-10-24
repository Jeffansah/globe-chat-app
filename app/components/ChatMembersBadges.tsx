"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useAdminId from "@/hooks/useAdminId";
import { ChatMembers, chatMembersRef } from "@/lib/converters/chatconvertor";
import { CircularProgress } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";

const ChatMembersBadges = ({ chatId }: { chatId: string }) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const adminId = useAdminId({ chatId });

  if (loading && !members)
    return (
      <div className="w-full py-2 flex justify-center">
        <CircularProgress sx={{ color: "#6B46C1 !important" }} />
      </div>
    );

  return (
    !loading && (
      <div className="p-2 border rounded-xl m-5">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
          {members?.map((member) => (
            <Badge
              variant="secondary"
              key={member.userId}
              className="h-14 p-5 pl-2 pr-5 flex space-x-2"
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
            </Badge>
          ))}
        </div>
      </div>
    )
  );
};

export default ChatMembersBadges;
