import type { GetStaticProps, NextPage } from "next/types";
import Layout from "../../../components/Layout";
import { Question } from "../../../hooks/useQuestions";
import { BarChart } from "../../../components/BarChart";
import { ethers } from "ethers";
import { formContractServerInstance } from "apps/web/lib/contract.ts/contract.server";
import { getFeedbackFormInstanceContract } from "apps/web/lib/contract.ts/feedBackFormInstanceContract";

type Props = {
  address: string;
  title: string;
  description: string;
  questions: Question[];
};

const FormDetails: NextPage<Props> = ({ address, title, questions, description }) => {
  return (
    <Layout>
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <p className="text-center mt-4">{description}</p>
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

export default FormDetails;

export async function getStaticPaths() {
  const feedbackForms = await formContractServerInstance.getFeedbackForms();

  const paths = feedbackForms.map((address) => {
    return { params: { address } };
  });
  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const url = `https://linea-goerli.infura.io/v3/${process.env.INFURA_KEY}`;
  const provider = new ethers.providers.JsonRpcProvider(url);

  if (!params?.address || typeof params.address !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const feedbackForm = getFeedbackFormInstanceContract({
    address: params?.address,
    provider,
  });

  const [title, description, questions] = await Promise.all([
    feedbackForm.title(),
    feedbackForm.description(),
    feedbackForm.getAllQuestions(),
  ]);


  return {
    revalidate: 10,
    props: {
      address: params?.address,
      title,
      description,
      questions: questions.map((question) => {
        return {
          value: question.value,
          // @ts-ignore TODO: fix this
          userFeedback: question.feedback.map((feedback) => Number(feedback)),
        };
      }),
    },
  };
};
