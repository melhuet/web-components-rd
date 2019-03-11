import styles from './style.css';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <input type="text" id="string1-input" />
    <span> + </span>
    <input type="text" id="string2-input" />
    <span> = </span>
    <input type="text" readonly="true" id="concat-input" />
`;

export default tmpl;
