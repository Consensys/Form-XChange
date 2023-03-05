import Layout from "../components/Layout";
import { ProposalCard } from "../components/ProposalCard";
import { H1, Text } from "../components/Text";

const mockProposal = [
  {
    id: 1,
    title: "Proposal #1",
    short_description: "Partnership with DAO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    link: "/",
    by: "by RAD team",
  },
  {
    id: 2,
    title: "Proposal #2",
    short_description: "Invest in Chow Chow coin",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    link: "/",
    by: "by RAD team",
  },
];

export default function Web() {
  return (
    <Layout>
      <section className="flex flex-col items-center">
        <H1 className="text-center">Welcome to ZK-Vote!</H1>
        <Text className="max-w-md text-center">
          To get started connect your wallet or explore the current voting
          proposal added
        </Text>
      </section>
      <section className="flex flex-col w-full gap-6 mt-8">
        {mockProposal.map((proposal) => (
          <ProposalCard key={proposal.id} {...proposal} />
        ))}
      </section>
    </Layout>
  );
}
