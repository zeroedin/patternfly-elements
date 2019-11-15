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

    this.list = document.querySelector('#filter-list');
    let user_provided_list = this._compileList();
    
  }

  connectedCallback() {
    super.connectedCallback();
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}

  _compileList() {
    let list_items = this.list.querySelectorAll('#filter-list > li > label');
    let list_item_content = [];

    list_items.forEach( item => {
      list_item_content.push(item.textContent);
    })

    return list_item_content;
    }


}

PFElement.create(PfeFilterList);

export default PfeFilterList;
