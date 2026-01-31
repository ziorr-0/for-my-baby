export type AppStep = 'intro' | 'questions' | 'proposal' | 'success';

export interface QuestionProps {
  onComplete: () => void;
}
