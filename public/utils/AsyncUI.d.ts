import { APIJson } from './APIJson';

export interface AsyncUIConfig {
  json: APIJson;
  htmlElement: HTMLElement;
  hydrateArgs: any[];
}
