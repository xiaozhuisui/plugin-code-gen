"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _createListGenerator = _interopRequireDefault(require("./listGenerator/createListGenerator"));
var _createFormGenerator = _interopRequireDefault(require("./formGenerator/createFormGenerator"));
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
}