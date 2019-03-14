//https://github.com/GoogleChromeLabs/howto-components/blob/master/elements/howto-accordion/howto-accordion.js

/********************************* BoExpandedSelect ******************************************/
let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>  
  :host{display: block}  
    slot[name='label']{
        display: inline-block;
    }   
    ul {
      display: inline-block;
      border: 1px solid grey;
      width: 10%;      
    }    
    #property-value{
     display: inline-block;
     width: 150px;
     text-align: center;
    }
  </style>
  <slot name="label">Label</slot>  
  <div id="property-value"></div>
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
    this._setPropertyValue(event.detail.value);
    this.selected = event.detail.id;
    this._unselectAll();
    this._select(event.target);
  }

  attributeChangedCallback(name, oldId, newId) {
    if (name === 'selected' && oldId != newId) {
      let selectedNode = this.querySelector(`bo-expanded-select-option[id='${this.selected}']`);
      // Default case
      if (!selectedNode) {
        selectedNode = this.querySelector(`bo-expanded-select-option[id]`);
      }
      this._unselectAll();
      this._select(selectedNode);
      this._setPropertyValue(selectedNode.getAttribute('value'));
    }
  }

  get selected() {
    return this.getAttribute('selected');
  }

  set selected(id) {
    this.setAttribute('selected', id);
  }

  disconnectedCallback() {
    this.removeEventListener('change', this._onChange);
  }

  _unselectAll() {
    const options = this.querySelectorAll('bo-expanded-select-option');
    options.forEach(option => {
      option.removeAttribute('selected');
    });
  }

  _select(node) {
    node.setAttribute('selected', '');
  }

  _setPropertyValue(value) {
    this._propertyValue.innerHTML = value;
  }
}

// This is where the actual element is defined for use in the DOM
customElements.define('bo-expanded-select', BoExpandedSelect);

/********************************* BoExpandedSelectOptions ******************************************/
let boExpandedSelectOptionTemplate = document.createElement('template');
boExpandedSelectOptionTemplate.innerHTML = `
<style>:host([selected]){ display: block;background: #36a2ff;}</style>
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
