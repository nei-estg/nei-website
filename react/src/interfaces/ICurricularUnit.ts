import { ICourse } from "./ICourse";

export interface ICurricularUnit {
  id?: number;
  name?: string;
  abbreviation?: string;
  year?: number;
  course?: ICourse[] | number[];
}