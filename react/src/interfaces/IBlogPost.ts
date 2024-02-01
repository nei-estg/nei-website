import { IBlogImage } from "./IBlogImage";
import { IBlogTopic } from "./IBlogTopic";

export interface IBogPost {
  id?: number;
  title: string;
  description: string;
  content: string,
  author: string, //TO DO: Create user interface and replace string with IUser
  images: IBlogImage[],
  topics: IBlogTopic[]
}