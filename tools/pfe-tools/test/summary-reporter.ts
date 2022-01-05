// https://github.com/modernweb-dev/web/pull/1834

import type { Reporter, ReporterArgs, TestSuiteResult } from '@web/test-runner';

import { reportTestsErrors, TestRunnerLogger } from '@web/test-runner';

interface Options {
  flatten?: boolean
}

const color = ([x, y]: [number, number]) => (z: string) => `\x1b[${x}m${z}\x1b[${y}m${reset}`;
const reset = `\x1b[0m\x1b[0m`;
const green = color([32,89]);
const red = color([31,89]);

export function summaryReporter(opts: Options): Reporter {
  const { flatten = false } = opts ?? {};
  let args: ReporterArgs;
  let favoriteBrowser: string;

  const logger = new TestRunnerLogger();

  function log(name: string, passed: boolean, prefix = '  ') {
    const sign = passed ? green('✓') : red('𐄂');
    logger.log(
        flatten ? `${sign} ${prefix} ${name}`
      : `${prefix}  ${sign} ${name}`
    );
  }

  function logResults(results?: TestSuiteResult, prefix?: string) {
    for (const result of results?.tests ?? []) {
      log(result.name, result.passed, prefix);
    }

    for (const suite of results?.suites ?? []) {
      logSuite(suite, prefix);
    }
  }

  function logSuite(suite: TestSuiteResult, parent?: string) {
    const pref =
        flatten ? `${parent ? `${parent}` : ''} ${suite.name}`
      : `${parent ?? ''} `;

    if (!flatten) {
      logger.log(`${pref}${suite.name}`);
    }

    logResults(suite, pref);
  }

  return {
    start(_args) {
      args = _args;
      favoriteBrowser =
        args.browserNames.find(name => {
          const n = name.toLowerCase();
          return n.includes('chrome') || n.includes('chromium') || n.includes('firefox');
        }) ?? args.browserNames[0];
    },

    onTestRunFinished({ sessions }) {
      for (const session of sessions) {
        logResults(session.testResults);
      }

      const failedSessions = sessions.filter(s => !s.passed);
      if (failedSessions.length > 0) {
        logger.log('\n\nErrors Reported in Tests:\n\n');
        reportTestsErrors(logger, args.browserNames, favoriteBrowser, failedSessions);
      }
    }
  }
}