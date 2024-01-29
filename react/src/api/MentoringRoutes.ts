import axios, { AxiosError } from 'axios';

const client = axios.create({
  baseURL: 'http://localhost',
});

export const getMentoring = async () => {
  try {
    const response = await client.get('/api/mentoring/');
    return response;
  } catch (error) {
    return error;
  }
};
