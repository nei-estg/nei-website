//axios post para login
//axios post para atualizar dados do user
//axios logout
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const loginUser = async (data: FormData) => {
  return client.post('/api/auth/login/', data);
};
