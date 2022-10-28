"use strict";exports.id="src_app_employee_employee_controller_spec_ts",exports.ids=["src_app_employee_employee_controller_spec_ts"],exports.modules={"./src/app/employee/employee.controller.spec.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chai */ \"chai\");\n/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chai__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var supertest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! supertest */ \"supertest\");\n/* harmony import */ var supertest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(supertest__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mocha__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mocha */ \"mocha\");\n/* harmony import */ var mocha__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mocha__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../index */ \"./src/index.ts\");\n\n\n\n\ndescribe('Unit Test Employee', ()=>{\n    it('should GET', async ()=>{\n        const res = await (0,supertest__WEBPACK_IMPORTED_MODULE_1__.agent)(_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"]).get('/api/employee/');\n        (0,chai__WEBPACK_IMPORTED_MODULE_0__.expect)(res.status).to.equal(200);\n        (0,chai__WEBPACK_IMPORTED_MODULE_0__.expect)(res.type).to.equal('application/json');\n        (0,chai__WEBPACK_IMPORTED_MODULE_0__.expect)(res.body).to.be.an('array');\n    });\n});\n\n\n//# sourceURL=webpack://worker-threads-typescript/./src/app/employee/employee.controller.spec.ts?")}};