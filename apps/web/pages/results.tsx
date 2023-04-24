import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next/types";
import Layout from "../components/Layout";
import { Question } from "../hooks/useQuestions";
import { BarChart } from "../components/BarChart";
import useSwr from "swr";
import contract from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

type Props = {
  address: string;
};

const Results: NextPage<Props> = ({ address }) => {
  const { abi } = contract;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);

  const { data: title } = useSwr<string, Error>("feedbackTitle", () =>
    feedbackForm.title()
  );
  
  const { data: questions } = useSwr("feedbackQuestions", () =>
    feedbackForm.getAllQuestions()
  );

  useEffect(() => {
    if (questions) {
      handleQuestions(questions);
    }
  }, [questions]);

  const feedbackForm = new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as FeedbackFormInstance;

  const handleQuestions = (data: any) => {
    setUserQuestions(() => {
      return data.map((question: any) => {
        return {
          value: question.value,
          userFeedback: Number(question.feedback),
        };
      });
    });
  };

  return (
    <Layout>
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        {userQuestions.map((question, index) => (
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

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { query } = context;

  if (!query.address) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { address: query.address },
  };
}
