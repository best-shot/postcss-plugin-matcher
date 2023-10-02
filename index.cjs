'use strict';

const picomatch = require('picomatch');
const { join } = require('node:path');
const postcss = require('postcss');
const slash = require('slash');

function createMatch(patterns) {
  return (file) =>
    picomatch(
      patterns.map((item) => slash(join(process.cwd(), item))),
      { dot: true, format: slash },
    )(slash(file));
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
      (includes.length > 0 ? includes(file) : true) &&
      (excludes.length > 0 ? !excludes(file) : true);

    return match ? processer.process(root, opts) : {};
  };
}

matcher.postcss = true;

module.exports = matcher;
