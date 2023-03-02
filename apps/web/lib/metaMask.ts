import { EthereumRpcError } from "eth-rpc-errors";
import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const initMetaMask = () => {
  // in case we are rendering on the server,
  // we don't want to instantiate the SDK when window is not defined
  if (typeof window === "undefined") {
    return null;
  }

  new MetaMaskSDK();
};

export const metaMask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    // there could be other wallets that could inject the window.ethereum so we can verify if we are dealing with metamask
    // using the boolean constructor to be explecit and not let this be used as a falsy value (optional)
    setIsMetaMaskInstalled(
      typeof window.ethereum !== "undefined" &&
        Boolean(window.ethereum.isMetaMask)
    );
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      //@ts-ignore
      return accounts?.[0];
    } catch (error: unknown) {
      if (error instanceof EthereumRpcError) {
        if (error.code === 4001) {
          console.log("user rejected");
        }
      }
    }
  };

  const getBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      console.log({ balance });

      //@ts-ignore
      return ethers.utils.formatEther(balance);
    } catch (error: unknown) {
      if (error instanceof EthereumRpcError) {
        if (error.code === 4001) {
          console.log("user rejected");
        }
      }
    }
  };

  const getChainId = () => window.ethereum.networkVersion;

  const addEthereumChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xf00",
            chainName: "...",
            rpcUrls: ["https://..."] /* ... */,
          },
        ],
      });
    } catch (addError) {
      // handle "add" error
    }
  };

  const switchEthereumChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xf00" }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error instanceof EthereumRpcError) {
        if (error.code === 4902) {
          await addEthereumChain();
        }
      }
    }
  };

  const listenToAccounts = (callback: (accounts: string[]) => void) => {
    window.ethereum.on("accountsChanged", async (newAccounts) =>
      callback(newAccounts as string[])
    );
  };

  const listenToChain = (
    //@ts-ignore
    callback: (newChain) => void
  ) => {
    window.ethereum.on("chainChanged", async (newChain) => {
      return callback(parseInt(newChain as string));
    });
  };

  return {
    connectWallet,
    getBalance,
    switchEthereumChain,
    getChainId,
    ethereum: window.ethereum,
    listenToAccounts,
    listenToChain,
    isMetaMaskInstalled,
  };
};
