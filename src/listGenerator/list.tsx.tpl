import React from 'react';
import BsSulaQueryTable from '@/components/businessComponent/BsSulaQueryTable';

//路由信息
/* {
  path: '{{{filePath}}}/list',
  name: '{{{routeName}}}-list',
  component: '.{{{filePath}}}/list',
}, */

// 中英文对照 可根据需求更改
// 'menu.{{{routeName}}}-list': '{{{locale}}}'
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
      convertParams: 'tableConvertParamsType',
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
            title: '创建',
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
          'refreshtable',
        ],
      },
      //两者选其一 一种是modal新增 另外一种是跳往新页面新增
      //{
      //type: 'button',
      //props: {
      //  children: '新增',
      //  type: 'primary',
      //},
      //action: [
      //  {
      //    type: 'route',
      //    path: '{{{routePath}}}',
      //  },
      //  'refreshtable',
      //]
      //}
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
        key: '{{key}}',
        title: '{{title}}',
        dataIndex: '{{dataIndex}}',
        {{#render}}
        render:'{{render}}'
        {{/render}}
      }{{^last}},{{/last}}
      {{/coloums}}
      {
        key: 'operator',
        title: '操作',
        render: [
          {
            type: 'link',
            props: { children: '查看' },
            action: {
              type: 'route',
              path: '{{{routePath}}}/detail/#{record.id}?mode=view',
            },
          },
          {{#hasEdit}}
          {
            type: 'link',
            props: { children: '编辑' },
            action: {
              type: 'route',
              path: '{{{routePath}}}/#{record.id}?mode=edit',
            },
          },
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
