import { type IResponse } from '@/shared/interfaces';
import { unsplash } from '@/shared/lib/unsplash';

export async function getImages(): Promise<IResponse<Record<string, any>[]>> {
  try {
    const result = await unsplash.photos.getRandom({ collectionIds: ['317099'], count: 9 });
    if (result && result.response) {
      const images = result.response as Array<Record<string, any>>;
      return {
        data: images,
        error: null,
        successMessage: 'Images loaded'
      };
    }
    return {
      data: [],
      error: 'Failed to get images from unsplash!',
      successMessage: null
    };
  } catch (error) {
    return {
      data: [],
      error: 'Failed to get images from unsplash!',
      successMessage: null
    };
  }
}
