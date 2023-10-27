"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _createListGenerator = _interopRequireDefault(require("./listGenerator/createListGenerator"));
var _createFormGenerator = _interopRequireDefault(require("./formGenerator/createFormGenerator"));
var _createTableGenerator = _interopRequireDefault(require("./tableGenerator/createTableGenerator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(api) {
  api.describe({
    key: 'codeGenerate',
    config: {
      schema(joi) {
        return joi.object();
      }
    }
  });
  api.registerGenerator({
    key: 'listTpl',
    // @ts-ignore
    Generator: (0, _createListGenerator.default)({
      api
    })
  });
  api.registerGenerator({
    key: 'formTpl',
    // @ts-ignore
    Generator: (0, _createFormGenerator.default)({
      api
    })
  });

  // 准备做table的 节省对字段时间
  api.registerGenerator({
    key: 'tableTpl',
    // @ts-ignore
    Generator: (0, _createTableGenerator.default)({
      api
    })
  });
}