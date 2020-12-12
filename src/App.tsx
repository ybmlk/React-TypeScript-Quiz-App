import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState, AnswerObject } from './API';
import './App.css';

const TOTAL_QUESTIONS = 5;

interface AnswerObjectList {
  [key: number]: AnswerObject;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObjectList>({});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers({});
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
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => ({ ...prev, [number]: answerObject }));
    }
  };

  const nextQuestion = () => {
    if (number + 1 < TOTAL_QUESTIONS) setNumber((prev) => prev + 1);
    else setGameOver(true);
  };

  const prevQuestion = () => {
    if (number > 0) setNumber((prev) => prev - 1);
    else setGameOver(true);
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1>REACT QUIZ</h1>

        {!gameOver && <p className='score'>Score: {score}</p>}

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

        {!loading && !gameOver && (
          <div>
            <button className='btn' disabled={!number} onClick={prevQuestion}>
              Previous
            </button>

            <button
              className='btn'
              disabled={number + 1 === TOTAL_QUESTIONS}
              onClick={nextQuestion}
            >
              Next
            </button>
          </div>
        )}

        {!loading && (gameOver || Object.keys(userAnswers).length === TOTAL_QUESTIONS) && (
          <button className='btn' onClick={startTrivia}>
            {Object.keys(userAnswers).length ? 'Play Again!' : 'Start'}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
