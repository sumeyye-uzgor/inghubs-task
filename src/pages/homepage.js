import {LitElement, html, css} from 'lit';
import '../components/va-button.js';
import '@vaadin/icon';
import '../components/va-table.js';
import '../components/va-pagination.js';
import '../components/va-pagination-button.js';

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
      <va-pagination-button
        label="1"
        .onClick=${() => {
          console.log('clicked 1');
        }}
        active
      ></va-pagination-button>
      <va-pagination-button
        label="1"
        .onClick=${() => {
          console.log('clicked 1');
        }}
        disabled
      ></va-pagination-button>
      <va-pagination-button
        label="..."
        .onClick=${() => {
          console.log('clicked dots');
        }}
      ></va-pagination-button>
      <va-pagination-button
        icon="user"
        .onClick=${() => {
          console.log('clicked dots');
        }}
        disabled
      ></va-pagination-button>
      <va-pagination-button
        icon="user"
        .onClick=${() => {
          console.log('clicked dots');
        }}
      ></va-pagination-button>
      <div>only icons</div>
      <va-button icon="user" variant="icon"></va-button>
      <va-button icon="user" variant="icon"></va-button>
      <vaadin-icon icon="vaadin:user" style="color: red"></vaadin-icon>
      <slot></slot>
      <va-table></va-table>
      <va-pagination totalItemCount="50" pageSize="5"></va-pagination>
      <va-pagination totalItemCount="50" pageSize="5"></va-pagination>
    `;
  }
}

window.customElements.define('home-page', HomePage);
