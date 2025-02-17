import PropTypes from 'prop-types';
import Button from './Button';
import { useMemo } from 'react';

export default function Question({ question, answerHandler }) {
  const unorderedAnswerOptions = useMemo(
    () =>
      [...question.incorrect_answers, question.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    [question.incorrect_answers, question.correct_answer]
  );

  const validateAnswer = selectedAnswer => {
    if (selectedAnswer === question.correct_answer) {
      answerHandler('right');
    } else {
      answerHandler('wrong');
    }
  };

  return (
    <>
      <div>
        <p>{question.difficulty}</p>
        <p>{question.category}</p>
      </div>

      <h3>{question.question}</h3>

      {unorderedAnswerOptions.map(answers => (
        <Button
          key={answers}
          onClick={() => {
            validateAnswer(answers);
          }}
        >
          {answers}
        </Button>
      ))}
    </>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string,
    difficulty: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.array,
  }).isRequired,
  answerHandler: PropTypes.func.isRequired,
};
