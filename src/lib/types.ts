export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  rating: number;
  reviews: number;
  lastMessage?: string;
};

export type Skill = {
  name: string;
  category: string;
  teachers: number;
  learners: number;
};
