'use client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react';
import { useAtom } from 'jotai'
import { JsonQuizAtom } from '@/lib/atoms';
import { useRouter } from 'next/navigation';

export default function Home() {

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [json, setJson] = useAtom(JsonQuizAtom);
  const router = useRouter();
  
  const handleSubmit = () => {
    if (textAreaRef.current) {
      setJson(JSON.parse(textAreaRef.current.value));
      router.push('/quiz')
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Form Generator
      </h1>
      <div className='w-full flex flex-col gap-3'>
        <Textarea ref={textAreaRef} className='h-60' />
        <Button onClick={handleSubmit}>submit</Button>
      </div>
    </main>
  )
}
