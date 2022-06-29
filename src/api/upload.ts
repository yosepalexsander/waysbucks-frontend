import { instance } from '@/lib/axios';
import type { PostImageResponse } from '@/types';

export const upload = async (data: object) => {
  try {
    const {
      data: { payload },
    } = await instance.post<PostImageResponse>('/upload', data);

    return payload;
  } catch (error) {
    throw error;
  }
};

export const uploadAvatar = async (data: object) => {
  try {
    const {
      data: { payload },
    } = await instance.post<PostImageResponse>('/upload/avatar', data);

    return payload;
  } catch (error) {
    throw error;
  }
};
