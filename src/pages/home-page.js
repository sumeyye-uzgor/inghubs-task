import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import {store} from '../store/store.js';

import '@vaadin/icon';
import '@vaadin/vertical-layout';

import '../components/va-table.js';
import '../components/va-button.js';
import '../components/va-pagination.js';
import '../components/va-card.js';
import {
  setCurrentPage,
  selectVisibleEmployees,
  setPageSize,
} from '../store/employee-slice.js';

export class HomePage extends LitElement {
  static styles = css`
    vaadin-vertical-layout {
      align-items: inherit;
      padding: var(--lumo-space-m);
    }

    .header-row {
      display: flex;
      align-items: center;
      gap: var(--lumo-space-m);
      margin-bottom: 16px;
    }

    .employee-title {
      color: var(--color-orange);
      font-weight: 600;
      padding: 16px 0;
      margin: 0;
    }

    .view-toggle {
      margin-left: auto;
      display: flex;
      gap: 8px;
    }

    .card-container {
      display: flex;
      justify-content: center;
      align-self: center;
      max-width: 1000px;
      box-sizing: border-box;
      flex-wrap: wrap;
      gap: 16px;
    }
  `;

  static properties = {
    isModalOpen: {state: true},
    viewMode: {state: true},
  };

  constructor() {
    super();
    this.isModalOpen = false;
    this.viewMode = 'table';
    updateWhenLocaleChanges(this);
  }

  firstUpdated() {
    store.dispatch(setCurrentPage(1));
    store.dispatch(setPageSize(9));
  }
  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }
  render() {
    const employees = selectVisibleEmployees(store.getState());
    return html`
      <vaadin-vertical-layout>
        <div class="header-row">
          <h2 class="employee-title">${msg('Employee List')}</h2>
          <div class="view-toggle">
            <va-button
              icon="menu"
              .variant=${this.viewMode === 'table' ? 'primary' : 'text'}
              @click=${() => {
                this.viewMode = 'table';
                store.dispatch(setCurrentPage(1));
                store.dispatch(setPageSize(9));
                this.requestUpdate();
              }}
            ></va-button>
            <va-button
              icon="grid-small"
              .variant=${this.viewMode === 'card' ? 'primary' : 'text'}
              @click=${() => {
                this.viewMode = 'card';
                store.dispatch(setCurrentPage(1));
                store.dispatch(setPageSize(4));
                this.requestUpdate();
              }}
            ></va-button>
          </div>
        </div>

        ${this.viewMode === 'table'
          ? html`<va-table .items=${employees}></va-table>`
          : html`
              <div class="card-container">
                ${employees?.map(
                  (item) => html`<va-card .item=${item}></va-card>`
                )}
              </div>
            `}

        <va-pagination></va-pagination>
      </vaadin-vertical-layout>
    `;
  }
}

window.customElements.define('home-page', HomePage);
