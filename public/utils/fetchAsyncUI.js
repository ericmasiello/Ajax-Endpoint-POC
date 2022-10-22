// @ts-check

import { AsyncUI } from './AsyncUI.js';

/**
 * @typedef {Object} FetchAsyncUIConfig
 * @property {HTMLElement} mountElement
 * @property {Parameters<typeof fetch>} fetchConfig
 * @property {any[]} hydrateArgs
 */

/**
 * Fetches a resonse from
 * @param {FetchAsyncUIConfig} config - Configuration
 * @returns {Promise<AsyncUI>} A promise that resolves with an instance of an `AsyncUI`
 */
export async function fetchAsyncUI(config) {
  const { fetchConfig, mountElement, hydrateArgs } = config;

  const response = await fetch(...fetchConfig);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  /** @type {import('./APIJson.d').APIJson} */
  const json = await response.json();

  const mountWrapper = new AsyncUI({
    json,
    htmlElement: mountElement,
    hydrateArgs,
  });

  return mountWrapper;
}
