import { AsyncUI } from './AsyncUI.js';

export const fetchAsyncUI = async (config) => {
  const { fetchConfig, mountElement, hydrateArgs } = config;

  const response = await fetch(...fetchConfig);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const json = await response.json();
  const mountWrapper = new AsyncUI({
    json,
    htmlElement: mountElement,
    hydrateArgs,
  });
  return mountWrapper;
};
