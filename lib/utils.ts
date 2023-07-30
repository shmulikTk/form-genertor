import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validate(object: any) : {status: string, message: string} {
  const array = Object.values(object);
  let ans = { status: 'ok', message: 'keep with the good work'};
  if (Array.isArray(array) && !array.length) {
    ans = { status: 'not ok', message: 'check your file its not valid one'};
    return ans;
  } else {
    array.forEach((item: any, index) => {
      if (!item.hasOwnProperty('question')) {
        ans = { status: 'not ok', message:`at question ${index + 1} missing "question" property`};
        return;
      }
      if (!item.hasOwnProperty('type')) {
        ans = { status: 'not ok', message:`at question ${index + 1} missing "type" property`};
        return;
      } else if (item.type === 'singleOption' || item.type === 'singleOption'){
        if (!item.hasOwnProperty('options')) {
          ans = { status: 'not ok', message:`at question ${index + 1} missing "options" property`};
          return;
        } else {
          item.options.forEach((option: any) => {
            if (!option.hasOwnProperty('label')) {
              ans = { status: 'not ok', message:`at question ${index + 1} in "options" missing "label" property`};
              return;
            }
            if (!option.hasOwnProperty('value')) {
              ans = { status: 'not ok', message:`at question ${index + 1} in "options" missing "value" property`};
              return;
            }
          })
        }
      } else if (item.type === 'boolean') {
        if (!item.hasOwnProperty('answer')) {
          ans = { status: 'not ok', message:`at question ${index + 1} missing "answer" property`};
          return;
        }
      } 
    })
    return ans;
  }
}
