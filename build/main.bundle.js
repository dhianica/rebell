/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _product_product_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/product.routing */ \"./src/app/product/product.routing.ts\");\n/* harmony import */ var _user_user_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user/user.routing */ \"./src/app/user/user.routing.ts\");\n\r\n\r\n\r\nvar Router = /** @class */ (function () {\r\n    function Router() {\r\n        this.path = \"/api\";\r\n        this.router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n        this.intializeRoutes();\r\n    }\r\n    Router.prototype.intializeRoutes = function () {\r\n        this.router.use(this.path, _product_product_routing__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\n        this.router.use(this.path, _user_user_routing__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n    };\r\n    return Router;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Router().router);\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/app.routing.ts?");

/***/ }),

/***/ "./src/app/product/product.controller.ts":
/*!***********************************************!*\
  !*** ./src/app/product/product.controller.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import ProductService from \"./product.service\";\r\n[A];\r\nvar ProductController = /** @class */ (function () {\r\n    function ProductController() {\r\n        var _this = this;\r\n        this.posts = [\r\n            {\r\n                name: \"Marcin\",\r\n                author: \"Dolor sit amet\",\r\n                title: \"Lorem Ipsum\",\r\n            },\r\n        ];\r\n        this.getAllProducts = function (req, res) {\r\n            res.send(_this.posts);\r\n        };\r\n        this.createAProduct = function (req, res) {\r\n            var post = req.body;\r\n            _this.posts.push(post);\r\n            res.send(post);\r\n        };\r\n    }\r\n    return ProductController;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductController());\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/product/product.controller.ts?");

/***/ }),

/***/ "./src/app/product/product.routing.ts":
/*!********************************************!*\
  !*** ./src/app/product/product.routing.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _product_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product.controller */ \"./src/app/product/product.controller.ts\");\n\r\n\r\nvar ProductRouter = /** @class */ (function () {\r\n    function ProductRouter() {\r\n        this.path = \"/products\";\r\n        this.controller = _product_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n        this.router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n        this.router.get(this.path, this.controller.getAllProducts);\r\n        this.router.post(this.path, this.controller.createAProduct);\r\n        this.router.delete(this.path, this.controller.getAllProducts);\r\n        this.router.put(this.path, this.controller.getAllProducts);\r\n        // this.intializeRoutes();\r\n    }\r\n    return ProductRouter;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductRouter().router);\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/product/product.routing.ts?");

/***/ }),

/***/ "./src/app/user/user.controller.ts":
/*!*****************************************!*\
  !*** ./src/app/user/user.controller.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import ProductService from \"./product.service\";\r\nvar UserController = /** @class */ (function () {\r\n    function UserController() {\r\n        var _this = this;\r\n        this.posts = [\r\n            {\r\n                name: \"Marcin\",\r\n                author: \"Dolor sit amet\",\r\n                title: \"Lorem Ipsum\",\r\n            },\r\n        ];\r\n        this.getAllUser = function (req, res) {\r\n            res.send(_this.posts);\r\n        };\r\n        this.createAUser = function (req, res) {\r\n            var post = req.body;\r\n            _this.posts.push(post);\r\n            res.send(post);\r\n        };\r\n    }\r\n    return UserController;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new UserController());\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/user/user.controller.ts?");

/***/ }),

/***/ "./src/app/user/user.routing.ts":
/*!**************************************!*\
  !*** ./src/app/user/user.routing.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.controller */ \"./src/app/user/user.controller.ts\");\n\r\n\r\nvar UserRouter = /** @class */ (function () {\r\n    function UserRouter() {\r\n        this.path = \"/users\";\r\n        this.controller = _user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n        this.router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n        this.router.get(this.path, this.controller.getAllUser);\r\n        this.router.post(this.path, this.controller.createAUser);\r\n        // this.intializeRoutes();\r\n    }\r\n    return UserRouter;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new UserRouter().router);\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/user/user.routing.ts?");

/***/ }),

