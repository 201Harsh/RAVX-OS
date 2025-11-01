export interface AIAgent {
  id: string;
  name: string;
  personality: string;
  tone: string;
  behaviors: string[];
  additionalSkills: string[];
  url: string;
  createdAt: Date;
}

export interface CreateAIAgentData {
  name: string;
  personality: string;
  tone: string;
  behaviors: string[];
  additionalSkills: string[];
}
