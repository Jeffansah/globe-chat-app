"use client";

import { useSubscriptionStore } from "@/store/store";
import { usePathname } from "next/navigation";

const ActiveBadge = ({ id }: { id: string | null }) => {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isLoading = useSubscriptionStore((state) => state.isLoading);

  const proState = id === subscription?.items[0]?.plan?.metadata?.role;
  const activeState = subscription?.items[0]?.plan?.active;
  const renewState = subscription?.cancel_at_period_end;

  const pathname = usePathname();
  const subscriptionPath = pathname.split("/")[1];

  return (
    <>
      <div
        className={` ${
          subscriptionPath === "register" && proState && activeState
            ? "inline"
            : "hidden"
        } p-1 py-[0.5px] flex items-center text-xs border border-indigo-600  rounded-md text-indigo-600`}
      >
        <p>{renewState ? "Renew Plan" : "Active"}</p>
      </div>
      <div
        className={` ${
          subscriptionPath === "register" && !isLoading && id === null
            ? "inline"
            : "hidden"
        } p-1 py-[0.5px] flex items-center text-xs border border-indigo-600  rounded-md text-indigo-600`}
      >
        <p>Active</p>
      </div>
    </>
  );
};

export default ActiveBadge;
