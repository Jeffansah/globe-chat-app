"use client";

import { Button } from "@/components/ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateChatButton = () => {
  const router = useRouter();

  const createNewChat = async () => {
    //create chat logic

    router.push("/chat/abc");
  };
  return (
    <Button variant="ghost" onClick={createNewChat}>
      <MessageSquarePlusIcon />
    </Button>
  );
};

export default CreateChatButton;
