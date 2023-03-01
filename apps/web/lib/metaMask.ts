import {
  getMessageFromCode,
  EthereumProviderError,
  EthereumRpcError,
} from "eth-rpc-errors";
import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";

export const initMetaMask = () => {
  // in case we are rendering on the server,
  // we don't want to instantiate the SDK when window is not defined
  if (typeof window === "undefined") {
    return null;
  }

  new MetaMaskSDK();
};

export const metaMask = () => {
  if (typeof window.ethereum === "undefined") {
    return;
  }

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

  const getWalletBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, 'latest'],
      });
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

  const addNetwork = async () => {
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

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xf00" }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error instanceof EthereumRpcError) {
        if (error.code === 4902) {
          await addNetwork();
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
    getWalletBalance,
    getChainId,
    ethereum: window.ethereum,
    listenToAccounts,
    listenToChain,
  };
};
