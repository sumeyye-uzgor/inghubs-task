import {LitElement, html, css} from 'lit';
import '@vaadin/date-picker';
import {msg} from '@lit/localize';
import {store} from '../store/store';
import {setFieldError} from '../store/form-slice';

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
    name: {type: String},
    placeholder: {type: String},
    errorMessage: {state: true},
    onChange: {type: Function},
  };

  constructor() {
    super();
    this.label = '';
    this.value = '';
    this.placeholder = '';
    this.errorMessage = '';
  }

  render() {
    return html`
      <vaadin-date-picker
        .label=${this.label}
        .value=${this.value}
        @value-changed=${this.onChange}
        .placeholder=${this.placeholder}
        required
        .errorMessage="${this.errorMessage}"
        @validated="${(event) => {
          const field = event.target;
          if (!field.value && field.inputElement.value) {
            this.errorMessage = msg('Invalid date format');
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: true})
            );
          } else if (!field.value) {
            this.errorMessage = msg('Field is required');
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: true})
            );
          } else {
            this.errorMessage = '';
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: false})
            );
          }
          this.requestUpdate();
        }}"
      ></vaadin-date-picker>
    `;
  }
}

customElements.define('va-date-picker', VaDatePicker);
