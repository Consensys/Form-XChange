import { forwardRef } from "react";
import Button from "./Button";
import { useNetwork } from "../hooks/useNetwork";

export const ConnectionButton: React.FC = forwardRef(() => {
  const {
    state: { isConnected, wrongNetwork },
    connect,
    switchToLineaChain,
    addLineaChain,
  } = useNetwork();

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

  if (!isConnected) {
    return (
      <Button className="w-full py-2" onClick={connect}>
        Connect
      </Button>
    );
  } else {
    if (wrongNetwork) {
      return (
        <Button
          className="w-full h-12 py-2 bg-red-500 whitespace-nowrap"
          onClick={switchToLineaNetwork}
        >
          Switch to Linea
        </Button>
      );
    }
  }

  return null;
});
