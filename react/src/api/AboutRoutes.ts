import client from './Client';
import { IFAQ } from '@src/interfaces/IFAQ';

export const getFAQ = async () => {
  const response = await client.get('/api/faq/');
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IFAQ[];
}
