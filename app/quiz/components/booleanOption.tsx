import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Options } from "@/lib/types";
import { useState } from "react";

interface IBooleanOption {
    question: string;
    answer: boolean;
    handleScore(type: string, isCorrect: boolean): void; 
}

const BooleanOption = ({question, answer, handleScore}: IBooleanOption) => {

    const [selected, setSelected] = useState('');
    const [numOfSubmit, setNumOfSubmit] = useState(0);


    const handleSubmit = () => {
        
        if (selected === 'true') {
            handleScore('boolean', true);
        } else {
            handleScore('boolean', false);
        }
        setNumOfSubmit((prev) => prev + 1);
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div>{question}</div>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setSelected('true')}>True</Button>
                <Button onClick={() => setSelected('false')}>False</Button>
            </div>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}



export default BooleanOption;
