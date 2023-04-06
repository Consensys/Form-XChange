import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useSwr from "swr";
import { FeedbackFormInstance } from "packages/vote/types/truffle-contracts/FeedbackForm";
import { abi } from "vote/build/contracts/FeedbackForm.json";
import { truncateEthAddress } from "../utils/networks";
import FeedbacksModal from "./FeedbacksModal";
import Button from "./Button";
import { H3, Text } from "./Text";

type Props = {
  id: number;
  address: string;
  className?: string;
};

export const ProposalCard: React.FC<Props> = ({ id, address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as FeedbackFormInstance;

  useEffect(() => {
    getTitle();
    getDescription();
  }, []);

  const getTitle = async () => {
    const title = await contract.title();
    setTitle(title);
  };

  const getDescription = async () => {
    const description = await contract.description();
    setDescription(description);
  };

  // const {
  //   data: title,
  //   isLoading: titleLoading,
  //   error: titleError,
  // } = useSwr<string, Error>("feedbackTitle", () => contract.title());

  // const {
  //   data: description,
  //   isLoading: descriptionLoading,
  //   error: descriptionError,
  // } = useSwr<string, Error>("feedbackDescription", () =>
  //   contract.description()
  // );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const isLoading = titleLoading || descriptionLoading;
  // const isError = titleError || descriptionError;

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-2xl gap-2 p-6 mx-auto border-2 shadow-lg md:gap-0 md:flex-row border-primary-blue rounded-xl">
      <header>
        <H3>{title}</H3>
        <Text className="font-thin">by: {truncateEthAddress(address)}</Text>
      </header>
      <Text className="font-thin">{description}</Text>
      <Button onClick={openModal} className="py-2 text-center max-w-[200px]">
        View proposal
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
