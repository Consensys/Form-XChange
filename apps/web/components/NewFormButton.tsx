import Button from "./Button";
import { twMerge } from "tailwind-merge";

interface NewFormButtonProps {
  onClick: () => void;
  className?: string;
}

export const NewFormButton: React.FC<NewFormButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <Button
      variant="borderless"
      className={twMerge(
        " py-2 h-12 w-full text-center whitespace-nowrap",
        className
      )}
      onClick={onClick}
    >
      New Form
    </Button>
  );
};
