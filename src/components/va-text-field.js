import {LitElement, html, css} from 'lit';
import '@vaadin/text-field';
import {msg} from '@lit/localize';
import {store} from '../store/store';
import {setFieldError} from '../store/form-slice';

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
    name: {type: String},
    placeholder: {type: String},
    errorMessage: {state: true},
    onChange: {type: Function},
  };

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.errorMessage = '';
  }

  render() {
    return html`
      <vaadin-text-field
        theme="outlined"
        .label=${this.label}
        .value=${this.value}
        .placeholder=${this.placeholder}
        required
        .errorMessage="${this.errorMessage}"
        @value-changed=${this.onChange}
        @validated="${(event) => {
          const field = event.target;
          const {validity} = field.inputElement;
          if (validity.valueMissing) {
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
        }}"
      ></vaadin-text-field>
    `;
  }
}

customElements.define('va-text-field', VaTextField);
