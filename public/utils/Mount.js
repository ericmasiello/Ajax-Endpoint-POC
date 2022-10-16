export class Mount {
  constructor(json) {
    this.json = json;
  }
  mount(htmlElement) {
    htmlElement.innerHTML = this.json.html;
    return this;
  }
  bootstrap(...args) {
    return new Promise((resolve, reject) => {
      const script = this.json.script;

      if (!script) {
        console.warn(`The endpoint does not provide a \`{ script: '...'}\` value.`)
        return resolve();
      }
  
      return import(script).then(module => {
        if (typeof module?.bootstrap === 'function') {
          return resolve(module.bootstrap(...args));
        }
        console.warn(`script resolved but lacked a named export \`export function bootstrap() {}\`.`)
        return resolve();
      }).catch(reject);
    });
  }
}