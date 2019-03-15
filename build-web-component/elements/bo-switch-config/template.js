import styles from './style.css';

let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>${styles}</style>
    <section id="from">
      <h1>From properties</h1>
      <div id="from-properties"></div>
    </section>
    <section id="to">
      <h1>To properties</h1>
      <button id="reset">RESET</button>
      <button id="clean">CLEAN</button>
      <div id="to-properties"></div>
    </section>    
    <pre id="debug"></pre>
`;

export default tmpl;
