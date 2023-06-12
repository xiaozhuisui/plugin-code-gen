import { getUserName } from './utils';

test('getUserName', () => {
  expect(getUserName('hello world')).toEqual('hello world');
})
