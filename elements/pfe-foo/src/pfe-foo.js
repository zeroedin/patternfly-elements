// Documentation for building can be found at: https://patternflyelements.com/docs/develop/javascript/

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeFoo extends PFElement {
  static get tag() {
    return "pfe-foo";
  }

  static get meta() {
    return {
      title: "Foo",
      description: ""
    };
  }

  get templateUrl() {
    return "pfe-foo.html";
  }

  get styleUrl() {
    return "pfe-foo.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeFoo, { type: PfeFoo.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {}
}

PFElement.create(PfeFoo);

export default PfeFoo;
