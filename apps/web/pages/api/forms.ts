import { formContractServerInstance } from "apps/web/lib/contract.ts/contract.server";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (_, res) => {
  
  const feedbackForms = await formContractServerInstance.getFeedbackForms();
  res.status(200).json(feedbackForms);
};

export default handler;
