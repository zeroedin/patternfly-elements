import PFElement from "../../pfelement/dist/pfelement.js";

const pfeJumpLinksNavObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
};

const pfeJumpLinksPanelObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
};

class PfeJumpLinks extends PFElement {
  static get tag() {
    return "pfe-jump-links";
  }

  get schemaUrl() {
    return "pfe-jump-links.json";
  }

  get templateUrl() {
    return "pfe-jump-links.html";
  }

  get styleUrl() {
    return "pfe-jump-links.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeJumpLinks, { type: PfeJumpLinks.PfeType });
  }
}

class PfeJumpLinksNav extends PFElement {
  static get tag() {
    return "pfe-jump-links-nav";
  }

  get schemaUrl() {
    return "pfe-jump-links-nav.json";
  }

  get templateUrl() {
    return "pfe-jump-links-nav.html";
  }

  get styleUrl() {
    return "pfe-jump-links-nav.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType });
    this._buildNav = this._buildNav.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._menuContainer = this.shadowRoot.querySelector("#container");
    this._observer = new MutationObserver(this._mutationCallback);
    this._reportHeight = this._reportHeight.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);
    this._closeAccordion = this._closeAccordion.bind(this);

    window.addEventListener("resize", () => {});
  }

  connectedCallback() {
    super.connectedCallback();
    this.panel = document.querySelector(`[pfe-c-scrolltarget=${this.id}]`);

    //Check that the light DOM is there
    if (this.hasAttribute("autobuild") || this.hasAttribute("pfe-c-autobuild")) {
      this._buildNav();
    } else {
      //Check that the light DOM is valid
      if (this._isValidLightDom()) {
        const menu = this.querySelector("ul");
        menu.classList.add("pfe-jump-links-nav");
        console.log("Edge are you here2?");
        this._menuContainer.innerHTML = menu.outerHTML;

        let div = document.createElement("div");

        div.innerHTML = `<h2 class="sr-only" hidden>${this.getAttribute("sr-text")}</h2>`;

        if (this.getAttribute("sr-text")) {
          this.shadowRoot.querySelector("nav").prepend(div);
        }

        let html = "";
        if (this.querySelector("[slot='pfe-jump-links-nav--heading']")) {
          html = this.querySelector("[slot='pfe-jump-links-nav--heading']").cloneNode(true);
        }
        if (!this.hasAttribute("pfe-c-horizontal") && html !== "") {
          this.shadowRoot.querySelector("pfe-accordion-header").appendChild(html);
        } else {
          const heading = document.createElement("h3");
          heading.id = "pfe-jump-links-nav--heading";

          this.shadowRoot.querySelector("pfe-accordion-header").appendChild(heading);
          this.shadowRoot.querySelector("#pfe-jump-links-nav--heading").innerHTML = "Jump to section";
        }
      }
    }
    this._reportHeight();

    this._observer.observe(this, pfeJumpLinksNavObserverConfig);

    this.panel = document.querySelector(`[pfe-c-scrolltarget="${this.id}"]`);

    this.panel.addEventListener(PfeJumpLinksPanel.events.change, this._buildNav);

    this.accordion = this.shadowRoot.querySelector("pfe-accordion");
    this.links = this.shadowRoot.querySelectorAll("a");
    [...this.links].forEach(link => {
      link.addEventListener("click", this.closeAccordion);
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
    this.panel.removeEventListener(PfeJumpLinksPanel.events.change, this._buildNav);
    this.removeEventListener("click");
    [...this.links].forEach(link => {
      link.removeEventListener("click", this.closeAccordion);
    });
  }

  closeAccordion() {
    // @TODO
    // Create JSON tokens for media query breakpoints
    if (window.matchMedia("(min-width: 992px)").matches) {
      return;
    }
    setTimeout(this._closeAccordion, 750);
  }

  _closeAccordion() {
    this.shadowRoot.querySelector("pfe-accordion").collapseAll();
  }

  _rebuildNav() {
    this._buildNav();
  }

  _buildNav() {
    const buildLinkList = () => {
      let linkList = ``;
      if (!this.panel) {
        this.panel = document.querySelector(`[pfe-c-scrolltarget="${this.id}"]`);
      }
      let panelSections = this.panel.querySelectorAll(".pfe-jump-links-panel__section");

      for (let i = 0; i < panelSections.length; i++) {
        let arr = [...panelSections];
        if (arr[i].classList.contains("has-sub-section")) {
          let linkListItem = `
          <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link has-sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
            <ul class="sub-nav">
        `;
          linkList += linkListItem;
        } else if (arr[i].classList.contains("sub-section")) {
          let linkSubItem = `
        <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
        </li>`;
          if (!arr[i + 1].classList.contains("sub-section")) {
            linkSubItem += `</ul></li>`;
          }
          linkList += linkSubItem;
        } else {
          let linkListItem = `
          <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
          </li>
        `;
          linkList += linkListItem;
        }
      }
      return linkList;
    };

    let html = `
      <ul class="pfe-jump-links-nav">
        ${buildLinkList()}
    `;
    this.shadowRoot.querySelector("#container").innerHTML = html;
    let heading = document.createElement("h3");
    heading.innerHTML = "Jump to section";
    this.shadowRoot.querySelector("pfe-accordion-header").appendChild(heading);
  }

  _mutationCallback() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.hasAttribute("autobuild") || !this.hasAttribute("pfe-c-autobuild")) {
      const menu = this.querySelector("ul") || this.shadowRoot.querySelector("ul");
      console.log("Edge are you here1?");
      console.log(this._menuContainer);
      console.log(menu);
      this._menuContainer.innerHTML = menu.outerHTML;

      this.links = this.shadowRoot.querySelectorAll("a");
      [...this.links].forEach(link => {
        link.addEventListener("click", this.closeAccordion);
      });
    } else if (this.hasAttribute("autobuild") || this.hasAttribute("pfe-c-autobuild")) {
      this._buildNav();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, pfeJumpLinksNavObserverConfig);
    }
  }

  _isValidLightDom() {
    if (!this.children.length) {
      console.warn(`${PfeJumpLinks.tag}: You must have a <ul> tag in the light DOM`);
      return false;
    }
    if ((this.has_slot("logo") || this.has_slot("link")) && !this.hasAttribute("pfe-c-horizontal")) {
      console.warn(`${PfeJumpLinks.tag}: logo and link slots NOT supported in vertical jump links`);
    }
    if (this.children[1].tagName !== "UL") {
      if (!this.hasAttribute("pfe-c-horizontal")) {
        console.warn(`${PfeJumpLinks.tag}: The top-level list of links MUST be a <ul>`);
      }

      return false;
    }
    // IE11 lightweight polyfill
    Number.isInteger =
      Number.isInteger ||
      function(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
    if (Number.isInteger(Number(this.customVar))) {
      console.warn(
        "Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly."
      );
    }
    return true;
  }

  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const styles = window.getComputedStyle(this);

    let height = styles.getPropertyValue("height");
    if (window.matchMedia("(min-width: 992px)").matches) {
      height = "0px";
    }
    this.panel.style.setProperty(cssVarName, height);
  }
}

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  get schemaUrl() {
    return "pfe-jump-links-panel.json";
  }

  get templateUrl() {
    return "pfe-jump-links-panel.html";
  }

  get styleUrl() {
    return "pfe-jump-links-panel.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`
    };
  }

  get offsetValue() {
    return this.sectionMargin || parseInt(this.customVar, 10);
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["pfe-c-offset"];
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
    this._scrollCallback = this._scrollCallback.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this._makeSpacers = this._makeSpacers.bind(this);
    this._observer = new MutationObserver(this._mutationCallback);
    this.currentActive = null;
    this._isValidMarkup = this._isValidMarkup.bind(this);
    window.addEventListener("resize", this._handleResize);
  }

  connectedCallback() {
    super.connectedCallback();
    this._makeSpacers();
    this._isValidMarkup();
    this.nav = this._getNav();
    this._init();
    this.sectionMargin = this.getAttribute("pfe-c-offset");
    this.customVar = this.cssVariable("--pfe-jump-links-panel--offset") || 200;
    if (this.nav && (this.nav.hasAttribute("autobuild") || this.nav.hasAttribute("pfe-c-autobuild"))) {
      this.nav._rebuildNav();
    }

    this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
  }

  disconnectedCallback() {
    this._observer.disconnect();
    window.removeEventListener("scroll");
    this._slot.removeEventListener("slotchange", this._init);
    window.removeEventListener("resize", this._handleResize);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    switch (attr) {
      case "pfe-c-offset":
        this.sectionMargin = newVal;
        break;
    }
  }

  _isValidMarkup() {
    if (this.childElementCount === 1) {
      console.warn(
        "pfe-jump-links-panel must contain more than one child element. Having a top-level 'wrapper' will prevent appropriate styles from being applied."
      );
    }
  }

  _makeSpacers() {
    let sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    if (!sections) {
      return;
    }
    sections.forEach(section => {
      let parentDiv = section.parentNode;
      let html = document.createElement("div");
      parentDiv.insertBefore(html, section);
      let spacer = section.previousElementSibling;
      spacer.classList.add("pfe-jump-links__section--spacer");
      spacer.id = section.id;
      section.removeAttribute("id");
    });
  }

  _init() {
    window.addEventListener("scroll", this._scrollCallback);
    this.scrollTarget = this.getAttribute("pfe-c-scrolltarget");
    this.JumpLinksNav = document.querySelector(`#${this.scrollTarget}`);
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    this.menu_links;
    if (this.JumpLinksNav) {
      this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll("a");
    }
  }

  _handleResize() {
    this.nav._reportHeight();
    this.sectionMargin = this.getAttribute("pfe-c-offset");
    this.customVar = this.cssVariable("--pfe-jump-links-panel--offset") || 200;
  }

  _getNav() {
    return document.querySelector(`pfe-jump-links-nav#${this.getAttribute("pfe-c-scrolltarget")}`);
  }

  _makeActive(link) {
    if (this.menu_links[link]) {
      // Check if this is a subnav or has subsections
      if (this.menu_links[link].classList.contains("sub-section")) {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.parentNode.parentNode.setAttribute("active", "");
        this.menu_links[link].parentNode.parentNode.parentNode.classList.add("expand");
      } else if (this.menu_links[link].classList.contains("has-sub-section")) {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.setAttribute("active", "");
        this.menu_links[link].parentNode.classList.add("expand");
      } else {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.setAttribute("active", "");
      }

      let activeLink = this.JumpLinksNav.querySelector("[active]");
      this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
        detail: {
          activeNavItem: activeLink
        }
      });
    }
  }

  _removeActive(link) {
    if (this.menu_links[link]) {
      if (this.menu_links[link].classList.contains("sub-section")) {
        this.menu_links[link].parentNode.parentNode.parentNode.classList.remove("expand");
      }
      this.menu_links[link].removeAttribute("active");
      this.menu_links[link].parentNode.removeAttribute("active");
    }
  }

  _removeAllActive() {
    if (!Object.keys) {
      Object.keys = function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Object.keys called on a non-object");
        var k = [],
          p;
        for (p in obj) if (Object.prototype.hasOwnProperty.call(obj, p)) k.push(p);
        return k;
      };
      Object.keys.forEach = Array.forEach;
    }
    [...Array(this.sections.length).keys()].forEach(link => {
      this._removeActive(link);
    });
  }

  _mutationCallback() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    //If we didn't get nav in the constructor, grab it now
    if (!this.nav) {
      this.nav = document.querySelector(`pfe-jump-links-nav#${this.getAttribute("pfe-c-scrolltarget")}`);
    }
    //If we want the nav to be built automatically, re-init panel and rebuild nav
    if (this.hasAttribute("autobuild") || this.hasAttribute("pfe-c-autobuild")) {
      this._init();
      this.emitEvent(PfeJumpLinksPanel.events.change);
      this.nav._rebuildNav();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
    }
  }

  _scrollCallback() {
    let sections;
    // let menu_links;
    //Check sections to make sure we have them (if not, get them)
    if (!this.sections || typeof this.sections === "undefined") {
      this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    } else {
      sections = this.sections;
    }
    //Check list of links to make sure we have them (if not, get them)
    if (!this.menu_links) {
      console.log("Hi, Edge!");
      console.log(this.nav);
      this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll("a");
    }

    // Make an array from the node list
    const sectionArr = [...sections];
    // Get all the sections that match this point in the scroll
    const matches = sectionArr.filter(section => window.scrollY >= section.offsetTop - this.offsetValue).reverse();

    //Identify the last one queried as the current section
    const current = sectionArr.indexOf(matches[0]);

    // If that section isn't already active,
    // remove active from the other links and make it active
    if (current !== this.currentActive) {
      this._observer.disconnect();
      this._removeAllActive();
      this.currentActive = current;
      this._makeActive(current);
      this._observer.observe(this, pfeJumpLinksNavObserverConfig);
    }
  }
}

PFElement.create(PfeJumpLinks);
PFElement.create(PfeJumpLinksNav);
PFElement.create(PfeJumpLinksPanel);

export default PfeJumpLinks;
