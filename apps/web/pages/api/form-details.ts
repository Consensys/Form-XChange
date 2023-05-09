import { getFeedbackFormInstanceContract } from "apps/web/lib/contract.ts/feedBackFormInstanceContract";
import { ethers } from "ethers";
import type { NextApiHandler } from "next";

const url = `https://consensys-zkevm-goerli-prealpha.infura.io/v3/${process.env.INFURA_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(url);

const handler: NextApiHandler = async (req, res) => {
  const feedbackForm = getFeedbackFormInstanceContract({
    address: JSON.parse(req.body).address,
    provider,
  });

  const userFeedbackRequested = Boolean(JSON.parse(req.body).userAddress);

  if (userFeedbackRequested) {
    const [title, description, hasProvidedFeedback] = await Promise.all([
      feedbackForm.title(),
      feedbackForm.description(),
      feedbackForm.getHasProvidedFeedback(JSON.parse(req.body).userAddress),
    ]);

    res.status(200).json({ title, description, hasProvidedFeedback });
  } else {
    const [title, description] = await Promise.all([
      feedbackForm.title(),
      feedbackForm.description(),
    ]);

    res.status(200).json({ title, description });
  }
};

export default handler;
