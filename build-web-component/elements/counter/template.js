import styles from './style.css';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <h3>Counter bundle</h3>
    <slot name='counter-content'>Button</slot>
    <button id='counter-increment'> - </button>
    <span id='counter-value'> 0 </span>
    <button id='counter-decrement'> + </button>
`;

export default tmpl;
