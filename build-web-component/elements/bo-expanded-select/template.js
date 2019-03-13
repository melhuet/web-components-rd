import styles from './style.css';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <slot></slot>
`;

export default tmpl;
