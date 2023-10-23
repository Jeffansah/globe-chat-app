import ChatList from "@/app/components/ChatList";

type Props = {
  parmas: {};
  searchParams: {
    error: string;
  };
};

const page = ({ searchParams: { error } }: Props) => {
  return (
    <div className="">
      Chats
      {/* Chat Permission error */}
      <ChatList />
    </div>
  );
};

export default page;
