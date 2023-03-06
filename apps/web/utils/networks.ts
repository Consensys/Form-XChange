const mnemonic = process.env["MNEMONIC"];
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

import HDWalletProvider from "@truffle/hdwallet-provider";

export const networks = {
  development: {
    host: "127.0.0.1", // Localhost
    port: 9545,
    network_id: "8545",
    chain_id: 1337,
    rpc_urls: ["http://127.0.0.1:8545/"],
  },
  goerli: {
    provider: () => {
      if (mnemonic && infuraProjectId) {
        return new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/${infuraProjectId}`
        );
      }
    },
    rpc_urls: [`https://goerli.infura.io/v3/${infuraProjectId}`],
    network_id: 5,
    chain_id: 5,
  },
  zkevm: {
    // infura url subject to change in the future.
    provider: () => {
      if (mnemonic && infuraProjectId) {
        return new HDWalletProvider(
          mnemonic,
          `https://consensys-zkevm-goerli-prealpha.infura.io/v3/${infuraProjectId}`
        );
      }
    },
    rpc_urls: [
      `https://consensys-zkevm-goerli-prealpha.infura.io/v3/${infuraProjectId}`,
    ],
    network_id: 59140,
    chain_id: 59140,
  },
};

// @TODO return network based on the env parameter
export const getNetwork = () => ({
  ...networks.development,
  name: "development",
});

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
