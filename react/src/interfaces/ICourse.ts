import { ICurricularUnit } from "./ICurricularUnit"

export interface ICourse {
  name: string,
  abbreviation: string
  curricularUnits: ICurricularUnit[]
}