import {LitElement, html, css} from 'lit';
import '../components/va-button.js';

export class VaDialog extends LitElement {
  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal {
      background: white;
      border-radius: 8px;
      padding: 24px;
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      color: var(--color-orange);
    }

    .modal-description {
      font-size: 16px;
    }

    .modal-footer {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .modal-footer va-button {
      width: 100%;
    }
  `;

  static properties = {
    opened: {type: Boolean},
    title: {type: String},
    description: {type: String},
  };

  constructor() {
    super();
    this.opened = false;
    this.title = 'Are you sure?';
    this.description = '';
  }

  render() {
    return html`
      ${this.opened
        ? html`
            <div class="backdrop" @click=${this._close}>
              <div class="modal" @click=${(e) => e.stopPropagation()}>
                <div class="modal-header">
                  <span>${this.title}</span>
                  <va-button
                    icon="close"
                    variant="icon"
                    @click=${this._close}
                  ></va-button>
                </div>
                <div class="modal-description">${this.description}</div>
                <div class="modal-footer">
                  <va-button variant="primary">Proceed</va-button>
                  <va-button
                    variant="secondary"
                    color="purple"
                    @click=${this._close}
                    >Cancel</va-button
                  >
                </div>
              </div>
            </div>
          `
        : null}
    `;
  }

  _close() {
    this.opened = false;
  }
}

customElements.define('va-dialog', VaDialog);
