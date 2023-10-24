import ChatList from "@/app/components/ChatList";
import ChatPermissionError from "@/app/components/ChatPermissionError";

type Props = {
  parmas: {};
  searchParams: {
    error: string;
  };
};

const page = ({ searchParams: { error } }: Props) => {
  return (
    <div className="">
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      <ChatList />
    </div>
  );
};

export default page;
