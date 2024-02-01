import { ICurricularUnit } from "./ICurricularUnit";

export interface ICalendar {
  id?: number,
  name: string,
  date: Date,
  description: string,
  curricular_unit?: ICurricularUnit
  place?: string
}