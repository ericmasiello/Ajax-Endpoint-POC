// @ts-check
export class AsyncUI {
  /**
   * @param {import('./AsyncUI.d').AsyncUIConfig} config
   */
  constructor(config) {
    const { json, htmlElement, hydrateArgs = [] } = config;
    this.json = json;
    this.htmlElement = htmlElement;
    this.hydrateArgs = hydrateArgs;
  }
  /**
   * Function mounts the html into the `htmlElement`. It
   * will then fetch any stylesheet and script. The
   * stylesheet is added to the `<head />` provided
   * it was not already added via a previous request.
   *
   * The `script`, if present, is loaded via a dynamic `import()`.
   * Once the `script` is loaded, it checks to see if the `script`
   * exports a named export function `hydrate`. If present,
   * the `hydrate` function is invoked with the values specified
   * as the `hydrateArgs` via the `constructor`.
   *
   * @returns {Promise<void>}
   */
  asyncMount() {
    return new Promise((resolve, reject) => {
      const { html, script, stylesheet } = this.json;
      this.htmlElement.innerHTML = html;

      if (stylesheet) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylesheet;

        // only append if the stylesheet was not already appended
        if (!document.querySelector(`link[href="${stylesheet}"]`)) {
          document.head.append(link);
        }
      }

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
