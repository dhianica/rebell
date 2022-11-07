"use strict";exports.id="src_app_employee_employee_controller_ts",exports.ids=["src_app_employee_employee_controller_ts"],exports.modules={"./src/app/employee/employee.controller.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_index_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/index.util */ "./src/utils/index.util.ts");\n/* harmony import */ var _core_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/enum */ "./src/core/enum.ts");\n/* harmony import */ var _core_decorator_handler_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/decorator/handler.decorator */ "./src/core/decorator/handler.decorator.ts");\nvar __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);\n    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = undefined && undefined.__metadata || function(k, v) {\n    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);\n};\n\n\n\nclass EmployeeController {\n    posts = [\n        {\n            name: \'Muchammad Ilham\',\n            division: \'System Development\',\n            title: \'Senior\'\n        }\n    ];\n    getAllEmployees(req, res, next) {\n        return new Promise(()=>{\n            try {\n                throw new Error(\'Error getting all employees\');\n            } catch (error) {\n                console.log(typeof error === \'string\' ? error : error.message);\n                res.status(_core_enum__WEBPACK_IMPORTED_MODULE_1__.HttpStatusCode.INTERNAL_SERVER_ERROR).send({\n                    message: _core_enum__WEBPACK_IMPORTED_MODULE_1__.Message.NOT_HANDLED,\n                    detail: error\n                });\n            }\n        });\n    }\n    getAllEmployees1(req, res, next) {\n        return new Promise(()=>{\n            try {\n                console.log((0,_core_decorator_handler_decorator__WEBPACK_IMPORTED_MODULE_2__.GetDecorator)(_core_enum__WEBPACK_IMPORTED_MODULE_1__.MetadataKeys.ROUTERS, new EmployeeController()));\n                res.status(_core_enum__WEBPACK_IMPORTED_MODULE_1__.HttpStatusCode.OK).send({\n                    message: _core_enum__WEBPACK_IMPORTED_MODULE_1__.Status.SUCCESS\n                });\n            } catch (error) {\n                console.log(typeof error === \'string\' ? error : error.message);\n                res.status(_core_enum__WEBPACK_IMPORTED_MODULE_1__.HttpStatusCode.INTERNAL_SERVER_ERROR).send({\n                    message: (0,_utils_index_util__WEBPACK_IMPORTED_MODULE_0__.getEnumKeyByEnumValue)(_core_enum__WEBPACK_IMPORTED_MODULE_1__.HttpStatusCode, \'INTERNAL_SERVER_ERROR\'),\n                    detail: error\n                });\n            }\n        });\n    }\n    createAEmployee(req, res) {\n        return new Promise(()=>{\n            const post = req.body;\n            this.posts.push(post);\n            res.send(post);\n        });\n    }\n}\n__decorate([\n    (0,_core_decorator_handler_decorator__WEBPACK_IMPORTED_MODULE_2__.Get)(),\n    __metadata("design:type", Function),\n    __metadata("design:paramtypes", [\n        typeof Request === "undefined" ? Object : Request,\n        typeof Response === "undefined" ? Object : Response,\n        typeof NextFunction === "undefined" ? Object : NextFunction\n    ])\n], EmployeeController.prototype, "getAllEmployees", null);\n__decorate([\n    (0,_core_decorator_handler_decorator__WEBPACK_IMPORTED_MODULE_2__.Get)(),\n    __metadata("design:type", Function),\n    __metadata("design:paramtypes", [\n        typeof Request === "undefined" ? Object : Request,\n        typeof Response === "undefined" ? Object : Response,\n        typeof NextFunction === "undefined" ? Object : NextFunction\n    ])\n], EmployeeController.prototype, "getAllEmployees1", null);\n__decorate([\n    (0,_core_decorator_handler_decorator__WEBPACK_IMPORTED_MODULE_2__.Post)(\'\'),\n    __metadata("design:type", Function),\n    __metadata("design:paramtypes", [\n        typeof Request === "undefined" ? Object : Request,\n        typeof Response === "undefined" ? Object : Response\n    ])\n], EmployeeController.prototype, "createAEmployee", null);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EmployeeController());\n\n\n//# sourceURL=webpack://worker-threads-typescript/./src/app/employee/employee.controller.ts?')}};