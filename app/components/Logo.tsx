import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} prefetch={false}>
      <h1 className="text-3xl text-black font-bold dark:text-white font-urbanist max-sm:pb-3">
        Globe.chat
      </h1>
    </Link>
  );
};

export default Logo;
