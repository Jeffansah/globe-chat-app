import ChatInput from "@/app/components/ChatInput";
import ChatMembersBadges from "@/app/components/ChatMembersBadges";
import ChatMessages from "@/app/components/ChatMessages";
import { authOptions } from "@/auth";
import { sortedMessagesRef } from "@/lib/converters/messagesconverter";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    chatId: string;
  };
};

const page = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
      {/* Admin controls */}

      <ChatMembersBadges chatId={chatId} />

      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>

      {/* Chat Input */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default page;
