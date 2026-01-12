
export type Level = 'primary' | 'middle' | 'high' | 'bac';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  subjectId: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ScoreEntry {
  id: string;
  subjectId: string;
  score: number;
  total: number;
  date: string;
}

export enum AppSection {
  HOME = 'HOME',
  AI_TOOLS = 'AI_TOOLS',
  COURSES = 'COURSES',
  EXERCISES = 'EXERCISES',
  SEARCH = 'SEARCH',
  ASSISTANT = 'ASSISTANT',
  PROGRESS = 'PROGRESS'
}
