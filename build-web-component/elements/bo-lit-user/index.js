// lit component
import { LitElement, html } from 'lit-element';
import { NgLit } from 'ng-lit';

class Index extends NgLit(LitElement) {
  static get properties() {
    return {
      age: { type: Number },
      user: { type: Object }
    };
  }
  // declare the angular props
  static get ngProps() {
    return {
      user: { default: {} }
    };
  }
  render() {
    const { age, user } = this;
    return html`
      <span>${user.firstName} ${user.lastName} is ${age} years old</span>
    `;
  }
}
customElements.define('ng-lit-user', Index);
