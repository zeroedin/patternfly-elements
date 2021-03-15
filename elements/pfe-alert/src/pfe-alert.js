import PFElement from "../../pfelement/dist/pfelement.js";
// import "../../pfe-icon/dist/pfe-icon.js";

class PfeAlert extends PFElement {
  static get tag() {
    return "pfe-alert";
  }

  static get meta() {
    return {
      title: "Alert",
      description:
        "Notify the user about a change in status or other event without blocking other actions in an interface."
    };
  }

  get templateUrl() {
    return "pfe-alert.html";
  }

  get styleUrl() {
    return "pfe-alert.scss";
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
      ...super.properties,
      variant: { type: String, default: "default" },
      inline: { type: Boolean, default: false },
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeAlert, { type: PfeAlert.PfeType });
    // this.variant = this.hasAttribute("type") ? this.getAttribute("type") : "default";
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    this.variant = "default";
  }

  disconnectedCallback() {}

  renderIcon() {
    console.log(this.variant);
    return `<pfe-icon icon="web-icon-close" size="1x"></pfe-icon>`;
  }
}

PFElement.create(PfeAlert);

export default PfeAlert;
