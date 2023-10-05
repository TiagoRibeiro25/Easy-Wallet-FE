import api from '@/api/axios.config';
import { type IAPIResponse } from '@/api/types';
import type { AxiosResponse } from 'axios';

export default async (token: string): Promise<IAPIResponse> => {
  const response: AxiosResponse<IAPIResponse> = await api.patch(`/v1/user/verify/${token}`);

  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: null,
  };
};
