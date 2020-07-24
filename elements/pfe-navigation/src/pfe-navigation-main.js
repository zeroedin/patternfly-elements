import PFElement from "../../pfelement/dist/pfelement.js";

class PfeNavigationMain extends PFElement {
  static get tag() {
    return "pfe-navigation-main";
  }

  get templateUrl() {
    return "pfe-navigation-main.html";
  }

  get styleUrl() {
    return "pfe-navigation-main.scss";
  }

  set isAccordion(state) {
    if (state) this._buildAccordion();
    else {
      console.log("reset");
      if (this.accordion) {
        this.accordion.setAttribute("hidden", "");
      }
      if (this.list) {
        this.list.removeAttribute("hidden");
      }
    }
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["show_content"];
  }

  constructor() {
    super(PfeNavigationMain);

    this.isAccordion = false;
    this.accordionId = this.randomId;
    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.accordionId =
      this.id || this.getAttribute("pfe-id") || this.accordionId;
    this.list = this.querySelector("ul");

    this._init();

    this.accordion = this.querySelector(`[pfe-id="${this.accordionId}"]`);

    // Add a slotchange listener to the lightDOM trigger
    this.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    this.removeEventListener("slotchange", this._init);
  }

  _init() {
    // Get all the nested navigation items
    this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

    // Find the first nested element
    this.first = this.navItems.length > 0 ? this.navItems[0] : null;
    // Find the last nested element
    this.last = this.navItems[this.navItems.length - 1];

    // Ensure the necessary a11y is set
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main");

    // For each nested navigation item, tag it with context
    this.navItems.forEach(item => {
      item.nested = true;
    });

    // Tag the first and last navigation items for styling in mobile
    if (this.first) this.first.setAttribute("first", "");
    if (this.last) this.last.setAttribute("last", "");
  }

  _buildAccordion() {
    let accordion;

    // Use the existing accordion if it exists
    const existingAccordion = this.querySelector(
      `[pfe-id="${this.accordionId}"]`
    );

    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();

    // Create the accordion wrapper component or use the existing component
    if (!existingAccordion) {
      // Create the accordion wrapper component with a unique ID
      accordion = document.createElement("pfe-accordion");
      accordion.setAttribute("pfe-id", this.accordionId);
    } else {
      accordion = existingAccordion;
    }

    // Find navigation items
    this.navItems.forEach(item => {
      [...item.children].forEach(child => {
        // If one of them has the attribute indicating they belong in the header region
        if (child.getAttribute("slot") === "trigger") {
          const header = document.createElement("pfe-accordion-header");

          header.appendChild(child);
          accordion.appendChild(header);
        }

        if (child.getAttribute("slot") === "tray") {
          const panel = document.createElement("pfe-accordion-panel");

          [...child.children].map(c => panel.appendChild(c));
          accordion.appendChild(panel);
        }
      });
    });

    if (!existingAccordion) {
      fragment.appendChild(accordion);
      this.appendChild(fragment);
      // Hide the list
      this.list.setAttribute("hidden", "");
    }
  }
}

export default PfeNavigationMain;
