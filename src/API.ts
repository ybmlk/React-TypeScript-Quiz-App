import { shuffleArray } from './utils';

interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuestionState extends Question {
  answers: string[];
}

export interface AnswerObject {
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return data.results?.map((question: Question) => ({
    ...question,
    answers: shuffleArray([question.correct_answer, ...question.incorrect_answers]),
  }));
};
