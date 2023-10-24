import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat List",
  description: "All your chats in one place",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 w-full flex flex-col max-w-6xl mx-auto min-h-[80vh]">
      {children}
    </div>
  );
};

export default layout;
