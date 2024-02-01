import { IProfile } from "./IProfile";

export interface IRegister {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  profilemodel: IProfile;
}