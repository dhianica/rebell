"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_app_product_product_controller_spec_ts";
exports.ids = ["src_app_product_product_controller_spec_ts"];
exports.modules = {

/***/ "./src/app/product/product.controller.spec.ts":
/*!****************************************************!*\
  !*** ./src/app/product/product.controller.spec.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chai */ \"chai\");\n/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chai__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var supertest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! supertest */ \"supertest\");\n/* harmony import */ var supertest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(supertest__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mocha__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mocha */ \"mocha\");\n/* harmony import */ var mocha__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mocha__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../index */ \"./src/index.ts\");\n\r\n\r\n\r\n\r\ndescribe('Unit Test Product', () => {\r\n    it('should GET', async () => {\r\n        const res = await (0,supertest__WEBPACK_IMPORTED_MODULE_1__.agent)(_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"]).get('/api/products/');\r\n        (0,chai__WEBPACK_IMPORTED_MODULE_0__.expect)(res.status).to.equal(200);\r\n        (0,chai__WEBPACK_IMPORTED_MODULE_0__.expect)(res.type).to.equal('application/json');\r\n        (0,chai__WEBPACK_IMPORTED_MODULE_0__.expect)(res.body).to.be.an('array');\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/product/product.controller.spec.ts?");

/***/ })

};
;