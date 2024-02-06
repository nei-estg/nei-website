import { IProfile } from "./IProfile";

export interface IUser {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  profilemodel?: IProfile;
}