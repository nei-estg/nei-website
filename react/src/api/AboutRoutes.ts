import client from './Client';
import { IFAQ } from '@src/interfaces/IFAQ';

export const getFAQ = async () => {
  try {
    const response = await client.get('/api/faq/');
    if (response.status !== 200) throw new Error();
    return response.data as IFAQ[];
  } catch (error) {
    throw new Error("There was an error fetching the FAQ.");
  }
}
