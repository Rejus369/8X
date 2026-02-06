
export type QuestionType = 'text' | 'long-text' | 'number' | 'choice' | 'scale';

export interface Question {
  id: string;
  label: string;
  description?: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface Section {
  title: string;
  description?: string;
  questions: Question[];
}

export interface FormData {
  [key: string]: string | number;
}

export interface AIAnalysis {
  summary: string;
  identityAnalysis: string;
  energyArchetype: string;
  mortalityLens: string;
  financialBlueprint: string;
  nervousSystemInsight: string;
  routineAndEnergyHygiene: string;
  purposeAndPotential: string;
  recommendation: string;
}

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export interface Submission {
  id: string;
  timestamp: string;
  formData: FormData;
  analysis: AIAnalysis;
  syncStatus?: SyncStatus;
}

export interface AppSettings {
  googleWebhookUrl: string;
}
