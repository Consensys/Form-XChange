import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contract from "packages/form-XChange/build/contracts/FeedbackForm.json";
import { FeedbackFormInstance } from "packages/form-XChange/types/truffle-contracts/FeedbackForm";

export type Question = {
  value: string;
  userFeedback: number[] | number | null;
};

export const useQuestions = (formContractAddress: string) => {
  const { abi } = contract;
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
        questions.map((question) => {
          const { feedback } = question;
          const feedbacks = feedback.map((f) => Number(f));
          return {
            value: question.value,
            userFeedback: feedbacks,
          };
        })
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
      await FeedbackForm.submitFeedback(feedbacks as number[]);
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
