export interface FetchAsyncUIConfig {
  mountElement: HTMLElement;
  fetchConfig: Parameters<typeof fetch>;
  hydrateArgs: any[];
}
