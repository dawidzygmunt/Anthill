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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./worker/util.ts\");\n\n// self.__WB_DISABLE_DEV_LOGS = true\n(0,_util__WEBPACK_IMPORTED_MODULE_0__.util)();\nfunction calculateNextFriday16() {\n    const now = new Date();\n    const nextFriday = new Date();\n    nextFriday.setDate(now.getDate() + (5 - now.getDay() + 7) % 7) // next Friday\n    ;\n    nextFriday.setHours(16, 30, 0, 0) // 16:00:00\n    ;\n    if (nextFriday <= now) {\n        nextFriday.setDate(nextFriday.getDate() + 7);\n    }\n    return nextFriday.getTime() - now.getTime();\n}\nfunction sendNotification(message123) {\n    self.registration.showNotification(\"send notification\", {\n        body: message123,\n        icon: \"/icon512_rounded.png\"\n    });\n}\nfunction startInterval() {\n    setInterval(()=>{\n        const timeToNextFriday = calculateNextFriday16();\n        if (timeToNextFriday <= 1000 * 60 * 2) {\n            sendNotification(\"XDDDDD\");\n            console.log(\"Juz czas\");\n        }\n        console.log(\"sprawdzanie czy już czas\");\n        console.log(timeToNextFriday);\n    }, 1000);\n}\n// IndexedDB functions\nfunction openDatabase() {\n    return new Promise((resolve, reject)=>{\n        const request = indexedDB.open(\"notificationsDB\", 1);\n        request.onupgradeneeded = (event)=>{\n            const target = event.target;\n            if (target) {\n                const db = event.target.result;\n                db.createObjectStore(\"notifications\", {\n                    keyPath: \"id\"\n                });\n            }\n        };\n        request.onsuccess = (event)=>{\n            const target = event.target;\n            if (target) {\n                resolve(event.target.result);\n            }\n        };\n        request.onerror = (event)=>{\n            const target = event.target;\n            if (target) {\n                reject(event.target.error);\n            }\n        };\n    });\n}\n// Planowanie powiadomień po aktywacji Service Workera\nself.addEventListener(\"install\", function(event) {\n    if (event) {\n        event.waitUntil(self.skipWaiting());\n    }\n});\nself.addEventListener(\"activate\", function(event) {\n    if (event) {\n        event.waitUntil(self.clients.claim());\n        startInterval() // Rozpocznij powiadomienia co 20 sekund\n        ;\n    }\n});\n// Obsługa zdarzenia kliknięcia w powiadomienie\nself.addEventListener(\"notificationclick\", (event)=>{\n    if (event && event.notification) {\n        event.notification.close();\n        event.waitUntil(self.clients.matchAll({\n            type: \"window\",\n            includeUncontrolled: true\n        }).then(function(clientList) {\n            if (clientList.length > 0) {\n                let client = clientList[0];\n                for(let i = 0; i < clientList.length; i++){\n                    if (clientList[i].focused) {\n                        client = clientList[i];\n                    }\n                }\n                return client.focus();\n            }\n            return self.clients.openWindow(\"/playground\");\n        }));\n    }\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SztvQkFDMUMsSUFBSUgsVUFBVSxDQUFDRyxFQUFFLENBQUNDLE9BQU8sRUFBRTt3QkFDekJGLFNBQVNGLFVBQVUsQ0FBQ0csRUFBRTtvQkFDeEI7Z0JBQ0Y7Z0JBQ0EsT0FBT0QsT0FBT0csS0FBSztZQUNyQjtZQUNBLE9BQU8zQyxLQUFLOEIsT0FBTyxDQUFDYyxVQUFVLENBQUM7UUFDakM7SUFFTjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3dvcmtlci9pbmRleC50cz9lY2JlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHV0aWwgfSBmcm9tIFwiLi91dGlsXCJcblxuZGVjbGFyZSBsZXQgc2VsZjogU2VydmljZVdvcmtlckdsb2JhbFNjb3BlXG5cbi8vIHNlbGYuX19XQl9ESVNBQkxFX0RFVl9MT0dTID0gdHJ1ZVxuXG51dGlsKClcblxuZnVuY3Rpb24gY2FsY3VsYXRlTmV4dEZyaWRheTE2KCkge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpXG4gIGNvbnN0IG5leHRGcmlkYXkgPSBuZXcgRGF0ZSgpXG4gIG5leHRGcmlkYXkuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpICsgKCg1IC0gbm93LmdldERheSgpICsgNykgJSA3KSkgLy8gbmV4dCBGcmlkYXlcbiAgbmV4dEZyaWRheS5zZXRIb3VycygxNiwgMzAsIDAsIDApIC8vIDE2OjAwOjAwXG5cbiAgaWYgKG5leHRGcmlkYXkgPD0gbm93KSB7XG4gICAgbmV4dEZyaWRheS5zZXREYXRlKG5leHRGcmlkYXkuZ2V0RGF0ZSgpICsgNylcbiAgfVxuXG4gIHJldHVybiBuZXh0RnJpZGF5LmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKClcbn1cblxuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbihtZXNzYWdlMTIzOiBzdHJpbmcpIHtcbiAgc2VsZi5yZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbihcInNlbmQgbm90aWZpY2F0aW9uXCIsIHtcbiAgICBib2R5OiBtZXNzYWdlMTIzLFxuICAgIGljb246IFwiL2ljb241MTJfcm91bmRlZC5wbmdcIixcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3RhcnRJbnRlcnZhbCgpIHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVUb05leHRGcmlkYXkgPSBjYWxjdWxhdGVOZXh0RnJpZGF5MTYoKVxuICAgIGlmICh0aW1lVG9OZXh0RnJpZGF5IDw9IDEwMDAgKiA2MCAqIDIpIHtcbiAgICAgIHNlbmROb3RpZmljYXRpb24oXCJYRERERERcIilcbiAgICAgIGNvbnNvbGUubG9nKFwiSnV6IGN6YXNcIilcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJzcHJhd2R6YW5pZSBjenkganXFvCBjemFzXCIpXG4gICAgY29uc29sZS5sb2codGltZVRvTmV4dEZyaWRheSlcbiAgfSwgMTAwMClcbn1cbi8vIEluZGV4ZWREQiBmdW5jdGlvbnNcbmZ1bmN0aW9uIG9wZW5EYXRhYmFzZSgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oXCJub3RpZmljYXRpb25zREJcIiwgMSlcbiAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdFxuICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShcIm5vdGlmaWNhdGlvbnNcIiwgeyBrZXlQYXRoOiBcImlkXCIgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpXG4gICAgICB9XG4gICAgfVxuICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHJlamVjdChldmVudC50YXJnZXQuZXJyb3IpXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG4vLyBQbGFub3dhbmllIHBvd2lhZG9taWXFhCBwbyBha3R5d2FjamkgU2VydmljZSBXb3JrZXJhXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnN0YWxsXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoZXZlbnQpIHtcbiAgICBldmVudC53YWl0VW50aWwoc2VsZi5za2lwV2FpdGluZygpKVxuICB9XG59KVxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJhY3RpdmF0ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKGV2ZW50KSB7XG4gICAgZXZlbnQud2FpdFVudGlsKHNlbGYuY2xpZW50cy5jbGFpbSgpKVxuICAgIHN0YXJ0SW50ZXJ2YWwoKSAvLyBSb3pwb2N6bmlqIHBvd2lhZG9taWVuaWEgY28gMjAgc2VrdW5kXG4gIH1cbn0pXG5cbi8vIE9ic8WCdWdhIHpkYXJ6ZW5pYSBrbGlrbmnEmWNpYSB3IHBvd2lhZG9taWVuaWVcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvbmNsaWNrXCIsIChldmVudCkgPT4ge1xuICBpZiAoZXZlbnQgJiYgZXZlbnQubm90aWZpY2F0aW9uKSB7XG4gICAgZXZlbnQubm90aWZpY2F0aW9uLmNsb3NlKClcbiAgICBldmVudC53YWl0VW50aWwoXG4gICAgICBzZWxmLmNsaWVudHNcbiAgICAgICAgLm1hdGNoQWxsKHsgdHlwZTogXCJ3aW5kb3dcIiwgaW5jbHVkZVVuY29udHJvbGxlZDogdHJ1ZSB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoY2xpZW50TGlzdCkge1xuICAgICAgICAgIGlmIChjbGllbnRMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjbGllbnQgPSBjbGllbnRMaXN0WzBdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsaWVudExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNsaWVudExpc3RbaV0uZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIGNsaWVudCA9IGNsaWVudExpc3RbaV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNsaWVudC5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzZWxmLmNsaWVudHMub3BlbldpbmRvdyhcIi9wbGF5Z3JvdW5kXCIpXG4gICAgICAgIH0pXG4gICAgKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbInV0aWwiLCJjYWxjdWxhdGVOZXh0RnJpZGF5MTYiLCJub3ciLCJEYXRlIiwibmV4dEZyaWRheSIsInNldERhdGUiLCJnZXREYXRlIiwiZ2V0RGF5Iiwic2V0SG91cnMiLCJnZXRUaW1lIiwic2VuZE5vdGlmaWNhdGlvbiIsIm1lc3NhZ2UxMjMiLCJzZWxmIiwicmVnaXN0cmF0aW9uIiwic2hvd05vdGlmaWNhdGlvbiIsImJvZHkiLCJpY29uIiwic3RhcnRJbnRlcnZhbCIsInNldEludGVydmFsIiwidGltZVRvTmV4dEZyaWRheSIsImNvbnNvbGUiLCJsb2ciLCJvcGVuRGF0YWJhc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3QiLCJpbmRleGVkREIiLCJvcGVuIiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJ0YXJnZXQiLCJkYiIsInJlc3VsdCIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsIm9uc3VjY2VzcyIsIm9uZXJyb3IiLCJlcnJvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3YWl0VW50aWwiLCJza2lwV2FpdGluZyIsImNsaWVudHMiLCJjbGFpbSIsIm5vdGlmaWNhdGlvbiIsImNsb3NlIiwibWF0Y2hBbGwiLCJ0eXBlIiwiaW5jbHVkZVVuY29udHJvbGxlZCIsInRoZW4iLCJjbGllbnRMaXN0IiwibGVuZ3RoIiwiY2xpZW50IiwiaSIsImZvY3VzZWQiLCJmb2N1cyIsIm9wZW5XaW5kb3ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./worker/index.ts\n"));

