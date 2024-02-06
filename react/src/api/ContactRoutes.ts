import client from "./Client";
import { IContact } from "@src/interfaces/IContact";

export const sendContact = async (contact: IContact) => {
  try {
    const response = await client.post('/api/contact/', contact);
    if (response.status !== 201) throw new Error();
    return response.data as IContact;
  } catch (error) {
    throw new Error("There was an error sending the contact.");
  }
}
