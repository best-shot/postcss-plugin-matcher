'use strict';

const anymatch = require('anymatch');
const { join } = require('path');
const postcss = require('postcss');
const slash = require('slash');

function matcher({ plugins = [], include = [], exclude = [] } = {}) {
  const includes = include.map((item) =>
    typeof item === 'string' ? slash(join(process.cwd(), item)) : item,
  );
  const excludes = exclude.map((item) =>
    typeof item === 'string' ? slash(join(process.cwd(), item)) : item,
  );
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
      (includes.length > 0 ? anymatch(includes, file) : true) &&
      (excludes.length > 0 ? !anymatch(excludes, file) : true);
    return match ? processer.process(root, opts) : {};
  };
}

matcher.postcss = true;

module.exports = matcher;
