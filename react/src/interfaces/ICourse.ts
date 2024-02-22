import { ICurricularUnit } from "./ICurricularUnit"

export interface ICourse {
  id?: number,
  name: string,
  abbreviation: string
  curricularUnits: ICurricularUnit[]
}