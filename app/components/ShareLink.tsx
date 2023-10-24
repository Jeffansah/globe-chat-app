"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Copy } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const ShareLink = ({
  isOpen,
  chatId,
  setIsOpen,
}: {
  isOpen: boolean;
  chatId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();

  const host = window.location.host;

  const linkToChat =
    process.env.NODE_ENV === "development"
      ? `http://${host}/chat/${chatId}`
      : `https://${host}/chat/${chatId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(linkToChat);

      console.log("Text copied to clipboard");

      toast({
        title: "Copied sucessfully!",
        description:
          "Share this to the person you want to chat with! (NOTE: They must be added to the chat to access it.)",
        className: "bg-green-600 text-white",
      });
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast({
        title: "Error",
        description:
          "An error occured whilst copying link. Review and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => setIsOpen(open)}
      open={isOpen}
      defaultOpen={isOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Copy className="mr-2" />
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Any user who has been{" "}
            <span className="text-indigo-600 font-bold">granted access</span>{" "}
            can use this link
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="Link" className="sr-only">
              Link
            </Label>
            <Input id="Link" defaultValue={linkToChat} readOnly />
          </div>
          <Button
            type="submit"
            onClick={() => copyToClipboard()}
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLink;
