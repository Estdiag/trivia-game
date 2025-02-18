import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/Button';
import Question from '../components/Question';
import Modal from '../components/Modal';
import Filters from '../components/Filters';
import { categories, type, difficulty } from '../types/gameFilters';
import getRandomKey from '../util/getRandomKey';
import fetchData from '../util/getQuestions';
import Loading from '../components/Loading';

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

  const { data, isLoading, error, refetch } = useQuery({
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
    [data?.results, currentQuestion, revealAnswer]
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
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">An error has occurred</p>;
  }

  if (data?.results.length === 0 || !data) {
    return (
      <div className="custom-container">
        <div className="custom-sidebar ">
          <Filters
            onChange={onChangeHandler}
            values={filter}
            onClick={handleButtonClick}
          />
        </div>
        <div className="custom-content">
          <p className="text-3xl font-semibold">No results found</p>
          <p className="text-xl text-gray-400">
            Try adjusting the filters and search again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-container">
      <div className="custom-sidebar ">
        <Filters
          onChange={onChangeHandler}
          values={filter}
          onClick={handleButtonClick}
        />
      </div>
      <div className="custom-content">
        <div className="flex flex-wrap gap-5 justify-center md:justify-around md:w-full">
          <p className="p-text">
            Incorrect Answers:
            <span className="font-bold uppercase">
              {answers.incorrectAnswers}
            </span>
          </p>
          <p className="p-text">
            Correct Answers:
            <span className="font-bold uppercase">
              {answers.correctAnswers}
            </span>
          </p>
          <p className="p-text">
            Burned Question:
            <span className="font-bold uppercase">
              {answers.burnedQuestion}
            </span>
          </p>
        </div>
        <Question
          question={data?.results[currentQuestion]}
          handleAnswer={handleAnswer}
        />
        <div className="flex w-full justify-end gap-5 flex-wrap">
          <Button onClick={() => handleRevealAnswer()} className="btn-primary">
            REVEAL ANSWER
          </Button>
          <Button
            className="btn-primary"
            onClick={() => nextQuestionHandler()}
            disabled={
              !revealAnswer.show &&
              revealAnswer.question !== data?.results[currentQuestion].question
            }
          >
            NEXT QUESTION
          </Button>
        </div>

        {/* Si el modal no se usará con poca frecuencia, podríamos cargarlo de forma diferida con lazy, 
        aunque en este caso, dado que se utiliza con frecuencia, no es necesario. */}
        {revealAnswer.show && (
          <Modal
            isOpen={revealAnswer}
            onClose={() => {
              setRevealAnswer({
                ...revealAnswer,
                show: false,
              });
            }}
          >
            <div className="flex flex-col gap-5 items-center">
              <h3 className="text-xl font-medium">Correct answers</h3>
              <p className="text-2xl font-medium text-green-600">
                {data?.results[currentQuestion].correct_answer}
              </p>

              <div className="flex gap-5">
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
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
