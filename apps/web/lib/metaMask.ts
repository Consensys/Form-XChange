import { EthereumRpcError, EthereumProviderError } from "eth-rpc-errors";
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

      return balance;
    } catch (error) {
      // @ts-ignore
      // @TODO properly handle typecast
      if (error.code === 4001) {
        console.log("user rejected");
      }
    }
  };

  const getChainId = () => window.ethereum.networkVersion;

  const addEthereumChain = async ({
    chainId,
    chainName,
    rpcUrls,
    nativeCurrency,
    blockExplorerUrls,
  }: {
    chainId: number;
    chainName: string;
    rpcUrls: string[];
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    blockExplorerUrls: string[];
  }) => {
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${chainId.toString(16)}`,
          chainName,
          rpcUrls,
          nativeCurrency,
          blockExplorerUrls,
        },
      ],
    });
  };

  const switchEthereumChain = async (chainId: number) => {
    return window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  };

  const listenToAccounts = (callback: (accounts: unknown) => void) => {
    window.ethereum.on("accountsChanged", async (newAccounts: unknown) =>
      callback(newAccounts)
    );
  };

  const listenToChain = (
    callback: (newChain: string) => void
  ) => {
    window.ethereum.on("chainChanged", async (newChain: string) => {
      return callback(newChain);
    });
  };

  return {
    connectWallet,
    getBalance,
    switchEthereumChain,
    addEthereumChain,
    getChainId,
    ethereum: window.ethereum,
    listenToAccounts,
    listenToChain,
    isMetaMaskInstalled,
  };
};
