import { IApi } from '@umijs/types';
import createListGenerator from './listGenerator/createListGenerator';
import createFormGenerator from './formGenerator/createFormGenerator';
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

}
