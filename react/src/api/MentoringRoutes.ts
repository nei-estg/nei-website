import AuthenticatedClient from './AuthenticatedClient';
import { IMentoringRequest } from '@src/interfaces/IMentoringRequest';
import { IMentoring } from '@src/interfaces/IMentoring';

export const getMentoringRequestList = async () => {
  const response = await AuthenticatedClient.get('/api/mentoringRequest/');
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IMentoringRequest[];
};

export const createMentoringRequest = async (mentoringRequest: IMentoringRequest) => {
  const response = await AuthenticatedClient.post('/api/mentoringRequest/', mentoringRequest);
  if (response.status !== 201) throw new Error(response.data);
  return response.data as IMentoringRequest;
}

export const getMentoringList = async () => {
  const response = await AuthenticatedClient.get('/api/mentoring/');
  if (response.status !== 200) throw new Error(response.data);
  return response.data as IMentoring[];
}

export const createMentoring = async (mentoring: IMentoring) => {
  const response = await AuthenticatedClient.post('/api/mentoring/', mentoring);
  if (response.status !== 201) throw new Error(response.data);
  return response.data as IMentoring;
}

export const stopMentoring = async (mentoringId: number) => {
  const response = await AuthenticatedClient.delete(`/api/mentoring/${mentoringId}/`);
  if (response.status !== 204) throw new Error(response.data);
}
