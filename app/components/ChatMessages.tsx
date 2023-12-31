"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/messagesconverter";
import { useLanguageStore } from "@/store/store";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { MessageCircleIcon, User } from "lucide-react";
import { Session } from "next-auth";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "./UserAvatar";

const ChatMessages = ({
  chatId,
  session,
  initialMessages,
}: {
  chatId: string;
  session: Session | null;
  initialMessages: Message[];
}) => {
  const language = useLanguageStore((state) => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col text-center justify-center items-center p-20 rounded-xl gap-y-2 bg-indigo-400 text-white font-extralight">
          <MessageCircleIcon className="h-10 w-10" />
          <h2>
            <span className="font-bold">Invite a friend</span> &{" "}
            <span className="font-bold">
              Send your first message in ANY language
            </span>{" "}
            below to get started!
          </h2>
          <p>We will do all the translation for you</p>
        </div>
      )}

      {messages?.map((message) => {
        const isSender = message.user.id === session?.user.id;

        return (
          <div className="flex relative my-2 items-end" key={message.id}>
            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${isSender && "-order-1 hidden"}`}
            />
            <p
              className={`${
                isSender ? "text-right" : "hidden"
              } text-[11px] text-gray-500/70 dark:text-gray-500/60 w-full px-3 mb-1`}
            >
              {message?.timestamp?.toLocaleTimeString() || ""}
            </p>
            <div
              className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                isSender
                  ? "ml-auto bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none mr-auto"
              }`}
            >
              <p
                className={`text-gray-300 dark:text-gray-200 text-xs italic font-extralight line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {message.user.name.split(" ")[0]}
              </p>
              <div className="flex space-x-2">
                <p className="text-sm">
                  {message.translated?.[language] || message.input}
                </p>
                {!message.translated && (
                  <CircularProgress color="inherit" size={20} />
                )}
              </div>
            </div>
            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${isSender ? "-order-1" : "hidden"}`}
            />
            <p
              className={`${
                isSender ? "hidden" : "text-left"
              } text-[11px] text-gray-500/70 dark:text-gray-500/60 w-full px-3 mb-1`}
            >
              {message?.timestamp?.toLocaleTimeString() || ""}
            </p>
          </div>
        );
      })}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
