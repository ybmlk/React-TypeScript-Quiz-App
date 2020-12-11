import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import './App.css';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    if (number + 1 < TOTAL_QUESTIONS) setNumber((prev) => prev + 1);
    else setGameOver(true);
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1>REACT QUIZ</h1>

        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        )}

        {!gameOver && <p className='score'>Score:{score}</p>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers[number]}
            questionNo={number + 1}
            totalQustions={TOTAL_QUESTIONS}
          />
        )}

        {!loading &&
          !gameOver &&
          userAnswers.length === number + 1 &&
          number + 1 < TOTAL_QUESTIONS && (
            <button className='next' onClick={nextQuestion}>
              Next
            </button>
          )}
      </div>
    </div>
  );
};

export default App;
