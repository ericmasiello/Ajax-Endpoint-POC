export class AsyncUI {
  constructor(config) {
    const { json, htmlElement, hydrateArgs = [] } = config;
    this.json = json;
    this.htmlElement = htmlElement;
    this.hydrateArgs = hydrateArgs;
  }
  asyncMount() {
    return new Promise((resolve, reject) => {
      const { html, script } = this.json;
      this.htmlElement.innerHTML = html;

      if (!script) {
        return resolve();
      }

      return import(script)
        .then((module) => {
          if (typeof module?.hydrate === 'function') {
            return resolve(module.hydrate(this.htmlElement)(...this.hydrateArgs));
          }
          console.warn(`script resolved but lacked a named export \`export function hydrate() {}\`.`);
          return resolve();
        })
        .catch(reject);
    });
  }
}
