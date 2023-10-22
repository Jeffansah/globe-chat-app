import { CheckCircleIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

const tiers = [
  {
    name: "Starter",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Get chatting right away with anyone, anywhere",
    features: [
      "20 Message Chat Limit in Chats",
      "2 Participant Limit in Chat",
      "3 Chat Rooms limit",
      "Supports up to 2 languages",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "si_OnlcsLNQYbMVzV",
    href: "#",
    priceMonthly: 5.99,
    description: "Unlock your full potential with our Pro version!",
    features: [
      "Unlimited Messages in Chats",
      "Unlimited Participants in Chat",
      "Unlimited Chat Rooms limit",
      "Supports up to 10 languages",
      "Multimedia support in chats (coming soon)",
      "1-hour,dedicated support response time",
      "Early access to New Features",
    ],
  },
];

const PricingCards = ({ redirect }: { redirect: boolean }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto gap-8 max-lg:max-w-md max-w-2xl">
        {tiers.map((tier) => (
          <div key={tier.id}>
            <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10  lg:min-h-[690px]">
              <div className="flex-grow">
                <h3
                  id={tier.id + tier.name}
                  className="text-base font-semibold leading-7 text-indigo-600"
                >
                  {tier.name}
                </h3>
                <div className="mt-4 flex- items-baseline gap-x-2">
                  {tier.priceMonthly ? (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        £{tier.priceMonthly}
                      </span>
                      <span className="text-base font-semibold leading-7 text-gray-600">
                        /month
                      </span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      Free
                    </span>
                  )}
                </div>
                <p className="mt-4 text-xs leading-7 text-gray-800/60">
                  {tier.description}
                </p>
                <div className="my-4 border-[0.5px] border-gray-800/20 w-full" />
                <ul
                  role="list"
                  className="mt-6 gap-y-20 text-[13px] leading-6 text-gray-800"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 mb-4">
                      <CheckCircleIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {redirect ? (
                <Link
                  href="/register"
                  className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible::outline-indigo-600 cursor-pointer disabled:opacity-80"
                >
                  {tier.priceMonthly ? "Get started Today" : "Try it out now"}
                </Link>
              ) : (
                tier.id && <CheckoutButton />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
