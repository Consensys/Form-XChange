import { FC, Fragment } from "react";
import Image from "next/image";
import { H3, Text } from "../../Text";
import Button from "../../Button";
import { useNetwork } from "apps/web/hooks/useNetwork";

type Props = {
  next?: () => void;
};

const WalletStep: FC<Props> = () => {
  const { connect } = useNetwork();

  return (
    <Fragment>
      <H3>Start voting</H3>
      <Text className="mt-4">Lets start by connecting your wallet!</Text>
      <Button variant="light" className="mt-3 border-0 w-fit" onClick={connect}>
        <div className="flex items-center">
          <Image
            src={"./metamask.svg"}
            alt="metamask-icon"
            width={28}
            height={28}
          />
          <Text className="ml-4 font-bold">Connect with MetaMask</Text>
        </div>
      </Button>
    </Fragment>
  );
};

export default WalletStep;
