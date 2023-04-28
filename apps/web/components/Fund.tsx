import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import FundModal from "./FundModal";

interface FundProps {
  currentBalance: number;
  className?: string;
}

export const Fund: React.FC<FundProps> = ({ currentBalance, className }) => {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);

  const openFundModal = () => setIsFundModalOpen(true);
  const closeFundModal = () => setIsFundModalOpen(false);

  return (
    <>
      <Button
        variant="borderless"
        className={twMerge(
          " py-2 h-12 w-full text-center whitespace-nowrap",
          className,
          currentBalance === 0 && "border-red-500"
        )}
        onClick={openFundModal}
      >
        Fund
      </Button>
      <FundModal isOpen={isFundModalOpen} handleCloseModal={closeFundModal} />
    </>
  );
};
