'use client'

import { useAtom } from 'jotai'
import { JsonQuizAtom, ScoreAtom } from '@/lib/atoms';
import SingleOption from './components/singleOption';
import BooleanOption from './components/booleanOption';
import MultiOption from './components/multiOption';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { JsonForm, Options } from '@/lib/types';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface IQuestionScore {
  questionNumber: number;
  score: number;
  answered: boolean;
}

export default function Quiz() {


  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signIn?callbackUrl=/quiz')
    }
  })
  
  const router = useRouter();
  const [json, setJson] = useAtom(JsonQuizAtom); 
  const [score, setScore] = useAtom(ScoreAtom); 
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionScore, setQuestionScore] = useState<IQuestionScore[]>([]); 

  useEffect(() => {
    if (json.length === 0) router.push('/');
    const array = Array.apply(null, Array(json.length)).map(function (x, i) { return {questionNumber: i, score: 0, answered: false}; })
    setQuestionScore(array);
  }, [json]);

  useEffect(() => {
    const sum = questionScore.reduce((accumulator, object) => {
      return accumulator + object.score;
    }, 0);
    setScore(Math.floor(sum));
  }, [questionScore]);

  const OptionsMapped = (item: JsonForm) => {
    if (item?.type === 'singleOption') {
      return <SingleOption handleScore={handleScore} question={item.question} options={item.options as Options[]}/>
    }
    if (item?.type === 'boolean') {
      return <BooleanOption handleScore={handleScore} question={item.question} />
    }
    if (item?.type === 'multiOption') {
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
        qs[obj] = { ...questionScore[obj], score: p, answered: true };
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
      qs[obj] = { ...questionScore[obj], score: p, answered: true };
      setQuestionScore(qs);
    }
  }

  const handleDone = async () => {
    const postScore = await fetch('http://localhost:3004/scores', {
      method: 'POST',
      body: JSON.stringify({ user: session?.user?.name, score }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = postScore.json();
    res.then((data) => {
      router.push('/score');
    }).catch((error) => {
      console.log({error});
    })    
  }
  
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-10">
      <div className='flex flex-row gap-2'>
        {questionScore.map((item, index) => {
          return (
            <div key={index} className='flex flex-row items-center gap-2'>
              <div onClick={() => setQuestionNumber(index)} className={`cursor-pointer h-6 w-6 border-[1px] border-black rounded-md flex flex-row items-center justify-center ${item.answered ? (index === questionNumber ? 'bg-green-700' : 'bg-green-400') : (index === questionNumber ? 'bg-slate-700' : 'bg-slate-400')}`}>{index + 1}</div>
              <div></div>
            </div>
          )
        })}
      </div>
      <div className='flex flex-col items-center w-[600px] h-[450px] bg-white rounded-lg shadow-2xl relative p-6'>
        {OptionsMapped(json[questionNumber])}
         {/* <Button className='absolute left-[-20px] top-[225px] rounded-full' onClick={() => setQuestionNumber((prev) => prev - 1)} disabled={questionNumber === 0}>{'<'}</Button>
         <Button className='absolute right-[-20px] top-[225px] rounded-full' onClick={() => setQuestionNumber((prev) => prev + 1)} disabled={questionNumber === json.length - 1}>{'>'}</Button> */}
      </div>
      <Button variant={"secondary"} onClick={handleDone}>Done</Button>
    </main>
  )
}
