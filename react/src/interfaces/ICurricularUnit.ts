import { ICourse } from "./ICourse";

export interface ICurricularUnit {
  id?: number;
  name: string;
  abbreviation: string;
  year: number;
  course: ICourse[] | number[]; //TODO: Fix django so it allows ICourse[] only
}