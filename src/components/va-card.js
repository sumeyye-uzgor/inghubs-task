import {LitElement, html, css} from 'lit';
import '@vaadin/card';
import {Router} from '@vaadin/router';
import './va-button.js';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

export class VaCard extends LitElement {
  static styles = css`
    .card {
      width: 300px;
      padding: 16px;
      background-color: var(--color-white);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
    }
    @media screen and (min-width: 500px) {
      .card {
        width: 450px;
      }
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
    updateWhenLocaleChanges(this);
  }

  handleDelete() {
    console.log('modal open');
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
          ${this.renderField(msg('First Name:'), firstName)}
          ${this.renderField(msg('Last Name:'), lastName)}
        </div>
        <div class="row">
          ${this.renderField(msg('Date of Employment:'), dateOfEmployment)}
          ${this.renderField(msg('Date of Birth:'), dateOfBirth)}
        </div>
        <div class="row">
          ${this.renderField(msg('Phone:'), phone)}
          ${this.renderField(msg('Email:'), email)}
        </div>
        <div class="row">
          ${this.renderField(msg('Department:'), department)}
          ${this.renderField(msg('Position:'), position)}
        </div>
        <div class="actions">
          <va-button
            color="purple"
            icon="edit"
            .label=${msg('Edit')}
            @click=${() => Router.go(`/edit/${this.item.id}`)}
          ></va-button>
          <va-button
            icon="trash"
            .label=${msg('Delete')}
            @click=${this.handleDelete}
          ></va-button>
        </div>
      </div>
    `;
  }
}

customElements.define('va-card', VaCard);
