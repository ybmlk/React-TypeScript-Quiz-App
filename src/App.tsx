import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './API';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY).then((data) => setQuestions(data));
  }, []);

  const startTrivia = async () => {};

  const checkAnswer = (e: React.MouseEvent) => {};

  const nextQuestion = () => {
    let currNum = number;
    setNumber(currNum + 1);
  };

  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      <p className='score'>Score:</p>
      {!questions.length ? (
        <p>Loading Questions...</p>
      ) : (
        <QuestionCard
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          questionNo={number + 1}
          totalQustions={TOTAL_QUESTIONS}
        />
      )}
      <button className='next' disabled={number + 1 === TOTAL_QUESTIONS} onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
};

export default App;
