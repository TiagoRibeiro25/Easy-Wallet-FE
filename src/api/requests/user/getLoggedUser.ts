import { type AxiosResponse } from 'axios';
import { type IUser } from '../../../types';
import api from '../../axios.config';

interface IResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    email: string;
    display_name: string;
    user_verified: boolean;
    currency: string;
    created_at: string;
  };
}

export interface IGetLoggedUserData {
  success: boolean;
  message: string;
  data: IUser;
}

export default async (): Promise<IGetLoggedUserData> => {
  const response: AxiosResponse<IResponse> = await api.get('/v1/user/me');
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
