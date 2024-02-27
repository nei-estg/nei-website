import { ICurricularUnit } from "./ICurricularUnit";
import { IUser } from "./IUser";

export interface IMentoring {
  id?: number,
  requestId?: number,
  mentor?: IUser,
  mentee?: IUser,
  curricularUnit?: ICurricularUnit,
  date?: Date,
}