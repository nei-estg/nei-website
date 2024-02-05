import { ICurricularUnit } from "./ICurricularUnit";

export interface ICalendar {
  id?: number,
  name: string,
  startDate: Date,
  endDate: Date,
  description: string,
  curricularUnit?: ICurricularUnit
  place?: string,
  visible?: boolean
}