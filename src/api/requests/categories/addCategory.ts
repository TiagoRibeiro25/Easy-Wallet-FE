import api from '@/api/axios.config';
import { type IAPIResponse } from '@/api/types';
import type { ICategory } from '@/types';
import type { AxiosResponse } from 'axios';

interface IResponse extends IAPIResponse {
  data: {
    id: number;
    name: string;
    icon_id: number;
    created_at: string;
    updated_at: string;
  };
}

export interface IAddCategoryData extends IAPIResponse {
  data: ICategory;
}

export default async (name: string, iconId: number): Promise<IAddCategoryData> => {
  const response: AxiosResponse<IResponse> = await api.post('/v1/categories', {
    name,
    icon_id: iconId,
  });

  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: {
      id: data.data?.id,
      name: data.data?.name,
      iconId: data.data?.icon_id,
      createdAt: data.data?.created_at,
      updatedAt: data.data?.updated_at,
    },
  };
};
