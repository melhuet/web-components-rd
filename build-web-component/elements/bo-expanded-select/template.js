import styles from './style.css';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <select><slot></slot></select>
`;

export default tmpl;
