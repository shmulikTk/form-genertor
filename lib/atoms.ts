import { atom } from 'jotai';
import { JsonForm } from './types';

const JsonQuizAtom = atom<JsonForm[]>([]);
const ScoreAtom = atom<number>(0);

export { JsonQuizAtom, ScoreAtom }
