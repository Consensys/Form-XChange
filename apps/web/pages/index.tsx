import useSwr from "swr";
import Layout from "../components/Layout";
import { FeedbackFormCard } from "../components/FeedbackFormCard";
import { H1, Text } from "../components/Text";
import { FeedbackFormCardSkeleton } from "../components/FeedbackFormCardSkeleton";
import { useNetwork } from "../hooks/useNetwork";
import Balancer from "react-wrap-balancer";

export default function Web() {
  const fetcher = () => fetch("/api/forms").then((res) => res.json());
  const {
    state: { isConnected },
  } = useNetwork();

  const { data, isLoading } = useSwr<string[]>("/forms", fetcher, {
    refreshInterval: 100,
  });

  return (
    <Layout>
      <section className="flex flex-col items-center">
        <H1 className="mb-4 text-center md:text-5xl">
          Welcome to Form xChange
        </H1>
        <h3 className="w-259 h-20 font-bold text-2xl md:text-3xl leading-7 text-center flex items-center text-gray-500">
          Web3 forms & surveys
        </h3>
        <p className="w-474 h-23 font-normal text-base leading-6 text-center flex items-center text-gray-500">
          <Balancer>
            A simple survey blockchain app to better understand users and
            communities
          </Balancer>
        </p>
      </section>

      <section className="flex flex-col w-full gap-6 mt-8 pb-10">
        {isLoading && <FeedbackFormCardSkeleton />}
        {data
          ?.slice()
          .reverse()
          .slice(0, 10)
          .map((address, index) => (
            <FeedbackFormCard id={index} address={address} key={address} />
          ))}
      </section>
    </Layout>
  );
}
