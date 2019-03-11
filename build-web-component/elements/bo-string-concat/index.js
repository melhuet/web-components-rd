import tmpl from './template.js';

// We define an ES6 class that extends HTMLElement
class BoStringConcatElement extends HTMLElement {
  static get observedAttributes() {
    return ['string1', 'string2'];
  }

  /**
   * The element's constructor is run anytime a new instance is created.
   * Instances are created either by parsing HTML, calling
   * document.createElement('bo-string-concat'), or calling new BoStringConcatElement();
   * Useful for initializing state, settings up event listeners, or creating shadow dom.
   */
  constructor() {
    super();

    if (!this.hasAttribute('string1')) this.setAttribute('string1', '');

    if (!this.hasAttribute('string2')) this.setAttribute('string2', '');

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

    // We can query the shadow root for internal elements
    this._string1Input = this.shadowRoot.querySelector('#string1-input');
    this._string2Input = this.shadowRoot.querySelector('#string2-input');
    this._concatInput = this.shadowRoot.querySelector('#concat-input');

    //Initialization
    this._string1Input.value = this.string1;
    this._string2Input.value = this.string2;

    // We can bind an event which references one of the class methods
    this._onChangeInputString1Callback = this._onChangeInputString1.bind(this);
    this._onChangeInputString2Callback = this._onChangeInputString2.bind(this);
    this._string1Input.addEventListener('input', this._onChangeInputString1Callback);
    this._string2Input.addEventListener('input', this._onChangeInputString2Callback);
  }

  /**
   * `connectedCallback()` fires when the element is inserted into the DOM.
   * Useful for running setup code, such as fetching resources or rendering.
   * Generally, you should try to delay work until this time.
   */
  connectedCallback() {}

  _onChangeInputString1(event) {
    this.string1 = this._string1Input.value;
  }

  _onChangeInputString2(event) {
    this.string2 = this._string2Input.value;
  }

  /**
   * `attributeChangedCallback()` is called when an observed attribute has been
   * added, removed, updated, or replaced. Also called for initial values when
   * an element is created by the parser, or upgraded.
   * Note: only attributes listed in the observedAttributes property will
   * receive this callback.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    this._updateResult();
  }

  _updateResult() {
    this.result = this._concatString(this.string1, this.string2);
    this._concatInput.value = this.result;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          result: this.result
        },
        bubbles: true
      })
    );
  }

  get string1() {
    return this.getAttribute('string1');
  }

  set string1(value) {
    this.setAttribute('string1', value);
  }

  get string2() {
    return this.getAttribute('string2');
  }

  set string2(value) {
    this.setAttribute('string2', value);
  }

  get result() {
    return this.getAttribute('result');
  }

  set result(result) {
    this.setAttribute('result', result);
  }

  _concatString(a, b) {
    return a + b;
  }

  /**
   * `disconnectedCallback()` fires when the element is removed from the DOM.
   * It's a good place to do clean up work like releasing references and
   * removing event listeners.
   */
  disconnectedCallback() {
    this._string1Input.removeEventListener('change', this._onChangeInputString1Callback);
    this._string2Input.removeEventListener('change', this._onChangeInputString2Callback);
  }
}

// This is where the actual element is defined for use in the DOM
customElements.define('bo-string-concat', BoStringConcatElement);
