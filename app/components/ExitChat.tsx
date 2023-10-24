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
import { useToast } from "@/components/ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ExitChat = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const adminId = useAdminId({ chatId });
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (!session?.user) return;

    const userId = session.user.id;

    toast({
      title: "Exiting chat",
      description: "Please wait whilst we exit you from this chat...",
    });

    console.log("Exiting: ", chatId);

    await fetch("/api/user/exit", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId, userId }),
    })
      .then((res) => {
        toast({
          title: "Success",
          description: "You've successfully exited the chat",
          className: "bg-green-600 text-white",
          duration: 3000,
        });
        router.replace("/chat");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "An error occured whilst exiting your chat.",
          variant: "destructive",
        });
      })
      .finally(() => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 py-7">
          <LogOut className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will exit you from this chat permanently.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-2">
          <Button variant="destructive" onClick={handleDelete}>
            Exit
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitChat;
