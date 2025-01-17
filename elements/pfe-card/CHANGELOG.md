# @patternfly/pfe-card

## 2.0.0-next.0
### Major Changes

- cc006c44: ## 🔥 Migrate to Lit
  
  This release migrates `<pfe-card>` to LitElement.
  
  ### NEW: CSS Shadow Parts!
  - Adds `header`, `body`, and `footer` CSS parts to `<pfe-card>`
  
  ### Breaking Changes
  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle)
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-card--header` and `pfe-card--footer` slots. Use `header` and `footer` instead
  
  
  See [docs](https://patternflyelements.org/components/card/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
