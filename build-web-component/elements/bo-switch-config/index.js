import tmpl from './template.js';
import '../bo-expanded-select/index';

// We define an ES6 class that extends HTMLElement
class BoSwitchConfig extends HTMLElement {
  static get observedAttributes() {
    return ['from', 'to'];
  }

  /**
   * The element's constructor is run anytime a new instance is created.
   * Instances are created either by parsing HTML, calling
   * document.createElement('bo-string-concat'), or calling new BoStringConcatElement();
   * Useful for initializing state, settings up event listeners, or creating shadow dom.
   */
  constructor() {
    super();

    if (!this.from) this.from = {};
    if (!this.to) this.to = {};

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

    // We can query the shadow root for internal elements
    this._from = this.shadowRoot.querySelector('#from-properties');
    this._to = this.shadowRoot.querySelector('#to-properties');
    this._result = this.shadowRoot.querySelector('#debug');
  }

  /**
   * `connectedCallback()` fires when the element is inserted into the DOM.
   * Useful for running setup code, such as fetching resources or rendering.
   * Generally, you should try to delay work until this time.
   */
  connectedCallback() {}

  /**
   * `attributeChangedCallback()` is called when an observed attribute has been
   * added, removed, updated, or replaced. Also called for initial values when
   * an element is created by the parser, or upgraded.
   * Note: only attributes listed in the observedAttributes property will
   * receive this callback.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name == 'from') this._renderfrom();
      if (name == 'to') this._renderto();

      this._renderResult();
    }
  }

  _renderfrom() {
    let labels = Object.keys(this.from).map(
      k =>
        `<div>
            <span class="property-label">${this.from[k].label}:</span>
            <span class="property-value">${this.from[k].value}</span>   
      </div>`
    );

    this._from.innerHTML = labels.join('');
  }

  _renderto() {
    let content = Object.keys(this.to).map(
      keyTo =>
        `<bo-expanded-select selected='${keyTo}'>
           <div slot="label"><b>${this.to[keyTo].label}</b></div>
           <bo-expanded-select-option id='' value='${
             this.to[keyTo].value
           }'></bo-expanded-select-option>` +
        Object.keys(this.from)
          .map(
            keyFrom =>
              `<bo-expanded-select-option id='${keyFrom}' value='${this.from[keyFrom].value}'>
            ${this.from[keyFrom].label}
            </bo-expanded-select-option>`
          )
          .join('') +
        `</bo-expanded-select>`
    );

    this._to.innerHTML = content.join('');
  }

  _renderResult() {
    this.result = this._mergeObject(this.from, this.to);
    this._result.innerHTML = JSON.stringify(this.result, null, '\n');
  }

  get from() {
    //TODO: try/catch to avoid parsing object in json when attribute is not yet evaluated by AngularJS
    try {
      return JSON.parse(this.getAttribute('from'));
    } catch {
      return {};
    }
  }

  set from(value) {
    this.setAttribute('from', JSON.stringify(value));
  }

  get to() {
    return JSON.parse(this.getAttribute('to'));
  }

  set to(value) {
    this.setAttribute('to', JSON.stringify(value));
  }

  /*get result() {
    return JSON.parse(this.getAttribute('result'));
  }

  set result(value) {
    this.setAttribute('result', JSON.stringify(value));
  }*/

  _mergeObject(a, b) {
    return Object.assign({}, a, b);
  }

  /**
   * `disconnectedCallback()` fires when the element is removed from the DOM.
   * It's a good place to do clean up work like releasing references and
   * removing event listeners.
   */
  disconnectedCallback() {}
}

// This is where the actual element is defined for use in the DOM
customElements.define('bo-switch-config', BoSwitchConfig);
