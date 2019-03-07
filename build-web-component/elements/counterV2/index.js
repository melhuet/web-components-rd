import tmpl from './template.js';

// We define an ES6 class that extends HTMLElement
class CounterElement extends HTMLElement {
  constructor() {
    let arr = [1, 5, 3, 4, 7, 8];
    let index = arr.find(item => item % 2 === 0);

    super();

    // Initialise the counter value
    this.counter = 1;

    // We attach an open shadow root to the custom element
    const shadowRoot = this.attachShadow({ mode: 'open' });
    //shadowRoot.appendChild(style.cloneNode(true));
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    // We can query the shadow root for internal elements
    // in this case the button
    this.incrementButton = this.shadowRoot.querySelector('#counter-increment');
    this.decrementButton = this.shadowRoot.querySelector('#counter-decrement');
    this.counterValue = this.shadowRoot.querySelector('#counter-value');

    // We can bind an event which references one of the class methods
    this.incrementButton.addEventListener('click', this.decrement.bind(this));
    this.decrementButton.addEventListener('click', this.increment.bind(this));
  }

  increment() {
    this.counter++;
    this.invalidate();
  }

  decrement() {
    this.counter--;
    this.invalidate();
  }

  // Call when the counter changes value
  invalidate() {
    this.counterValue.innerHTML = this.counter;
  }
}

// This is where the actual element is defined for use in the DOM
customElements.define('counter-element-v2', CounterElement);
