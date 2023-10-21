import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UserAvatar = ({
  name,
  image,
  className,
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) => {
  return (
    <div>
      <Avatar
        className={cn("bg-white text-black w-[36px] h-[36px]", className)}
      >
        {image && (
          <Image
            src={image}
            alt={name || ""}
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <AvatarFallback delayMs={1000} className="capitalize">
          {name?.split(" ")[0][0]}{" "}
          {name?.split(" ")[1] && name?.split(" ")[1][0]}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
