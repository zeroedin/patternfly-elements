import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCarouselSlide extends PFElement {
  static get tag() {
    return "pfe-carousel-slide";
  }

  get schemaUrl() {
    return "pfe-carousel-slide.json";
  }

  get templateUrl() {
    return "pfe-carousel-slide.html";
  }

  get styleUrl() {
    return "pfe-carousel-slide.scss";
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
    super(PfeCarouselSlide, { type: PfeCarouselSlide.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.addEventListener(PfeCarouselSlide.events.slide, this._slideHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(PfeCarouselSlide.events.slide, this._slideHandler);
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _slideHandler(event) {
    this.emitEvent(PfeCarouselSlide.events.slide, {
      detail: {}
    });
  }
}

PFElement.create(PfeCarouselSlide);

export default PfeCarouselSlide;
