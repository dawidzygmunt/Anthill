/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./worker/index.ts":
/*!*************************!*\
  !*** ./worker/index.ts ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./worker/util.ts\");\n\n(0,_util__WEBPACK_IMPORTED_MODULE_0__.util)();\nlet isSendDay = false;\nlet isSendWeek = false;\nlet isSendMonth = false;\n// Once a week notification\nfunction calculateNextFriday16() {\n    const now = new Date();\n    const nextFriday = new Date();\n    nextFriday.setDate(now.getDate() + (5 - now.getDay() + 7) % 7) // next Friday\n    ;\n    nextFriday.setHours(16, 0, 0, 0) // 16:00:00\n    ;\n    if (nextFriday < now) {\n        nextFriday.setDate(nextFriday.getDate() + 7);\n    }\n    const timeToNextFriday = nextFriday.getTime() - now.getTime();\n    return timeToNextFriday;\n}\n// Once a month notification\nfunction calculateTimeUntilEndOfMonth() {\n    const now = new Date();\n    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 16, 0, 0, 0);\n    return endOfMonth.getTime() - now.getTime();\n}\nfunction sendNotification(message) {\n    self.registration.showNotification(\"Anthill v2\", {\n        body: message,\n        icon: \"/icon512_rounded.png\"\n    });\n}\nasync function startInterval() {\n    setInterval(()=>{\n        const timeToNextFriday = calculateNextFriday16();\n        const timeToNextMonth = calculateTimeUntilEndOfMonth();\n        // Week\n        const timeWindowWeek = 1000 * 60 * 60 // 1 hour\n        ;\n        if (timeToNextFriday <= timeWindowWeek && !isSendWeek) {\n            sendNotification(\"Fill your hours\");\n            isSendWeek = true;\n        } else if (timeToNextFriday > timeWindowWeek) {\n            isSendWeek = false;\n        }\n        // Month\n        const timeWindowMonth = 1000 * 60 * 60 // 1 hour\n        ;\n        if (timeToNextMonth <= timeWindowMonth && !isSendMonth) {\n            sendNotification(\"Fill your hours\");\n            isSendMonth = true;\n        } else if (timeToNextMonth > timeWindowMonth) {\n            isSendMonth = false;\n        }\n    }, 1000 * 60 * 5) // 5 minutes\n    ;\n}\n// Schedule notifications after Service Worker activation\nself.addEventListener(\"install\", function(event) {\n    if (event) {\n        event.waitUntil(self.skipWaiting());\n    }\n});\nself.addEventListener(\"activate\", function(event) {\n    if (event) {\n        event.waitUntil(self.clients.claim());\n        startInterval() // Start notifications every 5 minutes\n        ;\n    }\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi93b3JrZXIvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7QUFBNkI7QUFJN0JBLDJDQUFJQTtBQUVKLElBQUlDLFlBQVk7QUFDaEIsSUFBSUMsYUFBYTtBQUNqQixJQUFJQyxjQUFjO0FBRWxCLDJCQUEyQjtBQUMzQixTQUFTQztJQUNQLE1BQU1DLE1BQU0sSUFBSUM7SUFDaEIsTUFBTUMsYUFBYSxJQUFJRDtJQUN2QkMsV0FBV0MsT0FBTyxDQUFDSCxJQUFJSSxPQUFPLEtBQU0sQ0FBQyxJQUFJSixJQUFJSyxNQUFNLEtBQUssS0FBSyxHQUFJLGNBQWM7O0lBQy9FSCxXQUFXSSxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxXQUFXOztJQUU1QyxJQUFJSixhQUFhRixLQUFLO1FBQ3BCRSxXQUFXQyxPQUFPLENBQUNELFdBQVdFLE9BQU8sS0FBSztJQUM1QztJQUNBLE1BQU1HLG1CQUFtQkwsV0FBV00sT0FBTyxLQUFLUixJQUFJUSxPQUFPO0lBRTNELE9BQU9EO0FBQ1Q7QUFFQSw0QkFBNEI7QUFDNUIsU0FBU0U7SUFDUCxNQUFNVCxNQUFNLElBQUlDO0lBQ2hCLE1BQU1TLGFBQWEsSUFBSVQsS0FDckJELElBQUlXLFdBQVcsSUFDZlgsSUFBSVksUUFBUSxLQUFLLEdBQ2pCLEdBQ0EsSUFDQSxHQUNBLEdBQ0E7SUFHRixPQUFPRixXQUFXRixPQUFPLEtBQUtSLElBQUlRLE9BQU87QUFDM0M7QUFFQSxTQUFTSyxpQkFBaUJDLE9BQWU7SUFDdkNDLEtBQUtDLFlBQVksQ0FBQ0MsZ0JBQWdCLENBQUMsY0FBYztRQUMvQ0MsTUFBTUo7UUFDTkssTUFBTTtJQUNSO0FBQ0Y7QUFFQSxlQUFlQztJQUNiQyxZQUNFO1FBQ0UsTUFBTWQsbUJBQW1CUjtRQUN6QixNQUFNdUIsa0JBQWtCYjtRQUV4QixPQUFPO1FBQ1AsTUFBTWMsaUJBQWlCLE9BQU8sS0FBSyxHQUFHLFNBQVM7O1FBQy9DLElBQUloQixvQkFBb0JnQixrQkFBa0IsQ0FBQzFCLFlBQVk7WUFDckRnQixpQkFBaUI7WUFDakJoQixhQUFhO1FBQ2YsT0FBTyxJQUFJVSxtQkFBbUJnQixnQkFBZ0I7WUFDNUMxQixhQUFhO1FBQ2Y7UUFFQSxRQUFRO1FBQ1IsTUFBTTJCLGtCQUFrQixPQUFPLEtBQUssR0FBRyxTQUFTOztRQUNoRCxJQUFJRixtQkFBbUJFLG1CQUFtQixDQUFDMUIsYUFBYTtZQUN0RGUsaUJBQWlCO1lBQ2pCZixjQUFjO1FBQ2hCLE9BQU8sSUFBSXdCLGtCQUFrQkUsaUJBQWlCO1lBQzVDMUIsY0FBYztRQUNoQjtJQUNGLEdBQ0EsT0FBTyxLQUFLLEdBQ1osWUFBWTs7QUFDaEI7QUFFQSx5REFBeUQ7QUFDekRpQixLQUFLVSxnQkFBZ0IsQ0FBQyxXQUFXLFNBQVVDLEtBQUs7SUFDOUMsSUFBSUEsT0FBTztRQUNUQSxNQUFNQyxTQUFTLENBQUNaLEtBQUthLFdBQVc7SUFDbEM7QUFDRjtBQUVBYixLQUFLVSxnQkFBZ0IsQ0FBQyxZQUFZLFNBQVVDLEtBQUs7SUFDL0MsSUFBSUEsT0FBTztRQUNUQSxNQUFNQyxTQUFTLENBQUNaLEtBQUtjLE9BQU8sQ0FBQ0MsS0FBSztRQUNsQ1YsZ0JBQWdCLHNDQUFzQzs7SUFDeEQ7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi93b3JrZXIvaW5kZXgudHM/ZWNiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlsIH0gZnJvbSBcIi4vdXRpbFwiXG5cbmRlY2xhcmUgbGV0IHNlbGY6IFNlcnZpY2VXb3JrZXJHbG9iYWxTY29wZVxuXG51dGlsKClcblxubGV0IGlzU2VuZERheSA9IGZhbHNlXG5sZXQgaXNTZW5kV2VlayA9IGZhbHNlXG5sZXQgaXNTZW5kTW9udGggPSBmYWxzZVxuXG4vLyBPbmNlIGEgd2VlayBub3RpZmljYXRpb25cbmZ1bmN0aW9uIGNhbGN1bGF0ZU5leHRGcmlkYXkxNigpIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKVxuICBjb25zdCBuZXh0RnJpZGF5ID0gbmV3IERhdGUoKVxuICBuZXh0RnJpZGF5LnNldERhdGUobm93LmdldERhdGUoKSArICgoNSAtIG5vdy5nZXREYXkoKSArIDcpICUgNykpIC8vIG5leHQgRnJpZGF5XG4gIG5leHRGcmlkYXkuc2V0SG91cnMoMTYsIDAsIDAsIDApIC8vIDE2OjAwOjAwXG5cbiAgaWYgKG5leHRGcmlkYXkgPCBub3cpIHtcbiAgICBuZXh0RnJpZGF5LnNldERhdGUobmV4dEZyaWRheS5nZXREYXRlKCkgKyA3KVxuICB9XG4gIGNvbnN0IHRpbWVUb05leHRGcmlkYXkgPSBuZXh0RnJpZGF5LmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKClcblxuICByZXR1cm4gdGltZVRvTmV4dEZyaWRheVxufVxuXG4vLyBPbmNlIGEgbW9udGggbm90aWZpY2F0aW9uXG5mdW5jdGlvbiBjYWxjdWxhdGVUaW1lVW50aWxFbmRPZk1vbnRoKCkge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpXG4gIGNvbnN0IGVuZE9mTW9udGggPSBuZXcgRGF0ZShcbiAgICBub3cuZ2V0RnVsbFllYXIoKSxcbiAgICBub3cuZ2V0TW9udGgoKSArIDEsXG4gICAgMCxcbiAgICAxNixcbiAgICAwLFxuICAgIDAsXG4gICAgMFxuICApXG5cbiAgcmV0dXJuIGVuZE9mTW9udGguZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKVxufVxuXG5mdW5jdGlvbiBzZW5kTm90aWZpY2F0aW9uKG1lc3NhZ2U6IHN0cmluZykge1xuICBzZWxmLnJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKFwiQW50aGlsbCB2MlwiLCB7XG4gICAgYm9keTogbWVzc2FnZSxcbiAgICBpY29uOiBcIi9pY29uNTEyX3JvdW5kZWQucG5nXCIsXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0SW50ZXJ2YWwoKSB7XG4gIHNldEludGVydmFsKFxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVUb05leHRGcmlkYXkgPSBjYWxjdWxhdGVOZXh0RnJpZGF5MTYoKVxuICAgICAgY29uc3QgdGltZVRvTmV4dE1vbnRoID0gY2FsY3VsYXRlVGltZVVudGlsRW5kT2ZNb250aCgpXG5cbiAgICAgIC8vIFdlZWtcbiAgICAgIGNvbnN0IHRpbWVXaW5kb3dXZWVrID0gMTAwMCAqIDYwICogNjAgLy8gMSBob3VyXG4gICAgICBpZiAodGltZVRvTmV4dEZyaWRheSA8PSB0aW1lV2luZG93V2VlayAmJiAhaXNTZW5kV2Vlaykge1xuICAgICAgICBzZW5kTm90aWZpY2F0aW9uKFwiRmlsbCB5b3VyIGhvdXJzXCIpXG4gICAgICAgIGlzU2VuZFdlZWsgPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHRpbWVUb05leHRGcmlkYXkgPiB0aW1lV2luZG93V2Vlaykge1xuICAgICAgICBpc1NlbmRXZWVrID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgLy8gTW9udGhcbiAgICAgIGNvbnN0IHRpbWVXaW5kb3dNb250aCA9IDEwMDAgKiA2MCAqIDYwIC8vIDEgaG91clxuICAgICAgaWYgKHRpbWVUb05leHRNb250aCA8PSB0aW1lV2luZG93TW9udGggJiYgIWlzU2VuZE1vbnRoKSB7XG4gICAgICAgIHNlbmROb3RpZmljYXRpb24oXCJGaWxsIHlvdXIgaG91cnNcIilcbiAgICAgICAgaXNTZW5kTW9udGggPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHRpbWVUb05leHRNb250aCA+IHRpbWVXaW5kb3dNb250aCkge1xuICAgICAgICBpc1NlbmRNb250aCA9IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICAxMDAwICogNjAgKiA1XG4gICkgLy8gNSBtaW51dGVzXG59XG5cbi8vIFNjaGVkdWxlIG5vdGlmaWNhdGlvbnMgYWZ0ZXIgU2VydmljZSBXb3JrZXIgYWN0aXZhdGlvblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiaW5zdGFsbFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKGV2ZW50KSB7XG4gICAgZXZlbnQud2FpdFVudGlsKHNlbGYuc2tpcFdhaXRpbmcoKSlcbiAgfVxufSlcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiYWN0aXZhdGVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmIChldmVudCkge1xuICAgIGV2ZW50LndhaXRVbnRpbChzZWxmLmNsaWVudHMuY2xhaW0oKSlcbiAgICBzdGFydEludGVydmFsKCkgLy8gU3RhcnQgbm90aWZpY2F0aW9ucyBldmVyeSA1IG1pbnV0ZXNcbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJ1dGlsIiwiaXNTZW5kRGF5IiwiaXNTZW5kV2VlayIsImlzU2VuZE1vbnRoIiwiY2FsY3VsYXRlTmV4dEZyaWRheTE2Iiwibm93IiwiRGF0ZSIsIm5leHRGcmlkYXkiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsImdldERheSIsInNldEhvdXJzIiwidGltZVRvTmV4dEZyaWRheSIsImdldFRpbWUiLCJjYWxjdWxhdGVUaW1lVW50aWxFbmRPZk1vbnRoIiwiZW5kT2ZNb250aCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJzZW5kTm90aWZpY2F0aW9uIiwibWVzc2FnZSIsInNlbGYiLCJyZWdpc3RyYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwiYm9keSIsImljb24iLCJzdGFydEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJ0aW1lVG9OZXh0TW9udGgiLCJ0aW1lV2luZG93V2VlayIsInRpbWVXaW5kb3dNb250aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIndhaXRVbnRpbCIsInNraXBXYWl0aW5nIiwiY2xpZW50cyIsImNsYWltIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./worker/index.ts\n"));

/***/ }),

/***/ "./worker/util.ts":
/*!************************!*\
  !*** ./worker/util.ts ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   util: function() { return /* binding */ util; }\n/* harmony export */ });\nfunction util() {\n    let foo = {\n        message: \"working\"\n    };\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi93b3JrZXIvdXRpbC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sU0FBU0E7SUFDZCxJQUFJQyxNQUFNO1FBQUVDLFNBQVM7SUFBVTtBQUNqQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi93b3JrZXIvdXRpbC50cz82OTcxIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB1dGlsKCkge1xuICBsZXQgZm9vID0geyBtZXNzYWdlOiBcIndvcmtpbmdcIiB9XG59XG4iXSwibmFtZXMiOlsidXRpbCIsImZvbyIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./worker/util.ts\n"));

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
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: function(script) { return script; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	!function() {
/******/ 		__webpack_require__.ts = function(script) { return __webpack_require__.tt().createScript(script); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	!function() {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push(function(options) {
/******/ 			var originalFactory = options.factory;
/******/ 			options.factory = function(moduleObject, moduleExports, webpackRequire) {
/******/ 				var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				var cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : function() {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./worker/index.ts");
/******/ 	
/******/ })()
;