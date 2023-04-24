import { ethers } from "ethers";
import { abi } from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts";

type Args = {
  address: string;
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider;
};

export const getFeedbackFormInstanceContract = ({
  address,
  provider,
}: Args) => {
  return new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as FeedbackFormInstance;
};
