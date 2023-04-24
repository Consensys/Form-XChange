import { ethers } from "ethers";

export const lineaNetwork = {
  chainName: "Linea Goerli test network",
  rpcUrls: ["https://rpc.goerli.linea.build"],
  networkId: 59140,
  chainId: 59140,
  nativeCurrency: {
    name: "Linea Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://explorer.goerli.linea.build/"],
};

export const truncateEthAddress = (address: string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const getFormattedBalance = (balance: string) =>
  +parseFloat(ethers.utils.formatEther(balance || "")).toFixed(2);

export const isAccountList = (accounts: unknown): accounts is string[] => {
  return (
    Array.isArray(accounts) &&
    accounts.every((account) => typeof account === "string")
  );
};
