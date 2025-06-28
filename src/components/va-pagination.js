import '@vaadin/select';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import './va-pagination-button';
import {html, LitElement, css} from 'lit';

export class VaPagination extends LitElement {
  static styles = css`
    vaadin-horizontal-layout {
      width: 100%;
      justify-content: center;
    }
  `;
  static properties = {
    totalItemCount: {type: Number},
    pageSize: {type: Number},
    currentPage: {state: true},
  };

  constructor() {
    super();
    this.totalItemCount = 0;
    this.pageSize = 0;
    this.currentPage = 1;
  }
  get pageCount() {
    return Math.ceil(this.totalItemCount / this.pageSize);
  }

  handleClick(page) {
    this.currentPage = page;
    this._dispatchPageChange();
  }

  handlePrev() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this._dispatchPageChange();
    }
  }

  handleNext() {
    if (this.currentPage < this.pageCount) {
      this.currentPage += 1;
      this._dispatchPageChange();
    }
  }
  _dispatchPageChange() {
    this.dispatchEvent(
      new CustomEvent('page-changed', {
        detail: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
  _renderPages() {
    const buttons = [];
    const isMobile = window.innerWidth < 768;
    const maxVisiblePages = isMobile ? 3 : 6;

    const total = this.pageCount;
    const current = this.currentPage;

    if (total <= maxVisiblePages) {
      for (let i = 1; i <= total; i++) {
        buttons.push(this._renderPageButton(i));
      }
    } else {
      const sideCount = Math.floor((maxVisiblePages - 2) / 2);
      let start = Math.max(2, current - sideCount);
      let end = Math.min(total - 1, current + sideCount);

      if (current + sideCount >= total) {
        start = Math.max(2, total - (maxVisiblePages - 2));
        end = total - 1;
      }

      if (current - sideCount <= 1) {
        start = 2;
        end = Math.min(total - 1, 1 + (maxVisiblePages - 2));
      }

      buttons.push(this._renderPageButton(1));

      if (start > 2) {
        buttons.push(this._renderDots());
      }

      for (let i = start; i <= end; i++) {
        buttons.push(this._renderPageButton(i));
      }

      if (end < total - 1) {
        buttons.push(this._renderDots());
      }

      buttons.push(this._renderPageButton(total));
    }

    return buttons;
  }

  _renderPageButton(i) {
    return html`<va-pagination-button
      .label="${i.toString()}"
      ?active=${this.currentPage === i}
      @click=${() => this.handleClick(i)}
    ></va-pagination-button>`;
  }

  _renderDots() {
    return html`<va-pagination-button
      label="..."
      @click=${() => {
        const nextSet = Math.min(this.pageCount, this.currentPage + 3);
        this.currentPage = nextSet;
        this._dispatchPageChange();
      }}
    ></va-pagination-button>`;
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing padding">
        <va-pagination-button
          icon="angle-left"
          ?disabled=${this.currentPage === 1}
          .onClick=${this.handlePrev.bind(this)}
        ></va-pagination-button>
        ${this._renderPages()}
        <va-pagination-button
          icon="angle-right"
          ?disabled=${this.currentPage === this.pageCount}
          .onClick=${this.handleNext.bind(this)}
        ></va-pagination-button>
      </vaadin-horizontal-layout>
    `;
  }
}
window.customElements.define('va-pagination', VaPagination);
