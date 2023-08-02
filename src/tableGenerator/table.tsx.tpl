import React,{ useEffect } from 'react';
import { Table } from '@mep-sula/core';
import { handleCommonTimeRender } from '@/utils/utils';
export default function index({ value = [] }: { value?: any[] }) {
  const tableRef: any = useRef(null);

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
        render:({text}: any) => handleCommonTimeRender(text)
        {{/render}}
      },
      {{/coloums}}
  ];

  const config={
    columns,
    dataSource:value,
  }
  return (
    <Table {...config} ref={tableRef} />
  );
}
