import { useForm } from '@mep-sula/core';
import BsSulaForm from '@/components/businessComponent/BsSulaForm';

//路由信息 新增 编辑 详情
/* {
  path: '{{{filePath}}}/form',
  hideInMenu: true,
  name: '{{{routeName}}}-form',
  component: '.{{{filePath}}}/form',
},{
  path: '{{{filePath}}}/form/:id',
  hideInMenu: true,
  name: '{{{routeName}}}-form',
  component: '.{{{filePath}}}/form',
}, */

// 中英文对照 可根据需求更改
/*
   'menu.{{{routeName}}}-form': '{{{locale}}}',
*/
/*
   'menu.{{{routeName}}}-form': '{{{routeName}}}',
*/

export default (props: any) => {
  const {
    match: {
      params: { id },
    },
    location: {
      query: { mode = 'create' },
    },
  } = props;
  const [form] = useForm();

  // form参数
  const formConfig = {
    mode,
    remoteValues: {
      url: `{{{path}}}`,
      method: 'GET',
      converter: ({ data }: any) => {
        return {
          ...data,
        };
      },
    },
    actionsRender: [
      {
        type: 'button',
        props: {
          children: '返回',
        },
        action: ['back'],
      },
      {
        type: 'button',
        props: {
          children: mode === 'create' ? '提交' : '保存',
          type: 'primary',
        },
        action: [
          'validateFields',
          {
            url: mode === 'create' ? '{{{postPath}}}' : `{{{postPath}}}/${id}`,
            method: mode === 'create' ? 'POST' : 'patch',
            //params: ({
            //  result,
            //}) => ({ ...result }),
            successMessage: '提交成功',
          },
          {
            type: 'route',
            path: '{{{routePath}}}',
          },
        ],
      },
    ],
    actionsPosition: 'bottom',
    itemLayout: {
      span: 8,
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    },
    fields: [
      {
        container: {
          type: 'card',
          props: {
            title: '基本信息',
          },
        },
        fields: [
          {{#fields}}
          {{#isTime}}
          {
            name: '{{{name}}}',
            label: '{{{description}}}',
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
            name: '{{{name}}}',
            label: '{{{description}}}',
            field: {
              type: 'input',
            },
          }{{^last}},{{/last}}
          {{/isTime}}
          {{/fields}}
        ],
      },
    ],
  };

  return <BsSulaForm form={form} {...formConfig} />;
};
