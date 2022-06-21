"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_app_product_product_controller_ts";
exports.ids = ["src_app_product_product_controller_ts"];
exports.modules = {

/***/ "./src/app/product/product.controller.ts":
/*!***********************************************!*\
  !*** ./src/app/product/product.controller.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ProductController {\r\n    posts = [\r\n        {\r\n            name: 'Marcin',\r\n            author: 'Dolor sit amet',\r\n            title: 'Lorem Ipsum'\r\n        }\r\n    ];\r\n    getAllProducts = (req, res) => {\r\n        res.send(this.posts);\r\n    };\r\n    createAProduct = (req, res) => {\r\n        const post = req.body;\r\n        this.posts.push(post);\r\n        res.send(post);\r\n    };\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductController());\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/product/product.controller.ts?");

/***/ })

};
;