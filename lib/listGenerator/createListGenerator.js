"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _utils = require("../utils");
function _utils2() {
  const data = require("@umijs/utils");
  _utils2 = function _utils2() {
    return data;
  };
  return data;
}
function _path() {
  const data = require("path");
  _path = function _path() {
    return data;
  };
  return data;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
function handleCreateList(paths, path, definitions) {
  const fields = (0, _utils.handleFieldList)(paths[path]["get"]["parameters"], false);

  //"ResultVo«List«SkuResVo»»";
  const str = paths[path]["get"]["responses"]["200"]["schema"]["originalRef"];
  const start = str.lastIndexOf("«") + 1;
  const end = str.lastIndexOf("»");
  const voName = str.substring(start, end - 1);
  const coloums = (0, _utils.handleColumns)(Object.entries(definitions[voName]["properties"]).map(item => {
    // 暂定是只有两层 算了 写个递归
    if (item[1].originalRef) {
      const combinationList = [];
      definitions[item[1].originalRef];
      (0, _utils.handleCombinationList)(combinationList, definitions, item[1].originalRef, [item[0]]);
      return combinationList;
    }
    return _objectSpread({
      name: item[0]
    }, item[1]);
  }).flat(Infinity));
  return {
    fields,
    coloums
  };
}
function handleCreateModal(paths, addPath, definitions) {
  var _paths$addPath;
  if (!addPath || !(paths === null || paths === void 0 ? void 0 : (_paths$addPath = paths[addPath]) === null || _paths$addPath === void 0 ? void 0 : _paths$addPath["post"])) {
    return {
      hasCreate: false
    };
  }
  const voName = paths[addPath]["post"]["parameters"][0]["schema"]["originalRef"];
  const createFields = (0, _utils.handleFieldList)(Object.entries(definitions[voName]["properties"]).map(item => {
    return _objectSpread({
      name: item[0]
    }, item[1]);
  }), true);
  return {
    hasCreate: true,
    createFields
  };
}
function handleEditModal(paths, editPath, definitions, editMethodName) {
  var _paths$editPath, _paths$editPath2, _paths$editPath2$edit, _paths$editPath2$edit2, _paths$editPath3, _paths$editPath3$edit, _paths$editPath3$edit2, _paths$editPath3$edit3, _paths$editPath3$edit4, _paths$editPath4, _paths$editPath4$edit, _paths$editPath4$edit2, _paths$editPath4$edit3, _paths$editPath4$edit4;
  if (!editPath || !(paths === null || paths === void 0 ? void 0 : (_paths$editPath = paths[editPath]) === null || _paths$editPath === void 0 ? void 0 : _paths$editPath[editMethodName])) {
    return {
      hasEdit: false
    };
  }
  const length = (_paths$editPath2 = paths[editPath]) === null || _paths$editPath2 === void 0 ? void 0 : (_paths$editPath2$edit = _paths$editPath2[editMethodName]) === null || _paths$editPath2$edit === void 0 ? void 0 : (_paths$editPath2$edit2 = _paths$editPath2$edit["parameters"]) === null || _paths$editPath2$edit2 === void 0 ? void 0 : _paths$editPath2$edit2.length;
  const voName = ((_paths$editPath3 = paths[editPath]) === null || _paths$editPath3 === void 0 ? void 0 : (_paths$editPath3$edit = _paths$editPath3[editMethodName]) === null || _paths$editPath3$edit === void 0 ? void 0 : (_paths$editPath3$edit2 = _paths$editPath3$edit["parameters"]) === null || _paths$editPath3$edit2 === void 0 ? void 0 : (_paths$editPath3$edit3 = _paths$editPath3$edit2[length - 1]) === null || _paths$editPath3$edit3 === void 0 ? void 0 : (_paths$editPath3$edit4 = _paths$editPath3$edit3["schema"]) === null || _paths$editPath3$edit4 === void 0 ? void 0 : _paths$editPath3$edit4["originalRef"]) || ((_paths$editPath4 = paths[editPath]) === null || _paths$editPath4 === void 0 ? void 0 : (_paths$editPath4$edit = _paths$editPath4[editMethodName]) === null || _paths$editPath4$edit === void 0 ? void 0 : (_paths$editPath4$edit2 = _paths$editPath4$edit["parameters"]) === null || _paths$editPath4$edit2 === void 0 ? void 0 : (_paths$editPath4$edit3 = _paths$editPath4$edit2[length - 2]) === null || _paths$editPath4$edit3 === void 0 ? void 0 : (_paths$editPath4$edit4 = _paths$editPath4$edit3["schema"]) === null || _paths$editPath4$edit4 === void 0 ? void 0 : _paths$editPath4$edit4["originalRef"]);
  const editFields = (0, _utils.handleFieldList)(Object.entries(definitions[voName]["properties"]).map(item => _objectSpread({
    name: item[0]
  }, item[1])), true);
  return {
    hasEdit: true,
    editFields,
    editPath: editPath.replace(/\{.*?\}/, "#{record.id}")
  };
}
function handleDelete(paths, delPath) {
  return {
    hasDel: Boolean(paths === null || paths === void 0 ? void 0 : paths[delPath]),
    delPath: delPath === null || delPath === void 0 ? void 0 : delPath.replace(/\{.*?\}/, "#{record.id}")
  };
}
function _default({
  api
}) {
  return class PageGenerator extends _utils2().Generator {
    constructor(opts) {
      super(opts);
    }
    writing() {
      var _this = this;
      return _asyncToGenerator(function* () {
        var _api$userConfig$codeG2;
        const _api$userConfig$codeG = (_api$userConfig$codeG2 = api.userConfig.codeGenerate) === null || _api$userConfig$codeG2 === void 0 ? void 0 : _api$userConfig$codeG2.list,
          url = _api$userConfig$codeG.url,
          path = _api$userConfig$codeG.path,
          locale = _api$userConfig$codeG.locale,
          filePath = _api$userConfig$codeG.filePath,
          routePath = _api$userConfig$codeG.routePath,
          addPath = _api$userConfig$codeG.addPath,
          editPath = _api$userConfig$codeG.editPath,
          editMethodName = _api$userConfig$codeG.editMethodName,
          deletePath = _api$userConfig$codeG.deletePath;
        // 4个参数 缺一不可
        if ([url, path, locale, filePath].some(item => !item)) {
          console.error("参数不全，请检查！");
          // 退出程序
          process.exit(1);
        }
        const _yield$axios$get = yield axios.get(url),
          _yield$axios$get$data = _yield$axios$get.data,
          paths = _yield$axios$get$data.paths,
          definitions = _yield$axios$get$data.definitions,
          basePath = _yield$axios$get$data.basePath;
        if (!paths[path]) {
          console.warn("请检查接口path路径");
          // 退出程序
          process.exit(1);
        }
        // 接下来查找 整理数据
        // 后面可能要读文件 写文件
        // 不想根据命令行 直接根据用户配置生成

        // 加个交互 读文件 防止手抖
        try {
          const file = fs.readFileSync((0, _path().join)(api.paths.absPagesPath, filePath, `/list.tsx`), "utf8");
          if (file) {
            const _yield$inquirer$promp = yield inquirer.prompt([{
                type: "confirm",
                name: "confirm",
                message: "该目录下已有文件 是否生成？",
                default: false
              }]),
              confirm = _yield$inquirer$promp.confirm;
            if (!confirm) {
              // 终止线程
              process.exit(1);
            }
          }
        } catch (err) {
          console.error(err);
        }
        const _handleCreateList = handleCreateList(paths, path, definitions),
          fields = _handleCreateList.fields,
          coloums = _handleCreateList.coloums;
        debugger;
        const _handleCreateModal = handleCreateModal(paths, addPath, definitions),
          hasCreate = _handleCreateModal.hasCreate,
          createFields = _handleCreateModal.createFields;
        const _handleEditModal = handleEditModal(paths, editPath, definitions, editMethodName),
          hasEdit = _handleEditModal.hasEdit,
          editFields = _handleEditModal.editFields,
          finalEditPath = _handleEditModal.editPath;
        const _handleDelete = handleDelete(paths, deletePath),
          hasDel = _handleDelete.hasDel,
          finalDelPath = _handleDelete.delPath;
        _this.copyTpl({
          templatePath: (0, _path().join)(__dirname, `list.tsx.tpl`),
          target: (0, _path().join)(api.paths.absPagesPath, filePath, `\list.tsx`),
          context: {
            path: basePath + path,
            fields,
            coloums,
            routePath,
            locale,
            filePath,
            routeName: filePath.substring(1).replaceAll("/", "-"),
            addPath,
            hasCreate,
            createFields,
            hasEdit,
            editFields,
            finalEditPath,
            editMethodName,
            hasDel,
            finalDelPath
          }
        });
      })();
    }
  };
}