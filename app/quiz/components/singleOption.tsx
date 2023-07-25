import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Options } from "@/lib/types";
import { ChangeEvent, FormEvent, MouseEventHandler, Ref, RefAttributes, useRef, useState } from "react";

interface ISingleOption {
    question: string;
    options: Options[];
    handleScore(type: string, isCorrect: boolean): void; 
}

const SingleOption = ({question, options, handleScore}: ISingleOption) => {

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [numOfSubmit, setNumOfSubmit] = useState(0);

    const handleSubmit = () => {
        const isCorrect= options.findIndex((option) => option.value === selectedAnswer && option.correct === true);
        if (isCorrect !== -1) {
            handleScore('singleOption', true);
        } else {
            handleScore('singleOption', false);
        }
        setNumOfSubmit((prev) => prev + 1);
    }

    const handleRadioGroupOnChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        setSelectedAnswer(target.value);
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div>{question}</div>
            <RadioGroup defaultValue="10" onClick={handleRadioGroupOnChange}>
                <div className="grid grid-cols-2 gap-2">
                    {options?.map((option) => {
                        return (
                            <div key={option.label} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={option.label} />
                                <Label htmlFor={option.label}>{option.value}</Label>
                            </div>
                        )
                    })}
                </div>
            </RadioGroup>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}

export default SingleOption;
