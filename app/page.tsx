'use client'
import { Button } from '@/components/ui/button';
import { ChangeEvent, useRef } from 'react';
import { useAtom } from 'jotai'
import { JsonQuizAtom } from '@/lib/atoms';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { validate } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast"


export default function Home() {

  const [json, setJson] = useAtom(JsonQuizAtom);
  const { toast } = useToast()
  const router = useRouter();
  
  const handleSubmit = () => {
    router.push('/quiz');
  }

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      const file = e.target.files[0];
      fileReader.onloadend = () => {
        const data = fileReader.result as string; 
        const res = JSON.parse(data);
        const ans = validate(res);
        
        if (ans?.status === 'ok') {
          setJson(JSON.parse(data));
        } else {
          toast({
            variant: "destructive",
            title: "JSON file error",
            description: ans?.message,
          })
        }
      }
      fileReader.readAsText(file);
    }
    
  }
  
  return (
    <main className="flex flex-col items-center p-24 gap-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Lets Start
      </h1>
      <div className='flex flex-col justify-center gap-3 w-[600px] h-[450px] bg-white rounded-lg shadow-2xl p-6'>
        <div className="grid w-full items-center gap-1.5">
          <Input id="picture" type="file" accept="application/JSON" onChange={handleInputFile} />
        </div>
        <Button variant={"secondary"} onClick={handleSubmit}>submit</Button>
      </div>
    </main>
  )
}
