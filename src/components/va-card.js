import {LitElement, html, css} from 'lit';
import '@vaadin/card';
import './va-button.js';

export class VaCard extends LitElement {
  static styles = css`
    .card {
      max-width: 450px;
      padding: 16px;
      background-color: var(--color-white);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
    }

    .row {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 16px;
    }

    .field {
      flex: 1;
      min-width: 0;
    }

    .label {
      font-size: 14px;
      color: var(--color-gray);
      margin-bottom: 4px;
    }

    .value {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-black);
      word-break: break-word;
    }

    .actions {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }
  `;

  static properties = {
    item: {type: Object},
  };

  constructor() {
    super();
    this.item = {};
  }

  renderField(label, value) {
    return html`
      <div class="field">
        <div class="label">${label}</div>
        <div class="value">${value ?? '-'}</div>
      </div>
    `;
  }

  render() {
    const {
      firstName,
      lastName,
      dateOfEmployment,
      dateOfBirth,
      phone,
      email,
      department,
      position,
    } = this.item;

    return html`
      <div class="card">
        <div class="row">
          ${this.renderField('First Name: ', firstName)}
          ${this.renderField('Last Name: ', lastName)}
        </div>
        <div class="row">
          ${this.renderField('Date of Employment: ', dateOfEmployment)}
          ${this.renderField('Date of Birth: ', dateOfBirth)}
        </div>
        <div class="row">
          ${this.renderField('Phone: ', phone)}
          ${this.renderField('Email: ', email)}
        </div>
        <div class="row">
          ${this.renderField('Department: ', department)}
          ${this.renderField('Position: ', position)}
        </div>
        <div class="actions">
          <va-button color="purple" icon="edit">Edit</va-button>
          <va-button icon="trash">Delete</va-button>
        </div>
      </div>
    `;
  }
}

customElements.define('va-card', VaCard);
