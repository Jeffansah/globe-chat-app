"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import {
  ChatMembers,
  addChatRef,
  chatMemberAdminRef,
  chatMembersRef,
} from "@/lib/converters/chatconvertor";
import { getUserByEmailRef } from "@/lib/converters/userconverter";
import { useSubscriptionStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { PlusCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ShareLink from "./ShareLink";
import { useCollectionData } from "react-firebase-hooks/firestore";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const InviteUser = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user.id) {
      toast({
        title: "Error",
        description: "You are not logged in, log in and try again.",
        duration: 2000,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sending Invite",
      description: "Please wait while we send the invite..",
    });

    const noOfUsersInChat = (
      await getDocs(chatMemberAdminRef(chatId))
    ).docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.items[0]?.plan?.metadata?.role === "pro" &&
      subscription?.status === "active";

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: "Free plan chat users limit exceeded",
        description:
          "You have exceeded the limit of users in a single chat for the FREE plan. Please upgrade to PRO to continue adding users to the chat",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });

      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));

    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter a valid email address of a registered user OR resernd the invitation once they have signed up!",
        variant: "destructive",
      });

      return;
    } else {
      const user = querySnapshot.docs[0].data();

      if (loading) return;

      const existingMember = members?.filter(
        (member) => member?.email === user.email
      );

      if (!existingMember) return;

      if (existingMember.length > 0) {
        toast({
          title: "User already in chat",
          description: "This user is already exists in this chat.",
          variant: "destructive",
        });
        return;
      }

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId,
        isAdmin: false,
        image: user.image || "",
      })
        .then(() => {
          setOpen(false);

          toast({
            title: "Added to chat",
            description: "User has been added to the chat successfully!",
            className: "bg-green-600 text-white",
            duration: 3000,
          });

          setOpenInviteLink(true);
        })
        .catch(() => {
          toast({
            title: "Error",
            description:
              "Whoops...there was an issue adding the user to the chat, please review and try again.",
            variant: "destructive",
          });

          setOpen(false);
        });
    }

    form.reset();
  };
  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="">
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User to Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this
                chat!{" "}
                <span className="text-indigo-600 font-bold">
                  (Note: They must be a registered user)
                </span>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
};

export default InviteUser;
