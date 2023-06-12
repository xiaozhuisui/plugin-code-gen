import { getUserName } from '../.umi-test/plugin-utils/utils';
import React from 'react';

export default function() {
  return <h1>{getUserName('Hello World')}</h1>;
}
