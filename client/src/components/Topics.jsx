import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useQuizAPI } from "../hooks/useQuizAPI";

export const Topics = ({ categoryName }) => {
    const { setQuizItems, resetQuiz, categories } = useContext(AppContext);

  const [quizOptions, setQuizOptions] = useState([]);

  const { fetchQuizOption, fetchQuizItemsByTopic } = useQuizAPI();

  useEffect(() => {
    fetchQuizOption(categoryName).then((data) => {
      setQuizOptions(data.topics);
    });
  }, [categoryName, categories]);

  const handleTopicSelection = async (categoryName, quizOption) => {
    resetQuiz();
    const newQuizItems = await fetchQuizItemsByTopic(categoryName, quizOption);
    setQuizItems(newQuizItems.quiz.quizData);
  }

  return (
    <ul>
      {quizOptions.map((quizOption) => (
        <li onClick={() => handleTopicSelection(categoryName, quizOption)}>
          {quizOption}
        </li>
      ))}
    </ul>
  );
};
