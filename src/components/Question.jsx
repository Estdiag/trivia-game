import PropTypes from 'prop-types';
import Button from './Button';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';

export default function Question({ question, handleAnswer }) {
  const [resolved, setResolved] = useState(false);
  const unorderedAnswerOptions = useMemo(
    () =>
      [...question.incorrect_answers, question.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    [question.incorrect_answers, question.correct_answer]
  );

  useEffect(() => {
    setResolved(false);
  }, [question]);

  const validateAnswer = selectedAnswer => {
    setResolved(true);
    if (selectedAnswer === question.correct_answer) {
      handleAnswer('right');
    } else {
      handleAnswer('wrong');
    }
  };

  return (
    <div className="flex flex-col items-center flex-wrap w-full gap-5 border border-violet-400 rounded-lg shadow-md p-5">
      <div className="flex w-full flex-col sm:flex-row justify-around">
      <p className="p-text">
          Difficulty:
          <span className="font-bold uppercase">{question.difficulty}</span>
        </p>
        <p className="p-text">
          Category:
          <span className="font-bold uppercase">{question.category}</span>
        </p>
      </div>

      <h3 className="text-pretty text-center text-xl font-medium uppercase">
        {question.question}
      </h3>

      <div className="flex gap-3 flex-wrap flex-col sm:flex-row">
        {unorderedAnswerOptions.map(answers => (
          <Button
            disabled={resolved}
            className={
              resolved
                ? `${
                    answers === question.correct_answer
                      ? 'btn-question-correct'
                      : 'btn-question-incorrect'
                  }`
                : 'btn-primary'
            }
            key={answers}
            onClick={() => {
              validateAnswer(answers);
            }}
          >
            {answers}
          </Button>
        ))}
      </div>
    </div>
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
  handleAnswer: PropTypes.func.isRequired,
};
