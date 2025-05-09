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
     const { selectedItems, setSelectedItems, correctCount, setCorrectCount } = useContext(AppContext);
 
     const [backgroundColor, setBackgroundColor] = useState(backgroundColors.gray);
     const [textBackgroundColor, setTextBackgroundColor] = useState(backgroundColors.gray);
     const [userAnswer, setUserAnswer] = useState('');
     const [aiReview, setAiReview] = useState('');
     const [reviewLoading, setReviewLoading] = useState(false);
     const [radioValue, setRadioValue] = useState('');
 
     useEffect(() => {
         if (!selectedItems[quizItem.id]) setBackgroundColor(backgroundColors.gray);
         else if (selectedItems[quizItem.id].isCorrect) setBackgroundColor(backgroundColors.green);
         else if (selectedItems[quizItem.id].score) {
           if (selectedItems[quizItem.id].score === 1) {
             setTextBackgroundColor(backgroundColors.green);
           } else if (selectedItems[quizItem.id].score > 0 && selectedItems[quizItem.id].score < 1) {
             setTextBackgroundColor(backgroundColors.yellow);
           }
           else setBackgroundColor(backgroundColors.red);
 
           setUserAnswer(selectedItems[quizItem.id].value);
           setAiReview(selectedItems[quizItem.id].aiReview);
         }
     }, []);
 
     const handleAnswerSelection = (ev) => {
         ev.preventDefault();
         if (ev.target.value === '') return;
         
         setRadioValue(ev.target.value);
         
         if (selectedItems[quizItem.id]) {
           const wasCorrect = selectedItems[quizItem.id].isCorrect;
           if (wasCorrect) {
             setCorrectCount(correctCount => correctCount - 1);
           }
         }
   
         if (ev.target.value.trim() === quizItem.correctAnswer.trim()) {
           setBackgroundColor(backgroundColors.green);
           setCorrectCount(correctCount + 1);
         } else {
           setBackgroundColor(backgroundColors.red);
         }
   
         const updatedSelectedItems = {...selectedItems};
         updatedSelectedItems[quizItem.id] = {
           value: ev.target.value,
           isCorrect: ev.target.value.trim() === quizItem.correctAnswer.trim()
         };
         setSelectedItems(updatedSelectedItems);
       }
 
     const handleAnswerSubmition = (ev) => {
         ev.preventDefault();
   
         if (userAnswer === '') return;
         else if (selectedItems[quizItem.id]) return false;
         setReviewLoading(true);
         callGemini(reviewAnswer(quizItem.title, userAnswer)).then((reviewData) => {
           return reviewData;
         }).then((data) => {
          console.log(data);
           setReviewLoading(false);
           const review = formatJSONResponse(data);
           const score = Number(review.score);
   
           if (score === 1) {
             setTextBackgroundColor(backgroundColors.green);
           } else if (score > 0 && score < 1) {
             setTextBackgroundColor(backgroundColors.yellow);
           } else if (score <= 0) {
             setTextBackgroundColor(backgroundColors.red);
           }
   
           const updatedSelectedItems = {...selectedItems};
           console.log(review.review);
           updatedSelectedItems[quizItem.id] = {
             value: userAnswer,
             score,
             aiReview: review.review
           };
   
           setCorrectCount(correctCount + score);
           setAiReview(review.review); 
           setSelectedItems(updatedSelectedItems);
         });
       }
 
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
 }