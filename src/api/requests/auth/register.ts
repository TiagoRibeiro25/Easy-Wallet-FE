import api from '@/api/axios.config';
import { type IAPIResponse } from '@/api/types';
import { type IUser } from '@/types';
import { type AxiosResponse } from 'axios';

interface IResponse extends IAPIResponse {
  data: {
    id: number;
    email: string;
    display_name: string;
    user_verified: boolean;
    currency: string;
    created_at: string;
  };
}

export interface IRegisterUserData extends IAPIResponse {
  data: IUser;
}

export default async (
  email: string,
  displayName: string,
  password: string,
): Promise<IRegisterUserData> => {
  const response: AxiosResponse<IResponse> = await api.post('/auth/register', {
    email,
    display_name: displayName,
    password,
  });

  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: {
      id: data.data?.id,
      email: data.data?.email,
      displayName: data.data?.display_name,
      userVerified: data.data?.user_verified,
      currency: data.data?.currency,
      createdAt: data.data?.created_at,
    },
  };
};
