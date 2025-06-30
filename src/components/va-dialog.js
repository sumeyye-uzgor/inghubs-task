import {LitElement, html, css} from 'lit';
import '../components/va-button.js';
import {store} from '../store/store.js';
import {selectModalState, closeModal} from '../store/modal-slice.js';
import {deleteEmployee} from '../store/employee-slice.js';
import {msg} from '@lit/localize';
import {Router} from '@vaadin/router';

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
    modal: {state: true},
  };

  constructor() {
    super();
    this.modal = selectModalState(store.getState());
    this.unsubscribe = store.subscribe(() => {
      this.modal = selectModalState(store.getState());
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }
  _close() {
    Router.go('/');

    store.dispatch(closeModal());
  }

  render() {
    const {opened, title, description, payload, isConfirmModal} = this.modal;
    return html`
      ${opened
        ? html`
            <div class="backdrop" @click=${this._close}>
              <div class="modal" @click=${(e) => e.stopPropagation()}>
                <div class="modal-header">
                  <span>${title}</span>
                  <va-button
                    icon="close"
                    variant="icon"
                    @click=${this._close}
                  ></va-button>
                </div>
                <div class="modal-description">${description}</div>
                <div class="modal-footer">
                  <va-button
                    variant="primary"
                    @click=${() => {
                      if (isConfirmModal) {
                        store.dispatch(deleteEmployee(payload.id));
                      } else {
                        Router.go('/');
                      }
                      this._close();
                    }}
                    >${isConfirmModal
                      ? msg('Proceed')
                      : msg('Go To Home')}</va-button
                  >

                  <va-button
                    variant="secondary"
                    color="purple"
                    @click=${this._close}
                    >${msg('Cancel')}</va-button
                  >
                </div>
              </div>
            </div>
          `
        : null}
    `;
  }
}

customElements.define('va-dialog', VaDialog);
