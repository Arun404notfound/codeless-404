
export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Problem {
  id: number;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  startingCode: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
}
