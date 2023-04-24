import { ethers } from "ethers";
import { FEEDBACK_FACTORY_CONTRACT_ADDRESS } from "./config";
import { abi } from "packages/form-XChange/build/contracts/FeedbackFormFactory.json";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts";

/*
 * Relies on window.ethereum being present (metamask installed and client side). use condionally
 */
export const getFormContractClientInstance = () => {

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    console.log(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(
      FEEDBACK_FACTORY_CONTRACT_ADDRESS,
      abi,
      provider
    ) as unknown as FeedbackFormInstance;
  } else return null;
};
