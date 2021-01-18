#!/usr/bin/env node

const shell = require("shelljs");
const { exit } = require("yargs");

// Force colors to persist inside the terminal
process.env.FORCE_COLOR = true;

const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm test -- --help`.
  .usage("Usage: npm test -- [options]")
  .example([
    ["npm test", "(run all tests, builds by default)"],
    ["npm test -- card", "(run one test)"],
    ["npm test -- card band", "(run multiple tests)"],
    ["npm test -- --skip-build", "(do not build the component(s) prior to running tests)"]
  ])
  .options({
    skipBuild: {
      default: false,
      alias: "skip-build",
      describe: "skip building the component(s) prior to running tests",
      type: "boolean"
    },
    verbose: {
      default: false,
      describe: "print full console output during test run",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
// Check to see if any specific patterns were passed in like:
// npm test -- card band
let components = argv._;

// Access all arguments using `argv`.
// Add commands depending on which options are provided.
const build = !argv.skipBuild ? `npm run build ${components.join(" ")}; ` : "";

shell.exec(
  `${build}./node_modules/.bin/wct --config-file wct.conf.json ${argv.verbose ? "--verbose " : ""} ${
    components ? components.map(item => `"./elements/${item}/test"`).join(" ") : ""
  }`,
  code => process.exit(code)
);
