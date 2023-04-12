import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts";
import contract from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { truncateEthAddress } from "../utils/networks";
import FeedbacksModal from "./FeedbacksModal";
import Button from "./Button";
import { H3, Text } from "./Text";
import { useNetwork } from "../hooks/useNetwork";

type Props = {
  id: number;
  address: string;
  className?: string;
};

export const FeedbackFormCard: React.FC<Props> = ({ id, address }) => {
  const { abi } = contract;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");
  const [hasSubmitedFeedback, setHasSubmitedFeedback] = useState(false);
  const {
    state: { wallet },
  } = useNetwork();

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const feedbackForm = new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as FeedbackFormInstance;

  useEffect(() => {
    getTitle();
    getDescription();
    if (wallet) {
      getHasSubmitedFeedback();
    }
  }, [wallet]);

  const getTitle = async () => {
    const title = await feedbackForm.title();
    setTitle(title);
  };

  const getDescription = async () => {
    const description = await feedbackForm.description();
    setDescription(description);
  };

  const getHasSubmitedFeedback = async () => {
    const hasSubmited = await feedbackForm.getHasProvidedFeedback(
      wallet as string
    );
    setHasSubmitedFeedback(hasSubmited);
  };

  // const {
  //   data: description,
  //   isLoading: descriptionLoading,
  //   error: descriptionError,
  // } = useSwr<string, Error>("feedbackDescription", () =>
  //   feedbackForm.description()
  // );

  // const {
  //   data: title,
  //   isLoading: titleLoading,
  //   error: titleError,
  // } = useSwr<string, Error>("feedbackTitle", () => feedbackForm.title());

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const isLoading = titleLoading || descriptionLoading;
  // const isError = titleError || descriptionError;

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-2xl gap-2 p-6 mx-auto border shadow-md bg-white md:gap-0 md:flex-row border-primary-blue rounded-xl">
      <header>
        <H3>{title}</H3>
        <Text className="font-thin">by: {truncateEthAddress(address)}</Text>
      </header>
      <Text className="font-thin">{description}</Text>
      {hasSubmitedFeedback ? (
        <Button
          className="py-2 text-center max-w-[200px]"
          href={`/results?address=${address}`}
        >
          View Results
        </Button>
      ) : (
        <Button className="py-2 text-center max-w-[200px]" onClick={openModal}>
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
