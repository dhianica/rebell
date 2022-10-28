exports.id="src_app_employee_employee_routing_ts",exports.ids=["src_app_employee_employee_routing_ts"],exports.modules={"./src/app/employee/employee.controller.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:worker_threads */ \"node:worker_threads\");\n/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_worker_threads__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_decorator_decorator_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/decorator/decorator.handler */ \"./src/core/decorator/decorator.handler.ts\");\n/* harmony import */ var _utils_index_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/index.util */ \"./src/utils/index.util.ts\");\nvar __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\n\nclass EmployeeController {\n    constructor(){\n        this.getAllEmployees = (req, res, next)=>{\n            res.json({\n                cats: this.posts\n            });\n        };\n    }\n    posts = [\n        {\n            name: 'Muchammad Ilham',\n            division: 'System Development',\n            title: 'Senior'\n        }\n    ];\n    getAllEmployees1 = (req, res, next)=>{\n        try {\n            const workerThread = new node_worker_threads__WEBPACK_IMPORTED_MODULE_0__.Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(\"src_app_employee_worker_employee_getAllEmployees1_worker_ts-_53990\"), __webpack_require__.b), {\n                workerData: this.posts\n            });\n            workerThread.on('online', ()=>{\n                return console.log('employee.getAllEmployees1.worker Run');\n            });\n            workerThread.on('message', (data)=>{\n                console.log(data);\n            }).on('exit', ()=>{\n                res.status(_utils_index_util__WEBPACK_IMPORTED_MODULE_2__.HttpStatusCode.OK).send({\n                    message: _utils_index_util__WEBPACK_IMPORTED_MODULE_2__.SuccessMessage.SUCCESS\n                });\n            }).on('error', (err)=>{\n                throw err;\n            });\n        } catch (error) {\n            console.log(typeof error === 'string' ? error : error.message);\n            res.status(_utils_index_util__WEBPACK_IMPORTED_MODULE_2__.HttpStatusCode.INTERNAL_SERVER_ERROR).send({\n                message: (0,_utils_index_util__WEBPACK_IMPORTED_MODULE_2__.getEnumKeyByEnumValue)(_utils_index_util__WEBPACK_IMPORTED_MODULE_2__.HttpStatusCode, 'INTERNAL_SERVER_ERROR'),\n                detail: error\n            });\n        }\n    };\n    createAEmployee = (req, res)=>{\n        const post = req.body;\n        this.posts.push(post);\n        res.send(post);\n    };\n}\n__decorate([\n    (0,_core_decorator_decorator_handler__WEBPACK_IMPORTED_MODULE_1__.Get)('')\n], EmployeeController.prototype, \"getAllEmployees\", void 0);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EmployeeController());\n\n\n//# sourceURL=webpack://worker-threads-typescript/./src/app/employee/employee.controller.ts?")},"./src/app/employee/employee.routing.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _core_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/route */ "./src/core/route.ts");\n/* harmony import */ var _employee_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./employee.controller */ "./src/app/employee/employee.controller.ts");\n\n\nclass EmployeeRouter extends _core_route__WEBPACK_IMPORTED_MODULE_0__["default"] {\n    controller = _employee_controller__WEBPACK_IMPORTED_MODULE_1__["default"];\n    constructor(schemaName){\n        super(schemaName, false);\n        this.get(\'/getAllEmployees\', this.controller.getAllEmployees);\n        this.get(\'/getAllEmployees1\', this.controller.getAllEmployees1);\n        this.post(\'/\', this.controller.createAEmployee);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmployeeRouter);\n\n\n//# sourceURL=webpack://worker-threads-typescript/./src/app/employee/employee.routing.ts?')},"./src/core/decorator/decorator.handler.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Delete": () => (/* binding */ Delete),\n/* harmony export */   "Get": () => (/* binding */ Get),\n/* harmony export */   "Options": () => (/* binding */ Options),\n/* harmony export */   "Post": () => (/* binding */ Post),\n/* harmony export */   "Put": () => (/* binding */ Put),\n/* harmony export */   "deprecated": () => (/* binding */ deprecated)\n/* harmony export */ });\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "reflect-metadata");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/core/types.ts");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enum */ "./src/core/enum.ts");\n\n\n\nconst ReflectDetector = (path, method = _enum__WEBPACK_IMPORTED_MODULE_2__.HttpMethods.GET, target, propertyKey)=>{\n    // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.\n    // To prevent any further validation simply set it to an empty array here.\n    if (!Reflect.hasOwnMetadata(_enum__WEBPACK_IMPORTED_MODULE_2__.MetadataKeys.ROUTERS, target.constructor)) {\n        Reflect.defineMetadata(_enum__WEBPACK_IMPORTED_MODULE_2__.MetadataKeys.ROUTERS, [], target.constructor);\n    }\n    // Get the routes stored so far, extend it by the new route and re-set the metadata.\n    const routes = Reflect.getMetadata(_enum__WEBPACK_IMPORTED_MODULE_2__.MetadataKeys.ROUTERS, target.constructor);\n    routes.push({\n        requestMethod: method,\n        path: !path ? propertyKey : path,\n        methodName: propertyKey\n    });\n    Reflect.defineMetadata(_enum__WEBPACK_IMPORTED_MODULE_2__.MetadataKeys.ROUTERS, routes, target.constructor);\n    console.log(Reflect.getMetadata(_enum__WEBPACK_IMPORTED_MODULE_2__.MetadataKeys.ROUTERS, target.constructor));\n};\nfunction Get(path) {\n    // `target` equals our class, `propertyKey` equals our decorated method name\n    return (target, propertyKey)=>{\n        ReflectDetector(path, _enum__WEBPACK_IMPORTED_MODULE_2__.HttpMethods.GET, target, propertyKey);\n    };\n}\nfunction Post(path) {\n    // `target` equals our class, `propertyKey` equals our decorated method name\n    return (target, propertyKey)=>{\n        ReflectDetector(path, _enum__WEBPACK_IMPORTED_MODULE_2__.HttpMethods.POST, target, propertyKey);\n    };\n}\nfunction Delete(path) {\n    // `target` equals our class, `propertyKey` equals our decorated method name\n    return (target, propertyKey)=>{\n        ReflectDetector(path, _enum__WEBPACK_IMPORTED_MODULE_2__.HttpMethods.DELETE, target, propertyKey);\n    };\n}\nfunction Options(path) {\n    // `target` equals our class, `propertyKey` equals our decorated method name\n    return (target, propertyKey)=>{\n        ReflectDetector(path, _enum__WEBPACK_IMPORTED_MODULE_2__.HttpMethods.OPTIONS, target, propertyKey);\n    };\n}\nfunction Put(path) {\n    // `target` equals our class, `propertyKey` equals our decorated method name\n    return (target, propertyKey)=>{\n        ReflectDetector(path, _enum__WEBPACK_IMPORTED_MODULE_2__.HttpMethods.PUT, target, propertyKey);\n    };\n}\nconst deprecated = (deprecationReason)=>{\n    return (target, memberName, propertyDescriptor)=>{\n        return {\n            get () {\n                const wrapperFn = (...args)=>{\n                    console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);\n                    propertyDescriptor.value.apply(this, args);\n                };\n                Object.defineProperty(this, memberName, {\n                    value: wrapperFn,\n                    configurable: true,\n                    writable: true\n                });\n                return wrapperFn;\n            }\n        };\n    };\n};\n\n\n//# sourceURL=webpack://worker-threads-typescript/./src/core/decorator/decorator.handler.ts?')},"./src/core/route.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema */ "./src/core/schema.ts");\n\n\n/**\r\n * This core/route.ts reference from express.Router() for create dynamic route\r\n *\r\n * FEATURES\r\n * Add Middleware for schema, using variable useValidateMiddleware only set true when call super() but default is true\r\n * \r\n * TODO\r\n * Generate endpoint using name function controller\r\n * Dynamic setting useValidateMiddeware\r\n*/ class Route extends _schema__WEBPACK_IMPORTED_MODULE_1__["default"] {\n    constructor(schemaName, useValidateMiddleware = true){\n        super();\n        this.router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\n        this.schemaName = schemaName;\n        this.useValidateMiddleware = useValidateMiddleware;\n    }\n    get(path, ...params) {\n        if (this.useValidateMiddleware) {\n            this.router.get(path, this.validate(this.schemaName), params);\n        } else {\n            this.router.get(path, params);\n        }\n    }\n    post(path, ...params) {\n        if (this.useValidateMiddleware) {\n            this.router.post(path, this.validate(this.schemaName), params);\n        } else {\n            this.router.post(path, params);\n        }\n    }\n    delete(path, ...params) {\n        if (this.useValidateMiddleware) {\n            this.router.delete(path, this.validate(this.schemaName), params);\n        } else {\n            this.router.delete(path, params);\n        }\n    }\n    put(path, ...params) {\n        if (this.useValidateMiddleware) {\n            this.router.put(path, this.validate(this.schemaName), params);\n        } else {\n            this.router.put(path, params);\n        }\n    }\n    options(path, ...params) {\n        if (this.useValidateMiddleware) {\n            this.router.options(path, this.validate(this.schemaName), params);\n        } else {\n            this.router.options(path, params);\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Route);\n\n\n//# sourceURL=webpack://worker-threads-typescript/./src/core/route.ts?')},"./src/core/types.ts"(){eval("\n\n//# sourceURL=webpack://worker-threads-typescript/./src/core/types.ts?")}};