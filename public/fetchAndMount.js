import { Mount } from './Mount.js';

export const fetchAndMount = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const json = await response.json();
  const mountWrapper = new Mount(json);
  return mountWrapper;
}