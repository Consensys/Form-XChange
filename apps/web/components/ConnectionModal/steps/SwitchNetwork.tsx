import { FC, Fragment } from "react";
import { H3, Text } from "../../Text";
import Button from "../../Button";
import { useNetwork } from "apps/web/hooks/useNetwork";

const SwitchNetworkStep: FC = ({}) => {
  const { switchToLineaChain, addLineaChain } = useNetwork();

  const switchToLineaNetwork = async () => {
    try {
      await switchToLineaChain();
    } catch (error: any) {
      // MetaMask extension wallet provides a default Linea network. usually There's no special wallet setup necessary
      if (error.code === 4902) {
        addLineaChain();
      }
      console.error(error);
    }
  };

  return (
    <Fragment>
      <H3>Switch Network</H3>
      <Text className="mt-4">Let&apos;s switch to Linea network!</Text>
      <Button className="mt-5" onClick={switchToLineaNetwork}>
        <Text className="mr-2 text-white font-semiboldwhitespace-nowrap">
          Switch
        </Text>
      </Button>
    </Fragment>
  );
};

export default SwitchNetworkStep;
