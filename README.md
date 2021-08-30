# postcss-plugin-matcher

PostCSS plugin for limit plugins matching.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

For safer and faster.

[npm-url]: https://www.npmjs.com/package/postcss-plugin-matcher
[npm-badge]: https://img.shields.io/npm/v/postcss-plugin-matcher.svg?style=flat-square&logo=npm
[github-url]: https://github.com/Airkro/postcss-plugin-matcher
[github-badge]: https://img.shields.io/npm/l/postcss-plugin-matcher.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/postcss-plugin-matcher.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install postcss-plugin-matcher --save-dev
```

## Usage

```diff
 // example: postcss.config.cjs
 module.exports = {
   plugins: {
-    'tailwindcss': {},
+    'postcss-plugin-matcher': {
+      plugins: ['tailwindcss'],
+      include: ['src/**'],
+      exclude: ['app.css']
+    }
   }
 };
```
