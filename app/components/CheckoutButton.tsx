"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { Button } from "@/components/ui/button";
import { useSubscriptionStore } from "@/store/store";

const CheckoutButton = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isLoading = useSubscriptionStore((state) => state.isLoading);

  const createCheckoutSession = async () => {
    if (!session?.user.id) {
      return;
    }

    //push a document to firestore db

    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1O3w1KBThwrHqyQN9B776vdz",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    //stripe extension on fb will will create a checkout sesion
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }
      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });

    //redirect user to checkout page
  };

  return (
    <div className="flex flex-col gap-y-2">
      {subscription === null && isLoading ? (
        <button
          disabled={true}
          className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible::outline-indigo-600 cursor-pointer disabled:opacity-80"
        >
          <CircularProgress variant="soft" size="sm" />
        </button>
      ) : subscription?.items[0]?.plan?.active &&
        subscription?.items[0]?.plan?.metadata?.role === "pro" ? (
        <Button
          onClick={() => createCheckoutSession()}
          className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible::outline-indigo-600 cursor-pointer disabled:opacity-80"
        >
          {loading ? (
            <CircularProgress variant="soft" size="sm" className="w-4 h-4" />
          ) : (
            "Manage subscription"
          )}
        </Button>
      ) : (
        <button
          onClick={() => createCheckoutSession()}
          className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible::outline-indigo-600 cursor-pointer disabled:opacity-80"
        >
          {loading ? (
            <CircularProgress variant="soft" size="sm" className="w-4 h-4" />
          ) : (
            "Subscribe"
          )}
        </button>
      )}
    </div>
  );
};

export default CheckoutButton;
