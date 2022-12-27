/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/

browser = undefined;

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.8.0 - Tue Apr 20 2021 11:27:38 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      }); // Keep track if the deprecation warning has been logged at least once.

      let loggedSendResponseDeprecationWarning = false;
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }

              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    } // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map



/***/ }),

/***/ "./src/utils/configuration.ts":
/*!************************************!*\
  !*** ./src/utils/configuration.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "confReady": () => (/* binding */ confReady),
/* harmony export */   "getConf": () => (/* binding */ getConf),
/* harmony export */   "getConfForUrl": () => (/* binding */ getConfForUrl),
/* harmony export */   "getGlobalConf": () => (/* binding */ getGlobalConf),
/* harmony export */   "mergeWithDefaults": () => (/* binding */ mergeWithDefaults)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let conf = undefined;
function mergeWithDefaults(os, settings) {
    function makeDefaults(obj, name, value) {
        if (obj[name] === undefined) {
            obj[name] = value;
        }
        else if (typeof obj[name] !== typeof value
            || Array.isArray(obj[name]) !== Array.isArray(value)) {
            console.warn(`User config entry ${name} does not match expected type. Overriding.`);
            obj[name] = value;
        }
    }
    function makeDefaultLocalSetting(sett, site, obj) {
        makeDefaults(sett.localSettings, site, {});
        for (const key of Object.keys(obj)) {
            makeDefaults(sett.localSettings[site], key, obj[key]);
        }
    }
    if (settings === undefined) {
        settings = {};
    }
    makeDefaults(settings, "globalSettings", {});
    // "<KEY>": "default" | "noop"
    // #103: When using the browser's command API to allow sending `<C-w>` to
    // firenvim, whether the default action should be performed if no neovim
    // frame is focused.
    makeDefaults(settings.globalSettings, "<C-n>", "default");
    makeDefaults(settings.globalSettings, "<C-t>", "default");
    makeDefaults(settings.globalSettings, "<C-w>", "default");
    // Note: <CS-*> are currently disabled because of
    // https://github.com/neovim/neovim/issues/12037
    // Note: <CS-n> doesn't match the default behavior on firefox because this
    // would require the sessions API. Instead, Firefox's behavior matches
    // Chrome's.
    makeDefaults(settings.globalSettings, "<CS-n>", "default");
    // Note: <CS-t> is there for completeness sake's but can't be emulated in
    // Chrome and Firefox because this would require the sessions API.
    makeDefaults(settings.globalSettings, "<CS-t>", "default");
    makeDefaults(settings.globalSettings, "<CS-w>", "default");
    // #717: allow passing keys to the browser
    makeDefaults(settings.globalSettings, "ignoreKeys", {});
    // #1050: cursor sometimes covered by command line
    makeDefaults(settings.globalSettings, "cmdlineTimeout", 3000);
    // "alt": "all" | "alphanum"
    // #202: Only register alt key on alphanums to let swedish osx users type
    //       special chars
    // Only tested on OSX, where we don't pull coverage reports, so don't
    // instrument function.
    /* istanbul ignore next */
    if (os === "mac") {
        makeDefaults(settings.globalSettings, "alt", "alphanum");
    }
    else {
        makeDefaults(settings.globalSettings, "alt", "all");
    }
    makeDefaults(settings, "localSettings", {});
    makeDefaultLocalSetting(settings, ".*", {
        // "cmdline": "neovim" | "firenvim"
        // #168: Use an external commandline to preserve space
        cmdline: "firenvim",
        content: "text",
        priority: 0,
        renderer: "canvas",
        selector: 'textarea:not([readonly]), div[role="textbox"]',
        // "takeover": "always" | "once" | "empty" | "nonempty" | "never"
        // #265: On "once", don't automatically bring back after :q'ing it
        takeover: "always",
        filename: "{hostname%32}_{pathname%32}_{selector%32}_{timestamp%32}.{extension}",
    });
    return settings;
}
const confReady = new Promise(resolve => {
    browser.storage.local.get().then((obj) => {
        conf = obj;
        resolve(true);
    });
});
browser.storage.onChanged.addListener((changes) => {
    Object
        .entries(changes)
        .forEach(([key, value]) => confReady.then(() => {
        conf[key] = value.newValue;
    }));
});
function getGlobalConf() {
    // Can't be tested for
    /* istanbul ignore next */
    if (conf === undefined) {
        throw new Error("getGlobalConf called before config was ready");
    }
    return conf.globalSettings;
}
function getConf() {
    return getConfForUrl(document.location.href);
}
function getConfForUrl(url) {
    const localSettings = conf.localSettings;
    function or1(val) {
        if (val === undefined) {
            return 1;
        }
        return val;
    }
    // Can't be tested for
    /* istanbul ignore next */
    if (localSettings === undefined) {
        throw new Error("Error: your settings are undefined. Try reloading the page. If this error persists, try the troubleshooting guide: https://github.com/glacambre/firenvim/blob/master/TROUBLESHOOTING.md");
    }
    return Array.from(Object.entries(localSettings))
        .filter(([pat, _]) => (new RegExp(pat)).test(url))
        .sort((e1, e2) => (or1(e1[1].priority) - or1(e2[1].priority)))
        .reduce((acc, [_, cur]) => Object.assign(acc, cur), {});
}


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeSelector": () => (/* binding */ computeSelector),
/* harmony export */   "executeInPage": () => (/* binding */ executeInPage),
/* harmony export */   "getIconImageData": () => (/* binding */ getIconImageData),
/* harmony export */   "isChrome": () => (/* binding */ isChrome),
/* harmony export */   "languageToExtensions": () => (/* binding */ languageToExtensions),
/* harmony export */   "parseGuifont": () => (/* binding */ parseGuifont),
/* harmony export */   "parseSingleGuifont": () => (/* binding */ parseSingleGuifont),
/* harmony export */   "toFileName": () => (/* binding */ toFileName),
/* harmony export */   "toHexCss": () => (/* binding */ toHexCss)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let curHost;
// Chrome doesn't have a "browser" object, instead it uses "chrome".
if (window.location.protocol === "moz-extension:") {
    curHost = "firefox";
}
else if (window.location.protocol === "chrome-extension:") {
    curHost = "chrome";
}
else if (window.InstallTrigger === undefined) {
    curHost = "chrome";
}
else {
    curHost = "firefox";
}
// Only usable in background script!
function isChrome() {
    // Can't cover error condition
    /* istanbul ignore next */
    if (curHost === undefined) {
        throw Error("Used isChrome in content script!");
    }
    return curHost === "chrome";
}
// Runs CODE in the page's context by setting up a custom event listener,
// embedding a script element that runs the piece of code and emits its result
// as an event.
function executeInPage(code) {
    // On firefox, use an API that allows circumventing some CSP restrictions
    // Use wrappedJSObject to detect availability of said API
    // DON'T use window.eval on other plateforms - it doesn't have the
    // semantics we need!
    if (window.wrappedJSObject) {
        return new Promise((resolve, reject) => {
            try {
                resolve(window.eval(code));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const eventId = (new URL(browser.runtime.getURL(""))).hostname + Math.random();
        script.innerHTML = `(async (evId) => {
            try {
                let result;
                result = await ${code};
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: {
                        success: true,
                        result,
                    }
                }));
            } catch (e) {
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: { success: false, reason: e },
                }));
            }
        })(${JSON.stringify(eventId)})`;
        window.addEventListener(eventId, ({ detail }) => {
            script.parentNode.removeChild(script);
            if (detail.success) {
                return resolve(detail.result);
            }
            return reject(detail.reason);
        }, { once: true });
        document.head.appendChild(script);
    });
}
// Various filters that are used to change the appearance of the BrowserAction
// icon.
const svgpath = "firenvim.svg";
const transformations = {
    disabled: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Skip transparent pixels
            if (img[i + 3] === 0) {
                continue;
            }
            const mean = Math.floor((img[i] + img[i + 1] + img[i + 2]) / 3);
            img[i] = mean;
            img[i + 1] = mean;
            img[i + 2] = mean;
        }
    },
    error: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Turn transparent pixels red
            if (img[i + 3] === 0) {
                img[i] = 255;
                img[i + 3] = 255;
            }
        }
    },
    normal: ((_img) => undefined),
    notification: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Turn transparent pixels yellow
            if (img[i + 3] === 0) {
                img[i] = 255;
                img[i + 1] = 255;
                img[i + 3] = 255;
            }
        }
    },
};
// Takes an icon kind and dimensions as parameter, draws that to a canvas and
// returns a promise that will be resolved with the canvas' image data.
function getIconImageData(kind, width = 32, height = 32) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image(width, height);
    const result = new Promise((resolve) => img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0, width, height);
        const id = ctx.getImageData(0, 0, width, height);
        transformations[kind](id.data);
        resolve(id);
    }));
    img.src = svgpath;
    return result;
}
// Given a url and a selector, tries to compute a name that will be unique,
// short and readable for the user.
function toFileName(formatString, url, id, language) {
    const parsedURL = new URL(url);
    const sanitize = (s) => (s.match(/[a-zA-Z0-9]+/g) || []).join("-");
    const expand = (pattern) => {
        const noBrackets = pattern.slice(1, -1);
        const [symbol, length] = noBrackets.split("%");
        let value = "";
        switch (symbol) {
            case "hostname":
                value = parsedURL.hostname;
                break;
            case "pathname":
                value = sanitize(parsedURL.pathname);
                break;
            case "selector":
                value = sanitize(id.replace(/:nth-of-type/g, ""));
                break;
            case "timestamp":
                value = sanitize((new Date()).toISOString());
                break;
            case "extension":
                value = languageToExtensions(language);
                break;
            default: console.error(`Unrecognized filename pattern: ${pattern}`);
        }
        return value.slice(-length);
    };
    let result = formatString;
    const matches = formatString.match(/{[^}]*}/g);
    if (matches !== null) {
        for (const match of matches.filter(s => s !== undefined)) {
            result = result.replace(match, expand(match));
        }
    }
    return result;
}
// Given a language name, returns a filename extension. Can return undefined.
function languageToExtensions(language) {
    if (language === undefined || language === null) {
        language = "";
    }
    const lang = language.toLowerCase();
    /* istanbul ignore next */
    switch (lang) {
        case "apl": return "apl";
        case "brainfuck": return "bf";
        case "c": return "c";
        case "c#": return "cs";
        case "c++": return "cpp";
        case "ceylon": return "ceylon";
        case "clike": return "c";
        case "clojure": return "clj";
        case "cmake": return ".cmake";
        case "cobol": return "cbl";
        case "coffeescript": return "coffee";
        case "commonlisp": return "lisp";
        case "crystal": return "cr";
        case "css": return "css";
        case "cython": return "py";
        case "d": return "d";
        case "dart": return "dart";
        case "diff": return "diff";
        case "dockerfile": return "dockerfile";
        case "dtd": return "dtd";
        case "dylan": return "dylan";
        // Eiffel was there first but elixir seems more likely
        // case "eiffel":           return "e";
        case "elixir": return "e";
        case "elm": return "elm";
        case "erlang": return "erl";
        case "f#": return "fs";
        case "factor": return "factor";
        case "forth": return "fth";
        case "fortran": return "f90";
        case "gas": return "asm";
        case "go": return "go";
        // GFM: CodeMirror's github-flavored markdown
        case "gfm": return "md";
        case "groovy": return "groovy";
        case "haml": return "haml";
        case "handlebars": return "hbs";
        case "haskell": return "hs";
        case "haxe": return "hx";
        case "html": return "html";
        case "htmlembedded": return "html";
        case "htmlmixed": return "html";
        case "ipython": return "py";
        case "ipythonfm": return "md";
        case "java": return "java";
        case "javascript": return "js";
        case "jinja2": return "jinja";
        case "julia": return "jl";
        case "jsx": return "jsx";
        case "kotlin": return "kt";
        case "latex": return "latex";
        case "less": return "less";
        case "lua": return "lua";
        case "markdown": return "md";
        case "mllike": return "ml";
        case "ocaml": return "ml";
        case "octave": return "m";
        case "pascal": return "pas";
        case "perl": return "pl";
        case "php": return "php";
        case "powershell": return "ps1";
        case "python": return "py";
        case "r": return "r";
        case "rst": return "rst";
        case "ruby": return "ruby";
        case "rust": return "rs";
        case "sas": return "sas";
        case "sass": return "sass";
        case "scala": return "scala";
        case "scheme": return "scm";
        case "scss": return "scss";
        case "smalltalk": return "st";
        case "shell": return "sh";
        case "sql": return "sql";
        case "stex": return "latex";
        case "swift": return "swift";
        case "tcl": return "tcl";
        case "toml": return "toml";
        case "twig": return "twig";
        case "typescript": return "ts";
        case "vb": return "vb";
        case "vbscript": return "vbs";
        case "verilog": return "sv";
        case "vhdl": return "vhdl";
        case "xml": return "xml";
        case "yaml": return "yaml";
        case "z80": return "z8a";
    }
    return "txt";
}
// Make tslint happy
const fontFamily = "font-family";
// Can't be tested e2e :/
/* istanbul ignore next */
function parseSingleGuifont(guifont, defaults) {
    const options = guifont.split(":");
    const result = Object.assign({}, defaults);
    if (/^[a-zA-Z0-9]+$/.test(options[0])) {
        result[fontFamily] = options[0];
    }
    else {
        result[fontFamily] = JSON.stringify(options[0]);
    }
    if (defaults[fontFamily]) {
        result[fontFamily] += `, ${defaults[fontFamily]}`;
    }
    return options.slice(1).reduce((acc, option) => {
        switch (option[0]) {
            case "h":
                acc["font-size"] = `${option.slice(1)}pt`;
                break;
            case "b":
                acc["font-weight"] = "bold";
                break;
            case "i":
                acc["font-style"] = "italic";
                break;
            case "u":
                acc["text-decoration"] = "underline";
                break;
            case "s":
                acc["text-decoration"] = "line-through";
                break;
            case "w": // Can't set font width. Would have to adjust cell width.
            case "c": // Can't set character set
                break;
        }
        return acc;
    }, result);
}
;
// Parses a guifont declaration as described in `:h E244`
// defaults: default value for each of.
// Can't be tested e2e :/
/* istanbul ignore next */
function parseGuifont(guifont, defaults) {
    const fonts = guifont.split(",").reverse();
    return fonts.reduce((acc, cur) => parseSingleGuifont(cur, acc), defaults);
}
// Computes a unique selector for its argument.
function computeSelector(element) {
    function uniqueSelector(e) {
        // Only matching alphanumeric selectors because others chars might have special meaning in CSS
        if (e.id && e.id.match("^[a-zA-Z0-9_-]+$")) {
            const id = e.tagName + `[id="${e.id}"]`;
            if (document.querySelectorAll(id).length === 1) {
                return id;
            }
        }
        // If we reached the top of the document
        if (!e.parentElement) {
            return "HTML";
        }
        // Compute the position of the element
        const index = Array.from(e.parentElement.children)
            .filter(child => child.tagName === e.tagName)
            .indexOf(e) + 1;
        return `${uniqueSelector(e.parentElement)} > ${e.tagName}:nth-of-type(${index})`;
    }
    return uniqueSelector(element);
}
// Turns a number into its hash+6 number hexadecimal representation.
function toHexCss(n) {
    if (n === undefined)
        return undefined;
    const str = n.toString(16);
    // Pad with leading zeros
    return "#" + (new Array(6 - str.length)).fill("0").join("") + str;
}


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
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "preloadedInstance": () => (/* binding */ preloadedInstance)
/* harmony export */ });
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
/**
 * Browser extensions have multiple processes. This is the entry point for the
 * [background process](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts).
 * Our background process has multiple tasks:
 * - Keep track of per-tab values with its setTabValue/getTabValue functions
 * - Set the [browserActions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction)'s icon.
 * - Keep track of error messages/warnings that should are displayed in the
 *   browserAction.
 * - Update settings when the user changes their vimrc.
 * - Start new neovim instances when asked by a content script.
 * - Provide an RPC mechanism that enables calling background APIs from the
 *   browserAction/content script.
 *
 * The background process mostly acts as a slave for the browserAction and
 * content scripts. It rarely acts on its own.
 */


