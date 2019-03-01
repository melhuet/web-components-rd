const styles=`
    :host {
        position: relative;
        font-family: sans-serif;
    }

    #counter-increment, #counter-decrement {
        width: 60px;
        height: 30px;
        margin: 20px;
        background: none;
        border: 1px solid black;
    }

    #counter-value {
        font-weight: bold;
    }
`;

let style = document.createElement('style');
style.innerHTML = `
    <style>${styles}</style>
`;

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <h3>Counter V3</h3>
    <slot name='counter-content'>Button</slot>
    <button id='counter-increment'> - </button>
    <span id='counter-value'> 0 </span>
    <button id='counter-decrement'> + </button>
`;

// We define an ES6 class that extends HTMLElement
class CounterElementV3 extends HTMLElement {
    constructor() {
        super();

        // Initialise the counter value
        this.counter = 0;

        // We attach an open shadow root to the custom element
        const shadowRoot= this.attachShadow({mode: 'open'});
        //shadowRoot.appendChild(style.cloneNode(true));
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        // We can query the shadow root for internal elements
        // in this case the button
        this.incrementButton = this.shadowRoot.querySelector('#counter-increment');
        this.decrementButton = this.shadowRoot.querySelector('#counter-decrement');
        this.counterValue = this.shadowRoot.querySelector('#counter-value');

        // We can bind an event which references one of the class methods
        this.incrementButton.addEventListener("click", this.decrement.bind(this));
        this.decrementButton.addEventListener("click", this.increment.bind(this));

    }

    increment() {
        this.counter++
        this.invalidate();
    }

    decrement() {
        this.counter--
        this.invalidate();
    }

    // Call when the counter changes value
    invalidate() {
        this.counterValue.innerHTML = this.counter;
    }
}

// This is where the actual element is defined for use in the DOM
customElements.define('counter-element-v3', CounterElementV3);
