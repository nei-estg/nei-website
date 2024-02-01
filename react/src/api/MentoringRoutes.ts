import AuthenticatedClient from './AuthenticatedClient';
import { IResponse } from '@src/interfaces/IResponse';
import { IMentoringRequest } from '@src/interfaces/IMentoringRequest';

export const getMentoring = async () => {
  try {
    const response = await AuthenticatedClient.get('/api/mentoring/');
    if (response.status !== 200) throw new Error();
    return response.data as IResponse<IMentoringRequest>;
  } catch (error) {
    throw new Error("There was an error fetching the mentoring.");
  }
};
