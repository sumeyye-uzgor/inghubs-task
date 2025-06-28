import {LitElement, html, css} from 'lit';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column.js';
import '@vaadin/scroller';
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
    `;
  }

  static properties = {
    items: {type: Array},
  };

  constructor() {
    super();
    this.items = [
      {
        firstName: 'Ahmet',
        lastName: 'Uzgor',
        dateOfEmployment: '1.1.2024',
        dateOfBirth: '10.12.1996',
        phone: '5456100883',
        email: 'ahmetuzgor10@gmail.com',
        department: 'IT',
        position: 'TeamLead',
      },
      {
        firstName: 'Sumeyye',
        lastName: 'Uzgor',
        dateOfEmployment: '1.1.2024',
        dateOfBirth: '29.06.1996',
        phone: '5435204116',
        email: 'sumeyyeuzgor@gmail.com',
        department: 'IT',
        position: 'Expert Dev',
      },
    ];
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items} all-rows-visible>
        <vaadin-grid-column path="firstName" header="First Name" auto-width>
        </vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last Name" auto-width>
        </vaadin-grid-column>
        <vaadin-grid-column
          path="dateOfEmployment"
          header="Date of Employment"
          auto-width
        >
        </vaadin-grid-column>
        <vaadin-grid-column
          path="dateOfBirth"
          header="Date of Birth"
          auto-width
        >
        </vaadin-grid-column>
        <vaadin-grid-column path="phone" header="Phone" auto-width>
        </vaadin-grid-column>
        <vaadin-grid-column path="email" header="Email" auto-width>
        </vaadin-grid-column>
        <vaadin-grid-column path="department" header="Department" auto-width>
        </vaadin-grid-column>
        <vaadin-grid-column path="position" header="Position" auto-width>
        </vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          header="Aksiyonlar"
          .renderer=${(root, column, rowData) => {
            if (!root.firstChild) {
              const wrapper = document.createElement('div');
              wrapper.innerHTML = `
          <va-button icon="edit" variant="icon" color="orange"></va-button>
          <va-button icon="trash" variant="icon" color="orange"></va-button>
        `;
              root.appendChild(wrapper);
            }
          }}
        >
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  _onClick() {
    // this.count++;
    // this.dispatchEvent(new CustomEvent('count-changed'));
    console.log('button clicked');
  }
}

window.customElements.define('va-table', VaTable);
