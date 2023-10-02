import { join } from 'node:path';

import test from 'ava';

import plugin from '../index.cjs';

function instance({ include, exclude, file }) {
  const func = plugin({
    plugins: ['slash'],
    include,
    exclude,
  });

  return func('', {
    opts: {},
    root: { source: { input: { file } } },
  });
}

const file = join(
  process.cwd(),
  'node_modules\\.pnpm\\tailwindcss@3.3.3\\node_modules\\tailwindcss\\base.css',
);

test('base', (t) => {
  const io = instance({
    file,
    include: ['node_modules/tailwindcss/**'],
  });

  t.deepEqual(io, {});
});

test('pnpm', (t) => {
  const io = instance({
    file,
    include: ['**/node_modules/tailwindcss/**'],
  });

  t.notDeepEqual(io, {});
});
