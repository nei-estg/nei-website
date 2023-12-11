import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const loginUser = async (username: string, password: string) => {
  try {
    const base64Credentials = btoa(`${username}:${password}`);
    const response = await client.post(
      '/api/auth/login/',
      {},
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('expiry', response.data.expiry);
    return "";
  } catch (error) {
    return error;
  }
};
