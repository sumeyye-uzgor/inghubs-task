import {LitElement, html, css} from 'lit';
import '@vaadin/email-field';

export class VaEmail extends LitElement {
  static styles = css`
    vaadin-email-field::part(input-field) {
      background-color: var(--color-white);
      border-color: var(--color-black);
      --vaadin-input-field-border-width: 1px;
    }

    vaadin-email-field[focused]::part(input-field) {
      border-color: var(--color-orange);
      --vaadin-input-field-border-color: var(--color-orange);
    }

    vaadin-email-field::part(input) {
      color: var(--color-black);
    }

    vaadin-email-field::part(label) {
      color: var(--color-black);
    }

    vaadin-email-field[focused]::part(label) {
      color: var(--color-orange);
    }
  `;

  static properties = {
    label: {type: String},
    value: {type: String},
    placeholder: {type: String},
  };

  constructor() {
    super();
    this.label = '';
    this.value = '';
    this.placeholder = '';
  }

  render() {
    return html`
      <vaadin-email-field
        theme="outlined"
        .label=${this.label}
        .value=${this.value}
        .placeholder=${this.placeholder}
        @input=${(e) => (this.value = e.target.value)}
      ></vaadin-email-field>
    `;
  }
}

customElements.define('va-email', VaEmail);
