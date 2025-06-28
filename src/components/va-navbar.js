import {LitElement, html, css} from 'lit';
import '../components/va-button.js';
import {msg} from '@lit/localize';
import {setLocale, getLocale} from '../utils/localization.js';

export class VaNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 12px 24px;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo {
      height: 28px;
      width: 28px;
    }

    .brand {
      font-weight: bold;
      color: #333;
      font-size: 18px;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .flag {
      width: 28px;
      height: 20px;
      object-fit: contain;
      border-radius: 2px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: border 0.3s ease;
    }

    va-button[variant='tertiary'] {
      font-weight: 500;
      font-size: 14px;
      padding: 0;
    }

    .faded {
      opacity: 0.4;
    }
  `;

  static properties = {
    activePage: {state: true},
    currentLang: {state: true},
  };

  constructor() {
    super();
    this.activePage = window.location.pathname;
    this.currentLang = getLocale();
  }

  connectedCallback() {
    super.connectedCallback();
    this._onLocationChange = () => {
      this.activePage = window.location.pathname;
    };
    window.addEventListener(
      'vaadin-router-location-changed',
      this._onLocationChange
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      'vaadin-router-location-changed',
      this._onLocationChange
    );
  }

  render() {
    return html`
      <div class="navbar">
        <div class="navbar-left">
          <img src="logo.png" alt="ING Logo" class="logo" />
          <span class="brand">ING</span>
        </div>

        <div class="navbar-right">
          <va-button
            variant="tertiary"
            icon="user"
            .label=${msg('Employees')}
            @click=${() => (window.location.href = '/')}
            ?color=${this.activePage === '/' ? 'orange' : ''}
            class=${this.activePage === '/add' || this.activePage === '/edit'
              ? 'faded'
              : ''}
          ></va-button>

          <va-button
            variant="tertiary"
            icon="plus"
            .label=${msg('Add Employee')}
            @click=${() => (window.location.href = '/add')}
            ?color=${this.activePage === '/add' ? 'orange' : ''}
            class=${this.activePage === '/' || this.activePage === '/edit'
              ? 'faded'
              : ''}
          ></va-button>

          ${this.currentLang === 'en'
            ? html`
                <img
                  src="tr_flag.png"
                  alt="TR"
                  class="flag"
                  @click=${async () => {
                    console.log('onClick', getLocale());
                    await setLocale('tr');
                    this.currentLang = 'tr';
                  }}
                />
              `
            : html`
                <img
                  src="en_flag.png"
                  alt="EN"
                  class="flag"
                  @click=${async () => {
                    console.log('onClick', getLocale());
                    await setLocale('en');
                    this.currentLang = 'en';
                  }}
                />
              `}
        </div>
      </div>
    `;
  }
}

customElements.define('va-navbar', VaNavbar);
