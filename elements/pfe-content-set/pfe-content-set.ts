/* eslint-disable no-console */

import { LitElement, html, svg } from 'lit';

// Removed state
import { customElement, property } from 'lit/decorators.js';

// import { ComposedEvent } from '@patternfly/pfe-core';

// Removed initializer
import { pfelement, observed, bound } from '@patternfly/pfe-core/decorators.js';
// import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import style from './pfe-content-set.scss';

// import { getRandomId } from '../functions/random.js';

@customElement('pfe-contentset') @pfelement()
export class PfeContentSet extends LitElement {
  // Setting up default PFE properties
  static readonly styles = [style];
  private logger = new Logger(this);

  private _resizeTimeout?: number;
  private _observer = new MutationObserver(this._mutationHandler);

  /** Index of the selected tab */
  @property({ type: Number, reflect: true, attribute: 'selected-index' }) selectedIndex?: number;

  /** Tab alignment */
  @property({ type: String, reflect: true, attribute: 'tab-align' }) tabAlign?: 'center';

  /** Tab History */
  @property({ type: Boolean, reflect: true, attribute: 'tab-history' }) tabHistory = false;

  // Consider revisiting
  /** Variant */
  @property({ type: String, reflect: true }) variant: 'wind'|'earth' = 'wind';
  /** Disclosure */
  @property({ type: String, reflect: true }) disclosure?: 'true'|'false';

  /** Custom breakpoint */
  @observed
  @property({ type: String, reflect: true }) breakpoint = '700';

  @observed
  @property() align?: 'center';

  get breakpointValue() {
    return parseInt(this.breakpoint.replace(/\D/g, ''));
  }

  /**
   * Whether or not this component contains any light DOM.
   */
  hasLightDOM(): boolean {
    return this.children.length > 0 || (this.textContent ?? '').trim().length > 0;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = window.setTimeout(this._resizeHandler, 100);
    });
  }

  render() {
    return html`<slot></slot>`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('resize', () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = window.setTimeout(this._resizeHandler, 100);
    });
  }

  @bound private _resizeHandler() {
    console.log('_resizeHandler');
  }

  /**
   * Mutation handler
   * Read in and parse the mutation list, rebuilding as necessary
   */
   @bound private _mutationHandler(mutationsList?: MutationRecord[]) {
    if (mutationsList) {
      for (const mutation of mutationsList) {
        console.log(mutation);
      }

      return;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-content-set': PfeContentSet;
  }
}
