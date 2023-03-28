import { FC } from "react";
import Image from "next/image";
import { Text } from "../Text";

import { twMerge } from "tailwind-merge";

interface Props {
  image: any;
  title: string;
  onClick: () => void;
  isActive: boolean;
}

const FeedbackItem: FC<Props> = ({
  image,
  title,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      className={twMerge(
        "flex-1 flex flex-col items-center opacity-50 hover:opacity-100  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 group cursor-pointer",
        isActive && "opacity-100"
      )}
      onClick={onClick}
    >
      <Image src={image} alt="5" width={64} height={64} />
      <Text
        className={twMerge(
          "text-center font-semibold opacity-0 group-hover:opacity-100",
          isActive && "opacity-100"
        )}
      >
        {title}
      </Text>
    </div>
  );
};

export default FeedbackItem;
