require("dotenv").config();
const mnemonic = process.env["MNEMONIC"];
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 9545,
      network_id: "5777",
      chain_id: 1337,
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 5,
      chain_id: 5,
    },
    zkevm: {
      // infura url subject to change in the future.
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://consensys-zkevm-goerli-prealpha.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 59140,
      chain_id: 59140,
    },
  },
  mocha: {
    timeout: 100000,
  },
  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
