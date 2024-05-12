"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/file/[fileId]/page",{

/***/ "(app-pages-browser)/./src/app/components/UI/RichToolbarItem.jsx":
/*!***************************************************!*\
  !*** ./src/app/components/UI/RichToolbarItem.jsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _RichToolbarItem_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RichToolbarItem.module.css */ \"(app-pages-browser)/./src/app/components/UI/RichToolbarItem.module.css\");\n/* harmony import */ var _RichToolbarItem_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_RichToolbarItem_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/**\r\n * RichToolbarItem component represents an item in the toolbar of the RichTextEditor.\r\n * It contains an icon button that triggers a specific formatting action when clicked.\r\n * \r\n * @component\r\n * @param {Function} onClick - The function to call when the toolbar item is clicked.\r\n * @param {string} ariaLabel - The accessible label for the toolbar item.\r\n * @param {boolean} ariaSelected - Indicates whether the toolbar item is selected.\r\n * @param {string} className - Additional CSS classes to apply to the toolbar item.\r\n * @param {JSX.Element} icon - The icon element to display within the toolbar item.\r\n * @returns {JSX.Element} The rendered RichToolbarItem component.\r\n * \r\n * @example\r\n * // Renders a RichToolbarItem with a specific icon and onClick handler.\r\n * <RichToolbarItem\r\n *   onClick={() => console.log('Bold button clicked')}\r\n *   ariaLabel=\"Bold\"\r\n *   ariaSelected={false}\r\n *   className=\"custom-icon\"\r\n *   icon={<strong>&#66;</strong>}\r\n * />\r\n */ function RichToolbarItem(param) {\n    let { onClick, ariaLabel, ariaSelected, className, icon } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"\".concat((_RichToolbarItem_module_css__WEBPACK_IMPORTED_MODULE_2___default().miscIcon)),\n                children: \"hello\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\KimozZ\\\\Desktop\\\\aptproj\\\\project\\\\src\\\\app\\\\components\\\\UI\\\\RichToolbarItem.jsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                role: \"button\",\n                onClick: onClick,\n                tabIndex: 0,\n                \"aria-label\": ariaLabel,\n                \"aria-selected\": ariaSelected,\n                className: \"\".concat((_RichToolbarItem_module_css__WEBPACK_IMPORTED_MODULE_2___default().RichTextToolbarItem), \" \").concat(className),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"\".concat((_RichToolbarItem_module_css__WEBPACK_IMPORTED_MODULE_2___default().miscIcon), \" iconE icon-add\"),\n                    children: icon\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\KimozZ\\\\Desktop\\\\aptproj\\\\project\\\\src\\\\app\\\\components\\\\UI\\\\RichToolbarItem.jsx\",\n                    lineNumber: 44,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\KimozZ\\\\Desktop\\\\aptproj\\\\project\\\\src\\\\app\\\\components\\\\UI\\\\RichToolbarItem.jsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\KimozZ\\\\Desktop\\\\aptproj\\\\project\\\\src\\\\app\\\\components\\\\UI\\\\RichToolbarItem.jsx\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, this);\n}\n_c = RichToolbarItem;\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RichToolbarItem);\nvar _c;\n$RefreshReg$(_c, \"RichToolbarItem\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9VSS9SaWNoVG9vbGJhckl0ZW0uanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkQ7QUFDVjtBQUdqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJDLEdBR0QsU0FBU0ssZ0JBQWdCLEtBQXFEO1FBQXJELEVBQUVDLE9BQU8sRUFBRUMsU0FBUyxFQUFFQyxZQUFZLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFFLEdBQXJEO0lBRXZCLHFCQUNFLDhEQUFDQzs7MEJBQ0MsOERBQUNDO2dCQUFJSCxXQUFXLEdBQW1CLE9BQWhCTCw2RUFBZTswQkFBSTs7Ozs7OzBCQUd0Qyw4REFBQ1U7Z0JBQ0NDLE1BQUs7Z0JBQ0xULFNBQVNBO2dCQUNUVSxVQUFVO2dCQUNWQyxjQUFZVjtnQkFDWlcsaUJBQWVWO2dCQUNmQyxXQUFXLEdBQWlDQSxPQUE5Qkwsd0ZBQTBCLEVBQUMsS0FBYSxPQUFWSzswQkFFNUMsNEVBQUNFO29CQUFLRixXQUFXLEdBQW1CLE9BQWhCTCw2RUFBZSxFQUFDOzhCQUNqQ007Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1g7S0FyQlNMOztBQXVCVCwrREFBZUEsZUFBZUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2NvbXBvbmVudHMvVUkvUmljaFRvb2xiYXJJdGVtLmpzeD81YWNiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9SaWNoVG9vbGJhckl0ZW0ubW9kdWxlLmNzc1wiXHJcblxyXG5cclxuLyoqXHJcbiAqIFJpY2hUb29sYmFySXRlbSBjb21wb25lbnQgcmVwcmVzZW50cyBhbiBpdGVtIGluIHRoZSB0b29sYmFyIG9mIHRoZSBSaWNoVGV4dEVkaXRvci5cclxuICogSXQgY29udGFpbnMgYW4gaWNvbiBidXR0b24gdGhhdCB0cmlnZ2VycyBhIHNwZWNpZmljIGZvcm1hdHRpbmcgYWN0aW9uIHdoZW4gY2xpY2tlZC5cclxuICogXHJcbiAqIEBjb21wb25lbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25DbGljayAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIHRvb2xiYXIgaXRlbSBpcyBjbGlja2VkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXJpYUxhYmVsIC0gVGhlIGFjY2Vzc2libGUgbGFiZWwgZm9yIHRoZSB0b29sYmFyIGl0ZW0uXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXJpYVNlbGVjdGVkIC0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRvb2xiYXIgaXRlbSBpcyBzZWxlY3RlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAtIEFkZGl0aW9uYWwgQ1NTIGNsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIHRvb2xiYXIgaXRlbS5cclxuICogQHBhcmFtIHtKU1guRWxlbWVudH0gaWNvbiAtIFRoZSBpY29uIGVsZW1lbnQgdG8gZGlzcGxheSB3aXRoaW4gdGhlIHRvb2xiYXIgaXRlbS5cclxuICogQHJldHVybnMge0pTWC5FbGVtZW50fSBUaGUgcmVuZGVyZWQgUmljaFRvb2xiYXJJdGVtIGNvbXBvbmVudC5cclxuICogXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIFJlbmRlcnMgYSBSaWNoVG9vbGJhckl0ZW0gd2l0aCBhIHNwZWNpZmljIGljb24gYW5kIG9uQ2xpY2sgaGFuZGxlci5cclxuICogPFJpY2hUb29sYmFySXRlbVxyXG4gKiAgIG9uQ2xpY2s9eygpID0+IGNvbnNvbGUubG9nKCdCb2xkIGJ1dHRvbiBjbGlja2VkJyl9XHJcbiAqICAgYXJpYUxhYmVsPVwiQm9sZFwiXHJcbiAqICAgYXJpYVNlbGVjdGVkPXtmYWxzZX1cclxuICogICBjbGFzc05hbWU9XCJjdXN0b20taWNvblwiXHJcbiAqICAgaWNvbj17PHN0cm9uZz4mIzY2Ozwvc3Ryb25nPn1cclxuICogLz5cclxuICovXHJcblxyXG5cclxuZnVuY3Rpb24gUmljaFRvb2xiYXJJdGVtKHsgb25DbGljaywgYXJpYUxhYmVsLCBhcmlhU2VsZWN0ZWQsIGNsYXNzTmFtZSwgaWNvbiB9KVxyXG57XHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7c3R5bGVzLm1pc2NJY29ufWB9PlxyXG4gICAgICAgIGhlbGxvXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXHJcbiAgICAgICAgb25DbGljaz17b25DbGlja31cclxuICAgICAgICB0YWJJbmRleD17MH1cclxuICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XHJcbiAgICAgICAgYXJpYS1zZWxlY3RlZD17YXJpYVNlbGVjdGVkfVxyXG4gICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLlJpY2hUZXh0VG9vbGJhckl0ZW19ICR7Y2xhc3NOYW1lfWB9XHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Ake3N0eWxlcy5taXNjSWNvbn0gaWNvbkUgaWNvbi1hZGRgfT5cclxuICAgICAgICAgIHtpY29ufVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L3NwYW4+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJpY2hUb29sYmFySXRlbTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJzdHlsZXMiLCJSaWNoVG9vbGJhckl0ZW0iLCJvbkNsaWNrIiwiYXJpYUxhYmVsIiwiYXJpYVNlbGVjdGVkIiwiY2xhc3NOYW1lIiwiaWNvbiIsInNwYW4iLCJkaXYiLCJtaXNjSWNvbiIsImJ1dHRvbiIsInJvbGUiLCJ0YWJJbmRleCIsImFyaWEtbGFiZWwiLCJhcmlhLXNlbGVjdGVkIiwiUmljaFRleHRUb29sYmFySXRlbSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/UI/RichToolbarItem.jsx\n"));

/***/ })

});