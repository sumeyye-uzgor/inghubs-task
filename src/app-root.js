import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import './pages/homepage.js';
import './pages/add-page.js';
import './pages/edit-page.js';

import './components/va-navbar.js';

import {setLocale} from './utils/localization.js';

export class AppRoot extends LitElement {
  firstUpdated() {
    setLocale('en');
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes([
      {path: '/', component: 'home-page'},
      {path: '/add', component: 'add-page'},
      {path: '/edit', component: 'edit-page'},
    ]);
  }

  render() {
    return html`
      <va-navbar></va-navbar>
      <div id="outlet"></div>
    `;
  }
}

window.customElements.define('app-root', AppRoot);
