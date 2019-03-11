import tmpl from './template.js';

// We define an ES6 class that extends HTMLElement
class BoObjectMergeElement extends HTMLElement {
  static get observedAttributes() {
    //return ['obj1', 'obj2'];
  }

  /**
   * The element's constructor is run anytime a new instance is created.
   * Instances are created either by parsing HTML, calling
   * document.createElement('bo-string-concat'), or calling new BoStringConcatElement();
   * Useful for initializing state, settings up event listeners, or creating shadow dom.
   */
  constructor() {
    super();

    //    if (!this.hasAttribute('string1')) this.setAttribute('string1', '');

    //    if (!this.hasAttribute('string2')) this.setAttribute('string2', '');

    if (!this.obj1) this.obj1 = {};
    if (!this.obj2) this.obj2 = {};

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

    // We can query the shadow root for internal elements
    this._obj1 = this.shadowRoot.querySelector('#obj1');
    this._obj2 = this.shadowRoot.querySelector('#obj2');
    this._result = this.shadowRoot.querySelector('#result');

    this.addEventListener('change', this._onObjChange.bind(this));
  }

  _onObjChange() {
    this._render();
  }

  /**
   * `connectedCallback()` fires when the element is inserted into the DOM.
   * Useful for running setup code, such as fetching resources or rendering.
   * Generally, you should try to delay work until this time.
   */
  connectedCallback() {
    this._upgradeProperty('obj1');
    this._upgradeProperty('obj2');

    this._render();
  }

  _render() {
    this._renderObj1();
    this._renderObj2();

    this._computeResult();
  }

  _renderObj1() {
    this._obj1.innerHTML = JSON.stringify(this.obj1);
  }

  _renderObj2() {
    this._obj2.innerHTML = JSON.stringify(this.obj2);
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  /**
   * `attributeChangedCallback()` is called when an observed attribute has been
   * added, removed, updated, or replaced. Also called for initial values when
   * an element is created by the parser, or upgraded.
   * Note: only attributes listed in the observedAttributes property will
   * receive this callback.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    //this._updateResult();
  }

  _computeResult() {
    this.result = this._mergeObject(this.obj1, this.obj2);
    this._result.innerHTML = JSON.stringify(this.result);
    this.dispatchEvent(
      new CustomEvent('compute', {
        detail: {
          result: this.result
        },
        bubbles: true
      })
    );
  }

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
customElements.define('bo-obj-merge', BoObjectMergeElement);
