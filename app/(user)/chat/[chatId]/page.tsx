import ChatInput from "@/app/components/ChatInput";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    chatId: string;
  };
};

const page = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* Admin controls */}

      {/* Chat Members Badge */}

      {/* Chat Messages */}

      {/* Chat Input */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default page;
