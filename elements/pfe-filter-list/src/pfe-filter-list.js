import PFElement from "../../pfelement/dist/pfelement.js";

class PfeFilterList extends PFElement {
  static get tag() {
    return "pfe-filter-list";
  }

  get templateUrl() {
    return "pfe-filter-list.html";
  }

  get styleUrl() {
    return "pfe-filter-list.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeFilterList);
    // Initial setup, scan the light dom, store initial state
    this._init = this._init.bind(this); 
    // Cut the filters into two lists, one initially visible, the other in a collapse panel
    this._divideList = this._divideList.bind(this);
    // Update the DOM with the most recent data
    this._updateFilters = this._updateFilters.bind(this);
    // When a filter is checked or unchecked, remove it from it's place in the list,
    // append it to the proper array and update the number of items checked
    this._checkSelected = this._checkSelected.bind(this);
    // Go back to the initial state
    this._resetState = this._resetState.bind(this);
    // When a slot changes, update the filters
    this.addEventListener("slotchange", _updateFilters);
    // Handle when an input is checked
    inputs.addEventListener("onchange", _checkSelected);
    // Handle when a "clear all button is pressed"
    clearBtn.addEventListener("click", _resetState);

    //@TODO methods for handling what the user puts into a searchbar

    // https://www.w3.org/TR/wai-aria-practices/#checkbox
    // Reference for WAI best practices for accessibility
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this);
    this.list = this.shadowRoot.querySelector(".pfe-filter-list__body");
    console.log(this.list);
    // this.list = document.querySelector('#filter-list');
    // let user_provided_list = this._compileList();

    // Call init here, but be conscious that components don't always setup perfectly the first time

  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}

  // _compileList() {
  //   let list_items = this.list.querySelectorAll('#filter-list > li > label');
  //   let list_item_content = [];

  //   list_items.forEach( item => {
  //     list_item_content.push(item.textContent);
  //   })

  //   return list_item_content;
  // }


}

PFElement.create(PfeFilterList);

export default PfeFilterList;
