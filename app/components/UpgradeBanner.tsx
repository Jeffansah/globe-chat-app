"use client";

import { Button } from "@/components/ui/button";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";

const UpgradeBanner = () => {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro =
    subscription?.items[0]?.plan?.metadata?.role === "pro" &&
    subscription?.status === "active";

  const isLoading = useSubscriptionStore((state) => state.isLoading);

  const router = useRouter();

  if (!isLoading)
    return (
      <Button
        onClick={() => router.push("/register")}
        className="w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] text-center text-white px-5 py-2 hover:from-[#7775D6] hover:to-[#E935C1] hover:shadow-md hover:opacity-75 transition-all"
      >
        Upgrade to Pro to unlock all features!
      </Button>
    );

  if (subscription !== null && isPro) return <></>;
};

export default UpgradeBanner;