/***/ }),

/***/ "./worker/util.ts":
/*!************************!*\
  !*** ./worker/util.ts ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   util: function() { return /* binding */ util; }\n/* harmony export */ });\nfunction util() {\n    console.log(\"Hello from util.\");\n    console.log(\"es6+ syntax test:\");\n    let foo = {\n        message: \"working\"\n    };\n    console.log(foo === null || foo === void 0 ? void 0 : foo.message);\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi93b3JrZXIvdXRpbC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sU0FBU0E7SUFDZEMsUUFBUUMsR0FBRyxDQUFDO0lBQ1pELFFBQVFDLEdBQUcsQ0FBQztJQUNaLElBQUlDLE1BQU07UUFBRUMsU0FBUztJQUFVO0lBQy9CSCxRQUFRQyxHQUFHLENBQUNDLGdCQUFBQSwwQkFBQUEsSUFBS0MsT0FBTztBQUMxQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi93b3JrZXIvdXRpbC50cz82OTcxIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB1dGlsKCkge1xuICBjb25zb2xlLmxvZyhcIkhlbGxvIGZyb20gdXRpbC5cIilcbiAgY29uc29sZS5sb2coXCJlczYrIHN5bnRheCB0ZXN0OlwiKVxuICBsZXQgZm9vID0geyBtZXNzYWdlOiBcIndvcmtpbmdcIiB9XG4gIGNvbnNvbGUubG9nKGZvbz8ubWVzc2FnZSlcbn1cbiJdLCJuYW1lcyI6WyJ1dGlsIiwiY29uc29sZSIsImxvZyIsImZvbyIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./worker/util.ts\n"));

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