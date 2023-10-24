import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat Page",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
