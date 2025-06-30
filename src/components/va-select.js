import {LitElement, html, css} from 'lit';
import '@vaadin/select';
import '@vaadin/list-box';
import '@vaadin/item';
import {msg} from '@lit/localize';
import {store} from '../store/store';
import {setFieldError} from '../store/form-slice';

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
    placeholder: {type: String},
    label: {type: String},
    value: {type: String},
    name: {type: String},
    items: {type: Array},
    onChange: {type: Function},
    errorMessage: {state: true},
  };

  constructor() {
    super();
    this.label = '';
    this.value = '';
    this.errorMessage = '';
  }

  _onChange(e) {
    this.onChange(e);
    this._validate();
  }

  _validate() {
    if (!this.value || this.value === 'default') {
      this.errorMessage = msg('Field is required');
      store.dispatch(setFieldError({fieldName: this.name, hasError: true}));
    } else {
      this.errorMessage = '';
      store.dispatch(setFieldError({fieldName: this.name, hasError: false}));
    }
  }
  render() {
    return html`
      <vaadin-select
        theme="outlined"
        .label=${this.label}
        .value=${this.value}
        .items=${this.items}
        .placeholder=${this.placeholder}
        required
        .errorMessage=${this.errorMessage}
        .invalid=${!!this.errorMessage}
        @value-changed=${this._onChange}
        @blur=${this._validate}
      >
      </vaadin-select>
    `;
  }
}

customElements.define('va-select', VaSelect);
