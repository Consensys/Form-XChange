import { useState } from "react";
import { ethers } from "ethers";
import useSwr from "swr";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts";
import contract from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { truncateEthAddress } from "../utils/networks";
import FeedbacksModal from "./FeedbacksModal";
import Button from "./Button";
import { H3, Text } from "./Text";

type Props = {
  id: number;
  address: string;
  className?: string;
};

export const FeedbackFormCard: React.FC<Props> = ({ id, address }) => {
  const { abi } = contract;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const feedbackForm = new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as FeedbackFormInstance;

  const {
    data: title,
    isLoading: titleLoading,
    error: titleError,
  } = useSwr<string, Error>("feedbackTitle", () => feedbackForm.title());

  const {
    data: description,
    isLoading: descriptionLoading,
    error: descriptionError,
  } = useSwr<string, Error>("feedbackDescription", () =>
    feedbackForm.description()
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isLoading = titleLoading || descriptionLoading;
  const isError = titleError || descriptionError;

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-2xl gap-2 p-6 mx-auto border-2 shadow-lg md:gap-0 md:flex-row border-primary-blue rounded-xl">
      <header>
        <H3>{title}</H3>
        <Text className="font-thin">by: {truncateEthAddress(address)}</Text>
      </header>
      <Text className="font-thin">{description}</Text>
      <Button onClick={openModal} className="py-2 text-center max-w-[200px]">
        Submit feedback
      </Button>
      <FeedbacksModal
        id={id}
        isOpen={isModalOpen}
        handleCloseModal={closeModal}
        address={address}
      />
    </div>
  );
};
