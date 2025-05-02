import { useState, useEffect, useContext } from "react";
import { AppContext } from '../context/AppContext';
import { formatJSONResponse } from '../utils/format';
import { callGemini } from '../utils/apiCall';
import { reviewAnswer } from "../data/prompts";

const backgroundColors = {
  gray: '#EEEEEE',
  green: '#1DCD9F',
  yellow: '#FAFFC5',
  red: '#E52020'
};

export const useInput = (quizItem) => {
  const { selectedItems, setSelectedItems, setCorrectCount } = useContext(AppContext);

  const [backgroundColor, setBackgroundColor] = useState(backgroundColors.gray);
  const [textBackgroundColor, setTextBackgroundColor] = useState(backgroundColors.gray);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  useEffect(() => {
    const selection = selectedItems[quizItem.id];

    if (!selection) {
      setBackgroundColor(backgroundColors.gray);
      setTextBackgroundColor(backgroundColors.gray);
      setUserAnswer('');
      setAiReview('');
      return;
    }

    if ('isCorrect' in selection) {
      setBackgroundColor(selection.isCorrect ? backgroundColors.green : backgroundColors.red);
      setUserAnswer(selection.value);
    }

    if ('score' in selection) {
      setUserAnswer(selection.value);
      setAiReview(selection.aiReview);

      if (selection.score === 1) {
        setTextBackgroundColor(backgroundColors.green);
      } else if (selection.score > 0 && selection.score < 1) {
        setTextBackgroundColor(backgroundColors.yellow);
      } else {
        setTextBackgroundColor(backgroundColors.red);
      }
    }
  }, [selectedItems, quizItem.id]);

  const handleAnswerSelection = (ev) => {
    ev.preventDefault();
    const value = ev.target.value;
    if (!value) return;

    setRadioValue(value);

    const prev = selectedItems[quizItem.id];
    if (prev?.isCorrect) {
      setCorrectCount(count => count - 1);
    }

    const isCorrect = value.trim() === quizItem.correctAnswer.trim();

    if (isCorrect) {
      setCorrectCount(count => count + 1);
    }

    setSelectedItems({
      ...selectedItems,
      [quizItem.id]: {
        value,
        isCorrect
      }
    });
  };

  const handleAnswerSubmition = (ev) => {
    ev.preventDefault();
    if (!userAnswer || selectedItems[quizItem.id]?.score !== undefined) return;

    setReviewLoading(true);

    callGemini(reviewAnswer(quizItem.title, userAnswer)).then((data) => {
      setReviewLoading(false);
      const review = formatJSONResponse(data);
      const score = Number(review.score);

      setCorrectCount(count => count + score);

      setSelectedItems({
        ...selectedItems,
        [quizItem.id]: {
          value: userAnswer,
          score,
          aiReview: review.review
        }
      });
    });
  };

  return {
    textBackgroundColor,
    aiReview,
    reviewLoading,
    radioValue,
    setRadioValue,
    userAnswer,
    setUserAnswer,
    handleAnswerSelection,
    handleAnswerSubmition,
    backgroundColor
  };
};