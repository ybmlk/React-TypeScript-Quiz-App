import React, { FC } from 'react';
import { AnswerObject } from '../App';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQustions: number;
};

const QuestionCard: FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQustions,
}) => (
  <div>
    <p className='number'>
      Qustion: {questionNo} / {totalQustions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