let preloadedInstance;
// We can't use the sessions.setTabValue/getTabValue apis firefox has because
// chrome doesn't support them. Instead, we create a map of tabid => {} kept in
// the background. This has the disadvantage of not surviving browser restarts,
// but's it's cross platform.
const tabValues = new Map();
function setTabValue(tabid, item, value) {
    let obj = tabValues.get(tabid);
    if (obj === undefined) {
        obj = { "disabled": false };
        tabValues.set(tabid, obj);
    }
    obj[item] = value;
}
function getTabValue(tabid, item) {
    const obj = tabValues.get(tabid);
    if (obj === undefined) {
        return undefined;
    }
    return obj[item];
}
async function updateIcon(tabid) {
    let name = "normal";
    if (tabid === undefined) {
        const tab = (await browser.tabs.query({ active: true, currentWindow: true }))[0];
        if (tab === undefined) {
            console.warn("Current tab is undefined - failing to updateIcon()");
            return;
        }
        tabid = tab.id;
    }
    if (getTabValue(tabid, "disabled") === true) {
        name = "disabled";
    }
    else if (error !== "") {
        name = "error";
    }
    else if (warning !== "") {
        name = "notification";
    }
    return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.getIconImageData)(name).then((imageData) => browser.browserAction.setIcon({ imageData }));
}
// Os is win/mac/linux/androis/cros. We only use it to add information to error
// messages on windows.
let os = "";
browser.runtime.getPlatformInfo().then((plat) => os = plat.os);
// Last error message
let error = "";
// Simple getter for easy RPC calls. Can't be tested as requires opening
// browserAction.
/* istanbul ignore next */
function getError() {
    return error;
}
function registerErrors(nvim, reject) {
    error = "";
    const timeout = setTimeout(() => {
        nvim.timedOut = true;
        error = "Neovim is not responding.";
        updateIcon();
        nvim.disconnect();
        reject(error);
    }, 10000);
    nvim.onDisconnect.addListener(async (p) => {
        clearTimeout(timeout);
        updateIcon();
        // Unfortunately this error handling can't be tested as it requires
        // side-effects on the OS.
        /* istanbul ignore next */
        if (p.error) {
            const errstr = p.error.toString();
            if (errstr.match(/no such native application/i)) {
                error = "Native manifest not found. Please run `:call firenvim#install(0)` in neovim.";
            }
            else if (errstr.match(/an unexpected error occurred/i)) {
                error = "The script supposed to start neovim couldn't be found."
                    + " Please run `:call firenvim#install(0)` in neovim";
                if (os === "win") {
                    error += " or try running the scripts in %LOCALAPPDATA%\\firenvim\\";
                }
                error += ".";
            }
            else if (errstr.match(/Native application tried to send a message of/)) {
                error = "Unexpected output. Run `nvim --headless` and ensure it prints nothing.";
            }
            else {
                error = errstr;
            }
            updateIcon();
            reject(p.error);
        }
        else if (!nvim.replied && !nvim.timedOut) {
            error = "Neovim died without answering.";
            updateIcon();
            reject(error);
        }
    });
    return timeout;
}
// Last warning message
let warning = "";
/* istanbul ignore next */
function getWarning() {
    return warning;
}
let nvimPluginVersion = "";
async function checkVersion(nvimVersion) {
    nvimPluginVersion = nvimVersion;
    const manifest = browser.runtime.getManifest();
    warning = "";
    // Can't be tested as it would require side effects on the OS.
    /* istanbul ignore next */
    if (manifest.version !== nvimVersion) {
        warning = `Neovim plugin version (${nvimVersion}) and browser addon `
            + `version (${manifest.version}) do not match.`;
    }
    updateIcon();
}
function warnUnexpectedMessages(messages) {
    if (messages === undefined || !Array.isArray(messages) || messages.length < 1) {
        return;
    }
    warning = messages.join("\n");
    updateIcon();
}
// Function called in order to fill out default settings. Called from updateSettings.
function applySettings(settings) {
    return browser.storage.local.set((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.mergeWithDefaults)(os, settings));
}
function updateSettings() {
    const tmp = preloadedInstance;
    preloadedInstance = createNewInstance();
    tmp.then(nvim => nvim.kill());
    // It's ok to return the preloadedInstance as a promise because
    // settings are only applied when the preloadedInstance has returned a
    // port+settings object anyway.
    return preloadedInstance;
}
function createNewInstance() {
    return new Promise((resolve, reject) => {
        const random = new Uint32Array(8);
        window.crypto.getRandomValues(random);
        const password = Array.from(random).join("");
        const nvim = browser.runtime.connectNative("firenvim");
        const errorTimeout = registerErrors(nvim, reject);
        nvim.onMessage.addListener((resp) => {
            nvim.replied = true;
            clearTimeout(errorTimeout);
            checkVersion(resp.version);
            warnUnexpectedMessages(resp.messages);
            applySettings(resp.settings).finally(() => {
                resolve({
                    kill: () => nvim.disconnect(),
                    password,
                    port: resp.port,
                });
            });
        });
        nvim.postMessage({
            newInstance: true,
            password,
        });
    });
}
// Creating this first instance serves two purposes: make creating new neovim
// frames fast and also initialize settings the first time Firenvim is enabled
// in a browser.
preloadedInstance = createNewInstance();
async function toggleDisabled() {
    const tab = (await browser.tabs.query({ active: true, currentWindow: true }))[0];
    if (tab === undefined) {
        console.warn("Current tab is undefined - failing to toggleDisabled()");
        return;
    }
    const tabid = tab.id;
    const disabled = !getTabValue(tabid, "disabled");
    setTabValue(tabid, "disabled", disabled);
    updateIcon(tabid);
    return browser.tabs.sendMessage(tabid, { args: [disabled], funcName: ["setDisabled"] });
}
async function acceptCommand(command) {
    const tab = (await browser.tabs.query({ active: true, currentWindow: true }))[0];
    let p;
    switch (command) {
        case "nvimify":
            p = browser.tabs.sendMessage(tab.id, { args: [], funcName: ["forceNvimify"] });
            break;
        case "send_C-n":
            p = browser.tabs.sendMessage(tab.id, { args: ["<C-n>"], funcName: ["sendKey"] });
            if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getGlobalConf)()["<C-n>"] === "default") {
                p = p.catch(() => browser.windows.create());
            }
            break;
        case "send_C-t":
            p = browser.tabs.sendMessage(tab.id, { args: ["<C-t>"], funcName: ["sendKey"] });
            if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getGlobalConf)()["<C-t>"] === "default") {
                p = p.catch(() => browser.tabs.create({ "windowId": tab.windowId }));
            }
            break;
        case "send_C-w":
            p = browser.tabs.sendMessage(tab.id, { args: ["<C-w>"], funcName: ["sendKey"] });
            if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getGlobalConf)()["<C-w>"] === "default") {
                p = p.catch(() => browser.tabs.remove(tab.id));
            }
            break;
        case "send_CS-n":
            p = browser.tabs.sendMessage(tab.id, { args: ["<CS-n>"], funcName: ["sendKey"] });
            if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getGlobalConf)()["<CS-n>"] === "default") {
                p = p.catch(() => browser.windows.create({ "incognito": true }));
            }
            break;
        case "send_CS-t":
            // <CS-t> can't be emulated without the sessions API.
            p = browser.tabs.sendMessage(tab.id, { args: ["<CS-t>"], funcName: ["sendKey"] });
            break;
        case "send_CS-w":
            p = browser.tabs.sendMessage(tab.id, { args: ["<CS-w>"], funcName: ["sendKey"] });
            if ((0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getGlobalConf)()["<CS-w>"] === "default") {
                p = p.catch(() => browser.windows.remove(tab.windowId));
            }
            break;
        case "toggle_firenvim":
            p = toggleDisabled();
            break;
    }
    return p;
}
Object.assign(window, {
    acceptCommand,
    // We need to stick the browser polyfill in `window` if we want the `exec`
    // call to be able to find it on Chrome
    browser,
    closeOwnTab: (sender) => browser.tabs.remove(sender.tab.id),
    exec: (_, args) => args.funcName.reduce((acc, cur) => acc[cur], window)(...(args.args)),
    getError,
    getNeovimInstance: () => {
        const result = preloadedInstance;
        preloadedInstance = createNewInstance();
        // Destructuring result to remove kill() from it
        return result.then(({ password, port }) => ({ password, port }));
    },
    getNvimPluginVersion: () => nvimPluginVersion,
    getOwnFrameId: (sender) => sender.frameId,
    getTab: (sender) => sender.tab,
    getTabValue: (sender, args) => getTabValue(sender.tab.id, args[0]),
    getTabValueFor: (_, args) => getTabValue(args[0], args[1]),
    getWarning,
    messageFrame: (sender, args) => browser.tabs.sendMessage(sender.tab.id, args.message, { frameId: args.frameId }),
    messagePage: (sender, args) => browser.tabs.sendMessage(sender.tab.id, args),
    publishFrameId: (sender) => {
        browser.tabs.sendMessage(sender.tab.id, {
            args: [sender.frameId],
            funcName: ["registerNewFrameId"],
        });
        return sender.frameId;
    },
    setTabValue: (sender, args) => setTabValue(sender.tab.id, args[0], args[1]),
    toggleDisabled: () => toggleDisabled(),
    updateSettings: () => updateSettings(),
    openTroubleshootingGuide: () => browser.tabs.create({ active: true, url: "https://github.com/glacambre/firenvim/blob/master/TROUBLESHOOTING.md" }),
});
browser.runtime.onMessage.addListener(async (request, sender, _sendResponse) => {
    const fn = request.funcName.reduce((acc, cur) => acc[cur], window);
    // Can't be tested as there's no way to force an incorrect content request.
    /* istanbul ignore next */
    if (!fn) {
        throw new Error(`Error: unhandled content request: ${JSON.stringify(request)}.`);
    }
    return fn(sender, request.args !== undefined ? request.args : []);
});
browser.tabs.onActivated.addListener(tab => {
    updateIcon(tab.tabId);
});
browser.windows.onFocusChanged.addListener(async (windowId) => {
    const tabs = await browser.tabs.query({ active: true, windowId });
    if (tabs.length >= 1) {
        updateIcon(tabs[0].id);
    }
});
updateIcon();
browser.commands.onCommand.addListener(acceptCommand);
browser.runtime.onMessageExternal.addListener(async (request, sender, _sendResponse) => {
    const resp = await acceptCommand(request.command);
    _sendResponse(resp);
});
async function updateIfPossible() {
    const tabs = await browser.tabs.query({});
    const messages = tabs.map(tab => browser
        .tabs
        .sendMessage(tab.id, {
        args: [],
        funcName: ["getActiveInstanceCount"],
    }, { frameId: 0 })
        .catch(() => 0));
    const instances = await (Promise.all(messages));
    // Can't be covered as reload() would destroy websockets and thus coverage
    // data.
    /* istanbul ignore next */
    if (instances.find(n => n > 0) === undefined) {
        browser.runtime.reload();
    }
    else {
        setTimeout(updateIfPossible, 1000 * 60 * 10);
    }
}
window.updateIfPossible = updateIfPossible;
browser.runtime.onUpdateAvailable.addListener(updateIfPossible);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QyxDQUFhLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxjQUFjLENBQUMsQ0FBSyxPQUFPLE1BQU0sQ0FBQztRQUN2QyxLQUFLLFdBQVcsQ0FBQyxDQUFRLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssU0FBUyxDQUFDLENBQVUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxXQUFXLENBQUMsQ0FBUSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssWUFBWSxDQUFDLENBQU8sT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxRQUFRLENBQUMsQ0FBVyxPQUFPLE9BQU8sQ0FBQztRQUN4QyxLQUFLLE9BQU8sQ0FBQyxDQUFZLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssS0FBSyxDQUFDLENBQWMsT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxRQUFRLENBQUMsQ0FBVyxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLE9BQU8sQ0FBQyxDQUFZLE9BQU8sT0FBTyxDQUFDO1FBQ3hDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFVBQVUsQ0FBQyxDQUFTLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssUUFBUSxDQUFDLENBQVksT0FBTyxJQUFJLENBQUM7UUFDdEMsS0FBSyxPQUFPLENBQUMsQ0FBWSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLFFBQVEsQ0FBQyxDQUFXLE9BQU8sR0FBRyxDQUFDO1FBQ3BDLEtBQUssUUFBUSxDQUFDLENBQVcsT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxNQUFNLENBQUMsQ0FBYSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLEtBQUssQ0FBQyxDQUFjLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssWUFBWSxD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QUU7UUFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM1QjtTQUFNO1FBQ0gsVUFBVSxDQUFDLGdCQUFnQixFQUFFLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDaEQ7QUFDTCxDQUFDO0FBQ0EsTUFBYyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL2NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuOC4wIC0gVHVlIEFwciAyMCAyMDIxIDExOjI3OjM4ICovXG5cbiAgLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG5cbiAgLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICAgKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gICAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTsgLy8gS2VlcCB0cmFjayBpZiB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBoYXMgYmVlbiBsb2dnZWQgYXQgbGVhc3Qgb25jZS5cblxuICAgICAgbGV0IGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGEgbWVzc2FnZSBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBzZW5kIHJlc3BvbnNlcyBiYXNlZCBvblxuICAgICAgICAgKiBpdHMgcmV0dXJuIHZhbHVlLCByYXRoZXIgdGhhbiBieSByZXR1cm5pbmcgYSBzZW50aW5lbCB2YWx1ZSBhbmQgY2FsbGluZyBhXG4gICAgICAgICAqIGNhbGxiYWNrLiBJZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UsIHRoZSByZXNwb25zZSBpc1xuICAgICAgICAgKiBzZW50IHdoZW4gdGhlIHByb21pc2UgZWl0aGVyIHJlc29sdmVzIG9yIHJlamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICAgICAgICAgKiAgICAgICAgVGhlIG1lc3NhZ2Ugc2VudCBieSB0aGUgb3RoZXIgZW5kIG9mIHRoZSBjaGFubmVsLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VuZGVyXG4gICAgICAgICAqICAgICAgICBEZXRhaWxzIGFib3V0IHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UuXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKil9IHNlbmRSZXNwb25zZVxuICAgICAgICAgKiAgICAgICAgQSBjYWxsYmFjayB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcmJpdHJhcnkgYXJndW1lbnQsIHNlbmRzXG4gICAgICAgICAqICAgICAgICB0aGF0IHZhbHVlIGFzIGEgcmVzcG9uc2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiAgICAgICAgVHJ1ZSBpZiB0aGUgd3JhcHBlZCBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHdoaWNoIHdpbGwgbGF0ZXJcbiAgICAgICAgICogICAgICAgIHlpZWxkIGEgcmVzcG9uc2UuIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAoIWxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcsIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBjaHJvbWUgIT0gXCJvYmplY3RcIiB8fCAhY2hyb21lIHx8ICFjaHJvbWUucnVudGltZSB8fCAhY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2NyaXB0IHNob3VsZCBvbmx5IGJlIGxvYWRlZCBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLlwiKTtcbiAgICB9IC8vIFRoZSBidWlsZCBwcm9jZXNzIGFkZHMgYSBVTUQgd3JhcHBlciBhcm91bmQgdGhpcyBmaWxlLCB3aGljaCBtYWtlcyB0aGVcbiAgICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsIi8vIFRoZXNlIG1vZGVzIGFyZSBkZWZpbmVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9uZW92aW0vbmVvdmltL2Jsb2IvbWFzdGVyL3NyYy9udmltL2N1cnNvcl9zaGFwZS5jXG5leHBvcnQgdHlwZSBOdmltTW9kZSA9IFwiYWxsXCJcbiAgfCBcIm5vcm1hbFwiXG4gIHwgXCJ2aXN1YWxcIlxuICB8IFwiaW5zZXJ0XCJcbiAgfCBcInJlcGxhY2VcIlxuICB8IFwiY21kbGluZV9ub3JtYWxcIlxuICB8IFwiY21kbGluZV9pbnNlcnRcIlxuICB8IFwiY21kbGluZV9yZXBsYWNlXCJcbiAgfCBcIm9wZXJhdG9yXCJcbiAgfCBcInZpc3VhbF9zZWxlY3RcIlxuICB8IFwiY21kbGluZV9ob3ZlclwiXG4gIHwgXCJzdGF0dXNsaW5lX2hvdmVyXCJcbiAgfCBcInN0YXR1c2xpbmVfZHJhZ1wiXG4gIHwgXCJ2c2VwX2hvdmVyXCJcbiAgfCBcInZzZXBfZHJhZ1wiXG4gIHwgXCJtb3JlXCJcbiAgfCBcIm1vcmVfbGFzdGxpbmVcIlxuICB8IFwic2hvd21hdGNoXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNpdGVDb25maWcge1xuICAgIGNtZGxpbmU6IFwibmVvdmltXCIgfCBcImZpcmVudmltXCIgfCBcIm5vbmVcIjtcbiAgICBjb250ZW50OiBcImh0bWxcIiB8IFwidGV4dFwiO1xuICAgIHByaW9yaXR5OiBudW1iZXI7XG4gICAgcmVuZGVyZXI6IFwiaHRtbFwiIHwgXCJjYW52YXNcIjtcbiAgICBzZWxlY3Rvcjogc3RyaW5nO1xuICAgIHRha2VvdmVyOiBcImFsd2F5c1wiIHwgXCJvbmNlXCIgfCBcImVtcHR5XCIgfCBcIm5vbmVtcHR5XCIgfCBcIm5ldmVyXCI7XG4gICAgZmlsZW5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgR2xvYmFsU2V0dGluZ3MgPSB7XG4gIGFsdDogXCJhbHBoYW51bVwiIHwgXCJhbGxcIixcbiAgXCI8Qy1uPlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICBcIjxDLXQ+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPEMtdz5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgXCI8Q1Mtbj5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgXCI8Q1MtdD5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgXCI8Q1Mtdz5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgaWdub3JlS2V5czogeyBba2V5IGluIE52aW1Nb2RlXTogc3RyaW5nW10gfSxcbiAgY21kbGluZVRpbWVvdXQ6IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnIHtcbiAgICBnbG9iYWxTZXR0aW5nczogR2xvYmFsU2V0dGluZ3M7XG4gICAgbG9jYWxTZXR0aW5nczogeyBba2V5OiBzdHJpbmddOiBJU2l0ZUNvbmZpZyB9O1xufVxuXG5sZXQgY29uZjogSUNvbmZpZyA9IHVuZGVmaW5lZCBhcyBJQ29uZmlnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VXaXRoRGVmYXVsdHMob3M6IHN0cmluZywgc2V0dGluZ3M6IGFueSk6IElDb25maWcge1xuICAgIGZ1bmN0aW9uIG1ha2VEZWZhdWx0cyhvYmo6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICBpZiAob2JqW25hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpbbmFtZV0gIT09IHR5cGVvZiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgIHx8IEFycmF5LmlzQXJyYXkob2JqW25hbWVdKSAhPT0gQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVXNlciBjb25maWcgZW50cnkgJHtuYW1lfSBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCB0eXBlLiBPdmVycmlkaW5nLmApO1xuICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWFrZURlZmF1bHRMb2NhbFNldHRpbmcoc2V0dDogeyBsb2NhbFNldHRpbmdzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iajogSVNpdGVDb25maWcpIHtcbiAgICAgICAgbWFrZURlZmF1bHRzKHNldHQubG9jYWxTZXR0aW5ncywgc2l0ZSwge30pO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiAoT2JqZWN0LmtleXMob2JqKSBhcyAoa2V5b2YgdHlwZW9mIG9iailbXSkpIHtcbiAgICAgICAgICAgIG1ha2VEZWZhdWx0cyhzZXR0LmxvY2FsU2V0dGluZ3Nbc2l0ZV0sIGtleSwgb2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNldHRpbmdzID0ge307XG4gICAgfVxuXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLCBcImdsb2JhbFNldHRpbmdzXCIsIHt9KTtcbiAgICAvLyBcIjxLRVk+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCJcbiAgICAvLyAjMTAzOiBXaGVuIHVzaW5nIHRoZSBicm93c2VyJ3MgY29tbWFuZCBBUEkgdG8gYWxsb3cgc2VuZGluZyBgPEMtdz5gIHRvXG4gICAgLy8gZmlyZW52aW0sIHdoZXRoZXIgdGhlIGRlZmF1bHQgYWN0aW9uIHNob3VsZCBiZSBwZXJmb3JtZWQgaWYgbm8gbmVvdmltXG4gICAgLy8gZnJhbWUgaXMgZm9jdXNlZC5cbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPEMtbj5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Qy10PlwiLCBcImRlZmF1bHRcIik7XG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcIjxDLXc+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICAvLyBOb3RlOiA8Q1MtKj4gYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBiZWNhdXNlIG9mXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25lb3ZpbS9uZW92aW0vaXNzdWVzLzEyMDM3XG4gICAgLy8gTm90ZTogPENTLW4+IGRvZXNuJ3QgbWF0Y2ggdGhlIGRlZmF1bHQgYmVoYXZpb3Igb24gZmlyZWZveCBiZWNhdXNlIHRoaXNcbiAgICAvLyB3b3VsZCByZXF1aXJlIHRoZSBzZXNzaW9ucyBBUEkuIEluc3RlYWQsIEZpcmVmb3gncyBiZWhhdmlvciBtYXRjaGVzXG4gICAgLy8gQ2hyb21lJ3MuXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcIjxDUy1uPlwiLCBcImRlZmF1bHRcIik7XG4gICAgLy8gTm90ZTogPENTLXQ+IGlzIHRoZXJlIGZvciBjb21wbGV0ZW5lc3Mgc2FrZSdzIGJ1dCBjYW4ndCBiZSBlbXVsYXRlZCBpblxuICAgIC8vIENocm9tZSBhbmQgRmlyZWZveCBiZWNhdXNlIHRoaXMgd291bGQgcmVxdWlyZSB0aGUgc2Vzc2lvbnMgQVBJLlxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Q1MtdD5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Q1Mtdz5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIC8vICM3MTc6IGFsbG93IHBhc3Npbmcga2V5cyB0byB0aGUgYnJvd3NlclxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCJpZ25vcmVLZXlzXCIsIHt9KTtcbiAgICAvLyAjMTA1MDogY3Vyc29yIHNvbWV0aW1lcyBjb3ZlcmVkIGJ5IGNvbW1hbmQgbGluZVxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCJjbWRsaW5lVGltZW91dFwiLCAzMDAwKTtcblxuICAgIC8vIFwiYWx0XCI6IFwiYWxsXCIgfCBcImFscGhhbnVtXCJcbiAgICAvLyAjMjAyOiBPbmx5IHJlZ2lzdGVyIGFsdCBrZXkgb24gYWxwaGFudW1zIHRvIGxldCBzd2VkaXNoIG9zeCB1c2VycyB0eXBlXG4gICAgLy8gICAgICAgc3BlY2lhbCBjaGFyc1xuICAgIC8vIE9ubHkgdGVzdGVkIG9uIE9TWCwgd2hlcmUgd2UgZG9uJ3QgcHVsbCBjb3ZlcmFnZSByZXBvcnRzLCBzbyBkb24ndFxuICAgIC8vIGluc3RydW1lbnQgZnVuY3Rpb24uXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAob3MgPT09IFwibWFjXCIpIHtcbiAgICAgICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcImFsdFwiLCBcImFscGhhbnVtXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCJhbHRcIiwgXCJhbGxcIik7XG4gICAgfVxuXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLCBcImxvY2FsU2V0dGluZ3NcIiwge30pO1xuICAgIG1ha2VEZWZhdWx0TG9jYWxTZXR0aW5nKHNldHRpbmdzLCBcIi4qXCIsIHtcbiAgICAgICAgLy8gXCJjbWRsaW5lXCI6IFwibmVvdmltXCIgfCBcImZpcmVudmltXCJcbiAgICAgICAgLy8gIzE2ODogVXNlIGFuIGV4dGVybmFsIGNvbW1hbmRsaW5lIHRvIHByZXNlcnZlIHNwYWNlXG4gICAgICAgIGNtZGxpbmU6IFwiZmlyZW52aW1cIixcbiAgICAgICAgY29udGVudDogXCJ0ZXh0XCIsXG4gICAgICAgIHByaW9yaXR5OiAwLFxuICAgICAgICByZW5kZXJlcjogXCJjYW52YXNcIixcbiAgICAgICAgc2VsZWN0b3I6ICd0ZXh0YXJlYTpub3QoW3JlYWRvbmx5XSksIGRpdltyb2xlPVwidGV4dGJveFwiXScsXG4gICAgICAgIC8vIFwidGFrZW92ZXJcIjogXCJhbHdheXNcIiB8IFwib25jZVwiIHwgXCJlbXB0eVwiIHwgXCJub25lbXB0eVwiIHwgXCJuZXZlclwiXG4gICAgICAgIC8vICMyNjU6IE9uIFwib25jZVwiLCBkb24ndCBhdXRvbWF0aWNhbGx5IGJyaW5nIGJhY2sgYWZ0ZXIgOnEnaW5nIGl0XG4gICAgICAgIHRha2VvdmVyOiBcImFsd2F5c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJ7aG9zdG5hbWUlMzJ9X3twYXRobmFtZSUzMn1fe3NlbGVjdG9yJTMyfV97dGltZXN0YW1wJTMyfS57ZXh0ZW5zaW9ufVwiLFxuICAgIH0pO1xuICAgIHJldHVybiBzZXR0aW5ncztcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZSZWFkeSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoKS50aGVuKChvYmo6IGFueSkgPT4ge1xuICAgICAgICBjb25mID0gb2JqO1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cbmJyb3dzZXIuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKGNoYW5nZXM6IGFueSkgPT4ge1xuICAgIE9iamVjdFxuICAgICAgICAuZW50cmllcyhjaGFuZ2VzKVxuICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdOiBba2V5b2YgSUNvbmZpZywgYW55XSkgPT4gY29uZlJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uZltrZXldID0gdmFsdWUubmV3VmFsdWU7XG4gICAgICAgIH0pKTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsQ29uZigpIHtcbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgZm9yXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoY29uZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImdldEdsb2JhbENvbmYgY2FsbGVkIGJlZm9yZSBjb25maWcgd2FzIHJlYWR5XCIpO1xuICAgIH1cbiAgICByZXR1cm4gY29uZi5nbG9iYWxTZXR0aW5ncztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmYoKSB7XG4gICAgcmV0dXJuIGdldENvbmZGb3JVcmwoZG9jdW1lbnQubG9jYXRpb24uaHJlZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25mRm9yVXJsKHVybDogc3RyaW5nKTogSVNpdGVDb25maWcge1xuICAgIGNvbnN0IGxvY2FsU2V0dGluZ3MgPSBjb25mLmxvY2FsU2V0dGluZ3M7XG4gICAgZnVuY3Rpb24gb3IxKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgLy8gQ2FuJ3QgYmUgdGVzdGVkIGZvclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGxvY2FsU2V0dGluZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogeW91ciBzZXR0aW5ncyBhcmUgdW5kZWZpbmVkLiBUcnkgcmVsb2FkaW5nIHRoZSBwYWdlLiBJZiB0aGlzIGVycm9yIHBlcnNpc3RzLCB0cnkgdGhlIHRyb3VibGVzaG9vdGluZyBndWlkZTogaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9ibG9iL21hc3Rlci9UUk9VQkxFU0hPT1RJTkcubWRcIik7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKE9iamVjdC5lbnRyaWVzKGxvY2FsU2V0dGluZ3MpKVxuICAgICAgICAuZmlsdGVyKChbcGF0LCBfXSkgPT4gKG5ldyBSZWdFeHAocGF0KSkudGVzdCh1cmwpKVxuICAgICAgICAuc29ydCgoZTEsIGUyKSA9PiAob3IxKGUxWzFdLnByaW9yaXR5KSAtIG9yMShlMlsxXS5wcmlvcml0eSkpKVxuICAgICAgICAucmVkdWNlKChhY2MsIFtfLCBjdXJdKSA9PiBPYmplY3QuYXNzaWduKGFjYywgY3VyKSwge30gYXMgSVNpdGVDb25maWcpO1xufVxuIiwibGV0IGN1ckhvc3QgOiBzdHJpbmc7XG5cbi8vIENocm9tZSBkb2Vzbid0IGhhdmUgYSBcImJyb3dzZXJcIiBvYmplY3QsIGluc3RlYWQgaXQgdXNlcyBcImNocm9tZVwiLlxuaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJtb3otZXh0ZW5zaW9uOlwiKSB7XG4gICAgY3VySG9zdCA9IFwiZmlyZWZveFwiO1xufSBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiY2hyb21lLWV4dGVuc2lvbjpcIikge1xuICAgIGN1ckhvc3QgPSBcImNocm9tZVwiO1xufSBlbHNlIGlmICgod2luZG93IGFzIGFueSkuSW5zdGFsbFRyaWdnZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGN1ckhvc3QgPSBcImNocm9tZVwiO1xufSBlbHNlIHtcbiAgICBjdXJIb3N0ID0gXCJmaXJlZm94XCI7XG59XG5cbi8vIE9ubHkgdXNhYmxlIGluIGJhY2tncm91bmQgc2NyaXB0IVxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIC8vIENhbid0IGNvdmVyIGVycm9yIGNvbmRpdGlvblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGN1ckhvc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBFcnJvcihcIlVzZWQgaXNDaHJvbWUgaW4gY29udGVudCBzY3JpcHQhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gY3VySG9zdCA9PT0gXCJjaHJvbWVcIjtcbn1cblxuLy8gUnVucyBDT0RFIGluIHRoZSBwYWdlJ3MgY29udGV4dCBieSBzZXR0aW5nIHVwIGEgY3VzdG9tIGV2ZW50IGxpc3RlbmVyLFxuLy8gZW1iZWRkaW5nIGEgc2NyaXB0IGVsZW1lbnQgdGhhdCBydW5zIHRoZSBwaWVjZSBvZiBjb2RlIGFuZCBlbWl0cyBpdHMgcmVzdWx0XG4vLyBhcyBhbiBldmVudC5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlSW5QYWdlKGNvZGU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gT24gZmlyZWZveCwgdXNlIGFuIEFQSSB0aGF0IGFsbG93cyBjaXJjdW12ZW50aW5nIHNvbWUgQ1NQIHJlc3RyaWN0aW9uc1xuICAgIC8vIFVzZSB3cmFwcGVkSlNPYmplY3QgdG8gZGV0ZWN0IGF2YWlsYWJpbGl0eSBvZiBzYWlkIEFQSVxuICAgIC8vIERPTidUIHVzZSB3aW5kb3cuZXZhbCBvbiBvdGhlciBwbGF0ZWZvcm1zIC0gaXQgZG9lc24ndCBoYXZlIHRoZVxuICAgIC8vIHNlbWFudGljcyB3ZSBuZWVkIVxuICAgIGlmICgod2luZG93IGFzIGFueSkud3JhcHBlZEpTT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUod2luZG93LmV2YWwoY29kZSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IGV2ZW50SWQgPSAobmV3IFVSTChicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwiXCIpKSkuaG9zdG5hbWUgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYChhc3luYyAoZXZJZCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0ICR7Y29kZX07XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldklkLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogeyBzdWNjZXNzOiBmYWxzZSwgcmVhc29uOiBlIH0sXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgke0pTT04uc3RyaW5naWZ5KGV2ZW50SWQpfSlgO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudElkLCAoeyBkZXRhaWwgfTogYW55KSA9PiB7XG4gICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgaWYgKGRldGFpbC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGV0YWlsLnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGRldGFpbC5yZWFzb24pO1xuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcbn1cblxuLy8gVmFyaW91cyBmaWx0ZXJzIHRoYXQgYXJlIHVzZWQgdG8gY2hhbmdlIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBCcm93c2VyQWN0aW9uXG4vLyBpY29uLlxuY29uc3Qgc3ZncGF0aCA9IFwiZmlyZW52aW0uc3ZnXCI7XG5jb25zdCB0cmFuc2Zvcm1hdGlvbnMgPSB7XG4gICAgZGlzYWJsZWQ6IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBTa2lwIHRyYW5zcGFyZW50IHBpeGVsc1xuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1lYW4gPSBNYXRoLmZsb29yKChpbWdbaV0gKyBpbWdbaSArIDFdICsgaW1nW2kgKyAyXSkgLyAzKTtcbiAgICAgICAgICAgIGltZ1tpXSA9IG1lYW47XG4gICAgICAgICAgICBpbWdbaSArIDFdID0gbWVhbjtcbiAgICAgICAgICAgIGltZ1tpICsgMl0gPSBtZWFuO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFR1cm4gdHJhbnNwYXJlbnQgcGl4ZWxzIHJlZFxuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBpbWdbaV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbm9ybWFsOiAoKF9pbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiAodW5kZWZpbmVkIGFzIG5ldmVyKSksXG4gICAgbm90aWZpY2F0aW9uOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gVHVybiB0cmFuc3BhcmVudCBwaXhlbHMgeWVsbG93XG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltZ1tpXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDFdID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgM10gPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcblxuZXhwb3J0IHR5cGUgSWNvbktpbmQgPSBrZXlvZiB0eXBlb2YgdHJhbnNmb3JtYXRpb25zO1xuXG4vLyBUYWtlcyBhbiBpY29uIGtpbmQgYW5kIGRpbWVuc2lvbnMgYXMgcGFyYW1ldGVyLCBkcmF3cyB0aGF0IHRvIGEgY2FudmFzIGFuZFxuLy8gcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIGNhbnZhcycgaW1hZ2UgZGF0YS5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJY29uSW1hZ2VEYXRhKGtpbmQ6IEljb25LaW5kLCB3aWR0aCA9IDMyLCBoZWlnaHQgPSAzMikge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2Uod2lkdGgsIGhlaWdodCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgaWQgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbnNba2luZF0oaWQuZGF0YSk7XG4gICAgICAgIHJlc29sdmUoaWQpO1xuICAgIH0pKTtcbiAgICBpbWcuc3JjID0gc3ZncGF0aDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHaXZlbiBhIHVybCBhbmQgYSBzZWxlY3RvciwgdHJpZXMgdG8gY29tcHV0ZSBhIG5hbWUgdGhhdCB3aWxsIGJlIHVuaXF1ZSxcbi8vIHNob3J0IGFuZCByZWFkYWJsZSBmb3IgdGhlIHVzZXIuXG5leHBvcnQgZnVuY3Rpb24gdG9GaWxlTmFtZShmb3JtYXRTdHJpbmc6IHN0cmluZywgdXJsOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXJzZWRVUkwgPSBuZXcgVVJMKHVybCk7XG5cbiAgICBjb25zdCBzYW5pdGl6ZSA9IChzOiBzdHJpbmcpID0+IChzLm1hdGNoKC9bYS16QS1aMC05XSsvZykgfHwgW10pLmpvaW4oXCItXCIpO1xuXG4gICAgY29uc3QgZXhwYW5kID0gKHBhdHRlcm46IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBub0JyYWNrZXRzID0gcGF0dGVybi5zbGljZSgxLCAtMSk7XG4gICAgICAgIGNvbnN0IFtzeW1ib2wsIGxlbmd0aF0gPSBub0JyYWNrZXRzLnNwbGl0KFwiJVwiKTtcbiAgICAgICAgbGV0IHZhbHVlID0gXCJcIjtcbiAgICAgICAgc3dpdGNoIChzeW1ib2wpIHtcbiAgICAgICAgICAgIGNhc2UgXCJob3N0bmFtZVwiOiB2YWx1ZSA9IHBhcnNlZFVSTC5ob3N0bmFtZTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGF0aG5hbWVcIjogdmFsdWUgPSBzYW5pdGl6ZShwYXJzZWRVUkwucGF0aG5hbWUpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZWxlY3RvclwiOiB2YWx1ZSA9IHNhbml0aXplKGlkLnJlcGxhY2UoLzpudGgtb2YtdHlwZS9nLCBcIlwiKSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRpbWVzdGFtcFwiOiB2YWx1ZSA9IHNhbml0aXplKChuZXcgRGF0ZSgpKS50b0lTT1N0cmluZygpKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZXh0ZW5zaW9uXCI6IHZhbHVlID0gbGFuZ3VhZ2VUb0V4dGVuc2lvbnMobGFuZ3VhZ2UpOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoYFVucmVjb2duaXplZCBmaWxlbmFtZSBwYXR0ZXJuOiAke3BhdHRlcm59YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKC1sZW5ndGgpO1xuICAgIH07XG5cbiAgICBsZXQgcmVzdWx0ID0gZm9ybWF0U3RyaW5nO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBmb3JtYXRTdHJpbmcubWF0Y2goL3tbXn1dKn0vZyk7XG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzLmZpbHRlcihzID0+IHMgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKG1hdGNoLCBleHBhbmQobWF0Y2gpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHaXZlbiBhIGxhbmd1YWdlIG5hbWUsIHJldHVybnMgYSBmaWxlbmFtZSBleHRlbnNpb24uIENhbiByZXR1cm4gdW5kZWZpbmVkLlxuZXhwb3J0IGZ1bmN0aW9uIGxhbmd1YWdlVG9FeHRlbnNpb25zKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBpZiAobGFuZ3VhZ2UgPT09IHVuZGVmaW5lZCB8fCBsYW5ndWFnZSA9PT0gbnVsbCkge1xuICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgfVxuICAgIGNvbnN0IGxhbmcgPSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgc3dpdGNoIChsYW5nKSB7XG4gICAgICAgIGNhc2UgXCJhcGxcIjogICAgICAgICAgICAgIHJldHVybiBcImFwbFwiO1xuICAgICAgICBjYXNlIFwiYnJhaW5mdWNrXCI6ICAgICAgICByZXR1cm4gXCJiZlwiO1xuICAgICAgICBjYXNlIFwiY1wiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgICAgIGNhc2UgXCJjI1wiOiAgICAgICAgICAgICAgIHJldHVybiBcImNzXCI7XG4gICAgICAgIGNhc2UgXCJjKytcIjogICAgICAgICAgICAgIHJldHVybiBcImNwcFwiO1xuICAgICAgICBjYXNlIFwiY2V5bG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJjZXlsb25cIjtcbiAgICAgICAgY2FzZSBcImNsaWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwiY1wiO1xuICAgICAgICBjYXNlIFwiY2xvanVyZVwiOiAgICAgICAgICByZXR1cm4gXCJjbGpcIjtcbiAgICAgICAgY2FzZSBcImNtYWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwiLmNtYWtlXCI7XG4gICAgICAgIGNhc2UgXCJjb2JvbFwiOiAgICAgICAgICAgIHJldHVybiBcImNibFwiO1xuICAgICAgICBjYXNlIFwiY29mZmVlc2NyaXB0XCI6ICAgICByZXR1cm4gXCJjb2ZmZWVcIjtcbiAgICAgICAgY2FzZSBcImNvbW1vbmxpc3BcIjogICAgICByZXR1cm4gXCJsaXNwXCI7XG4gICAgICAgIGNhc2UgXCJjcnlzdGFsXCI6ICAgICAgICAgIHJldHVybiBcImNyXCI7XG4gICAgICAgIGNhc2UgXCJjc3NcIjogICAgICAgICAgICAgIHJldHVybiBcImNzc1wiO1xuICAgICAgICBjYXNlIFwiY3l0aG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiZFwiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJkXCI7XG4gICAgICAgIGNhc2UgXCJkYXJ0XCI6ICAgICAgICAgICAgIHJldHVybiBcImRhcnRcIjtcbiAgICAgICAgY2FzZSBcImRpZmZcIjogICAgICAgICAgICAgcmV0dXJuIFwiZGlmZlwiO1xuICAgICAgICBjYXNlIFwiZG9ja2VyZmlsZVwiOiAgICAgICByZXR1cm4gXCJkb2NrZXJmaWxlXCI7XG4gICAgICAgIGNhc2UgXCJkdGRcIjogICAgICAgICAgICAgIHJldHVybiBcImR0ZFwiO1xuICAgICAgICBjYXNlIFwiZHlsYW5cIjogICAgICAgICAgICByZXR1cm4gXCJkeWxhblwiO1xuICAgICAgICAvLyBFaWZmZWwgd2FzIHRoZXJlIGZpcnN0IGJ1dCBlbGl4aXIgc2VlbXMgbW9yZSBsaWtlbHlcbiAgICAgICAgLy8gY2FzZSBcImVpZmZlbFwiOiAgICAgICAgICAgcmV0dXJuIFwiZVwiO1xuICAgICAgICBjYXNlIFwiZWxpeGlyXCI6ICAgICAgICAgICByZXR1cm4gXCJlXCI7XG4gICAgICAgIGNhc2UgXCJlbG1cIjogICAgICAgICAgICAgIHJldHVybiBcImVsbVwiO1xuICAgICAgICBjYXNlIFwiZXJsYW5nXCI6ICAgICAgICAgICByZXR1cm4gXCJlcmxcIjtcbiAgICAgICAgY2FzZSBcImYjXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiZnNcIjtcbiAgICAgICAgY2FzZSBcImZhY3RvclwiOiAgICAgICAgICAgcmV0dXJuIFwiZmFjdG9yXCI7XG4gICAgICAgIGNhc2UgXCJmb3J0aFwiOiAgICAgICAgICAgIHJldHVybiBcImZ0aFwiO1xuICAgICAgICBjYXNlIFwiZm9ydHJhblwiOiAgICAgICAgICByZXR1cm4gXCJmOTBcIjtcbiAgICAgICAgY2FzZSBcImdhc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiYXNtXCI7XG4gICAgICAgIGNhc2UgXCJnb1wiOiAgICAgICAgICAgICAgIHJldHVybiBcImdvXCI7XG4gICAgICAgIC8vIEdGTTogQ29kZU1pcnJvcidzIGdpdGh1Yi1mbGF2b3JlZCBtYXJrZG93blxuICAgICAgICBjYXNlIFwiZ2ZtXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwiZ3Jvb3Z5XCI6ICAgICAgICAgICByZXR1cm4gXCJncm9vdnlcIjtcbiAgICAgICAgY2FzZSBcImhhbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwiaGFtbFwiO1xuICAgICAgICBjYXNlIFwiaGFuZGxlYmFyc1wiOiAgICAgICByZXR1cm4gXCJoYnNcIjtcbiAgICAgICAgY2FzZSBcImhhc2tlbGxcIjogICAgICAgICAgcmV0dXJuIFwiaHNcIjtcbiAgICAgICAgY2FzZSBcImhheGVcIjogICAgICAgICAgICAgcmV0dXJuIFwiaHhcIjtcbiAgICAgICAgY2FzZSBcImh0bWxcIjogICAgICAgICAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiaHRtbGVtYmVkZGVkXCI6ICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJodG1sbWl4ZWRcIjogICAgICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImlweXRob25cIjogICAgICAgICAgcmV0dXJuIFwicHlcIjtcbiAgICAgICAgY2FzZSBcImlweXRob25mbVwiOiAgICAgICAgcmV0dXJuIFwibWRcIjtcbiAgICAgICAgY2FzZSBcImphdmFcIjogICAgICAgICAgICAgcmV0dXJuIFwiamF2YVwiO1xuICAgICAgICBjYXNlIFwiamF2YXNjcmlwdFwiOiAgICAgICByZXR1cm4gXCJqc1wiO1xuICAgICAgICBjYXNlIFwiamluamEyXCI6ICAgICAgICAgICByZXR1cm4gXCJqaW5qYVwiO1xuICAgICAgICBjYXNlIFwianVsaWFcIjogICAgICAgICAgICByZXR1cm4gXCJqbFwiO1xuICAgICAgICBjYXNlIFwianN4XCI6ICAgICAgICAgICAgICByZXR1cm4gXCJqc3hcIjtcbiAgICAgICAgY2FzZSBcImtvdGxpblwiOiAgICAgICAgICAgcmV0dXJuIFwia3RcIjtcbiAgICAgICAgY2FzZSBcImxhdGV4XCI6ICAgICAgICAgICAgcmV0dXJuIFwibGF0ZXhcIjtcbiAgICAgICAgY2FzZSBcImxlc3NcIjogICAgICAgICAgICAgcmV0dXJuIFwibGVzc1wiO1xuICAgICAgICBjYXNlIFwibHVhXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJsdWFcIjtcbiAgICAgICAgY2FzZSBcIm1hcmtkb3duXCI6ICAgICAgICAgcmV0dXJuIFwibWRcIjtcbiAgICAgICAgY2FzZSBcIm1sbGlrZVwiOiAgICAgICAgICAgIHJldHVybiBcIm1sXCI7XG4gICAgICAgIGNhc2UgXCJvY2FtbFwiOiAgICAgICAgICAgIHJldHVybiBcIm1sXCI7XG4gICAgICAgIGNhc2UgXCJvY3RhdmVcIjogICAgICAgICAgIHJldHVybiBcIm1cIjtcbiAgICAgICAgY2FzZSBcInBhc2NhbFwiOiAgICAgICAgICAgcmV0dXJuIFwicGFzXCI7XG4gICAgICAgIGNhc2UgXCJwZXJsXCI6ICAgICAgICAgICAgIHJldHVybiBcInBsXCI7XG4gICAgICAgIGNhc2UgXCJwaHBcIjogICAgICAgICAgICAgIHJldHVybiBcInBocFwiO1xuICAgICAgICBjYXNlIFwicG93ZXJzaGVsbFwiOiAgICAgICByZXR1cm4gXCJwczFcIjtcbiAgICAgICAgY2FzZSBcInB5dGhvblwiOiAgICAgICAgICAgcmV0dXJuIFwicHlcIjtcbiAgICAgICAgY2FzZSBcInJcIjogICAgICAgICAgICAgICAgcmV0dXJuIFwiclwiO1xuICAgICAgICBjYXNlIFwicnN0XCI6ICAgICAgICAgICAgICByZXR1cm4gXCJyc3RcIjtcbiAgICAgICAgY2FzZSBcInJ1YnlcIjogICAgICAgICAgICAgcmV0dXJuIFwicnVieVwiO1xuICAgICAgICBjYXNlIFwicnVzdFwiOiAgICAgICAgICAgICByZXR1cm4gXCJyc1wiO1xuICAgICAgICBjYXNlIFwic2FzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJzYXNcIjtcbiAgICAgICAgY2FzZSBcInNhc3NcIjogICAgICAgICAgICAgcmV0dXJuIFwic2Fzc1wiO1xuICAgICAgICBjYXNlIFwic2NhbGFcIjogICAgICAgICAgICByZXR1cm4gXCJzY2FsYVwiO1xuICAgICAgICBjYXNlIFwic2NoZW1lXCI6ICAgICAgICAgICByZXR1cm4gXCJzY21cIjtcbiAgICAgICAgY2FzZSBcInNjc3NcIjogICAgICAgICAgICAgcmV0dXJuIFwic2Nzc1wiO1xuICAgICAgICBjYXNlIFwic21hbGx0YWxrXCI6ICAgICAgICByZXR1cm4gXCJzdFwiO1xuICAgICAgICBjYXNlIFwic2hlbGxcIjogICAgICAgICAgICByZXR1cm4gXCJzaFwiO1xuICAgICAgICBjYXNlIFwic3FsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJzcWxcIjtcbiAgICAgICAgY2FzZSBcInN0ZXhcIjogICAgICAgICAgICAgcmV0dXJuIFwibGF0ZXhcIjtcbiAgICAgICAgY2FzZSBcInN3aWZ0XCI6ICAgICAgICAgICAgcmV0dXJuIFwic3dpZnRcIjtcbiAgICAgICAgY2FzZSBcInRjbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwidGNsXCI7XG4gICAgICAgIGNhc2UgXCJ0b21sXCI6ICAgICAgICAgICAgIHJldHVybiBcInRvbWxcIjtcbiAgICAgICAgY2FzZSBcInR3aWdcIjogICAgICAgICAgICAgcmV0dXJuIFwidHdpZ1wiO1xuICAgICAgICBjYXNlIFwidHlwZXNjcmlwdFwiOiAgICAgICByZXR1cm4gXCJ0c1wiO1xuICAgICAgICBjYXNlIFwidmJcIjogICAgICAgICAgICAgICByZXR1cm4gXCJ2YlwiO1xuICAgICAgICBjYXNlIFwidmJzY3JpcHRcIjogICAgICAgICByZXR1cm4gXCJ2YnNcIjtcbiAgICAgICAgY2FzZSBcInZlcmlsb2dcIjogICAgICAgICAgcmV0dXJuIFwic3ZcIjtcbiAgICAgICAgY2FzZSBcInZoZGxcIjogICAgICAgICAgICAgcmV0dXJuIFwidmhkbFwiO1xuICAgICAgICBjYXNlIFwieG1sXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ4bWxcIjtcbiAgICAgICAgY2FzZSBcInlhbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwieWFtbFwiO1xuICAgICAgICBjYXNlIFwiejgwXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ6OGFcIjtcbiAgICB9XG4gICAgcmV0dXJuIFwidHh0XCI7XG59XG5cbi8vIE1ha2UgdHNsaW50IGhhcHB5XG5jb25zdCBmb250RmFtaWx5ID0gXCJmb250LWZhbWlseVwiO1xuXG4vLyBDYW4ndCBiZSB0ZXN0ZWQgZTJlIDovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU2luZ2xlR3VpZm9udChndWlmb250OiBzdHJpbmcsIGRlZmF1bHRzOiBhbnkpIHtcbiAgICBjb25zdCBvcHRpb25zID0gZ3VpZm9udC5zcGxpdChcIjpcIik7XG4gICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMpO1xuICAgIGlmICgvXlthLXpBLVowLTldKyQvLnRlc3Qob3B0aW9uc1swXSkpIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldID0gb3B0aW9uc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gPSBKU09OLnN0cmluZ2lmeShvcHRpb25zWzBdKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRzW2ZvbnRGYW1pbHldKSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSArPSBgLCAke2RlZmF1bHRzW2ZvbnRGYW1pbHldfWA7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zLnNsaWNlKDEpLnJlZHVjZSgoYWNjLCBvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAob3B0aW9uWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1wiZm9udC1zaXplXCJdID0gYCR7b3B0aW9uLnNsaWNlKDEpfXB0YDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1wiZm9udC13ZWlnaHRcIl0gPSBcImJvbGRcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1wiZm9udC1zdHlsZVwiXSA9IFwiaXRhbGljXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1XCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcInRleHQtZGVjb3JhdGlvblwiXSA9IFwidW5kZXJsaW5lXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcInRleHQtZGVjb3JhdGlvblwiXSA9IFwibGluZS10aHJvdWdoXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ3XCI6IC8vIENhbid0IHNldCBmb250IHdpZHRoLiBXb3VsZCBoYXZlIHRvIGFkanVzdCBjZWxsIHdpZHRoLlxuICAgICAgICAgICAgICAgIGNhc2UgXCJjXCI6IC8vIENhbid0IHNldCBjaGFyYWN0ZXIgc2V0XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgcmVzdWx0IGFzIGFueSk7XG59O1xuXG4vLyBQYXJzZXMgYSBndWlmb250IGRlY2xhcmF0aW9uIGFzIGRlc2NyaWJlZCBpbiBgOmggRTI0NGBcbi8vIGRlZmF1bHRzOiBkZWZhdWx0IHZhbHVlIGZvciBlYWNoIG9mLlxuLy8gQ2FuJ3QgYmUgdGVzdGVkIGUyZSA6L1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUd1aWZvbnQoZ3VpZm9udDogc3RyaW5nLCBkZWZhdWx0czogYW55KSB7XG4gICAgY29uc3QgZm9udHMgPSBndWlmb250LnNwbGl0KFwiLFwiKS5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIGZvbnRzLnJlZHVjZSgoYWNjLCBjdXIpID0+IHBhcnNlU2luZ2xlR3VpZm9udChjdXIsIGFjYyksIGRlZmF1bHRzKTtcbn1cblxuLy8gQ29tcHV0ZXMgYSB1bmlxdWUgc2VsZWN0b3IgZm9yIGl0cyBhcmd1bWVudC5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlU2VsZWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBmdW5jdGlvbiB1bmlxdWVTZWxlY3RvcihlOiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgIC8vIE9ubHkgbWF0Y2hpbmcgYWxwaGFudW1lcmljIHNlbGVjdG9ycyBiZWNhdXNlIG90aGVycyBjaGFycyBtaWdodCBoYXZlIHNwZWNpYWwgbWVhbmluZyBpbiBDU1NcbiAgICAgICAgaWYgKGUuaWQgJiYgZS5pZC5tYXRjaChcIl5bYS16QS1aMC05Xy1dKyRcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gZS50YWdOYW1lICsgYFtpZD1cIiR7ZS5pZH1cIl1gO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaWQpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50XG4gICAgICAgIGlmICghZS5wYXJlbnRFbGVtZW50KSB7IHJldHVybiBcIkhUTUxcIjsgfVxuICAgICAgICAvLyBDb21wdXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgICBjb25zdCBpbmRleCA9XG4gICAgICAgICAgICBBcnJheS5mcm9tKGUucGFyZW50RWxlbWVudC5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnRhZ05hbWUgPT09IGUudGFnTmFtZSlcbiAgICAgICAgICAgICAgICAuaW5kZXhPZihlKSArIDE7XG4gICAgICAgIHJldHVybiBgJHt1bmlxdWVTZWxlY3RvcihlLnBhcmVudEVsZW1lbnQpfSA+ICR7ZS50YWdOYW1lfTpudGgtb2YtdHlwZSgke2luZGV4fSlgO1xuICAgIH1cbiAgICByZXR1cm4gdW5pcXVlU2VsZWN0b3IoZWxlbWVudCk7XG59XG5cbi8vIFR1cm5zIGEgbnVtYmVyIGludG8gaXRzIGhhc2grNiBudW1iZXIgaGV4YWRlY2ltYWwgcmVwcmVzZW50YXRpb24uXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhDc3MobjogbnVtYmVyKSB7XG4gICAgaWYgKG4gPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBzdHIgPSBuLnRvU3RyaW5nKDE2KTtcbiAgICAvLyBQYWQgd2l0aCBsZWFkaW5nIHplcm9zXG4gICAgcmV0dXJuIFwiI1wiICsgKG5ldyBBcnJheSg2IC0gc3RyLmxlbmd0aCkpLmZpbGwoXCIwXCIpLmpvaW4oXCJcIikgKyBzdHI7XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBCcm93c2VyIGV4dGVuc2lvbnMgaGF2ZSBtdWx0aXBsZSBwcm9jZXNzZXMuIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGVcbiAqIFtiYWNrZ3JvdW5kIHByb2Nlc3NdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQW5hdG9teV9vZl9hX1dlYkV4dGVuc2lvbiNCYWNrZ3JvdW5kX3NjcmlwdHMpLlxuICogT3VyIGJhY2tncm91bmQgcHJvY2VzcyBoYXMgbXVsdGlwbGUgdGFza3M6XG4gKiAtIEtlZXAgdHJhY2sgb2YgcGVyLXRhYiB2YWx1ZXMgd2l0aCBpdHMgc2V0VGFiVmFsdWUvZ2V0VGFiVmFsdWUgZnVuY3Rpb25zXG4gKiAtIFNldCB0aGUgW2Jyb3dzZXJBY3Rpb25zXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL0FQSS9icm93c2VyQWN0aW9uKSdzIGljb24uXG4gKiAtIEtlZXAgdHJhY2sgb2YgZXJyb3IgbWVzc2FnZXMvd2FybmluZ3MgdGhhdCBzaG91bGQgYXJlIGRpc3BsYXllZCBpbiB0aGVcbiAqICAgYnJvd3NlckFjdGlvbi5cbiAqIC0gVXBkYXRlIHNldHRpbmdzIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0aGVpciB2aW1yYy5cbiAqIC0gU3RhcnQgbmV3IG5lb3ZpbSBpbnN0YW5jZXMgd2hlbiBhc2tlZCBieSBhIGNvbnRlbnQgc2NyaXB0LlxuICogLSBQcm92aWRlIGFuIFJQQyBtZWNoYW5pc20gdGhhdCBlbmFibGVzIGNhbGxpbmcgYmFja2dyb3VuZCBBUElzIGZyb20gdGhlXG4gKiAgIGJyb3dzZXJBY3Rpb24vY29udGVudCBzY3JpcHQuXG4gKlxuICogVGhlIGJhY2tncm91bmQgcHJvY2VzcyBtb3N0bHkgYWN0cyBhcyBhIHNsYXZlIGZvciB0aGUgYnJvd3NlckFjdGlvbiBhbmRcbiAqIGNvbnRlbnQgc2NyaXB0cy4gSXQgcmFyZWx5IGFjdHMgb24gaXRzIG93bi5cbiAqL1xuaW1wb3J0IHsgZ2V0R2xvYmFsQ29uZiwgbWVyZ2VXaXRoRGVmYXVsdHMgfSBmcm9tIFwiLi91dGlscy9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBnZXRJY29uSW1hZ2VEYXRhLCBJY29uS2luZCB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5cbmV4cG9ydCBsZXQgcHJlbG9hZGVkSW5zdGFuY2U6IFByb21pc2U8YW55PjtcblxudHlwZSB0YWJJZCA9IG51bWJlcjtcbnR5cGUgdGFiU3RvcmFnZSA9IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbixcbn07XG4vLyBXZSBjYW4ndCB1c2UgdGhlIHNlc3Npb25zLnNldFRhYlZhbHVlL2dldFRhYlZhbHVlIGFwaXMgZmlyZWZveCBoYXMgYmVjYXVzZVxuLy8gY2hyb21lIGRvZXNuJ3Qgc3VwcG9ydCB0aGVtLiBJbnN0ZWFkLCB3ZSBjcmVhdGUgYSBtYXAgb2YgdGFiaWQgPT4ge30ga2VwdCBpblxuLy8gdGhlIGJhY2tncm91bmQuIFRoaXMgaGFzIHRoZSBkaXNhZHZhbnRhZ2Ugb2Ygbm90IHN1cnZpdmluZyBicm93c2VyIHJlc3RhcnRzLFxuLy8gYnV0J3MgaXQncyBjcm9zcyBwbGF0Zm9ybS5cbmNvbnN0IHRhYlZhbHVlcyA9IG5ldyBNYXA8dGFiSWQsIHRhYlN0b3JhZ2U+KCk7XG5mdW5jdGlvbiBzZXRUYWJWYWx1ZSh0YWJpZDogdGFiSWQsIGl0ZW06IGtleW9mIHRhYlN0b3JhZ2UsIHZhbHVlOiBhbnkpIHtcbiAgICBsZXQgb2JqID0gdGFiVmFsdWVzLmdldCh0YWJpZCk7XG4gICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9iaiA9IHsgXCJkaXNhYmxlZFwiOiBmYWxzZSB9O1xuICAgICAgICB0YWJWYWx1ZXMuc2V0KHRhYmlkLCBvYmopO1xuICAgIH1cbiAgICBvYmpbaXRlbV0gPSB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGdldFRhYlZhbHVlKHRhYmlkOiB0YWJJZCwgaXRlbToga2V5b2YgdGFiU3RvcmFnZSkge1xuICAgIGNvbnN0IG9iaiA9IHRhYlZhbHVlcy5nZXQodGFiaWQpO1xuICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gb2JqW2l0ZW1dO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVJY29uKHRhYmlkPzogbnVtYmVyKSB7XG4gICAgbGV0IG5hbWU6IEljb25LaW5kID0gXCJub3JtYWxcIjtcbiAgICBpZiAodGFiaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB0YWIgPSAoYXdhaXQgYnJvd3Nlci50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0pKVswXTtcbiAgICAgICAgaWYgKHRhYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDdXJyZW50IHRhYiBpcyB1bmRlZmluZWQgLSBmYWlsaW5nIHRvIHVwZGF0ZUljb24oKVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0YWJpZCA9IHRhYi5pZDtcbiAgICB9XG4gICAgaWYgKGdldFRhYlZhbHVlKHRhYmlkLCBcImRpc2FibGVkXCIpID09PSB0cnVlKSB7XG4gICAgICAgIG5hbWUgPSBcImRpc2FibGVkXCI7XG4gICAgfSBlbHNlIGlmIChlcnJvciAhPT0gXCJcIikge1xuICAgICAgICBuYW1lID0gXCJlcnJvclwiO1xuICAgIH0gZWxzZSBpZiAod2FybmluZyAhPT0gXCJcIikge1xuICAgICAgICBuYW1lID0gXCJub3RpZmljYXRpb25cIjtcbiAgICB9XG4gICAgcmV0dXJuIGdldEljb25JbWFnZURhdGEobmFtZSkudGhlbigoaW1hZ2VEYXRhOiBhbnkpID0+IGJyb3dzZXIuYnJvd3NlckFjdGlvbi5zZXRJY29uKHsgaW1hZ2VEYXRhIH0pKTtcbn1cblxuLy8gT3MgaXMgd2luL21hYy9saW51eC9hbmRyb2lzL2Nyb3MuIFdlIG9ubHkgdXNlIGl0IHRvIGFkZCBpbmZvcm1hdGlvbiB0byBlcnJvclxuLy8gbWVzc2FnZXMgb24gd2luZG93cy5cbmxldCBvcyA9IFwiXCI7XG5icm93c2VyLnJ1bnRpbWUuZ2V0UGxhdGZvcm1JbmZvKCkudGhlbigocGxhdDogYW55KSA9PiBvcyA9IHBsYXQub3MpO1xuXG4vLyBMYXN0IGVycm9yIG1lc3NhZ2VcbmxldCBlcnJvciA9IFwiXCI7XG5cbi8vIFNpbXBsZSBnZXR0ZXIgZm9yIGVhc3kgUlBDIGNhbGxzLiBDYW4ndCBiZSB0ZXN0ZWQgYXMgcmVxdWlyZXMgb3BlbmluZ1xuLy8gYnJvd3NlckFjdGlvbi5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBnZXRFcnJvcigpIHtcbiAgICByZXR1cm4gZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRXJyb3JzKG52aW06IGFueSwgcmVqZWN0OiBhbnkpIHtcbiAgICBlcnJvciA9IFwiXCI7XG4gICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBudmltLnRpbWVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgZXJyb3IgPSBcIk5lb3ZpbSBpcyBub3QgcmVzcG9uZGluZy5cIjtcbiAgICAgICAgdXBkYXRlSWNvbigpO1xuICAgICAgICBudmltLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9LCAxMDAwMCk7XG4gICAgbnZpbS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoYXN5bmMgKHA6IGFueSkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHVwZGF0ZUljb24oKTtcbiAgICAgICAgLy8gVW5mb3J0dW5hdGVseSB0aGlzIGVycm9yIGhhbmRsaW5nIGNhbid0IGJlIHRlc3RlZCBhcyBpdCByZXF1aXJlc1xuICAgICAgICAvLyBzaWRlLWVmZmVjdHMgb24gdGhlIE9TLlxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAocC5lcnJvcikge1xuICAgICAgICAgICAgY29uc3QgZXJyc3RyID0gcC5lcnJvci50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKGVycnN0ci5tYXRjaCgvbm8gc3VjaCBuYXRpdmUgYXBwbGljYXRpb24vaSkpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IFwiTmF0aXZlIG1hbmlmZXN0IG5vdCBmb3VuZC4gUGxlYXNlIHJ1biBgOmNhbGwgZmlyZW52aW0jaW5zdGFsbCgwKWAgaW4gbmVvdmltLlwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJzdHIubWF0Y2goL2FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQvaSkpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IFwiVGhlIHNjcmlwdCBzdXBwb3NlZCB0byBzdGFydCBuZW92aW0gY291bGRuJ3QgYmUgZm91bmQuXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBQbGVhc2UgcnVuIGA6Y2FsbCBmaXJlbnZpbSNpbnN0YWxsKDApYCBpbiBuZW92aW1cIjtcbiAgICAgICAgICAgICAgICBpZiAob3MgPT09IFwid2luXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgKz0gXCIgb3IgdHJ5IHJ1bm5pbmcgdGhlIHNjcmlwdHMgaW4gJUxPQ0FMQVBQREFUQSVcXFxcZmlyZW52aW1cXFxcXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVycm9yICs9IFwiLlwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJzdHIubWF0Y2goL05hdGl2ZSBhcHBsaWNhdGlvbiB0cmllZCB0byBzZW5kIGEgbWVzc2FnZSBvZi8pKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBcIlVuZXhwZWN0ZWQgb3V0cHV0LiBSdW4gYG52aW0gLS1oZWFkbGVzc2AgYW5kIGVuc3VyZSBpdCBwcmludHMgbm90aGluZy5cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBlcnJzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVJY29uKCk7XG4gICAgICAgICAgICByZWplY3QocC5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoIW52aW0ucmVwbGllZCAmJiAhbnZpbS50aW1lZE91dCkge1xuICAgICAgICAgICAgZXJyb3IgPSBcIk5lb3ZpbSBkaWVkIHdpdGhvdXQgYW5zd2VyaW5nLlwiO1xuICAgICAgICAgICAgdXBkYXRlSWNvbigpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aW1lb3V0O1xufVxuXG4vLyBMYXN0IHdhcm5pbmcgbWVzc2FnZVxubGV0IHdhcm5pbmcgPSBcIlwiO1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGdldFdhcm5pbmcoKSB7XG4gICAgcmV0dXJuIHdhcm5pbmc7XG59XG5sZXQgbnZpbVBsdWdpblZlcnNpb24gPSBcIlwiO1xuYXN5bmMgZnVuY3Rpb24gY2hlY2tWZXJzaW9uKG52aW1WZXJzaW9uOiBzdHJpbmcpIHtcbiAgICBudmltUGx1Z2luVmVyc2lvbiA9IG52aW1WZXJzaW9uO1xuICAgIGNvbnN0IG1hbmlmZXN0ID0gYnJvd3Nlci5ydW50aW1lLmdldE1hbmlmZXN0KCk7XG4gICAgd2FybmluZyA9IFwiXCI7XG4gICAgLy8gQ2FuJ3QgYmUgdGVzdGVkIGFzIGl0IHdvdWxkIHJlcXVpcmUgc2lkZSBlZmZlY3RzIG9uIHRoZSBPUy5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChtYW5pZmVzdC52ZXJzaW9uICE9PSBudmltVmVyc2lvbikge1xuICAgICAgICB3YXJuaW5nID0gYE5lb3ZpbSBwbHVnaW4gdmVyc2lvbiAoJHtudmltVmVyc2lvbn0pIGFuZCBicm93c2VyIGFkZG9uIGBcbiAgICAgICAgICAgICsgYHZlcnNpb24gKCR7bWFuaWZlc3QudmVyc2lvbn0pIGRvIG5vdCBtYXRjaC5gO1xuICAgIH1cbiAgICB1cGRhdGVJY29uKCk7XG59XG5mdW5jdGlvbiB3YXJuVW5leHBlY3RlZE1lc3NhZ2VzKG1lc3NhZ2VzOiBzdHJpbmdbXSkge1xuICAgIGlmIChtZXNzYWdlcyA9PT0gdW5kZWZpbmVkIHx8ICFBcnJheS5pc0FycmF5KG1lc3NhZ2VzKSB8fCBtZXNzYWdlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2FybmluZyA9IG1lc3NhZ2VzLmpvaW4oXCJcXG5cIik7XG4gICAgdXBkYXRlSWNvbigpO1xufVxuXG4vLyBGdW5jdGlvbiBjYWxsZWQgaW4gb3JkZXIgdG8gZmlsbCBvdXQgZGVmYXVsdCBzZXR0aW5ncy4gQ2FsbGVkIGZyb20gdXBkYXRlU2V0dGluZ3MuXG5mdW5jdGlvbiBhcHBseVNldHRpbmdzKHNldHRpbmdzOiBhbnkpIHtcbiAgICByZXR1cm4gYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldChtZXJnZVdpdGhEZWZhdWx0cyhvcywgc2V0dGluZ3MpIGFzIGFueSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNldHRpbmdzKCkge1xuICAgIGNvbnN0IHRtcCA9IHByZWxvYWRlZEluc3RhbmNlO1xuICAgIHByZWxvYWRlZEluc3RhbmNlID0gY3JlYXRlTmV3SW5zdGFuY2UoKTtcbiAgICB0bXAudGhlbihudmltID0+IG52aW0ua2lsbCgpKTtcbiAgICAvLyBJdCdzIG9rIHRvIHJldHVybiB0aGUgcHJlbG9hZGVkSW5zdGFuY2UgYXMgYSBwcm9taXNlIGJlY2F1c2VcbiAgICAvLyBzZXR0aW5ncyBhcmUgb25seSBhcHBsaWVkIHdoZW4gdGhlIHByZWxvYWRlZEluc3RhbmNlIGhhcyByZXR1cm5lZCBhXG4gICAgLy8gcG9ydCtzZXR0aW5ncyBvYmplY3QgYW55d2F5LlxuICAgIHJldHVybiBwcmVsb2FkZWRJbnN0YW5jZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3SW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tID0gbmV3IFVpbnQzMkFycmF5KDgpO1xuICAgICAgICB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhyYW5kb20pO1xuICAgICAgICBjb25zdCBwYXNzd29yZCA9IEFycmF5LmZyb20ocmFuZG9tKS5qb2luKFwiXCIpO1xuXG4gICAgICAgIGNvbnN0IG52aW0gPSBicm93c2VyLnJ1bnRpbWUuY29ubmVjdE5hdGl2ZShcImZpcmVudmltXCIpO1xuICAgICAgICBjb25zdCBlcnJvclRpbWVvdXQgPSByZWdpc3RlckVycm9ycyhudmltLCByZWplY3QpO1xuICAgICAgICBudmltLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVzcDogYW55KSA9PiB7XG4gICAgICAgICAgICAobnZpbSBhcyBhbnkpLnJlcGxpZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGVycm9yVGltZW91dCk7XG4gICAgICAgICAgICBjaGVja1ZlcnNpb24ocmVzcC52ZXJzaW9uKTtcbiAgICAgICAgICAgIHdhcm5VbmV4cGVjdGVkTWVzc2FnZXMocmVzcC5tZXNzYWdlcyk7XG4gICAgICAgICAgICBhcHBseVNldHRpbmdzKHJlc3Auc2V0dGluZ3MpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBraWxsOiAoKSA9PiBudmltLmRpc2Nvbm5lY3QoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIHBvcnQ6IHJlc3AucG9ydCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgbnZpbS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBuZXdJbnN0YW5jZTogdHJ1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gQ3JlYXRpbmcgdGhpcyBmaXJzdCBpbnN0YW5jZSBzZXJ2ZXMgdHdvIHB1cnBvc2VzOiBtYWtlIGNyZWF0aW5nIG5ldyBuZW92aW1cbi8vIGZyYW1lcyBmYXN0IGFuZCBhbHNvIGluaXRpYWxpemUgc2V0dGluZ3MgdGhlIGZpcnN0IHRpbWUgRmlyZW52aW0gaXMgZW5hYmxlZFxuLy8gaW4gYSBicm93c2VyLlxucHJlbG9hZGVkSW5zdGFuY2UgPSBjcmVhdGVOZXdJbnN0YW5jZSgpO1xuXG5hc3luYyBmdW5jdGlvbiB0b2dnbGVEaXNhYmxlZCgpIHtcbiAgICBjb25zdCB0YWIgPSAoYXdhaXQgYnJvd3Nlci50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0pKVswXTtcbiAgICBpZiAodGFiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ3VycmVudCB0YWIgaXMgdW5kZWZpbmVkIC0gZmFpbGluZyB0byB0b2dnbGVEaXNhYmxlZCgpXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhYmlkID0gdGFiLmlkO1xuICAgIGNvbnN0IGRpc2FibGVkID0gIWdldFRhYlZhbHVlKHRhYmlkLCBcImRpc2FibGVkXCIpO1xuICAgIHNldFRhYlZhbHVlKHRhYmlkLCBcImRpc2FibGVkXCIsIGRpc2FibGVkKTtcbiAgICB1cGRhdGVJY29uKHRhYmlkKTtcbiAgICByZXR1cm4gYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlKHRhYmlkLCB7IGFyZ3M6IFtkaXNhYmxlZF0sIGZ1bmNOYW1lOiBbXCJzZXREaXNhYmxlZFwiXSB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWNjZXB0Q29tbWFuZCAoY29tbWFuZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdGFiID0gKGF3YWl0IGJyb3dzZXIudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9KSlbMF07XG4gICAgbGV0IHA7XG4gICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgIGNhc2UgXCJudmltaWZ5XCI6XG4gICAgICAgICAgICBwID0gYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHRhYi5pZCxcbiAgICAgICAgICAgICAgICB7IGFyZ3M6IFtdLCBmdW5jTmFtZTogW1wiZm9yY2VOdmltaWZ5XCJdIH0sXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2VuZF9DLW5cIjpcbiAgICAgICAgICAgIHAgPSBicm93c2VyLnRhYnMuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgdGFiLmlkLFxuICAgICAgICAgICAgICAgIHsgYXJnczogW1wiPEMtbj5cIl0sIGZ1bmNOYW1lOiBbXCJzZW5kS2V5XCJdIH0sXG4gICAgICAgICk7XG4gICAgICAgIGlmIChnZXRHbG9iYWxDb25mKClbXCI8Qy1uPlwiXSA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgICAgIHAgPSBwLmNhdGNoKCgpID0+IGJyb3dzZXIud2luZG93cy5jcmVhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzZW5kX0MtdFwiOlxuICAgICAgICAgICAgcCA9IGJyb3dzZXIudGFicy5zZW5kTWVzc2FnZShcbiAgICAgICAgICAgICAgICB0YWIuaWQsXG4gICAgICAgICAgICAgICAgeyBhcmdzOiBbXCI8Qy10PlwiXSwgZnVuY05hbWU6IFtcInNlbmRLZXlcIl0gfSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdldEdsb2JhbENvbmYoKVtcIjxDLXQ+XCJdID09PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgcCA9IHAuY2F0Y2goKCkgPT4gYnJvd3Nlci50YWJzLmNyZWF0ZSh7IFwid2luZG93SWRcIjogdGFiLndpbmRvd0lkIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlbmRfQy13XCI6XG4gICAgICAgICAgICBwID0gYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHRhYi5pZCxcbiAgICAgICAgICAgICAgICB7IGFyZ3M6IFtcIjxDLXc+XCJdLCBmdW5jTmFtZTogW1wic2VuZEtleVwiXSB9LFxuICAgICAgICApO1xuICAgICAgICBpZiAoZ2V0R2xvYmFsQ29uZigpW1wiPEMtdz5cIl0gPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgICAgICBwID0gcC5jYXRjaCgoKSA9PiBicm93c2VyLnRhYnMucmVtb3ZlKHRhYi5pZCkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2VuZF9DUy1uXCI6XG4gICAgICAgICAgICBwID0gYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHRhYi5pZCxcbiAgICAgICAgICAgICAgICB7IGFyZ3M6IFtcIjxDUy1uPlwiXSwgZnVuY05hbWU6IFtcInNlbmRLZXlcIl0gfSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdldEdsb2JhbENvbmYoKVtcIjxDUy1uPlwiXSA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgICAgIHAgPSBwLmNhdGNoKCgpID0+IGJyb3dzZXIud2luZG93cy5jcmVhdGUoeyBcImluY29nbml0b1wiOiB0cnVlIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlbmRfQ1MtdFwiOlxuICAgICAgICAgICAgLy8gPENTLXQ+IGNhbid0IGJlIGVtdWxhdGVkIHdpdGhvdXQgdGhlIHNlc3Npb25zIEFQSS5cbiAgICAgICAgICAgIHAgPSBicm93c2VyLnRhYnMuc2VuZE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgdGFiLmlkLFxuICAgICAgICAgICAgICAgIHsgYXJnczogW1wiPENTLXQ+XCJdLCBmdW5jTmFtZTogW1wic2VuZEtleVwiXSB9LFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlbmRfQ1Mtd1wiOlxuICAgICAgICAgICAgcCA9IGJyb3dzZXIudGFicy5zZW5kTWVzc2FnZShcbiAgICAgICAgICAgICAgICB0YWIuaWQsXG4gICAgICAgICAgICAgICAgeyBhcmdzOiBbXCI8Q1Mtdz5cIl0sIGZ1bmNOYW1lOiBbXCJzZW5kS2V5XCJdIH0sXG4gICAgICAgICk7XG4gICAgICAgIGlmIChnZXRHbG9iYWxDb25mKClbXCI8Q1Mtdz5cIl0gPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgICAgICBwID0gcC5jYXRjaCgoKSA9PiBicm93c2VyLndpbmRvd3MucmVtb3ZlKHRhYi53aW5kb3dJZCkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidG9nZ2xlX2ZpcmVudmltXCI6XG4gICAgICAgICAgICBwID0gdG9nZ2xlRGlzYWJsZWQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBwO1xufVxuXG5PYmplY3QuYXNzaWduKHdpbmRvdywge1xuICAgIGFjY2VwdENvbW1hbmQsXG4gICAgLy8gV2UgbmVlZCB0byBzdGljayB0aGUgYnJvd3NlciBwb2x5ZmlsbCBpbiBgd2luZG93YCBpZiB3ZSB3YW50IHRoZSBgZXhlY2BcbiAgICAvLyBjYWxsIHRvIGJlIGFibGUgdG8gZmluZCBpdCBvbiBDaHJvbWVcbiAgICBicm93c2VyLFxuICAgIGNsb3NlT3duVGFiOiAoc2VuZGVyOiBhbnkpID0+IGJyb3dzZXIudGFicy5yZW1vdmUoc2VuZGVyLnRhYi5pZCksXG4gICAgZXhlYzogKF86IGFueSwgYXJnczogYW55KSA9PiBhcmdzLmZ1bmNOYW1lLnJlZHVjZSgoYWNjOiBhbnksIGN1cjogc3RyaW5nKSA9PiBhY2NbY3VyXSwgd2luZG93KSguLi4oYXJncy5hcmdzKSksXG4gICAgZ2V0RXJyb3IsXG4gICAgZ2V0TmVvdmltSW5zdGFuY2U6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcHJlbG9hZGVkSW5zdGFuY2U7XG4gICAgICAgIHByZWxvYWRlZEluc3RhbmNlID0gY3JlYXRlTmV3SW5zdGFuY2UoKTtcbiAgICAgICAgLy8gRGVzdHJ1Y3R1cmluZyByZXN1bHQgdG8gcmVtb3ZlIGtpbGwoKSBmcm9tIGl0XG4gICAgICAgIHJldHVybiByZXN1bHQudGhlbigoeyBwYXNzd29yZCwgcG9ydCB9KSA9PiAoeyBwYXNzd29yZCwgcG9ydCB9KSk7XG4gICAgfSxcbiAgICBnZXROdmltUGx1Z2luVmVyc2lvbjogKCkgPT4gbnZpbVBsdWdpblZlcnNpb24sXG4gICAgZ2V0T3duRnJhbWVJZDogKHNlbmRlcjogYW55KSA9PiBzZW5kZXIuZnJhbWVJZCxcbiAgICBnZXRUYWI6IChzZW5kZXI6IGFueSkgPT4gc2VuZGVyLnRhYixcbiAgICBnZXRUYWJWYWx1ZTogKHNlbmRlcjogYW55LCBhcmdzOiBhbnkpID0+IGdldFRhYlZhbHVlKHNlbmRlci50YWIuaWQsIGFyZ3NbMF0pLFxuICAgIGdldFRhYlZhbHVlRm9yOiAoXzogYW55LCBhcmdzOiBhbnkpID0+IGdldFRhYlZhbHVlKGFyZ3NbMF0sIGFyZ3NbMV0pLFxuICAgIGdldFdhcm5pbmcsXG4gICAgbWVzc2FnZUZyYW1lOiAoc2VuZGVyOiBhbnksIGFyZ3M6IGFueSkgPT4gYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlKHNlbmRlci50YWIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcmFtZUlkOiBhcmdzLmZyYW1lSWQgfSksXG4gICAgbWVzc2FnZVBhZ2U6IChzZW5kZXI6IGFueSwgYXJnczogYW55KSA9PiBicm93c2VyLnRhYnMuc2VuZE1lc3NhZ2Uoc2VuZGVyLnRhYi5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzKSxcbiAgICBwdWJsaXNoRnJhbWVJZDogKHNlbmRlcjogYW55KSA9PiB7XG4gICAgICAgIGJyb3dzZXIudGFicy5zZW5kTWVzc2FnZShzZW5kZXIudGFiLmlkLCB7XG4gICAgICAgICAgICBhcmdzOiBbc2VuZGVyLmZyYW1lSWRdLFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcInJlZ2lzdGVyTmV3RnJhbWVJZFwiXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZW5kZXIuZnJhbWVJZDtcbiAgICB9LFxuICAgIHNldFRhYlZhbHVlOiAoc2VuZGVyOiBhbnksIGFyZ3M6IGFueSkgPT4gc2V0VGFiVmFsdWUoc2VuZGVyLnRhYi5pZCwgYXJnc1swXSwgYXJnc1sxXSksXG4gICAgdG9nZ2xlRGlzYWJsZWQ6ICgpID0+IHRvZ2dsZURpc2FibGVkKCksXG4gICAgdXBkYXRlU2V0dGluZ3M6ICgpID0+IHVwZGF0ZVNldHRpbmdzKCksXG4gICAgb3BlblRyb3VibGVzaG9vdGluZ0d1aWRlOiAoKSA9PiBicm93c2VyLnRhYnMuY3JlYXRlKHsgYWN0aXZlOiB0cnVlLCB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9ibG9iL21hc3Rlci9UUk9VQkxFU0hPT1RJTkcubWRcIiB9KSxcbn0gYXMgYW55KTtcblxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdDogYW55LCBzZW5kZXI6IGFueSwgX3NlbmRSZXNwb25zZTogYW55KSA9PiB7XG4gICAgY29uc3QgZm4gPSByZXF1ZXN0LmZ1bmNOYW1lLnJlZHVjZSgoYWNjOiBhbnksIGN1cjogc3RyaW5nKSA9PiBhY2NbY3VyXSwgd2luZG93KTtcbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgYXMgdGhlcmUncyBubyB3YXkgdG8gZm9yY2UgYW4gaW5jb3JyZWN0IGNvbnRlbnQgcmVxdWVzdC5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICghZm4pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvcjogdW5oYW5kbGVkIGNvbnRlbnQgcmVxdWVzdDogJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0KX0uYCk7XG4gICAgfVxuICAgIHJldHVybiBmbihzZW5kZXIsIHJlcXVlc3QuYXJncyAhPT0gdW5kZWZpbmVkID8gcmVxdWVzdC5hcmdzIDogW10pO1xufSk7XG5cbmJyb3dzZXIudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcih0YWIgPT4ge1xuICAgIHVwZGF0ZUljb24odGFiLnRhYklkKTtcbn0pO1xuYnJvd3Nlci53aW5kb3dzLm9uRm9jdXNDaGFuZ2VkLmFkZExpc3RlbmVyKGFzeW5jICh3aW5kb3dJZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdGFicyA9IGF3YWl0IGJyb3dzZXIudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgd2luZG93SWQgfSk7XG4gICAgaWYgKHRhYnMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgdXBkYXRlSWNvbih0YWJzWzBdLmlkKTtcbiAgICB9XG59KTtcblxudXBkYXRlSWNvbigpO1xuXG5icm93c2VyLmNvbW1hbmRzLm9uQ29tbWFuZC5hZGRMaXN0ZW5lcihhY2NlcHRDb21tYW5kKTtcbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2VFeHRlcm5hbC5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdDogYW55LCBzZW5kZXI6IGFueSwgX3NlbmRSZXNwb25zZTogYW55KSA9PiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGFjY2VwdENvbW1hbmQocmVxdWVzdC5jb21tYW5kKTtcbiAgICBfc2VuZFJlc3BvbnNlKHJlc3ApO1xufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUlmUG9zc2libGUoKSB7XG4gICAgY29uc3QgdGFicyA9IGF3YWl0IGJyb3dzZXIudGFicy5xdWVyeSh7fSk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSB0YWJzLm1hcCh0YWIgPT4gYnJvd3NlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmRNZXNzYWdlKHRhYi5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wiZ2V0QWN0aXZlSW5zdGFuY2VDb3VudFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcmFtZUlkOiAwIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IDApKTtcbiAgICBjb25zdCBpbnN0YW5jZXMgPSBhd2FpdCAoUHJvbWlzZS5hbGwobWVzc2FnZXMpKTtcbiAgICAvLyBDYW4ndCBiZSBjb3ZlcmVkIGFzIHJlbG9hZCgpIHdvdWxkIGRlc3Ryb3kgd2Vic29ja2V0cyBhbmQgdGh1cyBjb3ZlcmFnZVxuICAgIC8vIGRhdGEuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoaW5zdGFuY2VzLmZpbmQobiA9PiBuID4gMCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBicm93c2VyLnJ1bnRpbWUucmVsb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCh1cGRhdGVJZlBvc3NpYmxlLCAxMDAwICogNjAgKiAxMCk7XG4gICAgfVxufVxuKHdpbmRvdyBhcyBhbnkpLnVwZGF0ZUlmUG9zc2libGUgPSB1cGRhdGVJZlBvc3NpYmxlO1xuYnJvd3Nlci5ydW50aW1lLm9uVXBkYXRlQXZhaWxhYmxlLmFkZExpc3RlbmVyKHVwZGF0ZUlmUG9zc2libGUpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9