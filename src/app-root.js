import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';

import './pages/home-page.js';
import './pages/add-page.js';
import './pages/edit-page.js';
import './components/va-navbar.js';

export class AppRoot extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');

    const router = new Router(outlet);
    router.setRoutes([
      {path: '/', component: 'home-page'},
      {path: '/add', component: 'add-page'},
      {path: '/edit/:id', component: 'edit-page'},
    ]);
  }

  render() {
    return html`
      <va-navbar></va-navbar>
      <div id="outlet"></div>
    `;
  }
}

customElements.define('app-root', AppRoot);
