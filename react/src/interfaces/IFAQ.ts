export interface IFAQ {
  id?: number;
  category: {
    name: string;
  };
  question: string;
  answer: string;
}