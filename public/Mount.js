export class Mount {
  constructor(json) {
    this.json = json;
  }
  mount(htmlElement) {
    return new Promise((resolve, reject) => {
      htmlElement.innerHTML = this.json.html;
      const scripts = [];

      for (const node of Array.from(htmlElement.childNodes)) {
        if (node.nodeName === 'SCRIPT') {
          scripts.push(node);
          htmlElement.removeChild(node);
        }
      }

      const fragment = document.createDocumentFragment();
      let scriptsLoaded = 0;
      const totalExternalScripts = scripts.length > 0
        ? scripts.reduce((acc, script) => {
          if (script.src) {
            return acc + 1;
          }
          return acc;
        }, 0)
        : 0;

      for(const element of scripts) {
        const data = ( element.text || element.textContent || element.innerHTML || '' );
        const script = document.createElement('script');
        script.type = element.type ? element.type : 'text/javascript';
        if (element.src) {
          script.src = element.src;
        }
        script.appendChild(document.createTextNode(data));
        
        /*
         * Only resolve the promise once all external scripts have loaded
         */
        script.addEventListener('load', () => {
          scriptsLoaded = scriptsLoaded + 1;

          if (scriptsLoaded === totalExternalScripts) {
            resolve(this);
          }
        });
        script.addEventListener('error', reject);
        fragment.append(script);
      }

      htmlElement.append(fragment);

      /*
       * If none of the scripts loaded are external scripts OR
       * there are no scripts at all, immediately resolve the 
       * promise.
       */
      if (totalExternalScripts < 1) {
        resolve(this);
      }
    });
  }
  bootstrap(...args) {
    /*
     * Wrap executed code in setTimeout to allow any <scirpt /> elements
     * that were just mounted to finish executing first before we attempt
     * to call the bootstrap logic.
     */
    setTimeout(() => {
      // if meta.uuid exists on response...
      if (window[this.json?.__meta?.uuid]) {
        // call boostrap method associated to data
        window[this.json?.__meta?.uuid]?.bootstrap(...args);
        // delete the field from the window after loading it.
        delete window[this.json?.__meta?.uuid];
      }
    });
  }
}