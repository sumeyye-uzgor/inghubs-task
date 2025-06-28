import {LitElement, html, css} from 'lit';
import '../components/va-button.js';
import '@vaadin/icon';
import '../components/va-table.js';

export class HomePage extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`
      <va-button label="this is a button"></va-button>
      <va-button label="Employees" variant="secondary"></va-button>
      <va-button label="Add New" variant="tertiary"></va-button>
      <va-button label="Employees" color="purple"></va-button>
      <va-button
        label="Employees"
        variant="secondary"
        color="purple"
      ></va-button>
      <va-button label="Add New" variant="tertiary" color="purple"></va-button>
      <div>with icons</div>
      <va-button label="this is a button" icon="user"></va-button>
      <va-button label="Employees" variant="secondary" icon="user"></va-button>
      <va-button label="Add New" variant="tertiary" icon="user"></va-button>
      <va-button label="Employees" color="purple" icon="user"></va-button>
      <va-button
        label="Employees"
        variant="secondary"
        color="purple"
        icon="user"
      ></va-button>
      <va-button
        label="Add New"
        variant="tertiary"
        color="purple"
        icon="user"
      ></va-button>
      <div>only icons</div>
      <va-button icon="user" variant="icon"></va-button>
      <va-button icon="user" variant="icon"></va-button>
      <vaadin-icon icon="vaadin:user" style="color: red"></vaadin-icon>
      <slot></slot>
      <va-table></va-table>
    `;
  }
}

window.customElements.define('home-page', HomePage);
