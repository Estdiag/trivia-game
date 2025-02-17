import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/Button';
import Question from '../components/Question';
import Modal from '../components/Modal';
import Filters from '../components/Filters';
import { categories, type, difficulty } from '../types/gameFilters';
import getRandomKey from '../util/getRandomKey';
import fetchData from '../util/getQuestions';

const initialRevealAnswer = {
  question: '',
  show: false,
};

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
    burnedQuestion: 0,
  });

  const [revealAnswer, setRevealAnswer] = useState(initialRevealAnswer);
  const [filter, setFilter] = useState(() => ({
    difficulty: getRandomKey(difficulty),
    type: getRandomKey(type),
    category: getRandomKey(categories),
  }));

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchData(filter),
    enabled: true,
  });

  const handleAnswer = useCallback(
    type => {
      if (revealAnswer.question !== data?.results[currentQuestion].question) {
        setAnswers(prev => ({
          ...prev,
          correctAnswers:
            type === 'right' ? prev.correctAnswers + 1 : prev.correctAnswers,
          incorrectAnswers:
            type === 'wrong'
              ? prev.incorrectAnswers + 1
              : prev.incorrectAnswers,
        }));
      }
      setRevealAnswer({
        question: data?.results[currentQuestion].question,
        show: false,
      });
    },
    [data?.results, currentQuestion,  revealAnswer]
  );

  const handleRevealAnswer = () => {
    if (revealAnswer.question !== data?.results[currentQuestion].question) {
      setAnswers({ ...answers, burnedQuestion: answers.burnedQuestion + 1 });
    }
    setRevealAnswer({
      question: data?.results[currentQuestion].question,
      show: true,
    });
  };

  const nextQuestionHandler = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const onChangeHandler = event => {
    const { name, value } = event.target;

    setFilter({ ...filter, [name]: value });
  };

  const handleButtonClick = () => {
    refetch();
  };

  if (isLoading) {
    return <p>Cargando</p>;
  }

  if (error) {
    return <p>ha ocurrido un error</p>;
  }

  if (data?.results.length === 0 || !data) {
    return (
      <>
        <p>no hay preguntas</p>
        <Filters onChange={onChangeHandler} values={filter} />
        <Button onClick={() => handleButtonClick()}>Consultar</Button>
      </>
    );
  }

  return (
    <>
      <Filters onChange={onChangeHandler} values={filter} />
      <Button onClick={() => handleButtonClick()}>Consultar</Button>
      <p>Respuestas incorrectas: {answers.incorrectAnswers}</p>
      <p>Respuestas correctas: {answers.correctAnswers}</p>
      <p>Preguntas quemadas: {answers.burnedQuestion}</p>
      <Question
        question={data?.results[currentQuestion]}
        handleAnswer={handleAnswer}
      />

      <Button onClick={() => handleRevealAnswer()}>REVEAL ANSWER</Button>
      <Button
        onClick={() => nextQuestionHandler()}
        disabled={
          !revealAnswer.show &&
          revealAnswer.question !== data?.results[currentQuestion].question
        }
      >
        NEXT QUESTION
      </Button>

      {/* Si el modal no se usara con frecuencia lo podriamos llamar con lazy, aunque es innecesario en este caso que se usa con frecuencia */}
      {revealAnswer.show && (
        <Modal isOpen={revealAnswer}>
          <p>La respuesta a esta pregunta es:</p>
          <p>{data?.results[currentQuestion].correct_answer}</p>
          <>
            <Button
              onClick={() =>
                setRevealAnswer({
                  ...revealAnswer,
                  show: false,
                })
              }
            >
              VIEW QUESTION
            </Button>
            <Button
              onClick={() => {
                nextQuestionHandler();
                setRevealAnswer(initialRevealAnswer);
              }}
            >
              NEXT QUESTION
            </Button>
          </>
        </Modal>
      )}
    </>
  );
}
