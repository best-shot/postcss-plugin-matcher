'use strict';

const picomatch = require('picomatch');
const postcss = require('postcss');
const slash = require('slash');

function createMatch(patterns) {
  return patterns.length > 0
    ? (file) => {
        const globs = patterns.map((item) => slash(item));

        return picomatch(globs, { dot: true, format: slash })(slash(file));
      }
    : undefined;
}

function matcher({ plugins = [], include = [], exclude = [] } = {}) {
  const includes = createMatch(include);
  const excludes = createMatch(exclude);

  const processer = postcss(
    plugins.map((item) => (typeof item === 'string' ? require(item) : item)),
  );

  return (
    root,
    {
      opts,
      root: {
        source: {
          input: { file },
        },
      },
    },
  ) => {
    const match =
      file &&
      (includes ? includes(file) : true) &&
      (excludes ? !excludes(file) : true);

    return match ? processer.process(root, opts) : {};
  };
}

matcher.postcss = true;

module.exports = matcher;
