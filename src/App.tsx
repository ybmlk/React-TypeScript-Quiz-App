import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty } from './API';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY).then((data) => console.log(data));

  const startTrivia = async () => {};

  const checkAnswer = (e: React.MouseEvent) => {};

  const nextQuestion = () => {};

  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      <p className='score'>Score:</p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        question={questions[number].question}
        answers={questions[number].answer}
        callback={checkAnswer}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        questionNo={number + 1}
        totalQustions={TOTAL_QUESTIONS}
      /> */}
      <button className='next' onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
};

export default App;
