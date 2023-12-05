import api from '@/api/axios.config';
import { type IAPIResponse } from '@/api/types';
import { type AxiosResponse } from 'axios';

export default async (email: string): Promise<IAPIResponse> => {
  const response: AxiosResponse<IAPIResponse> = await api.post('/auth/forgot-password', {
    email,
  });

  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: null,
  };
};
