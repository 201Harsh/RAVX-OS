export interface AIAgent {
  id: string;
  name: string;
  personality: string;
  tone: string;
  behaviors: string[];
  additionalSkills: string[];
  skills: string[];
  url: string;
  createdAt: Date;
  LastUsed: Date;
}

export interface CreateAIAgentData {
  name: string;
  personality: string;
  tone: string;
  behaviors: string[];
  skills: string[];
  LastUsed: Date;
}
