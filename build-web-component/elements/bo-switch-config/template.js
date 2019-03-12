import styles from './style.css';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <section>
      <h1>From properties</h1>
      <div id="from-properties"></div>
    </section>
    <section>
      <h1>To properties</h1>
      <div id="to-properties"></div>
    </section>
    <section id="mapping-properties"></section>
    <pre id="debug"></pre>
`;

export default tmpl;
