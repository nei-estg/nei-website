import { ICourse } from "./ICourse";

export interface IProfile {
  id?: number;
  course?: ICourse[];
  year?: number;
  image?: string;
  discord?: string;
}