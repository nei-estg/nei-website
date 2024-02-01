import { ICategory } from "./ICategory";

export interface IFAQ {
  id?: number;
  category: ICategory;
  question: string;
  answer: string;
}