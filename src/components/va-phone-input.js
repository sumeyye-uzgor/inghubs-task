import {LitElement, html, css} from 'lit';
import '@vaadin/text-field';
import {msg} from '@lit/localize';
import {store} from '../store/store';
import {setFieldError} from '../store/form-slice';

export class VaPhoneInput extends LitElement {
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
    value: {type: String},
    name: {type: String},
    onChange: {type: Function},
    errorMessage: {state: true},
  };

  constructor() {
    super();
    this.errorMessage = '';
  }
  render() {
    return html`
      <vaadin-text-field
        required
        minlength="10"
        maxlength="10"
        label=${msg('Phone')}
        .value=${this.value}
        @value-changed=${this.onChange}
        pattern="^[1-9][0-9]{9}$"
        allowed-char-pattern="[0-9]"
        helper-text=${msg('Enter 10-digit phone number, not starting with 0')}
        .errorMessage="${this.errorMessage}"
        @validated="${(event) => {
          const field = event.target;
          const {validity} = field.inputElement;
          if (validity.valueMissing) {
            this.errorMessage = msg('Field is required');
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: true})
            );
          } else if (validity.tooShort) {
            this.errorMessage = msg('Phone should contain 10 numbers');
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: true})
            );
          } else if (validity.tooLong) {
            this.errorMessage = this.errorMessage = msg(
              'Phone should contain 10 numbers'
            );
            store.dispatch(
              setFieldError({fieldName: this.name, hasError: true})
            );
          } else if (validity.patternMismatch) {
            this.errorMessage = msg('Invalid phone number format');
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
      ></vaadin-text-field>
    `;
  }
}

customElements.define('va-phone-input', VaPhoneInput);
