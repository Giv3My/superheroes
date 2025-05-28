import { SERVER_URL } from '../config';

export const getFullImageSrc = (path?: string) => {
  if (!path) {
    return '';
  }

  return `${SERVER_URL}${path}`;
};
