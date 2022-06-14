/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bin/www.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bin/www.ts":
/*!************************!*\
  !*** ./src/bin/www.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/winston-logger */ \"./src/utils/winston-logger.ts\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\n\r\n\r\nvar server = http__WEBPACK_IMPORTED_MODULE_0__[\"createServer\"](_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\nvar normalizePort = function (val) {\r\n    var normolizedPort = (typeof val === 'string') ? parseInt(val, 10) : val;\r\n    if (isNaN(normolizedPort)) {\r\n        return val;\r\n    }\r\n    if (normolizedPort >= 0) {\r\n        return normolizedPort;\r\n    }\r\n    return false;\r\n};\r\nvar port = normalizePort(process.env.PORT || 3000);\r\n_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].set('port', port);\r\nvar onError = function (error) {\r\n    if (error.syscall !== 'listen') {\r\n        throw error;\r\n    }\r\n    var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;\r\n    switch (error.code) {\r\n        case 'EACCES':\r\n            _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].error(bind + \" requires elevated privileges\");\r\n            process.exit(1);\r\n            break;\r\n        case 'EADDRINUSE':\r\n            _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].error(bind + \" is already in use\");\r\n            process.exit(1);\r\n            break;\r\n        default:\r\n            throw error;\r\n    }\r\n};\r\nvar onListening = function () {\r\n    var addr = server.address();\r\n    var bind = (typeof addr === 'string') ? \"pipe \" + addr : \"port \" + addr.port;\r\n    _utils_winston_logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].info(\"Listening on \" + bind);\r\n};\r\nserver.listen(port);\r\nserver.on('error', onError);\r\nserver.on('listening', onListening);\r\n\n\n//# sourceURL=webpack:///./src/bin/www.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n// Creates and configures an ExpressJS web server.\r\nvar App = /** @class */ (function () {\r\n    // Run configuration methods on the Express instance.\r\n    function App() {\r\n        // test\r\n        this.express = express__WEBPACK_IMPORTED_MODULE_1__();\r\n        this.middleware();\r\n        this.routes();\r\n    }\r\n    // Configure Express middleware.\r\n    App.prototype.middleware = function () {\r\n        this.express.use(body_parser__WEBPACK_IMPORTED_MODULE_0__[\"json\"]());\r\n        this.express.use(body_parser__WEBPACK_IMPORTED_MODULE_0__[\"urlencoded\"]({ extended: false }));\r\n    };\r\n    // Configure API endpoints.\r\n    App.prototype.routes = function () {\r\n        /* This is just to get up and running, and to make sure what we've got is\r\n         * working so far. This function will change when we start to add more\r\n         * API endpoints */\r\n        var router = express__WEBPACK_IMPORTED_MODULE_1__[\"Router\"]();\r\n        // placeholder route handler\r\n        router.get('/', function (req, res, next) {\r\n            res.json({\r\n                message: 'Hello World!'\r\n            });\r\n        });\r\n        this.express.use('/', router);\r\n    };\r\n    return App;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (new App().express);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/utils/winston-logger.ts":
/*!*************************************!*\
  !*** ./src/utils/winston-logger.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _a = __webpack_require__(/*! winston */ \"winston\"), createLogger = _a.createLogger, transports = _a.transports;\r\nvar defaultLevel = process.env.LOG_LEVEL || 'info';\r\nvar options = {\r\n    exitOnError: false,\r\n    level: defaultLevel\r\n};\r\nvar logger = new createLogger(options);\r\nif (true) {\r\n    logger.add(new transports.Console({\r\n        colorize: true,\r\n        showLevel: true,\r\n        timestamp: true,\r\n        level: 'debug'\r\n    }));\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (logger);\r\n\n\n//# sourceURL=webpack:///./src/utils/winston-logger.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ })

/******/ });