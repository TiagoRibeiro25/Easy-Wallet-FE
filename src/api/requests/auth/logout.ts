import api from '@/api/axios.config';
import { type IAPIResponse } from '@/api/types';
import { type AxiosResponse } from 'axios';

export default async (): Promise<IAPIResponse> => {
  const response: AxiosResponse<IAPIResponse> = await api.delete('/auth/logout');
  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: null,
  };
};
