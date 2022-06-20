"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_app_product_product_routing_ts";
exports.ids = ["src_app_product_product_routing_ts"];
exports.modules = {

/***/ "./src/app/product/product.controller.ts":
/*!***********************************************!*\
  !*** ./src/app/product/product.controller.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ProductController = /** @class */ (function () {\r\n    function ProductController() {\r\n        var _this = this;\r\n        this.posts = [\r\n            {\r\n                name: 'Marcin',\r\n                author: 'Dolor sit amet',\r\n                title: 'Lorem Ipsum'\r\n            }\r\n        ];\r\n        this.getAllProducts = function (req, res) {\r\n            res.send(_this.posts);\r\n        };\r\n        this.createAProduct = function (req, res) {\r\n            var post = req.body;\r\n            _this.posts.push(post);\r\n            res.send(post);\r\n        };\r\n    }\r\n    return ProductController;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductController());\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/product/product.controller.ts?");

/***/ }),

/***/ "./src/app/product/product.routing.ts":
/*!********************************************!*\
  !*** ./src/app/product/product.routing.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _product_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product.controller */ \"./src/app/product/product.controller.ts\");\n\r\n\r\nvar ProductRouter = /** @class */ (function () {\r\n    function ProductRouter() {\r\n        this.path = '/products';\r\n        this.controller = _product_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n        this.router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n        this.router.get(this.path, this.controller.getAllProducts);\r\n        this.router.post(this.path, this.controller.createAProduct);\r\n        this.router.delete(this.path, this.controller.getAllProducts);\r\n        this.router.put(this.path, this.controller.getAllProducts);\r\n    }\r\n    return ProductRouter;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductRouter().router);\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/product/product.routing.ts?");

/***/ })

};
;