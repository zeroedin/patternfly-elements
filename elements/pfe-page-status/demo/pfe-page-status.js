import '@patternfly/pfe-band';
import '@patternfly/pfe-select';
import '@patternfly/pfe-page-status';

const root = document.querySelector('[data-demo="pfe-page-status"]')?.shadowRoot ?? document;

root.querySelector('pfe-select').addEventListener('change', function(event) {
  root.querySelector('pfe-page-status').status = event.target.value;
});
