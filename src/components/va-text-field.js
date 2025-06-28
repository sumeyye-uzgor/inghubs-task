import {LitElement, html, css} from 'lit';
import '@vaadin/text-field';

export class VaTextField extends LitElement {
  static styles = css`
    vaadin-text-field::part(input-field) {
      background-color: var(--color-white);
      border-color: var(--color-black);
      --vaadin-input-field-border-width: 1px;
    }

    vaadin-text-field::part(input-field):focus-within {
      border-color: var(--color-orange);
      --vaadin-input-field-border-color: var(--color-orange);
    }

    vaadin-text-field::part(input) {
      color: var(---color-black);
    }
    vaadin-text-field::part(label) {
      color: var(--color-black);
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
      <vaadin-text-field
        theme="outlined"
        .label=${this.label}
        .value=${this.value}
        .placeholder=${this.placeholder}
        @input=${(e) => (this.value = e.target.value)}
      ></vaadin-text-field>
    `;
  }
}

customElements.define('va-text-field', VaTextField);
