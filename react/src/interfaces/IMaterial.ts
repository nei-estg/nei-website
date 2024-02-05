import { ICurricularUnit } from "./ICurricularUnit";
import { IMaterialTag } from "./IMaterialTag";

export interface IMaterial {
  id?: number;
  name: string;
  file?: string;
  link?: string;
  tags: IMaterialTag[];
  curricularUnit: ICurricularUnit
}