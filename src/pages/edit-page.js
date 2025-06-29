import {LitElement, html, css} from 'lit';
import '../components/va-button.js';
import '@vaadin/icon';
import '../components/va-table.js';
import '../components/va-pagination.js';
import '../components/va-pagination-button.js';
import '../components/va-card.js';
import '../components/va-text-field.js';
import '../components/va-date-picker.js';
import '../components/va-email.js';
import '../components/va-select.js';
import '../components/va-dialog.js';
import {updateWhenLocaleChanges} from '@lit/localize';

export class EditPage extends LitElement {
  static get styles() {
    return css``;
  }
  static properties = {
    isModalOpen: {state: true},
  };

  constructor() {
    super();
    this.isModalOpen = false;
    updateWhenLocaleChanges(this);
  }

  render() {
    const options = [
      {label: 'Engineering', value: 'engineering'},
      {label: 'Design', value: 'design'},
      {label: 'Marketing', value: 'marketing'},
    ];
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
      <va-card
        .item=${{
          firstName: 'Ahmet',
          lastName: 'Uzgor',
          dateOfEmployment: '1.1.2024',
          dateOfBirth: '10.12.1996',
          phone: '5456100883',
          email: 'ahmetuzgor10@gmail.com',
          department: 'IT',
          position: 'TeamLead',
        }}
      ></va-card>
      <va-text-field placeholder="Hello" label="First Name"></va-text-field>
      <va-date-picker placeholder="aSss" label="Date"></va-date-picker>
      <va-email placeholder="email" label="Email"></va-email>
      <va-select label="Department" .items=${options}></va-select>
      <va-button
        label="Show Modal"
        variant="primary"
        @click=${() => (this.isModalOpen = true)}
      ></va-button>

      ${this.isModalOpen
        ? html`
            <va-dialog
              title="Are you sure?"
              description="This action cannot be undone."
              @proceed=${() => {
                console.log('proceed clicked');
                this.isModalOpen = false;
              }}
              @cancel=${() => {
                console.log('cancel clicked');
                this.isModalOpen = false;
              }}
              ?opened=${this.isModalOpen}
            ></va-dialog>
          `
        : ''}
    `;
  }
}

window.customElements.define('edit-page', EditPage);
