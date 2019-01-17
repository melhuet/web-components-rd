import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery'; //var jquery = require('jquery')

class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);

    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    jQuery(mountPoint).append("<div>xsearch</div>")

  }
}
customElements.define('x-search', XSearch);

export default XSearch;
