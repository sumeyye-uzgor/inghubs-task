import {LitElement, html, css} from 'lit';
import '@vaadin/button';
import '@vaadin/icon';

export class VaButton extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      vaadin-button[theme~='primary'][theme~='orange'] {
        background-color: var(--color-orange);
        color: var(--color-white);
      }

      vaadin-button[theme~='secondary'][theme~='orange'] {
        background-color: var(--color-white);
        color: var(--color-orange);
        border: 1px solid var(--color-orange);
      }

      vaadin-button[theme~='tertiary'][theme~='orange'] {
        background-color: transparent;
        color: var(--color-orange);
      }

      vaadin-button[theme~='primary'][theme~='purple'] {
        background-color: var(--color-purple);
        color: var(--color-white);
      }

      vaadin-button[theme~='secondary'][theme~='purple'] {
        background-color: var(--color-white);
        color: var(--color-purple);
        border: 1px solid var(--color-purple);
      }

      vaadin-button[theme~='tertiary'][theme~='purple'] {
        background-color: transparent;
        color: var(--color-purple);
      }

      vaadin-button ::slotted(vaadin-icon) {
        margin-right: 0.5rem;
      }
    `;
  }

  static properties = {
    label: {type: String},
    icon: {type: String},
    variant: {type: String},
    color: {type: String},
  };

  constructor() {
    super();
    this.icon = '';
    this.label = '';
    this.variant = 'primary';
    this.color = 'orange';
  }

  render() {
    return html`
      <vaadin-button
        @click=${this._onClick}
        theme="${this.variant} ${this.color}"
      >
        ${this.icon
          ? html`<vaadin-icon
              icon="vaadin:${this.icon}"
              slot="prefix"
              style="color: ${this.chooseColor(this.variant, this.color)}"
            ></vaadin-icon>`
          : ''}
        ${this.label ? this.label : html`<slot></slot>`}
      </vaadin-button>
    `;
  }
  // style="color: ${this.chooseColor(this.variant, this.color)}"

  _onClick() {
    // this.count++;
    // this.dispatchEvent(new CustomEvent('count-changed'));
    console.log('button clicked');
  }
  chooseColor(variant, color) {
    if (variant === 'primary') {
      return 'white';
    } else {
      if (color === 'purple') {
        return 'var(--color-purple)';
      } else {
        return 'var(--color-orange)';
      }
    }
  }
}

window.customElements.define('va-button', VaButton);
