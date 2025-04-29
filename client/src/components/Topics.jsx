import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext';

export const Topics = ({ categoryName }) => {
    const {
        setQuizItems
    } = useContext(AppContext);

    const [quizOptions, setQuizOptions] = useState([]);
    
    const fetchQuizOption = (category) => {
        fetch(`http://localhost:3001/categories/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setQuizOptions(data.quizzes);
        })
        .catch((err) => {
            console.error('Failed to fetch quiz items:', err);
        });
    };

    const fetchQuizItemsByTopic = (category, topic) => {
        fetch(`http://localhost:3001/categories/${category}/${topic}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(category + " " + topic)
                console.log('http://localhost:3001/categories/' + category + '/' + topic);
                console.log(data)
                setQuizItems(data.quiz);
            })
            .catch((err) => {
                console.error('Failed to fetch quiz items:', err);
            });
    };

    useEffect(() => {
        fetchQuizOption(categoryName);
    }, [categoryName])

  return (
    <ul>
        { quizOptions.map((quizOption) => (
            <li onClick={() => fetchQuizItemsByTopic(categoryName, quizOption)}>{quizOption}</li>
        )) }
    </ul>
  )
}
