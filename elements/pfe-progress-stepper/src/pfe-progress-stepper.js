// Import polyfills: findIndex
import "./polyfills--pfe-progress-stepper.js";
import PFElement from "../../pfelement/dist/pfelement.js";
import "./pfe-progress-stepper-item.js";
class PfeProgressStepper extends PFElement {
  static get tag() {
    return "pfe-progress-stepper";
  }

  static get meta() {
    return {
      title: "Progress stepper",
      description:
        "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
    };
  }

  get templateUrl() {
    return "pfe-progress-stepper.html";
  }

  get styleUrl() {
    return "pfe-progress-stepper.scss";
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
    return {
      vertical: { type: Boolean, default: false, cascade: ["pfe-progress-stepper-item"] }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeProgressStepper, { type: PfeProgressStepper.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    this._build();
  }

  disconnectedCallback() {}

  _build() {
    const stepperItems = [...this.querySelectorAll("pfe-progress-stepper-item")];
    // find what child item has the active state
    const activeItemIndex = stepperItems.findIndex(element => element.hasAttribute("current"));
    if (activeItemIndex >= 0) {
      // Calculate the width of the progress bar.
      const width = (activeItemIndex / (stepperItems.length - 1)) * 100 + "%";
      if (this.vertical) {
        console.log(width);
        this.shadowRoot.querySelector(".pfe-progress-stepper__progress-bar-fill").style.height = width;
      } else {
        this.shadowRoot.querySelector(".pfe-progress-stepper__progress-bar-fill").style.width = width;
      }
    }

    // Add spacing to the each of the items except for the top item
    // @todo we have to do it in javascript until everyone supports
    // targeting siblings in :slotted. i.e. slot:slotted(pfe-progress-stepper-item + pfe-progress-stepper-item) { margin-top }
    if (this.vertical) {
      stepperItems.forEach((item, index) => {
        if (index === stepperItems.length - 1) return;
        // @todo this needs to bee dynamic
        item.style.minHeight = "75px";
      });
    }
  }
}

PFElement.create(PfeProgressStepper);

export default PfeProgressStepper;
