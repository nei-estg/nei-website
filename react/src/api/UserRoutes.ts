import client from './Client';
import { AxiosError } from 'axios';

import { ILogin } from './utils/ILogin';
import { IRegister } from './utils/IRegister';

export const loginUser = async (login : ILogin) => {
  try {
    const base64Credentials = btoa(`${login.username}:${login.password}`);
    const response = await client.post(
      '/api/auth/login/',
      {},
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );
    if (response.status === 200) {
      if (response.data.token && response.data.expiry) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiry', response.data.expiry);
        return "";
      }
    }
    return "Invalid credentials";
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status === 401) {
          return "Invalid credentials";
        }
      }
    }
    return "Something went wrong";
  }
};

export const registerUser = async (register : IRegister) => {
  try {
    const response = await client.post('/api/user/', register);
    return response;
  } catch (error) {
    return error;
  }
};
