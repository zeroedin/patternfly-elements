import PFElement from "../pfelement/pfelement.js";

class PfeHeading extends PFElement {
  static get tag() {
    return "pfe-heading";
  }

  get templateUrl() {
    return "pfe-heading.html";
  }

  get styleUrl() {
    return "pfe-heading.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeHeading);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeHeading);

export default PfeHeading;
