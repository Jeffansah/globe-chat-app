import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import BackDrop from "../components/BackDrop";
import PricingCards from "../components/PricingCards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
  description: "Billing Page",
};

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="isolate h-full overflow-hidden dark:bg-gray-900 pb-40 lg:pb-72 max-sm:px-6">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 dark:text-white text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's handle your Membership {session?.user?.name?.split(" ")[0]}!
          </div>
        </div>
        <div className="relative">
          <BackDrop />
        </div>
      </div>
      <PricingCards redirect={false} />
    </div>
  );
};

export default page;
