import PFElement from "../../pfelement/dist/pfelement.js";

class PfeReadtime extends PFElement {
  static get tag() {
    return "pfe-readtime";
  }

  static get meta() {
    return {
      title: "Readtime",
      description: "This element will collect a word count on a given section and calculate the readtime based on that count."
    };
  }

  get templateUrl() {
    return "pfe-readtime.html";
  }

  get styleUrl() {
    return "pfe-readtime.css";
  }

  // static get events() {
  //   return {
    //   };
  // }




    //This is my first new webcomponent
    //Do I *use the component builder tool* to get started or copy paste from an
    //existing component?
    //use foo or bar for fields I am not sure on
    //npm run new to generate new component (should be in readme as well)

    //How do I get word count from article (not part of webcomponent)?
    // * - 1.add an attribute that has number of words in it. then pass that into readtime into webcomponent
    //2.(out of scope) give component API - PFE-readtime.articlePointer - passing HTML node element to article to do a word grab

    //lang code is stored we could look at that to find out region for word read time per country
    //use switch to calulate different read times (maybe out of scope and to complex for this first pass)

    //This seems very different to most webcomponents as it is just JS functionality
    //to append a time estimate
    //not an interactive component like copy url etc.
    //Do I approach it differenlt or the same?
    //need default slot (html template <slot></slot>)
    //basic CSS -
    //Can probablly leave off PFE sass

    //include reasons for approach in comments
    //also make notes in read me (maybe resource section)

    //Is this going to be part of a bigger webcomponent (front matter) or stand alone?
    //if so, how does the building of it differ?

    //implemtaion questions
    //< 1min do I print "less than 1" or "0-1" seeing how component in webrh has "-minute read" in interval
    //How to I get this on the page inside the front matter webrh component?
    //Do I need to worry about translations?
    //suggestion for translation: translation="less than %n time to read"

    //Seeing how we do calcs here should the webrh have the raw letter count?
    // |wc in webrh - include in webcomponent if needed

    //build out demo page don't worry about webrh for now, just get everything working in Pfe
    //throw errors instead of hard failing (.this.warn)






  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {      word count: {
        title: "Word count",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      }};
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeReadtime, { type: PfeReadtime.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

  }

  disconnectedCallback() {
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

}

PFElement.create(PfeReadtime);

export default PfeReadtime;
