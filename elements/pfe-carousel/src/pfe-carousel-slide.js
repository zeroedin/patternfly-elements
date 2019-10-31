import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCarouselSlide extends PFElement {
  static get tag() {
    return "pfe-carousel-slide";
  }

  get templateUrl() {
    return "pfe-carousel-slide.html";
  }

  get styleUrl() {
    return "pfe-carousel-slide.scss";
  }

  get schemaUrl() {
    return "pfe-carousel-slide.json";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeCarouselSlide);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeCarouselSlide);

export default PfeCarouselSlide;
