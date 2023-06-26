import type { GetStaticProps, NextPage } from "next/types";
import Layout from "../../../components/Layout";
import { ethers } from "ethers";
import { formContractServerInstance } from "apps/web/lib/contract.ts/contract.server";
import { getFeedbackFormInstanceContract } from "apps/web/lib/contract.ts/feedBackFormInstanceContract";
import Button from "apps/web/components/Button";
import FeedbacksModal from "apps/web/components/FeedbacksModal";
import { useEffect, useState } from "react";
import { useNetwork } from "apps/web/hooks/useNetwork";
import { abi } from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts";

type Props = {
  address: string;
  title: string;
  description: string;
};

const FormDetails: NextPage<Props> = ({ title, description, address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasLeftFeedback, setHasLeftFeedback] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    state: { isConnected, wallet },
  } = useNetwork();

  useEffect(() => {
    if (wallet && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const feedbackForm = new ethers.Contract(
        address,
        abi,
        provider
      ) as unknown as FeedbackFormInstance;

      feedbackForm.getHasProvidedFeedback(wallet!).then(setHasLeftFeedback);
    } else if (!wallet) {
      setHasLeftFeedback(false)
    }
  }, [isConnected, address, wallet]);
  

  return (
    <Layout>
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <p className="text-center text-xl mt-4">{description}</p>
      </div>
      {!isConnected && (
        <p className="text-center text-sm mt-4">
          In order to leave feedback, pleese connect your wallet
        </p>
      )}

      {hasLeftFeedback && (
        <p className="text-center text-sm mt-4">
          Thank you for leaving feedback!
        </p>
      )}

      <div className="flex w-full justify-center space-x-8">
        {hasLeftFeedback ? (
          <Button
            onClick={openModal}
            disabled
            className="py-2 w-full mx-auto md:mx-0 md:max-w-[210px] justify-center mt-6 flex items-center gap-2 disabled:bg-opacity-80 disabled:cursor-not-allowed"
          >
            Leave Feedback
          </Button>
        ) : (
          <Button
            onClick={openModal}
            disabled={!isConnected}
            className="py-2 w-full mx-auto md:mx-0 md:max-w-[210px] justify-center mt-6 flex items-center gap-2 disabled:bg-opacity-80 disabled:cursor-not-allowed"
          >
            Leave Feedback
          </Button>
        )}
        <Button
          type="button"
          href={`/form/results/${address}`}
          className="py-2 w-full mx-auto md:mx-0 md:max-w-[210px] justify-center mt-6 flex items-center gap-2"
        >
          View Results
        </Button>
      </div>
      {isConnected && (
        <FeedbacksModal
          isOpen={isModalOpen}
          handleCloseModal={closeModal}
          address={address}
        />
      )}
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
    fallback: "blocking",
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

  const [title, description] = await Promise.all([
    feedbackForm.title(),
    feedbackForm.description(),
  ]);

  return {
    props: {
      address: params?.address,
      title,
      description,
    },
    revalidate: 10,
  };
};
