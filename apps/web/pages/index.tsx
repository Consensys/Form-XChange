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

  const { data, isLoading, error } = useSwr<string[]>("/forms", fetcher, {
    refreshInterval: 100,
  });

  return (
    <Layout>
      <section className="flex flex-col items-center mt-24">
        <H1 className="mb-4 text-center">Welcome to form-XChange!</H1>
        <Text className="max-w-md text-center">
          To get started connect your wallet
        </Text>
      </section>
      <section className="flex flex-col w-full gap-6 mt-8">
        {isLoading && <FeedbackFormCardSkeleton />}
        {isConnected &&
          data?.map((address, index) => (
            <FeedbackFormCard id={index} address={address} key={address} />
          ))}
      </section>
    </Layout>
  );
}
