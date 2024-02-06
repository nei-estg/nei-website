export interface IContact {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  open?: boolean;
}