"use client";

import { useSession } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import {
  User,
  limitedMessagesRef,
  messagesRef,
} from "@/lib/converters/messagesconverter";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  input: z.string().max(1000),
});

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const inputCopy = values.input.trim();
    form.reset();

    if (inputCopy.length === 0) {
      return;
    }

    if (!session?.user) {
      return;
    }

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.items[0]?.plan?.metadata?.role === "pro" &&
      subscription?.status === "active";

    if (!isPro && messages >= 20) {
      toast({
        title: "Free plan messages limit exceeded",
        description:
          "You've exceede the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to Pro
          </ToastAction>
        ),
      });

      return;
    }

    const userToSTore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToSTore,
    });
  };

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter your message in ANY language..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-violet-600 text-white dark:hover:text-black/80"
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
