---
"@patternfly/pfe-codeblock": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-codeblock>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds `pre` and `code` CSS parts

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`


See [docs](https://patternflyelements.org/components/codeblock/) for more info
