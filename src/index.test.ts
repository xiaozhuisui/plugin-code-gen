import { join } from 'path';
import { Service } from 'umi';
import { readFileSync } from 'fs';
import { render } from '@testing-library/react';

const fixtures = join(__dirname, './fixtures');

test('normal', async () => {
  const cwd = join(fixtures, 'normal');
  const service = new Service({
    cwd,
    plugins: [require.resolve('./')],
  });
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'tmp'],
    },
  });

  const reactNode = require(join(cwd, '.umi-test', 'umi.ts')).default;
  const { container } = render(reactNode);
  expect(container.textContent).toEqual('Hello World');
})

test('normal html', async () => {
  const cwd = join(fixtures, 'normal');
  const service = new Service({
    cwd,
    plugins: [require.resolve('./')],
  });
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'html'],
    },
  });

  const html = readFileSync(join(cwd, 'dist', 'index.html'), 'utf-8');
  expect(html).toContain('https://www.googletagmanager.com/gtag/js?id=testId');
})