/***/ "./src/bin/www.ts":
/*!************************!*\
  !*** ./src/bin/www.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/winston-logger */ \"./src/utils/winston-logger.ts\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\n\r\n\r\nvar server = http__WEBPACK_IMPORTED_MODULE_0__.createServer(_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\nvar normalizePort = function (val) {\r\n    var normolizedPort = (typeof val === 'string') ? parseInt(val, 10) : val;\r\n    if (isNaN(normolizedPort)) {\r\n        return val;\r\n    }\r\n    if (normolizedPort >= 0) {\r\n        return normolizedPort;\r\n    }\r\n    return false;\r\n};\r\nvar port = normalizePort(process.env.PORT || 3000);\r\n_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].set('port', port);\r\nvar onError = function (error) {\r\n    if (error.syscall !== 'listen') {\r\n        throw error;\r\n    }\r\n    var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;\r\n    switch (error.code) {\r\n        case 'EACCES':\r\n            _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].error(\"\".concat(bind, \" requires elevated privileges\"));\r\n            process.exit(1);\r\n            break;\r\n        case 'EADDRINUSE':\r\n            _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].error(\"\".concat(bind, \" is already in use\"));\r\n            process.exit(1);\r\n            break;\r\n        default:\r\n            throw error;\r\n    }\r\n};\r\nvar onListening = function () {\r\n    var addr = server.address();\r\n    var bind = (typeof addr === 'string') ? \"pipe \".concat(addr) : \"port \".concat(addr.port);\r\n    _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].info(\"Listening on \".concat(bind));\r\n};\r\nserver.listen(port);\r\nserver.on('error', onError);\r\nserver.on('listening', onListening);\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/bin/www.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_app_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.routing */ \"./src/app/app.routing.ts\");\n\r\n\r\n\r\n// Creates and configures an ExpressJS web server.\r\nvar App = /** @class */ (function () {\r\n    // Run configuration methods on the Express instance.\r\n    function App() {\r\n        this.express = express__WEBPACK_IMPORTED_MODULE_1__();\r\n        this.middleware();\r\n        this.routes();\r\n    }\r\n    // Configure Express middleware.\r\n    App.prototype.middleware = function () {\r\n        this.express.use(body_parser__WEBPACK_IMPORTED_MODULE_0__.json());\r\n        this.express.use(body_parser__WEBPACK_IMPORTED_MODULE_0__.urlencoded({ extended: false }));\r\n    };\r\n    // Configure API endpoints.\r\n    App.prototype.routes = function () {\r\n        /* This is just to get up and running, and to make sure what we've got is\r\n         * working so far. This function will change when we start to add more\r\n         * API endpoints */\r\n        // sample route in App\r\n        this.express.get(\"/\", function (req, res, next) {\r\n            res.json({\r\n                message: \"Hello World!\",\r\n            });\r\n        });\r\n        this.express.use(_app_app_routing__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n    };\r\n    return App;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new App().express);\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/index.ts?");

/***/ }),

/***/ "./src/utils/winston-logger.ts":
/*!*************************************!*\
  !*** ./src/utils/winston-logger.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar _a = __webpack_require__(/*! winston */ \"winston\"), createLogger = _a.createLogger, transports = _a.transports;\r\nvar defaultLevel = process.env.LOG_LEVEL || 'info';\r\nvar options = {\r\n    exitOnError: false,\r\n    level: defaultLevel\r\n};\r\nvar logger = new createLogger(options);\r\nif (true) {\r\n    logger.add(new transports.Console({\r\n        colorize: true,\r\n        showLevel: true,\r\n        timestamp: true,\r\n        level: 'debug'\r\n    }));\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logger);\r\n\n\n//# sourceURL=webpack://typescript-first-app/./src/utils/winston-logger.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/bin/www.ts");
/******/ 	
/******/ })()
;