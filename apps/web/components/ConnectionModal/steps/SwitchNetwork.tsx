import { FC, Fragment } from "react";
import { H3, Text } from "../../Text";
import Button from "../../Button";
import { useNetwork } from "apps/web/hooks/useNetwork";

type Props = {
  next?: () => void;
  onError: () => void;
};

const SwitchNetworkStep: FC<Props> = ({ onError }) => {
  const { switchChain } = useNetwork();

  const switchToZkEvmNetwork = async () => {
    try {
      await switchChain();
    } catch (error) {
      //@ts-ignore
      if (error.code === 4902) {
        onError();
      }
    }
  };

  return (
    <Fragment>
      <H3>Switch Network</H3>
      <Text className="mt-4">Now switch to zkEVM network!</Text>
      <Button className="mt-5" onClick={switchToZkEvmNetwork}>
        <Text className="mr-2 text-white font-semiboldwhitespace-nowrap">
          Switch
        </Text>
      </Button>
    </Fragment>
  );
};

export default SwitchNetworkStep;
