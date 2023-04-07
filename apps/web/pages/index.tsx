import { ethers } from "ethers";
import useSwr from "swr";
import Layout from "../components/Layout";
import { ProposalCard } from "../components/ProposalCard";
import { H1, Text } from "../components/Text";
import { abi } from "vote/build/contracts/FeedbackFormFactory.json";
import { FeedbackFormFactoryInstance } from "packages/vote/types/truffle-contracts/FeedbackFormFactory";
import { useQuestions } from "../hooks/useQuestions";

// hardcoded for testing
const FEEDBACK_FACTORY_CONTRACT_ADDRESS =
  "0x6053370e9000405343251EAe3f1bBeeD2c587840";

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
        <H1 className="text-center">Welcome to ZK-Vote!</H1>
        <Text className="max-w-md text-center">
          To get started connect your wallet or explore the current voting
          proposal added
        </Text>
      </section>
      <section className="flex flex-col w-full gap-6 mt-8">
        {isLoading && <Text>Loading</Text>}
        {error && <Text>Error</Text>}
        {feedbackFormsContracts?.map((address, index) => {
          return (
            <ProposalCard key={index} id={index} address={address} />
          );
        })}
      </section>
    </Layout>
  );
}
