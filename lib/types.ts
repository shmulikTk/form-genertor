export interface Options {
  label: string;
  value: string;
  correct?: boolean;
}
export interface JsonForm {
  question: string;
  type: 'singleOption' | 'multiOption' | 'boolean';
  options?: Options[];
  answer: boolean;
}
