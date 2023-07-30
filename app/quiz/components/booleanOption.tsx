import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IBooleanOption {
    question: string;
    handleScore(type: string, isCorrect: boolean): void; 
}

const BooleanOption = ({question, handleScore}: IBooleanOption) => {

    const [selected, setSelected] = useState('');

    const handleSubmit = () => {
        if (selected === 'true') {
            handleScore('boolean', true);
        } else {
            handleScore('boolean', false);
        }
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div>{question}</div>
            <div className="grid grid-cols-2 gap-2">
                <Button disabled={selected === 'true'} className={`bg-green-600 hover:bg-green-500`} onClick={() => setSelected('true')}>True</Button>
                <Button disabled={selected === 'false'} className={`bg-red-600 hover:bg-red-500`} onClick={() => setSelected('false')}>False</Button>
            </div>
            <Button variant={"secondary"} onClick={handleSubmit}>submit</Button>
        </div>
    )
}



export default BooleanOption;
