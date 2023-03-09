import { FC, Fragment } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import { H3, Text } from "../../Text";
import Button from "../../Button";
import { useNetwork } from "apps/web/hooks/useNetwork";

type Props = {
  next: () => void;
};

const WalletStep: FC<Props> = ({ next }) => {
  const { connect, state, switchChain } = useNetwork();

  return (
    <Fragment>
      <H3>Start voting</H3>
      {state.isConnected ? (
        <div className="flex flex-col items-center mt-3">
          <Text>{state.wallet}</Text>
          <Text className="font-bold whitespace-nowrap">
            {`(${parseFloat(
              ethers.utils.formatEther(state.balance || "")
            ).toFixed(2)} ETH)`}
          </Text>
          {state.wrongNetwork ? (
            <div className="mt-3">
              <Text className="text-red-600 ">
                You are connected to the wrong network!
              </Text>
              <Button className="py-2 mr-2 border-0" onClick={switchChain}>
                <Text className="mr-2 text-white font-semiboldwhitespace-nowrap">
                  Change network
                </Text>
              </Button>
            </div>
          ) : (
            <Button className="mt-3 border-0 w-fit" onClick={() => next()}>
              <Text className="font-bold text-white">Next</Text>
            </Button>
          )}
        </div>
      ) : (
        <>
          <Text className="mt-4">Connect your wallet!</Text>
          <Button
            variant="light"
            className="mt-3 border-0 w-fit"
            onClick={connect}
          >
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
        </>
      )}
    </Fragment>
  );
};

export default WalletStep;
