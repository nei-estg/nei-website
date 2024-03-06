import { IProfile } from "./IProfile";

export interface IUser {
  id?: number;
  username: string;
  password?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  last_login?: Date,
  is_staff?: boolean,
  is_active?: boolean,
  date_joined?: Date,
  profilemodel?: IProfile;
}