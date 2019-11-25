import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeSelect 1.0.0-prerelease.31
 * @license
 * Copyright 2019 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

// Object.assign needs a polyfill as its not supported in IE11
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

class PfeSelect extends PFElement {
  static get version() {
    return "1.0.0-prerelease.31";
  }

  get html() {
    return `<style>:host{--pfe-select--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-select--Color:var(--pfe-theme--color--text, #333);--pfe-select--BorderBottomColor:var(--pfe-theme--color--surface--darker, #464646);--pfe-select--BorderBottomColor--hover:var(--pfe-theme--color--link, #06c);--pfe-select--BorderBottomColor--error:var(--pfe-theme--color--feedback--critical, #bb0000);--pfe-select--BorderColor:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-select--BorderWidth:var(--pfe-theme--ui--border-width, 1px);--pfe-select--BorderBottomWidth:var(--pfe-theme--ui--border-width, 1px);--pfe-select--BorderTop:var(--pfe-select--BorderWidth) var(--pfe-theme--ui--border-style, solid) var(--pfe-select--BorderColor);--pfe-select--BorderLeft:var(--pfe-select--BorderWidth) var(--pfe-theme--ui--border-style, solid) var(--pfe-select--BorderColor);--pfe-select--BorderRight:var(--pfe-select--BorderWidth) var(--pfe-theme--ui--border-style, solid) var(--pfe-select--BorderColor);--pfe-select--BorderBottom:var(--pfe-select--BorderBottomWidth) var(--pfe-theme--ui--border-style, solid) var(--pfe-select--BorderBottomColor);--pfe-select--BorderBottom--hover:var(--pfe-select--BorderBottomWidth) var(--pfe-theme--ui--border-style, solid) var(--pfe-select--BorderBottomColor--hover);position:relative;display:inline-block;width:100%;line-height:1.5em;font-weight:400;text-align:left;text-rendering:optimizelegibility;border-top:var(--pfe-select--BorderTop);border-right:var(--pfe-select--BorderRight);border-bottom:var(--pfe-select--BorderBottom);border-left:var(--pfe-select--BorderLeft);background-color:var(--pfe-select--BackgroundColor);color:var(--pfe-select--Color)}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host::after{border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:6px 6px 0;border-color:transparent;border-top-color:#131313;-webkit-transform:rotate(0);transform:rotate(0);display:inline-block;content:"";position:absolute;top:calc(16px * .875);top:calc(var(--pfe-theme--container-padding,16px) * .875);right:calc(16px * .75);right:calc(var(--pfe-theme--container-padding,16px) * .75)}:host([hidden]){display:none}:host(:hover){border-bottom:var(--pfe-select--BorderBottom--hover)}:host(:focus-within){border-bottom-width:calc(4px / 2);border-bottom-width:calc(var(--pfe-theme--surface--border-width--heavy,4px)/ 2);border-bottom-color:var(--pfe-select--BorderBottomColor--hover)}:host(:focus-within) ::slotted(select){padding-bottom:calc(1rem * .438);padding-bottom:calc(var(--pfe-theme-container-padding,1rem) * .438)}:host ::slotted(select){text-rendering:auto!important;background-color:var(--pfe-select--BackgroundColor);color:var(--pfe-select--Color);border-radius:0;width:100%;min-width:100%;font-size:16px;font-size:var(--pfe-theme--font-size,16px);font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-shadow:none;box-shadow:none;border:none;padding:calc(16px * .5);padding:calc(var(--pfe-theme--container-padding,16px) * .5);padding-right:calc(16px * 1.5);padding-right:calc(var(--pfe-theme--container-padding,16px) * 1.5)}:host([pfe-invalid]){border-bottom-width:calc(4px / 2);border-bottom-width:calc(var(--pfe-theme--surface--border-width--heavy,4px)/ 2);border-bottom-color:var(--pfe-select--BorderBottomColor--error)}:host([pfe-invalid]) ::slotted(select){padding-bottom:calc(16px * .438);padding-bottom:calc(var(--pfe-theme--container-padding,16px) * .438);background-image:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23c9190b' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E");background-size:.875rem;background-repeat:no-repeat;background-position:calc(100% - calc(16px * 2)) center;background-position:calc(100% - calc(var(--pfe-theme--container-padding,16px) * 2)) center}
/*# sourceMappingURL=pfe-select.min.css.map */
</style><slot></slot>`;
  }
  static get tag() {
    return "pfe-select";
  }

  get templateUrl() {
    return "pfe-select.html";
  }

  get styleUrl() {
    return "pfe-select.scss";
  }

  get pfeOptions() {
    return this._pfeOptions;
  }

  set pfeOptions(options) {
    this._pfeOptions = options.filter(el => el.selected).length > 1 ? this._handleMultipleSelectedValues(options) : options;
    this._modifyDOM();
  }

  get pfeInvalid() {
    return this.getAttribute('pfe-invalid');
  }

  set pfeInvalid(invalidAttr) {
    if (!invalidAttr) {
      return;
    }
    this.querySelector('select').setAttribute('aria-invalid', invalidAttr);
  }

  static get observedAttributes() {
    return ["pfe-invalid"];
  }

  constructor() {
    super(PfeSelect);
    this._pfeOptions = null;
    this._init = this._init.bind(this);
    this._inputChanged = this._inputChanged.bind(this);

    this.observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();
    customElements.whenDefined(PfeSelect.tag).then(() => {
      if (this.pfeOptions) {
        this._modifyDOM();
        this._init();
      } else {
        if (this.children.length) {
          this._init();
        } else {
          console.warn(`${PfeSelect.tag}: The first child in the light DOM must be a supported select tag`);
        }
      }
    });
    this.observer.observe(this, { childList: true });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    this.pfeInvalid = newValue;
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this._input.removeEventListener("input", this._inputChanged);
  }

  addOptions(options) {
    // Reset the pfeOptions by concatenating newly added options with _pfeOptions
    this._pfeOptions = this._pfeOptions ? this._pfeOptions.concat(options) : options;
  }

  _handleMultipleSelectedValues(options) {
    // Warn if options array has more than one selected value set as true
    console.warn(`${PfeSelect.tag}: The first 'selected' option will take precedence over others incase of multiple 'selected' options`);
    // Get the index of the first element with selected "true"
    const firstIndex = options.findIndex(el => el.selected);
    // Update the options array with precedence to first element with selected value as true
    return options.map((el, idx) => {
      el.selected = firstIndex == idx;
      return el;
    });
  }

  _init() {
    this._input = this.querySelector("select");
    if (!this._input) {
      console.warn(`${PfeSelect.tag}: The first child needs to be a select element`);
      return;
    }
    this._input.addEventListener("change", this._inputChanged);
  }

  _inputChanged() {
    this.dispatchEvent(new CustomEvent(`${this.tag}:change`, {
      detail: { value: this._input.value },
      bubbles: true,
      composed: true
    }));
  }

  _modifyDOM() {
    // Create select element
    let pfeSelect = document.createElement('select');
    // Create option element for each element in _pfeOptions array
    this._pfeOptions.map(el => {
      const option = Object.assign(document.createElement('option') , el);
      pfeSelect.add(option, null);
    });
    // if select already exists in the DOM then replace the old select with the new _pfeOptions array
    if (this.children.length) {
      const select = this.querySelector('select');
      select.parentNode.replaceChild(pfeSelect, select);
    } else {
      // Otherwise create a new select element
      this.appendChild(pfeSelect);
    }
  }

}

PFElement.create(PfeSelect);

export default PfeSelect;
//# sourceMappingURL=pfe-select.js.map
