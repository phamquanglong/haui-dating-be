import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constant';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dorbkvmvo',
      api_key: '137883584159372',
      api_secret: 'CqorrZ4FfvAGbWd-RnUL8IOcWDc',
    });
  },
};
