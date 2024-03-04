// AbacusQuiz.js
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNumbers, nextQuestion } from '../actions/actions';

const AbacusQuiz = () => {
  const dispatch = useDispatch();
  const { numbers, currentQuestion } = useSelector((state) => state);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds

  const MAX_QUESTIONS = 100;

  const generateRandomNumbers = () => {
    const randomNumbers = [];
    for (let i = 0; i < 4; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10) + 1);
    }
    return randomNumbers;
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < MAX_QUESTIONS - 1) {
      dispatch(nextQuestion());
      setUserAnswer('');
    } else {
      finishQuiz();
    }
  }, [currentQuestion, dispatch]);

  const finishQuiz = () => {
    setQuizEndTime(new Date());
    setIsQuizCompleted(true);
    calculateScore(); // Calculate the final score
  };

  const calculateScore = () => {
    // Implement scoring logic based on correct answers
    // For simplicity, let's assume the correct answer is the sum of the random numbers
    const correctAnswer = numbers.reduce((sum, num) => sum + num, 0);

    if (userAnswer.trim() !== '') {
      const userProvidedAnswer = parseInt(userAnswer, 10);

      if (!isNaN(userProvidedAnswer) && userProvidedAnswer === correctAnswer) {
        // If the user's answer is correct, add to the score
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    if (!quizStartTime) {
      setQuizStartTime(new Date());
    }
  }, [quizStartTime]);

  useEffect(() => {
    if (isQuizCompleted) {
      calculateScore();
    }
  }, [isQuizCompleted, calculateScore]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          finishQuiz();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finishQuiz]);

  useEffect(() => {
    const randomNumbers = generateRandomNumbers();
    dispatch(setNumbers(randomNumbers));
  }, [currentQuestion, dispatch]);

  useEffect(() => {
    const timeElapsed = (quizEndTime - quizStartTime) / 1000;

    if (timeElapsed >= 300 || currentQuestion >= MAX_QUESTIONS) {
      finishQuiz();
    }
  }, [quizStartTime, quizEndTime, currentQuestion, finishQuiz]);

  return (
    <div>
      {!isQuizCompleted ? (
        <>
          <h2>Question {currentQuestion + 1}</h2>
          <div>
            {numbers.map((number, index) => (
              <span key={index}><ul>{number}</ul></span>
            ))}
          </div>
          <label>
            Answer:
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </label>
          <button onClick={handleNextQuestion}>Next</button>
          <p>Time remaining: {formatTime(timeRemaining)}</p>
        </>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default AbacusQuiz;
