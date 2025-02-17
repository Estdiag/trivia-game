/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from 'react';
import Button from '../components/Button';
import Question from '../components/Question';
import Modal from '../components/Modal';

import Filters from '../components/Filters';
import { categories, type, difficulty } from '../types/gameFilters';
import getRandomKey from '../util/getRandomKey';
// import useGetQuestions from '../hooks/useGetQuestions';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../util/getQuestions';

const initialRevealAnswer = {
  question: '',
  show: false,
};

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(false);

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
    // error,
    refetch,
  } = useQuery({
    queryKey: ['questions', filter],
    queryFn: fetchData,
    enabled: false,
  });

  useEffect(() => {
    console.log('se ejecutaaaaaa');

    refetch();
  }, [refetch]);

  const rightAnswerHandler = useCallback(() => {
    setAnswers(prev => ({ ...prev, correctAnswers: prev.correctAnswers + 1 }));

    setRevealAnswer({
      question: data?.results[currentQuestion].question,
      show: false,
    });
  }, [setAnswers, data?.results, currentQuestion, setRevealAnswer]);

  const wrongAnswerHandler = useCallback(() => {
    setAnswers(prev => ({
      ...prev,
      incorrectAnswers: prev.incorrectAnswers + 1,
    }));
    setRevealAnswer({
      question: data?.results[currentQuestion].question,
      show: false,
    });
  }, [setAnswers, data?.results, currentQuestion, setRevealAnswer]);

  const revealAnswerHandler = () => {
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
      <p>Respuestas incorrectas: {answers.incorrectAnswers}</p>
      <p>Respuestas correctas: {answers.correctAnswers}</p>
      <p>Preguntas quemadas: {answers.burnedQuestion}</p>
      <Question
        question={data?.results[currentQuestion]}
        rightAnswerHandler={rightAnswerHandler}
        wrongAnswerHandler={wrongAnswerHandler}
      />

      <Button onClick={() => revealAnswerHandler()}>REVEAL ANSWER</Button>
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
          <p>{data[currentQuestion].correct_answer}</p>
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
