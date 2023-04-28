import { useState } from "react";
import { truncateEthAddress } from "../utils/networks";
import FeedbacksModal from "./FeedbacksModal";
import Button from "./Button";
import { H3, Text } from "./Text";
import { useNetwork } from "../hooks/useNetwork";
import useSwr from "swr";
import { FeedbackFormCardSkeleton } from "./FeedbackFormCardSkeleton";

type Props = {
  id: number;
  address: string;
  className?: string;
};

export const FeedbackFormCard: React.FC<Props> = ({ id, address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    state: { wallet, isConnected },
    connect,
  } = useNetwork();

  const fetcher = () =>
    fetch("/api/form-details", {
      body: JSON.stringify({ address, userAddress: wallet }),
      method: "POST",
    }).then((res) => res.json());

  const { data, isLoading } = useSwr<{
    title: string;
    description: string;
    hasProvidedFeedback: boolean;
  }>(`formCard-${address}`, fetcher, {
    refreshInterval: 1000,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const truncateDescription = (description: string | undefined) => {
    if (description && description.length > 30) {
      return description.slice(0, 30).trim() + "...";
    }
    return description;
  };

  if (isLoading) return <FeedbackFormCardSkeleton />;

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-2xl gap-2 p-6 mx-auto border shadow-md bg-white md:gap-0 md:flex-row border-primary-blue rounded-xl">
      <header>
        <H3>{data?.title}</H3>
        <Text className="font-thin">
          Address: {truncateEthAddress(address)}
        </Text>
      </header>
      <Text className="font-thin">
        {truncateDescription(data?.description)}
      </Text>
      {data?.hasProvidedFeedback ? (
        <Button
          className="py-2 text-center max-w-[200px]"
          href={`/results?address=${address}`}
        >
          View Results
        </Button>
      ) : (
        <Button
          className="py-2 text-center max-w-[200px]"
          onClick={isConnected ? openModal : connect}
        >
          Submit Feedback
        </Button>
      )}
      <FeedbacksModal
        id={id}
        isOpen={isModalOpen}
        handleCloseModal={closeModal}
        address={address}
      />
    </div>
  );
};
