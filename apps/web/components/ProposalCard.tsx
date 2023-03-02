import Button from "./Button";
import { H3, Text } from "./Text";

type Props = {
  className?: string;
  id: number;
  title: string;
  short_description: string;
  description: string;
  link: string;
  by: string;
};

export const ProposalCard: React.FC<Props> = ({
  id,
  title,
  short_description,
  description,
  link,
  by,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row justify-between mx-auto items-center border-2 border-primary-blue max-w-2xl rounded-xl p-6 shadow-lg">
      <header>
        <H3>{title}</H3>
        <Text className="font-thin">{by}</Text>
      </header>
      <Text className="font-thin">{short_description}</Text>
      <Button href={link} className="py-2 text-center max-w-[200px]">
        View proposal
      </Button>
    </div>
  );
};
