import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import './pages/homepage.js';
import './pages/aboutpage.js';

export class AppRoot extends LitElement {
  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes([
      {path: '/', component: 'home-page'},
      {path: '/about', component: 'about-page'},
    ]);
  }

  render() {
    return html`
      <nav>
        <a href="/">Home</a> |
        <a href="/about">About</a>
      </nav>
      <div id="outlet"></div>
    `;
  }
}

window.customElements.define('app-root', AppRoot);
