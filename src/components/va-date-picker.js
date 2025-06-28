import {LitElement, html, css} from 'lit';
import '@vaadin/date-picker';

export class VaDatePicker extends LitElement {
  static styles = css`
    vaadin-date-picker {
      --vaadin-input-field-focused-label-color: var(--color-orange);
    }
    vaadin-date-picker::part(input-field) {
      background-color: var(--color-white);
      border-color: var(--color-black);
      --vaadin-input-field-border-width: 1px;
    }

    vaadin-date-picker[focused]::part(input-field) {
      border-color: var(--color-orange);
      --vaadin-input-field-border-color: var(--color-orange);
    }

    vaadin-date-picker::part(input) {
      color: var(--color-black);
      font-weight: 500;
    }

    vaadin-date-picker::part(label) {
      color: var(--color-black);
      font-size: 14px;
    }
    vaadin-date-picker[focused]::part(label) {
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
      <vaadin-date-picker
        .label=${this.label}
        .value=${this.value}
        .placeholder=${this.placeholder}
        @value-changed=${(e) => (this.value = e.detail.value)}
      ></vaadin-date-picker>
    `;
  }
}

customElements.define('va-date-picker', VaDatePicker);
