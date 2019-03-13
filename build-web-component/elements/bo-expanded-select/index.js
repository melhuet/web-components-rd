import tmpl from './template.js';

//https://github.com/GoogleChromeLabs/howto-components/blob/master/elements/howto-accordion/howto-accordion.js
// We define an ES6 class that extends HTMLElement
class BoExpandedSelect extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  _renderfrom() {}

  _renderto() {}

  _renderResult() {}

  disconnectedCallback() {}
}

// This is where the actual element is defined for use in the DOM
customElements.define('bo-expanded-select', BoExpandedSelect);
