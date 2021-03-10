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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst scroll = () => {\r\n\r\n  let counter = document.documentElement.scrollTop;\r\n\r\n  const smoothScroll = scrollTo => {\r\n    const positionY = document.querySelector(scrollTo).offsetTop;\r\n    counter = document.documentElement.scrollTop;\r\n\r\n    counter += 10;\r\n    document.documentElement.scrollTop = counter;\r\n\r\n    if (counter < positionY) {\r\n      setTimeout(smoothScroll, 1, scrollTo);\r\n    }\r\n  };\r\n\r\n  document.addEventListener('click', event => {\r\n    let link = event.target.closest('a');\r\n    if (link) {\r\n      link = link.getAttribute('href');\r\n      if (link[0] === '#' &&\r\n        link !== '#close' && link.length > 1) {\r\n\r\n        event.preventDefault();\r\n        smoothScroll(link);\r\n\r\n      }\r\n    }\r\n\r\n  });\r\n\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scroll);\n\n//# sourceURL=webpack://gloJS2/./src/modules/scroll.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("22182346805e1d8b6882")
/******/ 	})();
/******/ 	
/******/ }
);