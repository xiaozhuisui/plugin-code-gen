import React from 'react';
import BsSulaQueryTable from '@/components/businessComponent/BsSulaQueryTable';

//路由信息
/* {
  path: '{{{filePath}}}/list',
  name: '{{{routeName}}}-list',
  component: '.{{{filePath}}}/list',
}, */

// 中英文对照 可根据需求更改
// 'menu.{{{routeName}}}-list': '{{{locale}}}档案'
// 'menu.{{{routeName}}}-list': '{{{routeName}}}'

export default () => {
  {{#hasCreate}}
  const createFields = [
    {{#createFields}}
    {{#isTime}}
    {
      name: '{{name}}',
      label: '{{description}}',
      field: {
        type: 'datePicker',
        props: {
          format: 'YYYY-MM-DD HH:mm',
          showTime: { format: 'HH:mm' },
        },
      },
    }{{^last}},{{/last}}
    {{/isTime}}
    {{^isTime}}
    {
      name: '{{name}}',
      label: '{{description}}',
      field: {
        type: 'input',
      },
    }{{^last}},{{/last}}
    {{/isTime}}
    {{/createFields}}
  ];
  {{/hasCreate}}

  const config = {
    remoteDataSource: {
      url: '{{{path}}}',
      method: 'get',
      convertParams: {type:'tableConvertParamsType',initialParams: {}
      },
      converter: 'bs-tableConvertType',

    },
    actionsRender: [
      {{#hasCreate}}
      {
        type: 'button',
        props: {
          children: '新增',
          type: 'primary',
        },
        action: [
          {
            type: 'modalForm',
            title: '新增',
            fields: createFields,
            width: 980,
            itemLayout: {
              span: 8,
              labelCol: {
                span: 8,
              },
              wrapperCol: {
                span: 16,
              },
            },
            submit: {
              url: '{{{addPath}}}',
              method: 'post',
            },
          },
        ],
      },
      {{/hasCreate}}
      {{^hasCreate}}
      {{#routePath}}
      {
      type: 'button',
      props: {
        children: '新增',
        type: 'primary',
      },
      action:
        {
          type: 'route',
          path: '{{{routePath}}}',
        },
      }
      {{/routePath}}
      {{/hasCreate}}
    ],
    initialValues: {},
    fields: [
      {{#fields}}
      {{#isTime}}
      {
        name: '{{name}}',
        label: '{{description}}',
        field: {
          type: 'rangepicker',
          props: {
            placeholder: ['开始时间', '结束时间'],
            format:'YYYY-MM-DD'
          },
        },
      }{{^last}},{{/last}}
      {{/isTime}}
      {{^isTime}}
      {
        name: '{{name}}',
        label: '{{description}}',
        field: {
          type: 'input',
        },
      }{{^last}},{{/last}}
      {{/isTime}}
      {{/fields}}
    ],
    columns: [
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
        render:'{{render}}'
        {{/render}}
      }{{^last}},{{/last}}
      {{/coloums}}
      {
        key: 'operator',
        title: '操作',
        render: [
          {{#routePath}}
          {
            type: 'link',
            props: { children: '查看' },
            action: {
              type: 'route',
              path: '{{{routePath}}}/#{record.id}?mode=view',
            },
          },
          {{/routePath}}
          {{#hasEdit}}
          {{#routePath}}
          {
            type: 'link',
            props: { children: '编辑' },
            action: {
              type: 'route',
              path: '{{{routePath}}}/#{record.id}?mode=edit',
            },
          },
          {{/routePath}}
          {{/hasEdit}}
          {{#hasDel}}
          {
            type: 'link',
            confirm: '确定要删除吗？',
            props: { children: '删除', danger: true },
            action: [
              {
                url: '{{{finalDelPath}}}',
                method: 'delete',
              },
              'refreshTable',
            ],
          },
          {{/hasDel}}
        ],
      },
    ],
    rowKey: 'id',
  };
  return <BsSulaQueryTable {...config} />;
};
