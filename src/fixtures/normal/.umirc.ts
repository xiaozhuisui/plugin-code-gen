import { IConfig } from '@umijs/types';

export default {
  history: 'memory',
  mountElementId: '',
  routes: [
    { path: '/', component: './index' },
  ],
  ga: {
    code: 'testId'
  }
} as IConfig;
