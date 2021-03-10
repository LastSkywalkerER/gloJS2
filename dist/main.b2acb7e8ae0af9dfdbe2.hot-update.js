/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdategloJS2"]("main",{

/***/ "./src/modules/scroll.js":
/*!*******************************!*\
  !*** ./src/modules/scroll.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar scroll = function scroll() {\n  var counter = document.documentElement.scrollTop;\n\n  var smoothScroll = function smoothScroll(scrollTo) {\n    var positionY = document.querySelector(scrollTo).offsetTop;\n    counter = document.documentElement.scrollTop;\n    counter += 10;\n    document.documentElement.scrollTop = counter;\n\n    if (counter < positionY) {\n      setTimeout(smoothScroll, 1, scrollTo);\n    }\n  };\n\n  document.addEventListener('click', function (event) {\n    var link = event.target.closest('a');\n\n    if (link) {\n      link = link.getAttribute('href');\n\n      if (link[0] === '#' && link !== '#close' && link.length > 1) {\n        event.preventDefault();\n        smoothScroll(link);\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scroll);\n\n//# sourceURL=webpack://gloJS2/./src/modules/scroll.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("299be00ae2dc7a238411")
/******/ 	})();
/******/ 	
/******/ }
);