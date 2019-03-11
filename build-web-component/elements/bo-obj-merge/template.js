import styles from './style.css';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <pre id="obj1"></pre>
    <span> merge </span>
    <pre id="obj2"></pre>
    <span> = </span>
    <pre id="result"></pre>
`;

export default tmpl;
