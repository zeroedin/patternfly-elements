import '@patternfly/pfe-band';
import '@patternfly/pfe-clipboard';
import '@patternfly/pfe-icon';

const root = document.querySelector('[data-demo="pfe-clipboard"]')?.shadowRoot ?? document;

root.getElementById('propertyCopy').contentToCopy = `
  <h2>Clipboard: with custom text & copying text from element</h2>
  <pfe-clipboard copy-from="#textToCopy">
    <span slot="text">This will copy the text in the text field below!</span>
    <span slot="success">Making some copies!</span>
  </pfe-clipboard>
  <input type="text" id="textToCopy" value="This text will be copied!!"></input>
`;
