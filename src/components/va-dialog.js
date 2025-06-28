import {LitElement, html, css} from 'lit';
import '@vaadin/dialog';
import '../components/va-button';
import '@vaadin/icon';

export class VaDialog extends LitElement {
  static properties = {
    opened: {type: Boolean},
    title: {type: String},
    description: {type: String},
  };

  static styles = css`
    vaadin-button[theme~='primary'] {
      background-color: var(--color-orange);
      color: white;
    }

    vaadin-button[theme~='tertiary'] {
      border: 1px solid var(--color-purple);
      color: var(--color-purple);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      color: var(--color-orange);
      padding-bottom: 8px;
    }

    .modal-description {
      font-size: 16px;
      margin-bottom: 24px;
    }

    .modal-footer {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      color: var(--color-orange);
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.opened = false;
    this.title = 'Are you sure?';
    this.description = '';
  }

  render() {
    return html`
      <vaadin-dialog
        .opened=${this.opened}
        .renderer=${this._renderDialog.bind(this)}
        @opened-changed=${(e) => (this.opened = e.detail.value)}
      ></vaadin-dialog>
    `;
  }

  _renderDialog(root) {
    if (root.firstChild) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="modal-header">
        ${this.title}
        <va-button class="close-button">&times;</va-button>
      </div>
      <div class="modal-description">
        ${this.description}
      </div>
      <div class="modal-footer">
        <va-button theme="primary" id="proceedBtn">Proceed</va-button>
        <va-button theme="tertiary" id="cancelBtn">Cancel</va-button>
      </div>
    `;

    root.appendChild(wrapper);

    wrapper.querySelector('.close-button').addEventListener('click', () => {
      this.opened = false;
    });

    wrapper.querySelector('#cancelBtn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('cancel'));
      this.opened = false;
    });

    wrapper.querySelector('#proceedBtn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('proceed'));
      this.opened = false;
    });
  }
}

customElements.define('va-dialog', VaDialog);
