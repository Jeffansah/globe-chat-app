import { Github, Twitter } from "lucide-react";

const Footer = ({ page }: { page: string }) => {
  const year = new Date().getFullYear();

  return (
    <div
      className={` border-t-[0.5px] text-sm border-gray-300/50 dark:border-gray-300/10 py-8 max-sm:py-4 max-lg:px-6 mx-auto max-w-7xl flex justify-between text-gray-400 w-full ${
        page === "home" ? "" : ""
      }`}
    >
      <p className="font-light max-sm:text-[11px]">
        Copyright © {year} Globe.chat. All rights reserved.
      </p>
      <div className="flex gap-8 max-sm:gap-4 font-light items-center">
        <Twitter className="text-gray-400 w-5 h-5 max-sm:w-4 max-sm:h-4" />
        <Github className="text-gray-400 w-5 h-5 max-sm:w-4 max-sm:h-4" />
      </div>
    </div>
  );
};

export default Footer;
