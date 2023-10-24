import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const ChatPermissionError = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex">
        <p className="flex-1">
          Your session has expired. Please log in again.
          <br />
          <span className="font-bold">
            Please ask the chat admin to add you to the chat
          </span>
        </p>
        <Link href={"/chat"} replace>
          <Button variant="destructive">Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default ChatPermissionError;
