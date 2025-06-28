import {LitElement, html, css} from 'lit';
import '@vaadin/button';

export class VaPaginationButton extends LitElement {
  static styles = css`
    vaadin-button {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-weight: bold;
      padding: 0;
      min-width: 0;
    }
    vaadin-button[theme~='primary'] {
      background-color: var(--color-orange);
      color: var(--color-white);
    }
    vaadin-button[theme~='tertiary'] {
      background-color: transparent;
      color: var(--color-black);
    }

    vaadin-button[theme~='icon-orange'] {
      background-color: transparent;
      color: var(--color-orange);
    }
    vaadin-button[theme~='icon-disabled'] {
      background-color: transparent;
      color: var(--color-black);
      opacity: 0.4;
      cursor: not-allowed;
    }
    vaadin-button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `;
  static properties = {
    label: {type: String},
    disabled: {type: Boolean},
    active: {type: Boolean},
    onClick: {type: Function},
    icon: {type: String},
  };
  constructor() {
    super();
    this.disabled = false;
    this.active = false;
    this.icon = '';
    this.label = '';
  }

  render() {
    const theme = this.icon
      ? this.disabled
        ? 'icon-disabled'
        : 'icon-orange'
      : this.active
      ? 'primary'
      : 'tertiary';
    return html`
      <vaadin-button
        ?disabled=${this.disabled}
        @click=${this.onClick}
        theme=${theme}
      >
        ${this.icon
          ? html`<vaadin-icon icon="vaadin:${this.icon}"></vaadin-icon>`
          : this.label}
      </vaadin-button>
    `;
  }
}

customElements.define('va-pagination-button', VaPaginationButton);
