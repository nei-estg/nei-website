import { IBlogImage } from "./IBlogImage";
import { IBlogTopic } from "./IBlogTopic";
import { IUser } from "./IUser";

export interface IBlogPost {
  id?: number;
  slug: string;
  title: string;
  description: string;
  content: string,
  author: IUser,
  images: IBlogImage[],
  topics: IBlogTopic[],
  date: Date
}