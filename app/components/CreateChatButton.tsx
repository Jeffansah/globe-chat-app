"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addChatRef } from "@/lib/converters/chatconvertor";
import { useSubscriptionStore } from "@/store/store";
import CircularProgress from "@mui/joy/CircularProgress/CircularProgress";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { MessageSquarePlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateChatButton = ({ isLarge }: { isLarge?: boolean }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore();
  const router = useRouter();

  const createNewChat = async () => {
    //create chat logic
    if (!session?.user.id) {
      toast({
        variant: "destructive",
        title: "No chat access",
        description: "Please sign in and try again.",
      });
      return;
    }

    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "Hold tight whilst we create your new chat...",
      duration: 3000,
    });

    //TODO check if user is pro and limit then creating a new chat

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "There was an error creating your chat",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge)
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {loading ? (
            <CircularProgress variant="soft" size="sm" />
          ) : (
            "Create a New Chat"
          )}
        </Button>
      </div>
    );

  return (
    <Button variant="ghost" onClick={createNewChat}>
      <MessageSquarePlusIcon />
    </Button>
  );
};

export default CreateChatButton;
