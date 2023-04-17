import type { NextPage } from "next/types";
import Layout from "../components/Layout";
import { useQuestions } from "../hooks/useQuestions";
import { BarChart } from "../components/BarChart";
import useSwr from "swr";
import contract from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts";
import { ethers } from "ethers";

type Props = {
  address: string;
};

const Results: NextPage<Props> = ({ address }) => {
  const { questions } = useQuestions(address);
  const { abi } = contract;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const feedbackForm = new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as FeedbackFormInstance;

  const { data: title } = useSwr<string, Error>("feedbackTitle", () =>
    feedbackForm.title()
  );

  return (
    <Layout>
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        {questions.map((question, index) => (
          <BarChart
            key={index}
            feedback={question.userFeedback}
            question={question.value}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Results;

export async function getServerSideProps(context: any) {
  const { query } = context;
  return {
    props: { address: query.address },
  };
}
