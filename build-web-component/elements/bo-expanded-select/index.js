//https://github.com/GoogleChromeLabs/howto-components/blob/master/elements/howto-accordion/howto-accordion.js

/********************************* BoExpandedSelect ******************************************/
let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>
    ul {
      border: 1px solid grey;
    }
  </style>
  <slot name="label">Label</slot>
  <div id="property-value">&nbsp;</div>
  <ul>
    <slot></slot>
  </ul>`;
class BoExpandedSelect extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this._propertyValue = this.shadowRoot.querySelector('#property-value');
  }

  connectedCallback() {
    this.addEventListener('change', this._onChange);
  }

  _onChange(event) {
    this._propertyValue.innerHTML = event.detail.value;
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  disconnectedCallback() {
    this.removeEventListener('change', this._onChange);
  }
}

// This is where the actual element is defined for use in the DOM
customElements.define('bo-expanded-select', BoExpandedSelect);

/********************************* BoExpandedSelectOptions ******************************************/
let boExpandedSelectOptionTemplate = document.createElement('template');
boExpandedSelectOptionTemplate.innerHTML = `
<style>:host { background: green;}</style>
<li><slot></slot></li>`;

class BoExpandedSelectOption extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(boExpandedSelectOptionTemplate.content.cloneNode(true));

    this._li = this.shadowRoot.querySelector('li');

    this._onClickOption = this._onClickOption.bind(this);
  }

  connectedCallback() {
    if (!this.hasAttribute('id')) this.id = '';
    if (!this.hasAttribute('value')) this.value = '';

    this._li.addEventListener('click', this._onClickOption);
  }

  _onClickOption() {
    console.log('change', this.id, this.value);
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          id: this.id,
          value: this.value
        },
        bubbles: true
      })
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  get id() {
    return this.getAttribute('id');
  }

  set id(id) {
    this.setAttribute('id', id);
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  disconnectedCallback() {
    this._li.removeEventListener('click', this._onClickOption);
  }
}

// This is where the actual element is defined for use in the DOM
customElements.define('bo-expanded-select-option', BoExpandedSelectOption);
