import { ethers } from "ethers";
import useSwr from "swr";
import Layout from "../components/Layout";
import { FeedbackFormCard } from "../components/FeedbackFormCard";
import { H1, Text } from "../components/Text";
import { abi } from "packages/form-XChange/build/contracts/FeedbackFormFactory.json";
import { FeedbackFormFactoryInstance } from "packages/form-XChange/types/truffle-contracts/FeedbackFormFactory";

// hardcoded for testing
const FEEDBACK_FACTORY_CONTRACT_ADDRESS =
  "0xa2e2fDb4db80fEF8B4B9E72705F604b62a6c5F4B";

export default function Web() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(
    FEEDBACK_FACTORY_CONTRACT_ADDRESS,
    abi,
    provider
  ) as unknown as FeedbackFormFactoryInstance;

  const {
    data: feedbackFormsContracts,
    isLoading,
    error,
  } = useSwr<string[], Error>("feedbackForms", () =>
    contract.getFeedbackForms()
  );

  return (
    <Layout>
      <section className="flex flex-col items-center mt-24">
        <H1 className="mb-4 text-center">Welcome to form-XChange!</H1>
        <Text className="max-w-md text-center">
          To get started connect your wallet
        </Text>
        <Text className="max-w-md text-center">
          or explore the current forms
        </Text>
      </section>
      <section className="flex flex-col w-full gap-6 mt-8">
        {isLoading && <Text>Loading</Text>}
        {error && <Text>Error</Text>}
        {feedbackFormsContracts?.map((address, index) => (
          <FeedbackFormCard id={index} address={address} />
        ))}
      </section>
    </Layout>
  );
}
