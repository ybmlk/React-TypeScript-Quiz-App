import React, { FC } from 'react';
import { AnswerObject } from '../App';
import styles from './QuestionCard.module.css';

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
}) => {
  // const btnClassName =

  return (
    <div className={styles.container}>
      <p className='number'>
          Qustion: {questionNo} / {totalQustions}
        </p>
      <div className={styles.questionBoard}>
      <p dangerouslySetInnerHTML={{ __html: question }} />
        
      </div>

      <div>
        {answers.map((answer) => {
          let btnClass = styles.clicked;
          if (userAnswer?.correctAnswer === answer) {
            btnClass = styles.right;
          }
          if (userAnswer?.answer === answer && !userAnswer.correct) {
            btnClass = styles.wrong;
          }
          return (
            <div className={styles.btn} key={answer}>
              <button
                className={btnClass}
                disabled={!!userAnswer}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
