import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow max-lg:overflow-x-hidden">
      <div className="relative isolate pt-14 dark:bg-gray-900">
        <div
          className=" absolute inset-z-0 top-6 z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="max-sm:py-20  lg:pb-36 md:pt-52 lg:pt-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-7xl">
                Chat with Anyone,{" "}
                <span className="text-indigo-600 dark:text-indigo-500">
                  Anywhere!
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-xl max-sm:max-w-[350px] mx-auto">
                You speak your language, they speak their language. Let AI
                handle the translation.
              </p>
              <div className="mt-10 max-sm:mt-16 flex items-center justify-center gap-x-6">
                <Link
                  href={"/chat"}
                  className="rounded-md bg-indigo-600 px-4 5 py-3 5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-50"
                >
                  Get started
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-black/80 dark:hover:text-white z-50"
                >
                  View Pricing <span aria-hidden="true">+</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" absolute inset-x-0 top-[-100px] z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </main>
  );
}
