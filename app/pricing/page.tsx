import PricingCards from "../components/PricingCards";

const page = () => {
  return (
    <div className="isolate overflow-hidden dark:bg-gray-900 flex-grow">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-16 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Pricing
          </h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight dark:text-white sm:text-5xl text-black">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" />
            whoever you are
          </h1>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leadng-8 text-gray-600 dark:text-white/60 ">
            We're 100% sure we have a plan to match 100% of your needs
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-1- left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#radial-gradient-pricing)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="radial-gradient-pricing">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E93EC1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32 max-lg:px-6">
        <div className="-mt-80">
          <PricingCards redirect={true} />
        </div>
      </div>
    </div>
  );
};

export default page;
