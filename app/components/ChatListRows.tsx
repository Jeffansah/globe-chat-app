"use client";

import {
  ChatMembers,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/chatconvertor";
import { MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CreateChatButton from "./CreateChatButton";
import ChatListRow from "./ChatListRow";

const ChatListRows = ({ initialChats }: { initialChats: ChatMembers[] }) => {
  const { data: session } = useSession();

  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id),
    {
      initialValue: initialChats,
    }
  );

  if (members?.length === 0)
    return (
      <div className="flex flex-col justify-center items-center pt-40 gap-y-2">
        <MessageSquare className="h-10 w-10" />
        <h1 className="text-5xl font-extralight">Welcome!</h1>
        <h2 className="pb-10">
          Let's get you started by creating your first chat!
        </h2>
        <CreateChatButton isLarge={true} />
      </div>
    );

  return (
    <>
      <p className="text-5xl max-sm:text-4xl max-sm:px-3 max-sm:py-3 py-4 mt-2 mb-3 font-bold border-b-[0.5px] border-gray-300/50 dark:border-gray-300/10">
        Chats
      </p>
      {members?.map((member, i) => (
        <ChatListRow key={member.chatId} chatId={member.chatId} />
      ))}
    </>
  );
};

export default ChatListRows;
