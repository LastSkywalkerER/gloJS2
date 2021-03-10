/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdategloJS2"]("main",{

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst toggleMenu = () => {\r\n  const btnMenu = document.querySelector('.menu'),\r\n    menu = document.querySelector('menu'),\r\n    closeBtn = document.querySelector('.close-btn'),\r\n    menuItem = [...menu.querySelectorAll('ul>li>a')];\r\n\r\n  let isOpen = false;\r\n\r\n  const handlerMenu = () => {\r\n    menu.classList.toggle('active-menu');\r\n  };\r\n\r\n  document.addEventListener('click', event => {\r\n    const target = event.target;\r\n\r\n    const btn = target.closest('.' + btnMenu.classList);\r\n    const menuElem = target.closest(menu.tagName);\r\n    const close = target.closest('.' + closeBtn.classList);\r\n    // const li = target.closest(menuItem.tagName);\r\n\r\n\r\n    if (isOpen) {\r\n      if (!menuElem) {\r\n        console.log(isOpen);\r\n        handlerMenu();\r\n        isOpen = false;\r\n        return;\r\n      }\r\n    };\r\n\r\n    if (close || target === menuItem) {\r\n      handlerMenu();\r\n      isOpen = false;\r\n      return;\r\n    }\r\n\r\n    if (btn) {\r\n      handlerMenu();\r\n      isOpen = !isOpen;\r\n      return;\r\n    }\r\n\r\n\r\n  });\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);\n\n//# sourceURL=webpack://gloJS2/./src/modules/toggleMenu.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("45644487bed5228dbfa1")
/******/ 	})();
/******/ 	
/******/ }
);