import {LitElement, html, css} from 'lit';
import '../components/va-form.js';
import '@vaadin/vertical-layout';
import {updateWhenLocaleChanges, msg} from '@lit/localize';
import {store} from '../store/store.js';
import {selectEmployeeById} from '../store/employee-slice.js';

export class EditPage extends LitElement {
  static get styles() {
    return css`
      vaadin-vertical-layout {
        align-items: inherit;
        padding: var(--lumo-space-m);
      }
      h2 {
        margin-bottom: 24px;
        color: var(--color-orange);
        font-weight: bold;
      }
    `;
  }
  static properties = {
    employeeId: {type: String},
    employeeData: {state: true},
  };
  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.employeeId = '';
    this.employeeData = {};
  }
  onBeforeEnter(location) {
    this.employeeId = location.params.id;
    const state = store.getState();
    this.employeeData = selectEmployeeById(state, parseInt(this.employeeId));
    this.requestUpdate();
  }

  render() {
    return html`
      <vaadin-vertical-layout>
        <h2>
          ${msg('Edit Employee')}: ${this.employeeData?.firstName}
          ${this.employeeData?.lastName}
        </h2>
        ${this.employeeData
          ? html`
              <va-form
                .employeeId=${this.employeeId}
                .initialData=${this.employeeData}
              ></va-form>
            `
          : null}
      </vaadin-vertical-layout>
    `;
  }
}

window.customElements.define('edit-page', EditPage);
