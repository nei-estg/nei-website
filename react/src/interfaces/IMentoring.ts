import { ICurricularUnit } from "./ICurricularUnit";
import { IUser } from "./IUser";

export interface IMentoring {
  mentor?: IUser,
  mentee?: IUser,
  curricularUnit: ICurricularUnit,
  date?: Date,
}