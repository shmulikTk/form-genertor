'use client'

import { useAtom } from 'jotai'
import { ScoreAtom } from '@/lib/atoms';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface IQuestionScore {
  questionNumber: number;
  score: number;
}

export default function Score() {

  const [score, setScore] = useAtom(ScoreAtom); 

    const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
      <div className='flex flex-col items-center w-[600px] h-[450px] bg-white rounded-lg shadow-2xl relative p-6'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            SCORE
        </h1>
        <div>{score}</div>
      </div>
      <Button onClick={() =>router.push('/')}>Home</Button>
    </main>
  )
}
