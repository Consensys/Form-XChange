import { FC, Fragment } from "react";
import { H3, Text } from "../../Text";
import Button from "../../Button";
import { useNetwork } from "apps/web/hooks/useNetwork";

type Props = {
  next?: () => void;
  onError?: () => void;
};

const SwitchNetworkStep: FC<Props> = ({ onError }) => {
  const { switchChain } = useNetwork();

  const switchToLineaNetwork = async () => {
    try {
      await switchChain();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <H3>Switch Network</H3>
      <Text className="mt-4">Now let's switch to Linea network!</Text>
      <Button className="mt-5" onClick={switchToLineaNetwork}>
        <Text className="mr-2 text-white font-semiboldwhitespace-nowrap">
          Switch
        </Text>
      </Button>
    </Fragment>
  );
};

export default SwitchNetworkStep;
