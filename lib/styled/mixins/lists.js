'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listUnstyled = listUnstyled;
exports.listInline = listInline;
exports.listInlineItem = listInlineItem;

var _theme = require('theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Unstyled keeps list items block level, just removes default browser padding and list-style
function listUnstyled() {
  return '\n    padding-left: 0;\n    list-style: none;\n  ';
} // Lists
function listInline() {
  return listUnstyled();
}

function listInlineItem() {
  var listInlinePadding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _theme2.default['$list-inline-padding'];

  return '\n    display: inline-block;\n  \n    &:not(:last-child) {\n      margin-right: ' + listInlinePadding + ';\n    }\n  ';
}
exports.default = {
  listInline: listInline,
  listUnstyled: listUnstyled
};