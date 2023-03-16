const mnemonic = process.env["MNEMONIC"];
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

import HDWalletProvider from "@truffle/hdwallet-provider";

export const zkevmNetwork = {
  // infura url subject to change in the future.
  provider: () => {
    if (mnemonic && infuraProjectId) {
      return new HDWalletProvider(
        mnemonic,
        `https://consensys-zkevm-goerli-prealpha.infura.io/v3/${infuraProjectId}`
      );
    }
  },
  rpcUrls: [
    `https://consensys-zkevm-goerli-prealpha.infura.io/v3/${infuraProjectId}`,
  ],
  networkId: 59140,
  chainId: 59140,
};

export const truncateEthAddress = (address: string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const isAccountList = (accounts: unknown): accounts is string[] => {
  return (
    Array.isArray(accounts) &&
    accounts.every((account) => typeof account === "string")
  );
};
