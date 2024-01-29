import AuthenticatedClient from './AuthenticatedClient';

export const getMentoring = async () => {
  try {
    const response = await AuthenticatedClient.get('/api/mentoring/');
    return response;
  } catch (error) {
    return error;
  }
};
