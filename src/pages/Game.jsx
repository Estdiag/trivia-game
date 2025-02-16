/* eslint-disable no-unused-vars */

import { useQuery } from '@tanstack/react-query';
import Questions from '../components/Questions';
import { useState } from 'react';

export default function Game() {
  const [currentQuestion, setCurrentQuestion]= useState(0)
  const {
    data: questions,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=10',
      )
      return await response.json()
    },
  });


  if(isLoading){
    return(
      <p>Cargando</p>
    )
  }

  return <Questions questions={questions.results} currentQuestion={currentQuestion}/>;
}
