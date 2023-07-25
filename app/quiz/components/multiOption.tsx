import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Options } from "@/lib/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";

interface IMultiOption {
    question: string;
    options: Options[] | undefined;
    handleScore(correct: 'false' | 'true' | 'half'): void; 
}

const MultiOption = ({question, options, handleScore}: IMultiOption) => {
    
    const [selectedItems, setSelectedItems] = useState<Options[]>([]);

    const handleSubmit = () => {
        let answersCorrect = 0;
        selectedItems.forEach(item => {
            if (item.correct){
                answersCorrect = answersCorrect += 1;
            }
        })
        if (answersCorrect === 0) {
            handleScore('false');
        } else if (answersCorrect === 1 ) {
            handleScore('half');
        } else {
            handleScore('true');
        }
    }

    const handleSelectedCheckbox = (isChecked: CheckedState, value: Options) => {
        if (isChecked){
            const items = [...selectedItems, value];
            setSelectedItems(items);
        } else {
            const items = selectedItems.filter(item => item.label !== value.label);
            setSelectedItems(items);
        }
        
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div>{question}</div>
            <div className="grid grid-cols-2 gap-2">
                {options?.map((option) => {
                    return (
                        <div key={option.label} className="flex items-center space-x-2">
                            <Checkbox id={option.label} onCheckedChange={isChecked => handleSelectedCheckbox(isChecked, option)} />
                            <label
                                htmlFor={option.label} 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {option.value}
                            </label>
                        </div>
                    )
                })}
            </div>
            <Button onClick={handleSubmit}>submit</Button>
        </div>
    )
}



export default MultiOption;
