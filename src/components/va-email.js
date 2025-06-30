import {LitElement, html, css} from 'lit';
import '@vaadin/email-field';
import {msg} from '@lit/localize';
import {store} from '../store/store';
import {setFieldError} from '../store/form-slice';

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
    name: {type: String},
    onChange: {type: Function},
    placeholder: {type: String},
    errorMessage: {state: true},
  };

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.errorMessage = '';
  }

  render() {
    return html`
      <vaadin-email-field
        theme="outlined"
        .label=${this.label}
        .value=${this.value}
        @value-changed=${this.onChange}
        .placeholder=${this.placeholder}
        required
        pattern="^[^@\\s]+@[^@\\s]+\\.com$"
        .errorMessage="${this.errorMessage}"
        @validated="${(event) => {
          const field = event.target;
          const {validity} = field.inputElement;
          if (validity.valueMissing) {
            this.errorMessage = msg('Field is required');
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: true})
            );
          } else if (validity.patternMismatch) {
            this.errorMessage = msg('Enter a valid .com email address');
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: true})
            );
          } else {
            this.errorMessage = '';
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: false})
            );
          }
        }}"
      ></vaadin-email-field>
    `;
  }
}

customElements.define('va-email', VaEmail);
