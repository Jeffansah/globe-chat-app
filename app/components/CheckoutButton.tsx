"use client";

import { signOut, useSession } from "next-auth/react";

const CheckoutButton = () => {
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    if (!session) {
      signOut();
      return;
    }

    //push a document to firestore db

    //stripe extension on fb will will create a checkout sesion

    //redirect user to checkout page
  };

  return (
    <div className="flex flex-col gap-y-2">
      <button
        onClick={() => createCheckoutSession}
        className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible::outline-indigo-600 cursor-pointer disabled:opacity-80"
      >
        Subscribe
      </button>
    </div>
  );
};

export default CheckoutButton;
