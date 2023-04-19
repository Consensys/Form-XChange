import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Question from "./Question";
import { useQuestions } from "apps/web/hooks/useQuestions";
import { Text } from "../Text";
import Button from "../Button";

interface Props {
  id: number;
  address: string;
  isOpen: boolean;
  handleCloseModal: () => void;
}

const AnswersModal: FC<Props> = ({ id, isOpen, handleCloseModal, address }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const {
    isLoading,
    addFeedback,
    submitFeedback,
    clearLocalFeedbacks,
    isAllFeedbackGiven,
    questions,
  } = useQuestions(address);

  const isMovePrevEnabled = currentQuestionIndex > 0;
  const isMoveNextEnabled = currentQuestionIndex < questions.length - 1;

  const moveToNextQuestion = () => {
    if (!isMoveNextEnabled) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const moveToPrevQuestion = () => {
    if (!isMovePrevEnabled) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleAddFeedback = (answer: number) => {
    addFeedback(currentQuestionIndex, answer);
    moveToNextQuestion();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          handleCloseModal();
          clearLocalFeedbacks();
          setCurrentQuestionIndex(0);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-center w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {isLoading ? (
                  // TODO loader component
                  <div>Loading</div>
                ) : (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {isMovePrevEnabled && (
                          <button
                            onClick={() => moveToPrevQuestion()}
                            className="text-2xl left-3 bottom-1 hover:opacity-40"
                          >
                            &#8592;
                          </button>
                        )}
                        <Text className="mx-2">
                          {currentQuestionIndex + 1} of {questions.length}{" "}
                          questions
                        </Text>
                        {isMoveNextEnabled && (
                          <button
                            onClick={() => moveToNextQuestion()}
                            className="text-2xl right-3 bottom-1 hover:opacity-40"
                          >
                            &#8594;
                          </button>
                        )}
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className="text-3xl right-3 top-1 hover:opacity-40"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="flex w-full mb-4">
                      <Question
                        question={questions[currentQuestionIndex]}
                        onAddFeedback={handleAddFeedback}
                      />
                    </div>

                    <div className="flex w-full">
                      <Button
                        className={`max-w-none w-full ${!isAllFeedbackGiven && "bg-opacity-50 hover:bg-opacity-50 cursor-not-allowed"}`}
                        disabled={!isAllFeedbackGiven}
                        onClick={async () => {
                          await submitFeedback();
                          handleCloseModal();
                          clearLocalFeedbacks();
                          setCurrentQuestionIndex(0);
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AnswersModal;
