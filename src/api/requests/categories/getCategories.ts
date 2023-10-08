import { type IAPIResponse } from '@/api/types';
import { type AxiosResponse } from 'axios';
import { type ICategory } from '../../../types';
import api from '../../axios.config';

interface IResponse extends IAPIResponse {
  data: ICategory[];
}

export interface IGetCategoriesData extends IAPIResponse {
  data: ICategory[];
}

export default async (): Promise<IGetCategoriesData> => {
  const response: AxiosResponse<IResponse> = await api.get('/v1/categories');
  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: data.data,
  };
};
