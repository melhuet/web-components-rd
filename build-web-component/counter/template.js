import styles from './style.js';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <h3>Counter build</h3>
    <slot name='counter-content'>Button</slot>
    <button id='counter-increment'> - </button>
    <span id='counter-value'> 0 </span>
    <button id='counter-decrement'> + </button>
`;

export default tmpl;
