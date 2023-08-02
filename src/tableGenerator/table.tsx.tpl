import React from 'react';
import { Table } from 'antd';
import { handleCommonTimeRender } from '@/utils/utils';
export default function index({ value = [] }: { value?: any[] }) {
  const columns = [
    {{#coloums}}
      {
        title: '{{title}}',
        {{#isArray}}
        dataIndex: [{{#dataIndex}}'{{.}}',{{/dataIndex}}],
        {{/isArray}}
        {{^isArray}}
        dataIndex: '{{dataIndex}}',
        {{/isArray}}
        {{#render}}
        render:(text: any) => handleCommonTimeRender(text)
        {{/render}}
      },
      {{/coloums}}
  ];
  return (
    <Table dataSource={value} columns={columns} scroll={ { x: 'max-content' } } />
  );
}
