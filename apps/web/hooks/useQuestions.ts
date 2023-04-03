import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { abi } from "vote/build/contracts/FeedbackForm.json";
import { FeedbackFormInstance } from "vote/types/truffle-contracts/FeedbackForm";

export type Question = {
  value: string;
  userFeedback: number | null;
};

export const useQuestions = (formContractAddress: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const FeedbackForm = new ethers.Contract(
    formContractAddress,
    abi,
    signer
  ) as unknown as FeedbackFormInstance;

  const [questions, setQuestions] = useState<Question[]>([]);

  const feedbacks = questions.map((q) => q.userFeedback);

  const [isAllFeedbackGiven, setIsAllFeedbackGiven] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsAllFeedbackGiven(!feedbacks.includes(null));
  }, [feedbacks]);

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const questions = await FeedbackForm.getAllQuestions();
      setQuestions(
        questions.map((question) => ({
          value: question,
          userFeedback: null,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeedback = async (questionIndex: number, userFeedback: number) => {
    setQuestions(
      questions.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, userFeedback };
        }
        return question;
      })
    );
  };

  const submitFeedback = async () => {
    setIsLoading(true);

    if (!isAllFeedbackGiven) return;

    try {
      await FeedbackForm.setAnswers(feedbacks as number[]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLocalFeedbacks = async () => {
    setQuestions(
      questions.map((question) => ({ ...question, userFeedback: null }))
    );
  };

  useEffect(() => {
    getQuestions();
  }, [formContractAddress]);

  return {
    questions,
    isAllFeedbackGiven,
    isLoading,
    addFeedback,
    submitFeedback,
    clearLocalFeedbacks,
  };
};
