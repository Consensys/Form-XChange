import { PropsWithChildren, useEffect, FC } from "react";
import { initMetaMask } from "../lib/metaMask";

export const MetaMaskProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initMetaMask();
    }
  }, []);

  return <div>{children}</div>;
};
