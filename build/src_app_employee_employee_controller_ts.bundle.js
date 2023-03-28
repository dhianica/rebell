"use strict";exports.id="src_app_employee_employee_controller_ts",exports.ids=["src_app_employee_employee_controller_ts"],exports.modules={"./src/app/employee/employee.controller.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _core_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/enum */ "./src/core/enum.ts");\n/* harmony import */ var _core_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/decorator */ "./src/core/decorator/index.ts");\nvar __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);\n    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = undefined && undefined.__metadata || function(k, v) {\n    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);\n};\n\n\nclass EmployeeController {\n    posts = [\n        {\n            name: \'Muchammad Ilham\',\n            division: \'System Development\',\n            title: \'Senior\'\n        }\n    ];\n    async getAllEmployees(request, response, next) {\n        return new Promise(()=>{\n            try {\n                response.json();\n            } catch (error) {\n                next(error);\n            }\n        });\n    }\n    async getAllEmployees1(request, response, next) {\n        return new Promise(()=>{\n            next({\n                statusCode: _core_enum__WEBPACK_IMPORTED_MODULE_0__.EHttpStatusCode.INTERNAL_SERVER_ERROR,\n                status: _core_enum__WEBPACK_IMPORTED_MODULE_0__.EStatus.FAILED,\n                message: _core_enum__WEBPACK_IMPORTED_MODULE_0__.EErrorMessage.NOT_HANDLED\n            });\n        });\n    }\n    createAEmployee(request, response) {\n        return new Promise(()=>{\n            const post = request.body;\n            this.posts.push(post);\n            response.send(post);\n        });\n    }\n}\n__decorate([\n    (0,_core_decorator__WEBPACK_IMPORTED_MODULE_1__.Get)(),\n    __metadata("design:type", Function),\n    __metadata("design:paramtypes", [\n        typeof Request === "undefined" ? Object : Request,\n        typeof Response === "undefined" ? Object : Response,\n        typeof NextFunction === "undefined" ? Object : NextFunction\n    ])\n], EmployeeController.prototype, "getAllEmployees", null);\n__decorate([\n    (0,_core_decorator__WEBPACK_IMPORTED_MODULE_1__.Get)(),\n    __metadata("design:type", Function),\n    __metadata("design:paramtypes", [\n        typeof Request === "undefined" ? Object : Request,\n        typeof Response === "undefined" ? Object : Response,\n        typeof NextFunction === "undefined" ? Object : NextFunction\n    ])\n], EmployeeController.prototype, "getAllEmployees1", null);\n__decorate([\n    (0,_core_decorator__WEBPACK_IMPORTED_MODULE_1__.Post)(\'\'),\n    __metadata("design:type", Function),\n    __metadata("design:paramtypes", [\n        typeof Request === "undefined" ? Object : Request,\n        typeof Response === "undefined" ? Object : Response\n    ])\n], EmployeeController.prototype, "createAEmployee", null);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EmployeeController());\n\n\n//# sourceURL=webpack://typescript-first-app/./src/app/employee/employee.controller.ts?')},"./src/core/decorator/controller.decorator.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Controller": () => (/* binding */ Controller)\n/* harmony export */ });\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "reflect-metadata");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enum */ "./src/core/enum.ts");\n\n\nfunction Controller(Base) {\n    return class extends Base {\n        constructor(...args){\n            super(...args);\n            const subMethods = Base.prototype[_enum__WEBPACK_IMPORTED_MODULE_1__.EMetadataKeys.ROUTERS];\n            if (subMethods) subMethods.forEach((requestName, method)=>{\n                console.log(\'\');\n            });\n        }\n    };\n}\n\n\n//# sourceURL=webpack://typescript-first-app/./src/core/decorator/controller.decorator.ts?')},"./src/core/decorator/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Controller": () => (/* reexport safe */ _controller_decorator__WEBPACK_IMPORTED_MODULE_1__.Controller),\n/* harmony export */   "Delete": () => (/* reexport safe */ _route_decorator__WEBPACK_IMPORTED_MODULE_3__.Delete),\n/* harmony export */   "Deprecated": () => (/* reexport safe */ _base_decorator__WEBPACK_IMPORTED_MODULE_0__.Deprecated),\n/* harmony export */   "Get": () => (/* reexport safe */ _route_decorator__WEBPACK_IMPORTED_MODULE_3__.Get),\n/* harmony export */   "GetDecorator": () => (/* reexport safe */ _base_decorator__WEBPACK_IMPORTED_MODULE_0__.GetDecorator),\n/* harmony export */   "Options": () => (/* reexport safe */ _route_decorator__WEBPACK_IMPORTED_MODULE_3__.Options),\n/* harmony export */   "Post": () => (/* reexport safe */ _route_decorator__WEBPACK_IMPORTED_MODULE_3__.Post),\n/* harmony export */   "Put": () => (/* reexport safe */ _route_decorator__WEBPACK_IMPORTED_MODULE_3__.Put),\n/* harmony export */   "RouteDecoratorFactory": () => (/* reexport safe */ _base_decorator__WEBPACK_IMPORTED_MODULE_0__.RouteDecoratorFactory),\n/* harmony export */   "ValidateBody": () => (/* reexport safe */ _request_decorator__WEBPACK_IMPORTED_MODULE_2__.ValidateBody),\n/* harmony export */   "ValidateQuery": () => (/* reexport safe */ _request_decorator__WEBPACK_IMPORTED_MODULE_2__.ValidateQuery),\n/* harmony export */   "ValidateRole": () => (/* reexport safe */ _request_decorator__WEBPACK_IMPORTED_MODULE_2__.ValidateRole)\n/* harmony export */ });\n/* harmony import */ var _base_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.decorator */ "./src/core/decorator/base.decorator.ts");\n/* harmony import */ var _controller_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller.decorator */ "./src/core/decorator/controller.decorator.ts");\n/* harmony import */ var _request_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request.decorator */ "./src/core/decorator/request.decorator.ts");\n/* harmony import */ var _route_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./route.decorator */ "./src/core/decorator/route.decorator.ts");\n\n\n\n\n\n\n//# sourceURL=webpack://typescript-first-app/./src/core/decorator/index.ts?')},"./src/core/decorator/request.decorator.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "ValidateBody": () => (/* binding */ ValidateBody),\n/* harmony export */   "ValidateQuery": () => (/* binding */ ValidateQuery),\n/* harmony export */   "ValidateRole": () => (/* binding */ ValidateRole)\n/* harmony export */ });\n/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "ajv");\n/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ "reflect-metadata");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _logs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logs */ "./src/core/logs.ts");\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enum */ "./src/core/enum.ts");\n/* harmony import */ var _utils_index_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/index.util */ "./src/utils/index.util.ts");\n\n// import ajvErrors from \'ajv-errors\';\n\n\n\n\nconst ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())({\n    allErrors: true\n});\najv.addKeyword(\'errorMessage\');\n/**\r\n * This core/decorator/request.decorator.ts\r\n *\r\n * FEATURES\r\n * Dynamic setting for validate schema\r\n*/ /**\r\n *\r\n * This decorator validate reference from https://github.com/codezisland/validation-decorator-example\r\n *\r\n * @param source : string -> for get data from body or query params\r\n * @returns next()\r\n */ const ValidateReq = (source)=>(schema)=>(target, propertyName, descriptor)=>{\n            const method = descriptor.value;\n            descriptor.value = async function() {\n                const [req, res, next] = arguments;\n                try {\n                    _logs__WEBPACK_IMPORTED_MODULE_2__["default"].info(`Validation Request`);\n                    _logs__WEBPACK_IMPORTED_MODULE_2__["default"].debug(\'With data\', JSON.stringify(req[source]));\n                    const validate = await ajv.validate(schema, req[source]);\n                    if (!validate) {\n                        const errorCode = `${_enum__WEBPACK_IMPORTED_MODULE_3__.EErrorCode.CORE}-${_enum__WEBPACK_IMPORTED_MODULE_3__.ECore.DECORATOR_REQUEST}-${(0,_utils_index_util__WEBPACK_IMPORTED_MODULE_4__.generateCode)(4)}`;\n                        const errorMessages = ajv.errorsText();\n                        _logs__WEBPACK_IMPORTED_MODULE_2__["default"].error(`Error ${errorCode}`, `Validation Request Failed ${errorMessages}`);\n                        const result = {\n                            statusCode: _enum__WEBPACK_IMPORTED_MODULE_3__.EHttpStatusCode.BAD_REQUEST,\n                            status: _enum__WEBPACK_IMPORTED_MODULE_3__.EStatus.FAILED,\n                            message: _enum__WEBPACK_IMPORTED_MODULE_3__.EErrorMessage.INVALID_DATA,\n                            detail: errorMessages,\n                            errorCode,\n                            errorMessage: errorMessages\n                        };\n                        next(result);\n                    } else {\n                        _logs__WEBPACK_IMPORTED_MODULE_2__["default"].info(\'Validation Request Success\', JSON.stringify(req[source]));\n                        method?.apply(this, arguments);\n                    }\n                } catch (error) {\n                    const errorCode = `${_enum__WEBPACK_IMPORTED_MODULE_3__.EErrorCode.CORE}-${_enum__WEBPACK_IMPORTED_MODULE_3__.ECore.DECORATOR_REQUEST}-${(0,_utils_index_util__WEBPACK_IMPORTED_MODULE_4__.generateCode)(4)}`;\n                    _logs__WEBPACK_IMPORTED_MODULE_2__["default"].error(`Error ${errorCode}`, {\n                        path: `${_enum__WEBPACK_IMPORTED_MODULE_3__.EErrorCode.CORE}-${_enum__WEBPACK_IMPORTED_MODULE_3__.ECore.DECORATOR_REQUEST}-${(0,_utils_index_util__WEBPACK_IMPORTED_MODULE_4__.getMethodName)(error)}`,\n                        message: `Validation Request Failed ${error.message}`\n                    });\n                    const result = {\n                        statusCode: _enum__WEBPACK_IMPORTED_MODULE_3__.EHttpStatusCode.INTERNAL_SERVER_ERROR,\n                        status: _enum__WEBPACK_IMPORTED_MODULE_3__.EStatus.FAILED,\n                        message: _enum__WEBPACK_IMPORTED_MODULE_3__.EErrorMessage.NOT_HANDLED,\n                        detail: error.message,\n                        errorCode,\n                        errorMessage: error.message\n                    };\n                    next(result);\n                }\n            };\n        };\nconst ValidateAuth = ()=>{\n    console.log(\'\');\n};\nconst ValidateRole = ValidateAuth;\nconst ValidateQuery = ValidateReq(\'query\');\nconst ValidateBody = ValidateReq(\'body\');\n\n\n//# sourceURL=webpack://typescript-first-app/./src/core/decorator/request.decorator.ts?')},"./src/core/decorator/route.decorator.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Delete": () => (/* binding */ Delete),\n/* harmony export */   "Get": () => (/* binding */ Get),\n/* harmony export */   "Options": () => (/* binding */ Options),\n/* harmony export */   "Post": () => (/* binding */ Post),\n/* harmony export */   "Put": () => (/* binding */ Put)\n/* harmony export */ });\n/* harmony import */ var _base_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.decorator */ "./src/core/decorator/base.decorator.ts");\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enum */ "./src/core/enum.ts");\n\n\n/**\r\n * This core/decorator/route.decorator.ts\r\n *\r\n * FEATURES\r\n * Generate route using decorator\r\n * Generate endpoint using name function controller if endpoint route not defined\r\n *\r\n*/ const Get = (0,_base_decorator__WEBPACK_IMPORTED_MODULE_0__.RouteDecoratorFactory)(_enum__WEBPACK_IMPORTED_MODULE_1__.EHttpMethods.GET);\nconst Post = (0,_base_decorator__WEBPACK_IMPORTED_MODULE_0__.RouteDecoratorFactory)(_enum__WEBPACK_IMPORTED_MODULE_1__.EHttpMethods.POST);\nconst Delete = (0,_base_decorator__WEBPACK_IMPORTED_MODULE_0__.RouteDecoratorFactory)(_enum__WEBPACK_IMPORTED_MODULE_1__.EHttpMethods.DELETE);\nconst Options = (0,_base_decorator__WEBPACK_IMPORTED_MODULE_0__.RouteDecoratorFactory)(_enum__WEBPACK_IMPORTED_MODULE_1__.EHttpMethods.OPTIONS);\nconst Put = (0,_base_decorator__WEBPACK_IMPORTED_MODULE_0__.RouteDecoratorFactory)(_enum__WEBPACK_IMPORTED_MODULE_1__.EHttpMethods.PUT);\n\n\n//# sourceURL=webpack://typescript-first-app/./src/core/decorator/route.decorator.ts?')}};