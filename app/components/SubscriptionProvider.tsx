"use client";

import { subscriptionRef } from "@/lib/converters/subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log("No matching document. User has no subscription");
          return;
        } else {
          console.log("User subscription found!");

          setSubscription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log("error getting document: ", error);
      }
    );
  }, [session, setSubscription]);

  return <>{children}</>;
};

export default SubscriptionProvider;
