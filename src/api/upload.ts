import { instance } from '@/lib/axios';
import type { PostImageResponse } from '@/types';

export const upload = async (data: object) => {
  try {
    const {
      data: { payload },
    } = await instance.post<PostImageResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}upload`, data);

    return payload;
  } catch (error) {
    throw error;
  }
};

export const uploadAvatar = async (data: object) => {
  try {
    const {
      data: { payload },
    } = await instance.post<PostImageResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}upload/avatar`, data);

    return payload;
  } catch (error) {
    throw error;
  }
};
