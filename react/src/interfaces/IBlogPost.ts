import { IBlogImage } from "./IBlogImage";
import { IBlogTopic } from "./IBlogTopic";
import { IUser } from "./IUser";

export interface IBogPost {
  id?: number;
  title: string;
  description: string;
  content: string,
  author: IUser,
  images: IBlogImage[],
  topics: IBlogTopic[],
  date?: Date
}