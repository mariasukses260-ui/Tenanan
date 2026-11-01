import { duelSets } from '../data/duelMode';

export type Role = 'duit semilyar' | 'urip kepenak' | 'Kamulyan jagad';

export interface Question {
  id: number;
  role: Role;
  text: string;
}

export interface PersonSet {
  person: string;
  sets: Question[][];
}

export interface FlatQuestion extends Question {
  globalIndex: number;
  person: string;
  setIndex: number;
}

const QUESTION_WORD_REWRITES: Array<[RegExp, string]> = [
  [/\bHak\b/gi, 'Wewenang'],
  [/\bHAK\b/g, 'WEWENANG'],
  [/\bhak\b/g, 'wewenang'],
  [/\bTanah\b/gi, 'Lahan'],
  [/\bTANAH\b/g, 'LAHAN'],
  [/\btanah\b/g, 'lahan'],
];

export function normalizeQuestionText(text: string): string {
  return QUESTION_WORD_REWRITES.reduce((result, [pattern, replacement]) => {
    return result.replace(pattern, replacement);
  }, text);
}

export function getQuestionsForPerson(person: string): FlatQuestion[] {
  const personQuestions = duelSets.find((entry) => entry.person === person);
  if (!personQuestions) return [];

  const flat: FlatQuestion[] = [];
  let globalIndex = 0;

  personQuestions.sets.forEach((set, setIndex) => {
    set.forEach((question) => {
      flat.push({
        ...question,
        text: normalizeQuestionText(question.text),
        globalIndex: globalIndex++,
        person,
        setIndex,
      });
    });
  });

  return flat;
}

export function getAllQuestions(): FlatQuestion[] {
  const flat: FlatQuestion[] = [];
  let globalIndex = 0;

  duelSets.forEach((personSet) => {
    personSet.sets.forEach((set, setIndex) => {
      set.forEach((question) => {
        flat.push({
          ...question,
          text: normalizeQuestionText(question.text),
          globalIndex: globalIndex++,
          person: personSet.person,
          setIndex,
        });
      });
    });
  });

  return flat;
}

export const allPersonSets: PersonSet[] = duelSets;
