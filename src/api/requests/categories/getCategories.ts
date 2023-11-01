import { type IAPIResponse } from '@/api/types';
import { type AxiosResponse } from 'axios';
import { type ICategory } from '../../../types';
import api from '../../axios.config';

interface IResponse extends IAPIResponse {
  data: {
    id: number;
    name: string;
    icon_id: number;
    created_at: string;
    updated_at: string;
  }[];
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
    data: data.data.map(category => ({
      id: category.id,
      name: category.name,
      iconId: category.icon_id,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
    })),
  };
};
