import {LitElement, html, css} from 'lit';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column.js';
import '@vaadin/scroller';
import {msg, str, updateWhenLocaleChanges} from '@lit/localize';
import {Router} from '@vaadin/router';
import {store} from '../store/store.js';
import {openModal} from '../store/modal-slice.js';

export class VaTable extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      vaadin-grid::part(header-cell) {
        color: var(--color-orange);
        font-weight: bold;
      }

      vaadin-button {
        font-size: 12px;
        padding: 4px 10px;
      }
      .action-wrapper {
        display: flex;
        gap: 5px;
      }
    `;
  }

  static properties = {
    items: {type: Array},
  };

  constructor() {
    super();
    this.items = [];
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items} all-rows-visible>
        <vaadin-grid-column
          path="firstName"
          .headerRenderer=${(root) => (root.textContent = msg('First Name'))}
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="lastName"
          .headerRenderer=${(root) => (root.textContent = msg('Last Name'))}
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="dateOfEmployment"
          .headerRenderer=${(root) =>
            (root.textContent = msg('Date of Employment'))}
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="dateOfBirth"
          .headerRenderer=${(root) => (root.textContent = msg('Date of Birth'))}
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="phone"
          .headerRenderer=${(root) => (root.textContent = msg('Phone'))}
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="email"
          .headerRenderer=${(root) => (root.textContent = msg('Email'))}
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="department"
          .headerRenderer=${(root) => (root.textContent = msg('Department'))}
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="position"
          .headerRenderer=${(root) => (root.textContent = msg('Position'))}
          auto-width
        ></vaadin-grid-column>

        <vaadin-grid-column
          auto-width
          .headerRenderer=${(root) => (root.textContent = msg('Actions'))}
          .renderer=${(root, _, rowData) => {
            if (!root.firstChild) {
              const wrapper = document.createElement('div');
              wrapper.className = 'action-wrapper';
              const editButton = document.createElement('va-button');
              editButton.setAttribute('icon', 'edit');
              editButton.setAttribute('variant', 'icon');
              editButton.addEventListener('click', () => {
                Router.go(`/edit/${rowData.item.id}`);
              });
              const deleteButton = document.createElement('va-button');
              deleteButton.setAttribute('icon', 'trash');
              deleteButton.setAttribute('variant', 'icon');
              deleteButton.addEventListener('click', () => {
                const employee = rowData.item;
                store.dispatch(
                  openModal({
                    title: msg(
                      'Are you sure you want to delete this employee?'
                    ),
                    description: `${msg(
                      'Selected employee record will be deleted'
                    )}: ${employee.firstName} ${employee.lastName}`,
                    isConfirmModal: true,
                    payload: {id: rowData.item.id},
                  })
                );
              });
              wrapper.appendChild(editButton);
              wrapper.appendChild(deleteButton);

              root.appendChild(wrapper);
            }
          }}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}

window.customElements.define('va-table', VaTable);
