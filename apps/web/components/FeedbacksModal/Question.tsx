import { FC } from "react";
import { H3 } from "../Text";
import FeedbackItem from "./FeedbackItem";
import type { Question } from "apps/web/hooks/useQuestions";

import feedbackEmoji_5 from "../../public/emojis/emotion_5.svg";
import feedbackEmoji_4 from "../../public/emojis/emotion_4.svg";
import feedbackEmoji_3 from "../../public/emojis/emotion_3.svg";
import feedbackEmoji_2 from "../../public/emojis/emotion_2.svg";
import feedbackEmoji_1 from "../../public/emojis/emotion_1.svg";

interface Props {
  question: Question;
  onAddFeedback: (answer: number) => void;
}

const Question: FC<Props> = ({
  question: { value, userFeedback },
  onAddFeedback,
}) => {
  
  const feedbacks = [
    {
      id: 5,
      title: "Really positive",
      image: feedbackEmoji_5,
    },
    {
      id: 4,
      title: "Positive",
      image: feedbackEmoji_4,
    },
    {
      id: 3,
      title: "It was right",
      image: feedbackEmoji_3,
    },
    {
      id: 2,
      title: "Negative",
      image: feedbackEmoji_2,
    },
    {
      id: 1,
      title: "Really negative",
      image: feedbackEmoji_1,
    },
  ];
  return (
    <div className="flex flex-col items-center flex-1">
      <H3 className="mt-4 text-center">{value[0]}</H3>
      <div className="flex w-full mt-4">
        {feedbacks.map(({ id, title, image }) => (
          <FeedbackItem
            key={id}
            image={image}
            title={title}
            isActive={userFeedback === id}
            onClick={() => onAddFeedback(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
