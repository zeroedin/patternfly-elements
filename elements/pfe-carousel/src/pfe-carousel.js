import PFElement from "../../pfelement/dist/pfelement.js";
import PfeCarouselSlide from "./pfe-carousel-slide.js";

class PfeCarousel extends PFElement {
  static get tag() {
    return "pfe-carousel";
  }

  get templateUrl() {
    return "pfe-carousel.html";
  }

  get styleUrl() {
    return "pfe-carousel.scss";
  }

  get schemaUrl() {
    return "pfe-carousel.json";
  }

  set show_indicators (show) {
    if (show) {
      this.classList.add("show_indicators");
    } else {
      this.classList.remove("show_indicators");
    }
  }

  get show_indicators () {
    return this.classList.contains("show_indicators");
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeCarousel);

    this.show_indicators = false;
    this.babies = [];

    [...this.children].map(child => {
      if (child.tagName.toLowerCase() !== PfeCarouselSlide.tag) {
        console.error("Children of the carousel must be slides.");
      } else {
        this.babies.push(child);
      }
    });

    console.log(this.babies);

    if (this.babies.length > 1) {
      this.show_indicators = true;
    }

    this.click = this.click.bind();
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.show_indicators) {
      this.addEventListener("click", this.click);
    }
  }

  click(event) {
    event.preventDefault();
    alert("Click!");
  }

  disconnectedCallback() {
    if (this.show_indicators) {
      this.removeEventListener("click", this.click);
    }
  }

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeCarousel);

export default PfeCarousel;
