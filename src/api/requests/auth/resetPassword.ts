import api from '@/api/axios.config';
import { type IAPIResponse } from '@/api/types';
import { type AxiosResponse } from 'axios';

export default async (reset_pw_token: string, new_password: string): Promise<IAPIResponse> => {
  const response: AxiosResponse<IAPIResponse> = await api.patch(
    `/auth/reset-password/${reset_pw_token}`,
    {
      new_password,
    },
  );

  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: null,
  };
};
