import { fetchAsyncUI } from '../utils/fetchAsyncUI.js';

/**
 * Minimal orchestration for invoking the `fetchAsyncUI` function
 * and invoking the returned `asyncUI.asyncMount()`. as response to
 * a click event.
 *
 * @param {import('../../public/utils/fetchAsyncUI.d').FetchAsyncUIConfig} config
 * @returns {(event: MouseEvent) => void}
 */
function createMountAndExecuteHandler(config) {
  // `event` object from button onClick
  return function (event) {
    // returns a promise, so when resolved, `fetchAsyncUI` returns an instance of AsyncUI
    (async () => {
      try {
        const asyncUI = await fetchAsyncUI(config);
        // mounts the html, fetches the stylesheet and script, and calls the `hydrate()` method
        await asyncUI.asyncMount();
      } catch (error) {
        console.error('There was an error loading your module', error);
      }
    })();
  };
}

const firstButtonHandler = createMountAndExecuteHandler({
  fetchConfig: ['/api/example?title=First Title'],
  mountElement: document.getElementById('first'),
  hydrateArgs: [4, 3],
});

const secondButtonHandler = createMountAndExecuteHandler({
  fetchConfig: ['/api/example?title=Second Title'],
  mountElement: document.getElementById('second'),
  hydrateArgs: [7, 10, 23, 87],
});

document.getElementsByTagName('button')?.[0]?.addEventListener('click', firstButtonHandler);
document.getElementsByTagName('button')?.[1]?.addEventListener('click', secondButtonHandler);
