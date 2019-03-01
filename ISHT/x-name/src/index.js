import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

class XName extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const firstName = this.getAttribute('firstName');
    const lastName = this.getAttribute('lastName');
console.log(mountPoint)

    ReactDOM.render(<div>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>, mountPoint);

      jQuery(mountPoint).append("<div>toto</div>")

  }
}
customElements.define('x-name', XName);

export default XName;
