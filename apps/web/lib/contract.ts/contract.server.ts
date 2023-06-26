import { ethers } from "ethers";
import { FEEDBACK_FACTORY_CONTRACT_ADDRESS } from "./config";
import { abi } from "packages/form-XChange/build/contracts/FeedbackFormFactory.json";
import { FeedbackFormFactoryInstance } from "packages/form-XChange/types/truffle-contracts";

const url = `https://linea-goerli.infura.io/v3/${process.env.INFURA_KEY}`;

const provider = new ethers.providers.JsonRpcProvider(url);



/**
 * This instance uses your infura key for direct node access.
 * Don't expose this in the client side to avoid server code contamination
 */
export const formContractServerInstance = new ethers.Contract(
  FEEDBACK_FACTORY_CONTRACT_ADDRESS,
  abi,
  provider
) as unknown as FeedbackFormFactoryInstance;
