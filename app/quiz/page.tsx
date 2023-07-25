'use client'

import { useAtom } from 'jotai'
import { JsonQuizAtom, ScoreAtom } from '@/lib/atoms';
import SingleOption from './components/singleOption';
import BooleanOption from './components/booleanOption';
import MultiOption from './components/multiOption';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { JsonForm, Options } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface IQuestionScore {
  questionNumber: number;
  score: number;
}

export default function Quiz() {

  const router = useRouter();
  const [json, setJson] = useAtom(JsonQuizAtom); 
  const [score, setScore] = useAtom(ScoreAtom); 
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionScore, setQuestionScore] = useState<IQuestionScore[]>([]); 

  useEffect(() => {
    const array = Array.apply(null, Array(json.length)).map(function (x, i) { return {questionNumber: i, score: 0}; })
    setQuestionScore(array);
  }, [json]);

  useEffect(() => {
    const sum = questionScore.reduce((accumulator, object) => {
      return accumulator + object.score;
    }, 0);
    setScore(sum);
  }, [questionScore]);

  const OptionsMapped = (item: JsonForm) => {
    if (item.type === 'singleOption') {
      return <SingleOption handleScore={handleScore} question={item.question} options={item.options as Options[]}/>
    }
    if (item.type === 'boolean') {
      return <BooleanOption handleScore={handleScore} question={item.question} answer={item.answer}/>
    }
    if (item.type === 'multiOption') {
      return <MultiOption handleScore={handleMultiOptionScore} question={item.question} options={item.options}/>
    }
  }

  const handleScore = (type: string, isCorrect: boolean) => {
    const numberOfQuestions = json.length;
    const point = 100 / numberOfQuestions;
    const qs = [...questionScore];
    if (type === 'singleOption' || type === 'boolean') {
      let obj = questionScore?.findIndex((o) => { 
        return o.questionNumber === questionNumber 
      });  
      if (obj !== -1) {
        let p = 0;
        if (isCorrect) {
          p = point
        }
        qs[obj] = { ...questionScore[obj], score: p };
        setQuestionScore(qs);
      }
    }
  }

  const handleMultiOptionScore = (correct: 'false' | 'true' | 'half') => {
    const numberOfQuestions = json.length;
    const point = 100 / numberOfQuestions;
    const qs = [...questionScore];
    let obj = questionScore?.findIndex((o) => { 
      return o.questionNumber === questionNumber 
    });  
    if (obj !== -1) {
      let p = 0;
      if (correct === 'true') {
        p = point
      } else if (correct === 'half') {
        p = point / 2; 
      }
      qs[obj] = { ...questionScore[obj], score: p };
      setQuestionScore(qs);
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
      <div className='flex flex-col items-center w-[600px] h-[450px] bg-white rounded-lg shadow-2xl relative p-6'>
        {OptionsMapped(json[questionNumber])}
         <Button className='absolute left-[-20px] top-[225px] rounded-full' onClick={() => setQuestionNumber((prev) => prev - 1)} disabled={questionNumber === 0}>{'<'}</Button>
         <Button className='absolute right-[-20px] top-[225px] rounded-full' onClick={() => setQuestionNumber((prev) => prev + 1)} disabled={questionNumber === json.length - 1}>{'>'}</Button>
      </div>
      <Button onClick={() =>router.push('/score')}>Done</Button>
    </main>
  )
}
