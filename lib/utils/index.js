"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFieldList = exports.handleColumns = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const handleFieldList = (fieldList, form) => {
  // 开始过滤 直接干掉
  const filterList = fieldList.filter(item => !["currentPage", "pageSize", "sorter", "qp-isvId-eq", "qp-isvId-eq", "qp-createUserName-eq", "qp-modifyUserName-eq", "qp-modifyRealName-eq"].includes(item.name));
  // 接下来组件处理 如果swagger有描述数据字典可以取数据字典 目前只能根据时间和input框来
  const finalList = filterList.map((item, index, arr) => {
    var _item$description, _item$description$inc;
    const result = _objectSpread({}, item);
    if (item.name.toLowerCase().includes("time") || (item === null || item === void 0 ? void 0 : (_item$description = item.description) === null || _item$description === void 0 ? void 0 : (_item$description$inc = _item$description.includes) === null || _item$description$inc === void 0 ? void 0 : _item$description$inc.call(_item$description, "时间"))) {
      try {
        const regex = /qp-(.*?)-/;
        // @ts-ignore
        const name = item.name.match(regex)[1];
        result.name = form ? name : `qp-${name}-ge*fullDate*qp-${name}-le`;
        result.isTime = true;
      } catch (error) {
        debugger;
      }
    }
    result.last = index === arr.length - 1;
    return result;
  });
  return finalList;
};
exports.handleFieldList = handleFieldList;
const handleColumns = columnList => {
  return columnList.filter(item => {
    var _ref, _ref$includes, _item$name, _item$name$toLowerCas, _item$name$toLowerCas2;
    return item.name && !((_ref = ["id", "modifyUserId", "bg"]) === null || _ref === void 0 ? void 0 : (_ref$includes = _ref.includes) === null || _ref$includes === void 0 ? void 0 : _ref$includes.call(_ref, item.name)) || (item === null || item === void 0 ? void 0 : (_item$name = item.name) === null || _item$name === void 0 ? void 0 : (_item$name$toLowerCas = _item$name.toLowerCase()) === null || _item$name$toLowerCas === void 0 ? void 0 : (_item$name$toLowerCas2 = _item$name$toLowerCas.includes) === null || _item$name$toLowerCas2 === void 0 ? void 0 : _item$name$toLowerCas2.call(_item$name$toLowerCas, "id"));
  }).map(item => {
    var _item$description2;
    const result = {
      key: item.name,
      title: item.description,
      dataIndex: item.name
    };
    if (item === null || item === void 0 ? void 0 : (_item$description2 = item.description) === null || _item$description2 === void 0 ? void 0 : _item$description2.includes("时间")) {
      result.render = "bs-time";
    }
    return result;
  });
};
exports.handleColumns = handleColumns;