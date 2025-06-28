import {LitElement, html, css} from 'lit';
import '@vaadin/select';
import '@vaadin/list-box';
import '@vaadin/item';

export class VaSelect extends LitElement {
  static styles = css`
    vaadin-select::part(input-field) {
      background-color: var(--color-white);
      border-color: var(--color-black);
      --vaadin-input-field-border-width: 1px;
    }

    vaadin-select[focused]::part(input-field) {
      border-color: var(--color-orange);
      --vaadin-input-field-border-color: var(--color-orange);
    }

    vaadin-select::part(label) {
      color: var(--color-black);
    }

    vaadin-select[focused]::part(label) {
      color: var(--color-orange);
    }

    vaadin-select::part(value) {
      color: var(--color-black);
    }
  `;

  static properties = {
    label: {type: String},
    value: {type: String},
    items: {type: Array},
  };

  constructor() {
    super();
    this.label = '';
    this.value = '';
    this.items = [];
  }

  render() {
    return html`
      <vaadin-select
        theme="outlined"
        .label=${this.label}
        .value=${this.value}
        .items=${this.items}
        @value-changed=${(e) => (this.value = e.detail.value)}
      >
      </vaadin-select>
    `;
  }
}

customElements.define('va-select', VaSelect);
