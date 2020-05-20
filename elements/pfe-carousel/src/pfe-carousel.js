import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCarousel extends PFElement {
  static get tag() {
    return "pfe-carousel";
  }

  get schemaUrl() {
    return "pfe-carousel.json";
  }

  get templateUrl() {
    return "pfe-carousel.html";
  }

  get styleUrl() {
    return "pfe-carousel.scss";
  }

  static get events() {
    return {
      slide: `${this.tag}:slide`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["pfe-color", "pfe-img-src"];
  }

  constructor() {
    super(PfeCarousel, { type: PfeCarousel.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.addEventListener(PfeCarousel.events.slide, this._slideHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(PfeCarousel.events.slide, this._slideHandler);
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _slideHandler(event) {
    this.emitEvent(PfeCarousel.events.slide, {
      detail: {}
    });
  }
}

PFElement.create(PfeCarousel);

export default PfeCarousel;
