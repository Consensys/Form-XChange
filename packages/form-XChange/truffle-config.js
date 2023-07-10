require("dotenv").config();
const mnemonic = process.env["MNEMONIC"];
const infuraKey = process.env["INFURA_API_KEY"];

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 9545,
      network_id: "5777",
      chain_id: 1337,
    },
    linea: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://linea-goerli.infura.io/v3/${infuraKey}`),
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
