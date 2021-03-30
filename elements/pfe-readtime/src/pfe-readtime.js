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


    function countWords(str) {
            //comment this out but leave in
            //** actually make this an API they can leverage if needed
            //(reach out to Potter about this as he did it for another component)
            //maybe keep it scoped

          const wordCount = document.getAttribute('word-count');
          console.log(wordCount);

           var str = str.replace(/(^\s*)|(\s*$)/gi,"");
           str = str.replace(/[ ]{2,}/gi," ");
           str = str.replace(/\n /,"\n");
           str = str.split(' ').length;  //maybe use this as the return and they can call this

           //word count attribute
           var length = str / 250; //make rate of reading an attribute
           //do more research on readtimes
           var rounded = Math.floor(length); //round down to get even readtime
           return rounded;
        }
        document.write(countWords("   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));




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
