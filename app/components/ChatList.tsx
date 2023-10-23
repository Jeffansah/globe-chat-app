import { authOptions } from "@/auth";
import { chatMembersCollectionGroupRef } from "@/lib/converters/chatconvertor";
import { doc, getDocs } from "firebase/firestore";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import ChatListRows from "./ChatListRows";

const ChatList = async () => {
  const session = await getServerSession(authOptions);

  const chatSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  );

  const initialChats = chatSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  return <ChatListRows initialChats={initialChats} />;
};

export default ChatList;
