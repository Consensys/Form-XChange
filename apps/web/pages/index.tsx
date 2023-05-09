import useSwr from "swr";
import Layout from "../components/Layout";
import { FeedbackFormCard } from "../components/FeedbackFormCard";
import { H1, Text } from "../components/Text";
import { FeedbackFormCardSkeleton } from "../components/FeedbackFormCardSkeleton";
import { useNetwork } from "../hooks/useNetwork";

export default function Web() {
  const fetcher = () => fetch("/api/forms").then((res) => res.json());
  const {
    state: { isConnected },
  } = useNetwork();

  console.log(isConnected);

  const { data, isLoading } = useSwr<string[]>("/forms", fetcher, {
    refreshInterval: 100,
  });

  console.log(data);

  return (
    <Layout>
      <section className="flex flex-col items-center mt-24">
        <H1 className="mb-4 text-center md:text-5xl">
          Welcome to form-XChange!
        </H1>
        {!isConnected ? (
          <Text className="max-w-md text-center text-xl">
            To get started connect your wallet
          </Text>
        ) : (
          <Text className="max-w-md text-center text-xl">
            These are all the forms available on the network
          </Text>
        )}
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
