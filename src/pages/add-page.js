import {LitElement, html, css} from 'lit';
import '../components/va-form.js';
import {updateWhenLocaleChanges, msg} from '@lit/localize';
import '@vaadin/vertical-layout';

export class AddPage extends LitElement {
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

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <vaadin-vertical-layout>
        <h2>${msg('Add Employee')}</h2>
        <va-form></va-form>
      </vaadin-vertical-layout>
    `;
  }
}

window.customElements.define('add-page', AddPage);
