import { IApi } from '@umijs/types';
import createListGenerator from './listGenerator/createListGenerator';
import createFormGenerator from './formGenerator/createFormGenerator';
import createTableGenerator from './tableGenerator/createTableGenerator'
export default function (api: IApi) {

  api.describe({
    key: 'codeGenerate',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  })

  api.registerGenerator({
    key: 'listTpl',
    // @ts-ignore
    Generator: createListGenerator({ api }),
  });

  api.registerGenerator({
    key: 'formTpl',
    // @ts-ignore
    Generator: createFormGenerator({ api }),
  });

  // 准备做table的 节省对字段时间
  api.registerGenerator({
    key: 'tableTpl',
    // @ts-ignore
    Generator: createTableGenerator({ api }),
  });
}
