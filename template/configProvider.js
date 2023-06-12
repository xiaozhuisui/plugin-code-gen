/*
 * @Author: your name
 * @Date: 2021-05-12 11:28:54
 * @LastEditTime: 2021-05-12 19:46:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sula\packages\umi-plugin-sula\template\configProvider.js
 */
import React from 'react';
import { ConfigProvider } from '@mep-components/business-component';
import { history, getLocale } from 'umi';

console.log('umi插件')
console.log(getLocale()); // en-US | zh-CN

export const rootContainer = (container) => {
  return (
    <ConfigProvider locale={getLocale()||"zh-CN"} history={history}>
      {container}
    </ConfigProvider>
  );
};
