import { useEffect, useState } from "react";
import contract from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { truncateEthAddress } from "../utils/networks";
import FeedbacksModal from "./FeedbacksModal";
import Button from "./Button";
import { H3, Text } from "./Text";
import { useNetwork } from "../hooks/useNetwork";
import { getFeedbackFormInstanceContract } from "../lib/contract.ts/feedBackFormInstanceContract";
import useSwr from "swr";
import { ethers } from "ethers";

type Props = {
  id: number;
  address: string;
  className?: string;
};

export const FeedbackFormCard: React.FC<Props> = ({ id, address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hasSubmitedFeedback, setHasSubmitedFeedback] = useState(false);
  const {
    state: { wallet, isConnected, wrongNetwork },
    connect,
  } = useNetwork();

  const fetcher = () =>
    fetch("/api/form-details", {
      body: JSON.stringify({ address }),
      method: "POST",
    }).then((res) => res.json());

  const { data } = useSwr<{ title: string; description: string }>(
    `formCard-${address}`,
    fetcher
  );

  const canFetchFormInfo = isConnected && !wrongNetwork;

  useEffect(() => {
    if (wallet) {
      getHasSubmitedFeedback();
    }
  }, [wallet]);

  const getHasSubmitedFeedback = async () => {
    if (canFetchFormInfo) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = getFeedbackFormInstanceContract({ address, provider });
      const hasSubmited = await contract.getHasProvidedFeedback(wallet!);
      console.log({ hasSubmited });
      setHasSubmitedFeedback(hasSubmited);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-2xl gap-2 p-6 mx-auto border shadow-md bg-white md:gap-0 md:flex-row border-primary-blue rounded-xl">
      <header>
        <H3>{data ? data.title : "loading..."}</H3>
        <Text className="font-thin">
          Address: {truncateEthAddress(address)}
        </Text>
      </header>
      <Text className="font-thin">
        {data ? data.description : "loading..."}
      </Text>
      {hasSubmitedFeedback ? (
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
