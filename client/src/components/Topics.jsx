import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useQuizAPI } from '../hooks/useQuizAPI';

export const Topics = ({ categoryName }) => {
    const [quizOptions, setQuizOptions] = useState([]);

    const {
        fetchQuizOption,
        fetchQuizItemsByTopic
    } = useQuizAPI();

    useEffect(() => {
        fetchQuizOption(categoryName).then((data) => {
            setQuizOptions(data.topics);
        })
    }, [categoryName])

  return (
    <ul>
        { quizOptions.map((quizOption) => (
            <li onClick={() => fetchQuizItemsByTopic(categoryName, quizOption)}>{quizOption}</li>
        )) }
    </ul>
  )
}
