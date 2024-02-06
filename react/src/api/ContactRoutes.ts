import client from "./Client";
import { IContact } from "@src/interfaces/IContact";

export const sendContactForm = async (contact: IContact) => {
  const response = await client.post('/api/contact/', contact);
  if (response.status !== 201) throw new Error(response.data);
  return response.data as IContact;
}
