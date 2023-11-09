import api from '@/api/axios.config';
import { type IAPIResponse } from '@/api/types';
import type { AxiosResponse } from 'axios';

export interface IUpdateCategoryRequest {
  id: number;
  name: string;
  iconId: number;
}

export default async (props: IUpdateCategoryRequest): Promise<IAPIResponse> => {
  const { id, name, iconId } = props;
  const response: AxiosResponse<IAPIResponse> = await api.put(`/v1/categories/${id}`, {
    name,
    icon_id: iconId,
  });

  const data = response.data;

  return {
    success: data.success,
    message: data.message,
    data: null,
  };
};
