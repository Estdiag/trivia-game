/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import Question from './Question';
export default function Questions({ questions, currentQuestion }) {
  const [answers, setAnswers] = useState({correctAnswers: 0, incorrectAnswers: 0});
  const [burnedQuestion, setBurnedQuestion] = useState(0);

  return (
    <>
      <p>Respuestas correctas: {answers.correctAnswers}</p>
      <p>Respuestas incorrectas: {answers.incorrectAnswers}</p>
      <p>Respuestas quemadas: {burnedQuestion}</p>
      <Question question={questions[currentQuestion]}/>
    </>
  );
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      difficulty: PropTypes.string,
      category: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.array,
    })
  ).isRequired,
  currentQuestion: PropTypes.number
};
