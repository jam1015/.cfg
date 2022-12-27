/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/editor-adapter/index.js":
/*!**********************************************!*\
  !*** ./node_modules/editor-adapter/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenericAbstractEditor": () => (/* binding */ GenericAbstractEditor),
/* harmony export */   "AceEditor": () => (/* binding */ AceEditor),
/* harmony export */   "CodeMirrorEditor": () => (/* binding */ CodeMirrorEditor),
/* harmony export */   "MonacoEditor": () => (/* binding */ MonacoEditor),
/* harmony export */   "TextareaEditor": () => (/* binding */ TextareaEditor),
/* harmony export */   "computeSelector": () => (/* binding */ computeSelector),
/* harmony export */   "executeInPage": () => (/* binding */ executeInPage),
/* harmony export */   "unwrap": () => (/* binding */ unwrap),
/* harmony export */   "wrap": () => (/* binding */ wrap),
/* harmony export */   "getEditor": () => (/* binding */ getEditor)
/* harmony export */ });
class GenericAbstractEditor {
    constructor(_e, _options) { }
    ;
    static matches(_) {
        throw new Error("Matches function not overriden");
    }
    ;
}
/* istanbul ignore next */
class AceEditor extends GenericAbstractEditor {
    constructor(e, _options) {
        super(e, _options);
        // This function will be stringified and inserted in page context so we
        // can't instrument it.
        /* istanbul ignore next */
        this.getAce = (selec) => {
        };
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            return wrap(ace.getValue());
        };
        this.getCursor = async (selector, wrap, unwrap) => {
            let position;
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            if (ace.getCursorPosition !== undefined) {
                position = ace.getCursorPosition();
            }
            else {
                position = ace.selection.cursor;
            }
            return [wrap(position.row) + 1, wrap(position.column)];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            return wrap(ace.session.$modeId).split("/").slice(-1)[0];
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            return wrap(ace.setValue(text, 1));
        };
        this.setCursor = async (selector, wrap, unwrap, line, column) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            const selection = ace.getSelection();
            return wrap(selection.moveCursorTo(line - 1, column, false));
        };
        this.elem = e;
        // Get the topmost ace element
        let parent = this.elem.parentElement;
        while (AceEditor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/ace_editor/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
}
/* istanbul ignore next */
class CodeMirrorEditor extends GenericAbstractEditor {
    constructor(e, options) {
        super(e, options);
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.getValue());
        };
        this.getCursor = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const position = unwrap(elem).CodeMirror.getCursor();
            return [wrap(position.line) + 1, wrap(position.ch)];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.getMode().name);
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.setValue(text));
        };
        this.setCursor = async (selector, wrap, unwrap, line, column) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.setCursor({ line: line - 1, ch: column }));
        };
        this.elem = e;
        // Get the topmost CodeMirror element
        let parent = this.elem.parentElement;
        while (CodeMirrorEditor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/^(.* )?CodeMirror/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
}
/* istanbul ignore next */
class MonacoEditor extends GenericAbstractEditor {
    constructor(e, options) {
        super(e, options);
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const uri = elem.getAttribute("data-uri");
            const model = unwrap(window).monaco.editor.getModel(uri);
            return wrap(model.getValue());
        };
        // It's impossible to get Monaco's cursor position:
        // https://github.com/Microsoft/monaco-editor/issues/258
        this.getCursor = async (selector, wrap, unwrap) => {
            return [1, 0];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const uri = elem.getAttribute("data-uri");
            const model = unwrap(window).monaco.editor.getModel(uri);
            return wrap(model.getModeId());
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = document.querySelector(selector);
            const uri = elem.getAttribute("data-uri");
            const model = unwrap(window).monaco.editor.getModel(uri);
            return wrap(model.setValue(text));
        };
        // It's impossible to set Monaco's cursor position:
        // https://github.com/Microsoft/monaco-editor/issues/258
        this.setCursor = async (_selector, _wrap, _unwrap, _line, _column) => {
            return undefined;
        };
        this.elem = e;
        // Find the monaco element that holds the data
        let parent = this.elem.parentElement;
        while (!(this.elem.className.match(/monaco-editor/gi)
            && this.elem.getAttribute("data-uri").match("file://|inmemory://|gitlab:"))) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 4; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/monaco-editor/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
}
// TextareaEditor sort of works for contentEditable elements but there should
// really be a contenteditable-specific editor.
/* istanbul ignore next */
class TextareaEditor {
    constructor(e, options) {
        this.getContent = async () => {
            if (this.elem.value !== undefined) {
                return Promise.resolve(this.elem.value);
            }
            if (this.options.preferHTML) {
                return Promise.resolve(this.elem.innerHTML);
            }
            else {
                return Promise.resolve(this.elem.innerText);
            }
        };
        this.getCursor = async () => {
            return this.getContent().then(text => {
                let line = 1;
                let column = 0;
                const selectionStart = this.elem.selectionStart !== undefined
                    ? this.elem.selectionStart
                    : 0;
                // Sift through the text, counting columns and new lines
                for (let cursor = 0; cursor < selectionStart; ++cursor) {
                    column += text.charCodeAt(cursor) < 0x7F ? 1 : 2;
                    if (text[cursor] === "\n") {
                        line += 1;
                        column = 0;
                    }
                }
                return [line, column];
            });
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async () => {
            if (this.options.preferHTML) {
                return Promise.resolve('html');
            }
            return Promise.resolve(undefined);
        };
        this.setContent = async (text) => {
            if (this.elem.value !== undefined) {
                this.elem.value = text;
            }
            else {
                if (this.options.preferHTML) {
                    this.elem.innerHTML = text;
                }
                else {
                    this.elem.innerText = text;
                }
            }
            return Promise.resolve();
        };
        this.setCursor = async (line, column) => {
            return this.getContent().then(text => {
                let character = 0;
                // Try to find the line the cursor should be put on
                while (line > 1 && character < text.length) {
                    if (text[character] === "\n") {
                        line -= 1;
                    }
                    character += 1;
                }
                // Try to find the character after which the cursor should be moved
                // Note: we don't do column = columnn + character because column
                // might be larger than actual line length and it's better to be on
                // the right line but on the wrong column than on the wrong line
                // and wrong column.
                // Moreover, column is a number of UTF-8 bytes from the beginning
                // of the line to the cursor. However, javascript uses UTF-16,
                // which is 2 bytes per non-ascii character. So when we find a
                // character that is more than 1 byte long, we have to remove that
                // amount from column, but only two characters from CHARACTER!
                while (column > 0 && character < text.length) {
                    // Can't happen, but better be safe than sorry
                    /* istanbul ignore next */
                    if (text[character] === "\n") {
                        break;
                    }
                    const code = text.charCodeAt(character);
                    if (code <= 0x7f) {
                        column -= 1;
                    }
                    else if (code <= 0x7ff) {
                        column -= 2;
                    }
                    else if (code >= 0xd800 && code <= 0xdfff) {
                        column -= 4;
                        character++;
                    }
                    else if (code < 0xffff) {
                        column -= 3;
                    }
                    else {
                        column -= 4;
                    }
                    character += 1;
                }
                if (this.elem.setSelectionRange !== undefined) {
                    this.elem.setSelectionRange(character, character);
                }
                return undefined;
            });
        };
        this.options = options;
        this.elem = e;
    }
    static matches(_) {
        return true;
    }
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
// Runs CODE in the page's context by setting up a custom event listener,
// embedding a script element that runs the piece of code and emits its result
// as an event.
/* istanbul ignore next */
function executeInPage(code) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const eventId = `${Math.random()}`;
        script.innerHTML = `(async (evId) => {
            try {
                let unwrap = x => x;
                let wrap = x => x;
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
function unwrap(x) {
    if (window.wrappedJSObject) {
        return x.wrappedJSObject;
    }
    return x;
}
function wrap(x) {
    if (window.XPCNativeWrapper) {
        return window.XPCNativeWrapper(x);
    }
    return x;
}
;
function getEditor(elem, options) {
    let editor;
    for (let clazz of [AceEditor, CodeMirrorEditor, MonacoEditor]) {
        if (clazz.matches(elem)) {
            editor = clazz;
            break;
        }
    }
    if (editor === undefined) {
        return new TextareaEditor(elem, options);
    }
    let ed = new editor(elem, options);
    let result;
    if (window.wrappedJSObject) {
        result = new Proxy(ed, {
            get: (target, prop) => (...args) => {
                return target[prop](computeSelector(target.getElement()), wrap, unwrap, ...args);
            }
        });
    }
    else {
        result = new Proxy(ed, {
            get: (target, prop) => {
                if (prop === "getElement") {
                    return target[prop];
                }
                return (...args) => {
                    /* istanbul ignore next */
                    return executeInPage(`(${target[prop]})(${JSON.stringify(computeSelector(target.getElement()))}, x => x, x => x, ...${JSON.stringify(args)})`);
                };
            }
        });
    }
    return result;
}


/***/ }),

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

/***/ "./src/EventEmitter.ts":
/*!*****************************!*\
  !*** ./src/EventEmitter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(event, handler) {
        let handlers = this.listeners.get(event);
        if (handlers === undefined) {
            handlers = [];
            this.listeners.set(event, handlers);
        }
        handlers.push(handler);
    }
    emit(event, ...data) {
        const handlers = this.listeners.get(event);
        if (handlers !== undefined) {
            const errors = [];
            handlers.forEach((handler) => {
                try {
                    handler(...data);
                }
                catch (e) {
                    /* istanbul ignore next */
                    errors.push(e);
                }
            });
            /* Error conditions here are impossible to test for from selenium
             * because it would arise from the wrong use of the API, which we
             * can't ship in the extension, so don't try to instrument. */
            /* istanbul ignore next */
            if (errors.length > 0) {
                throw new Error(JSON.stringify(errors));
            }
        }
    }
}


/***/ }),

/***/ "./src/FirenvimElement.ts":
/*!********************************!*\
  !*** ./src/FirenvimElement.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirenvimElement": () => (/* binding */ FirenvimElement)
/* harmony export */ });
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var editor_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! editor-adapter */ "./node_modules/editor-adapter/index.js");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");



class FirenvimElement {
    // elem is the element that received the focusEvent.
    // Nvimify is the function that listens for focus events. We need to know
    // about it in order to remove it before focusing elem (otherwise we'll
    // just grab focus again).
    constructor(elem, listener, onDetach) {
        // focusInfo is used to keep track of focus listeners and timeouts created
        // by FirenvimElement.focus(). FirenvimElement.focus() creates these
        // listeners and timeouts in order to work around pages that try to grab
        // the focus again after the FirenvimElement has been created or after the
        // underlying element's content has changed.
        this.focusInfo = {
            finalRefocusTimeouts: [],
            refocusRefs: [],
            refocusTimeouts: [],
        };
        // resizeReqId keeps track of the number of resizing requests that are sent
        // to the iframe. We send and increment it for every resize requests, this
        // lets the iframe know what the most recently sent resize request is and
        // thus avoids reacting to an older resize request if a more recent has
        // already been processed.
        this.resizeReqId = 0;
        // relativeX/Y is the position the iframe should have relative to the input
        // element in order to be both as close as possible to the input element
        // and fit in the window without overflowing out of the viewport.
        this.relativeX = 0;
        this.relativeY = 0;
        // firstPutEditorCloseToInputOrigin keeps track of whether this is the
        // first time the putEditorCloseToInputOrigin function is called from the
        // iframe. See putEditorCloseToInputOriginAfterResizeFromFrame() for more
        // information.
        this.firstPutEditorCloseToInputOrigin = true;
        // bufferInfo: a [url, selector, cursor, lang] tuple indicating the page
        // the last iframe was created on, the selector of the corresponding
        // textarea and the column/line number of the cursor.
        // Note that these are __default__ values. Real values must be created with
        // prepareBufferInfo(). The reason we're not doing this from the
        // constructor is that it's expensive and disruptive - getting this
        // information requires evaluating code in the page's context.
        this.bufferInfo = Promise.resolve(["", "", [1, 1], undefined]);
        // cursor: last known cursor position. Updated on getPageElementCursor and
        // setPageElementCursor
        this.cursor = [1, 1];
        this.originalElement = elem;
        this.nvimify = listener;
        this.onDetach = onDetach;
        this.editor = (0,editor_adapter__WEBPACK_IMPORTED_MODULE_2__.getEditor)(elem, {
            preferHTML: (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getConf)().content == "html"
        });
        this.span = elem
            .ownerDocument
            .createElementNS("http://www.w3.org/1999/xhtml", "span");
        // Make non-focusable, as otherwise <Tab> and <S-Tab> in the page would
        // focus the iframe at the end of the page instead of focusing the
        // browser's UI. The only way to <Tab>-focus the frame is to
        // <Tab>-focus the corresponding input element.
        this.span.setAttribute("tabindex", "-1");
        this.iframe = elem
            .ownerDocument
            .createElementNS("http://www.w3.org/1999/xhtml", "iframe");
        // Make sure there isn't any extra width/height
        this.iframe.style.padding = "0px";
        this.iframe.style.margin = "0px";
        this.iframe.style.border = "0px";
        // We still need a border, use a shadow for that
        this.iframe.style.boxShadow = "0px 0px 1px 1px black";
    }
    attachToPage(fip) {
        this.frameIdPromise = fip.then((f) => {
            this.frameId = f;
            // Once a frameId has been acquired, the FirenvimElement would die
            // if its span was removed from the page. Thus there is no use in
            // keeping its spanObserver around. It'd even cause issues as the
            // spanObserver would attempt to re-insert a dead frame in the
            // page.
            this.spanObserver.disconnect();
            return this.frameId;
        });
        // We don't need the iframe to be appended to the page in order to
        // resize it because we're just using the corresponding
        // input/textarea's size
        let rect = this.getElement().getBoundingClientRect();
        this.resizeTo(rect.width, rect.height, false);
        this.relativeX = 0;
        this.relativeY = 0;
        this.putEditorCloseToInputOrigin();
        // Use a ResizeObserver to detect when the underlying input element's
        // size changes and change the size of the FirenvimElement
        // accordingly
        this.resizeObserver = new (window.ResizeObserver)(((self) => async (entries) => {
            const entry = entries.find((ent) => ent.target === self.getElement());
            if (self.frameId === undefined) {
                await this.frameIdPromise;
            }
            if (entry) {
                const newRect = this.getElement().getBoundingClientRect();
                if (rect.width === newRect.width && rect.height === newRect.height) {
                    return;
                }
                rect = newRect;
                self.resizeTo(rect.width, rect.height, false);
                self.putEditorCloseToInputOrigin();
                self.resizeReqId += 1;
                browser.runtime.sendMessage({
                    args: {
                        frameId: self.frameId,
                        message: {
                            args: [self.resizeReqId, rect.width, rect.height],
                            funcName: ["resize"],
                        }
                    },
                    funcName: ["messageFrame"],
                });
            }
        })(this));
        this.resizeObserver.observe(this.getElement(), { box: "border-box" });
        this.iframe.src = browser.extension.getURL("/index.html");
        this.span.attachShadow({ mode: "closed" }).appendChild(this.iframe);
        // So pages (e.g. Jira, Confluence) remove spans from the page as soon
        // as they're inserted. We don't want that, so for the 5 seconds
        // following the insertion, detect if the span is removed from the page
        // by checking visibility changes and re-insert if needed.
        let reinserts = 0;
        this.spanObserver = new MutationObserver((self => (mutations, observer) => {
            const span = self.getSpan();
            for (const mutation of mutations) {
                for (const node of mutation.removedNodes) {
                    if (node === span) {
                        reinserts += 1;
                        if (reinserts >= 10) {
                            console.error("Firenvim is trying to create an iframe on this site but the page is constantly removing it. Consider disabling Firenvim on this website.");
                            observer.disconnect();
                        }
                        else {
                            setTimeout(() => self.getElement().ownerDocument.body.appendChild(span), reinserts * 100);
                        }
                        return;
                    }
                }
            }
        })(this));
        this.spanObserver.observe(this.getElement().ownerDocument.body, { childList: true });
        let parentElement = this.getElement().ownerDocument.body;
        // We can't insert the frame in the body if the element we're going to
        // replace the content of is the body, as replacing the content would
        // destroy the frame.
        if (parentElement === this.getElement()) {
            parentElement = parentElement.parentElement;
        }
        parentElement.appendChild(this.span);
        this.focus();
        // It is pretty hard to tell when an element disappears from the page
        // (either by being removed or by being hidden by other elements), so
        // we use an intersection observer, which is triggered every time the
        // element becomes more or less visible.
        this.intersectionObserver = new IntersectionObserver((self => () => {
            const elem = self.getElement();
            // If elem doesn't have a rect anymore, it's hidden
            if (elem.getClientRects().length === 0) {
                self.hide();
            }
            else {
                self.show();
            }
        })(this), { root: null, threshold: 0.1 });
        this.intersectionObserver.observe(this.getElement());
        // We want to remove the FirenvimElement from the page when the
        // corresponding element is removed. We do this by adding a
        // mutationObserver to its parent.
        this.pageObserver = new MutationObserver((self => (mutations) => {
            const elem = self.getElement();
            mutations.forEach(mutation => mutation.removedNodes.forEach(node => {
                const walker = document.createTreeWalker(node, NodeFilter.SHOW_ALL);
                while (walker.nextNode()) {
                    if (walker.currentNode === elem) {
                        setTimeout(() => self.detachFromPage());
                    }
                }
            }));
        })(this));
        this.pageObserver.observe(document.documentElement, {
            subtree: true,
            childList: true
        });
    }
    clearFocusListeners() {
        // When the user tries to `:w | call firenvim#focus_page()` in Neovim,
        // we have a problem. `:w` results in a call to setPageElementContent,
        // which calls FirenvimElement.focus(), because some pages try to grab
        // focus when the content of the underlying element changes.
        // FirenvimElement.focus() creates event listeners and timeouts to
        // detect when the page tries to grab focus and bring it back to the
        // FirenvimElement. But since `call firenvim#focus_page()` happens
        // right after the `:w`, focus_page() triggers the event
        // listeners/timeouts created by FirenvimElement.focus()!
        // So we need a way to clear the timeouts and event listeners before
        // performing focus_page, and that's what this function does.
        this.focusInfo.finalRefocusTimeouts.forEach(t => clearTimeout(t));
        this.focusInfo.refocusTimeouts.forEach(t => clearTimeout(t));
        this.focusInfo.refocusRefs.forEach(f => {
            this.iframe.removeEventListener("blur", f);
            this.getElement().removeEventListener("focus", f);
        });
        this.focusInfo.finalRefocusTimeouts.length = 0;
        this.focusInfo.refocusTimeouts.length = 0;
        this.focusInfo.refocusRefs.length = 0;
    }
    detachFromPage() {
        this.clearFocusListeners();
        const elem = this.getElement();
        this.resizeObserver.unobserve(elem);
        this.intersectionObserver.unobserve(elem);
        this.pageObserver.disconnect();
        this.spanObserver.disconnect();
        this.span.remove();
        this.onDetach(this.frameId);
    }
    focus() {
        // Some inputs try to grab the focus again after we appended the iframe
        // to the page, so we need to refocus it each time it loses focus. But
        // the user might want to stop focusing the iframe at some point, so we
        // actually stop refocusing the iframe a second after it is created.
        const refocus = ((self) => () => {
            self.focusInfo.refocusTimeouts.push(setTimeout(() => {
                // First, destroy current selection. Some websites use the
                // selection to force-focus an element.
                const sel = document.getSelection();
                sel.removeAllRanges();
                const range = document.createRange();
                // There's a race condition in the testsuite on chrome that
                // results in self.span not being in the document and errors
                // being logged, so we check if self.span really is in its
                // ownerDocument.
                if (self.span.ownerDocument.contains(self.span)) {
                    range.setStart(self.span, 0);
                }
                range.collapse(true);
                sel.addRange(range);
                self.iframe.focus();
            }, 0));
        })(this);
        this.focusInfo.refocusRefs.push(refocus);
        this.iframe.addEventListener("blur", refocus);
        this.getElement().addEventListener("focus", refocus);
        this.focusInfo.finalRefocusTimeouts.push(setTimeout(() => {
            refocus();
            this.iframe.removeEventListener("blur", refocus);
            this.getElement().removeEventListener("focus", refocus);
        }, 100));
        refocus();
    }
    focusOriginalElement(addListener) {
        document.activeElement.blur();
        this.originalElement.removeEventListener("focus", this.nvimify);
        const sel = document.getSelection();
        sel.removeAllRanges();
        const range = document.createRange();
        if (this.originalElement.ownerDocument.contains(this.originalElement)) {
            range.setStart(this.originalElement, 0);
        }
        range.collapse(true);
        this.originalElement.focus();
        sel.addRange(range);
        if (addListener) {
            this.originalElement.addEventListener("focus", this.nvimify);
        }
    }
    getBufferInfo() {
        return this.bufferInfo;
    }
    getEditor() {
        return this.editor;
    }
    getElement() {
        return this.editor.getElement();
    }
    getPageElementContent() {
        return this.getEditor().getContent();
    }
    getPageElementCursor() {
        const p = this.editor.getCursor().catch(() => [1, 1]);
        p.then(c => this.cursor = c);
        return p;
    }
    getOriginalElement() {
        return this.originalElement;
    }
    getSelector() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.computeSelector)(this.getElement());
    }
    getSpan() {
        return this.span;
    }
    hide() {
        this.iframe.style.display = "none";
    }
    isFocused() {
        return document.activeElement === this.span
            || document.activeElement === this.iframe;
    }
    prepareBufferInfo() {
        this.bufferInfo = (async () => [
            document.location.href,
            this.getSelector(),
            await this.getPageElementCursor(),
            await (this.editor.getLanguage().catch(() => undefined))
        ])();
    }
    pressKeys(keys) {
        const focused = this.isFocused();
        keys.forEach(ev => this.originalElement.dispatchEvent(ev));
        if (focused) {
            this.focus();
        }
    }
    putEditorCloseToInputOrigin() {
        const rect = this.editor.getElement().getBoundingClientRect();
        // Save attributes
        const posAttrs = ["left", "position", "top", "zIndex"];
        const oldPosAttrs = posAttrs.map((attr) => this.iframe.style[attr]);
        // Assign new values
        this.iframe.style.left = `${rect.left + window.scrollX + this.relativeX}px`;
        this.iframe.style.position = "absolute";
        this.iframe.style.top = `${rect.top + window.scrollY + this.relativeY}px`;
        // 2139999995 is hopefully higher than everything else on the page but
        // lower than Vimium's elements
        this.iframe.style.zIndex = "2139999995";
        // Compare, to know whether the element moved or not
        const posChanged = !!posAttrs.find((attr, index) => this.iframe.style[attr] !== oldPosAttrs[index]);
        return { posChanged, newRect: rect };
    }
    putEditorCloseToInputOriginAfterResizeFromFrame() {
        // This is a very weird, complicated and bad piece of code. All calls
        // to `resizeEditor()` have to result in a call to `resizeTo()` and
        // then `putEditorCloseToInputOrigin()` in order to make sure the
        // iframe doesn't overflow from the viewport.
        // However, when we create the iframe, we don't want it to fit in the
        // viewport at all cost. Instead, we want it to cover the underlying
        // input as much as possible. The problem is that when it is created,
        // the iframe will ask for a resize (because Neovim asks for one) and
        // will thus also accidentally call putEditorCloseToInputOrigin, which
        // we don't want to call.
        // So we have to track the calls to putEditorCloseToInputOrigin that
        // are made from the iframe (i.e. from `resizeEditor()`) and ignore the
        // first one.
        if (this.firstPutEditorCloseToInputOrigin) {
            this.relativeX = 0;
            this.relativeY = 0;
            this.firstPutEditorCloseToInputOrigin = false;
            return;
        }
        return this.putEditorCloseToInputOrigin();
    }
    // Resize the iframe, making sure it doesn't get larger than the window
    resizeTo(width, height, warnIframe) {
        // If the dimensions that are asked for are too big, make them as big
        // as the window
        let cantFullyResize = false;
        let availableWidth = window.innerWidth;
        if (availableWidth > document.documentElement.clientWidth) {
            availableWidth = document.documentElement.clientWidth;
        }
        if (width >= availableWidth) {
            width = availableWidth - 1;
            cantFullyResize = true;
        }
        let availableHeight = window.innerHeight;
        if (availableHeight > document.documentElement.clientHeight) {
            availableHeight = document.documentElement.clientHeight;
        }
        if (height >= availableHeight) {
            height = availableHeight - 1;
            cantFullyResize = true;
        }
        // The dimensions that were asked for might make the iframe overflow.
        // In this case, we need to compute how much we need to move the iframe
        // to the left/top in order to have it bottom-right corner sit right in
        // the window's bottom-right corner.
        const rect = this.editor.getElement().getBoundingClientRect();
        const rightOverflow = availableWidth - (rect.left + width);
        this.relativeX = rightOverflow < 0 ? rightOverflow : 0;
        const bottomOverflow = availableHeight - (rect.top + height);
        this.relativeY = bottomOverflow < 0 ? bottomOverflow : 0;
        // Now actually set the width/height, move the editor where it is
        // supposed to be and if the new iframe can't be as big as requested,
        // warn the iframe script.
        this.iframe.style.width = `${width}px`;
        this.iframe.style.height = `${height}px`;
        if (cantFullyResize && warnIframe) {
            this.resizeReqId += 1;
            browser.runtime.sendMessage({
                args: {
                    frameId: this.frameId,
                    message: {
                        args: [this.resizeReqId, width, height],
                        funcName: ["resize"],
                    }
                },
                funcName: ["messageFrame"],
            });
        }
    }
    sendKey(key) {
        return browser.runtime.sendMessage({
            args: {
                frameId: this.frameId,
                message: {
                    args: [key],
                    funcName: ["frame_sendKey"],
                }
            },
            funcName: ["messageFrame"],
        });
    }
    setPageElementContent(text) {
        const focused = this.isFocused();
        this.editor.setContent(text);
        [
            new Event("keydown", { bubbles: true }),
            new Event("keyup", { bubbles: true }),
            new Event("keypress", { bubbles: true }),
            new Event("beforeinput", { bubbles: true }),
            new Event("input", { bubbles: true }),
            new Event("change", { bubbles: true })
        ].forEach(ev => this.originalElement.dispatchEvent(ev));
        if (focused) {
            this.focus();
        }
    }
    setPageElementCursor(line, column) {
        let p = Promise.resolve();
        this.cursor[0] = line;
        this.cursor[1] = column;
        if (this.isFocused()) {
            p = this.editor.setCursor(line, column);
        }
        return p;
    }
    show() {
        this.iframe.style.display = "initial";
    }
}


/***/ }),

/***/ "./src/autofill.ts":
/*!*************************!*\
  !*** ./src/autofill.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autofill": () => (/* binding */ autofill)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
async function autofill() {
    const platInfoPromise = browser.runtime.sendMessage({
        args: {
            args: [],
            funcName: ["browser", "runtime", "getPlatformInfo"],
        },
        funcName: ["exec"],
    });
    const manifestPromise = browser.runtime.sendMessage({
        args: {
            args: [],
            funcName: ["browser", "runtime", "getManifest"],
        },
        funcName: ["exec"],
    });
    const nvimPluginPromise = browser.runtime.sendMessage({
        args: {},
        funcName: ["getNvimPluginVersion"],
    });
    const issueTemplatePromise = fetch(browser.runtime.getURL("ISSUE_TEMPLATE.md")).then(p => p.text());
    const browserString = navigator.userAgent.match(/(firefox|chrom)[^ ]+/gi);
    let name;
    let version;
    // Can't be tested, as coverage is only recorded on firefox
    /* istanbul ignore else */
    if (browserString) {
        [name, version] = browserString[0].split("/");
    }
    else {
        name = "unknown";
        version = "unknown";
    }
    const vendor = navigator.vendor || "";
    const textarea = document.getElementById("issue_body");
    const [platInfo, manifest, nvimPluginVersion, issueTemplate,] = await Promise.all([platInfoPromise, manifestPromise, nvimPluginPromise, issueTemplatePromise]);
    // Can't happen, but doesn't cost much to handle!
    /* istanbul ignore next */
    if (!textarea || textarea.value.replace(/\r/g, "") !== issueTemplate.replace(/\r/g, "")) {
        return;
    }
    textarea.value = issueTemplate
        .replace("OS Version:", `OS Version: ${platInfo.os} ${platInfo.arch}`)
        .replace("Browser Version:", `Browser Version: ${vendor} ${name} ${version}`)
        .replace("Browser Addon Version:", `Browser Addon Version: ${manifest.version}`)
        .replace("Neovim Plugin Version:", `Neovim Plugin Version: ${nvimPluginVersion}`);
}


/***/ }),

/***/ "./src/page.ts":
/*!*********************!*\
  !*** ./src/page.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTabFunctions": () => (/* binding */ getTabFunctions),
/* harmony export */   "getActiveContentFunctions": () => (/* binding */ getActiveContentFunctions),
/* harmony export */   "getNeovimFrameFunctions": () => (/* binding */ getNeovimFrameFunctions),
/* harmony export */   "PageEventEmitter": () => (/* binding */ PageEventEmitter),
/* harmony export */   "getPageProxy": () => (/* binding */ getPageProxy)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/keys */ "./src/utils/keys.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");




/////////////////////////////////////////////
// Functions running in the content script //
/////////////////////////////////////////////
function _focusInput(global, firenvim, addListener) {
    if (addListener) {
        // Only re-add event listener if input's selector matches the ones
        // that should be autonvimified
        const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)();
        if (conf.selector && conf.selector !== "") {
            const elems = Array.from(document.querySelectorAll(conf.selector));
            addListener = elems.includes(firenvim.getElement());
        }
    }
    firenvim.focusOriginalElement(addListener);
}
function getFocusedElement(firenvimElems) {
    return Array
        .from(firenvimElems.values())
        .find(instance => instance.isFocused());
}
// Tab functions are functions all content scripts should react to
function getTabFunctions(global) {
    return {
        getActiveInstanceCount: () => global.firenvimElems.size,
        registerNewFrameId: (frameId) => {
            global.frameIdResolve(frameId);
        },
        setDisabled: (disabled) => {
            global.disabled = disabled;
        },
        setLastFocusedContentScript: (frameId) => {
            global.lastFocusedContentScript = frameId;
        }
    };
}
function isVisible(e) {
    const rect = e.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
// ActiveContent functions are functions only the active content script should react to
function getActiveContentFunctions(global) {
    return {
        forceNvimify: () => {
            let elem = document.activeElement;
            const isNull = elem === null || elem === undefined;
            const pageNotEditable = document.documentElement.contentEditable !== "true";
            const bodyNotEditable = (document.body.contentEditable === "false"
                || (document.body.contentEditable === "inherit"
                    && document.documentElement.contentEditable !== "true"));
            if (isNull
                || (elem === document.documentElement && pageNotEditable)
                || (elem === document.body && bodyNotEditable)) {
                elem = Array.from(document.getElementsByTagName("textarea"))
                    .find(isVisible);
                if (!elem) {
                    elem = Array.from(document.getElementsByTagName("input"))
                        .find(e => e.type === "text" && isVisible(e));
                }
                if (!elem) {
                    return;
                }
            }
            global.nvimify({ target: elem });
        },
        sendKey: (key) => {
            const firenvim = getFocusedElement(global.firenvimElems);
            if (firenvim !== undefined) {
                firenvim.sendKey(key);
            }
            else {
                // It's important to throw this error as the background script
                // will execute a fallback
                throw new Error("No firenvim frame selected");
            }
        },
    };
}
function focusElementBeforeOrAfter(global, frameId, i) {
    let firenvimElement;
    if (frameId === undefined) {
        firenvimElement = getFocusedElement(global.firenvimElems);
    }
    else {
        firenvimElement = global.firenvimElems.get(frameId);
    }
    const originalElement = firenvimElement.getOriginalElement();
    const tabindex = (e) => ((x => isNaN(x) ? 0 : x)(parseInt(e.getAttribute("tabindex"))));
    const focusables = Array.from(document.querySelectorAll("input, select, textarea, button, object, [tabindex], [href]"))
        .filter(e => e.getAttribute("tabindex") !== "-1")
        .sort((e1, e2) => tabindex(e1) - tabindex(e2));
    let index = focusables.indexOf(originalElement);
    let elem;
    if (index === -1) {
        // originalElement isn't in the list of focusables, so we have to
        // figure out what the closest element is. We do this by iterating over
        // all elements of the dom, accepting only originalElement and the
        // elements that are focusable. Once we find originalElement, we select
        // either the previous or next element depending on the value of i.
        const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
            acceptNode: n => ((n === originalElement || focusables.indexOf(n) !== -1)
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT)
        });
        const firstNode = treeWalker.currentNode;
        let cur = firstNode;
        let prev;
        while (cur && cur !== originalElement) {
            prev = cur;
            cur = treeWalker.nextNode();
        }
        if (i > 0) {
            elem = treeWalker.nextNode();
        }
        else {
            elem = prev;
        }
        // Sanity check, can't be exercised
        /* istanbul ignore next */
        if (!elem) {
            elem = firstNode;
        }
    }
    else {
        elem = focusables[(index + i + focusables.length) % focusables.length];
    }
    index = focusables.indexOf(elem);
    // Sanity check, can't be exercised
    /* istanbul ignore next */
    if (index === -1) {
        throw "Oh my, something went wrong!";
    }
    // Now that we know we have an element that is in the focusable element
    // list, iterate over the list to find one that is visible.
    let startedAt;
    let style = getComputedStyle(elem);
    while (startedAt !== index && (style.visibility !== "visible" || style.display === "none")) {
        if (startedAt === undefined) {
            startedAt = index;
        }
        index = (index + i + focusables.length) % focusables.length;
        elem = focusables[index];
        style = getComputedStyle(elem);
    }
    document.activeElement.blur();
    const sel = document.getSelection();
    sel.removeAllRanges();
    const range = document.createRange();
    if (elem.ownerDocument.contains(elem)) {
        range.setStart(elem, 0);
    }
    range.collapse(true);
    elem.focus();
    sel.addRange(range);
}
function getNeovimFrameFunctions(global) {
    return {
        evalInPage: (_, js) => (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.executeInPage)(js),
        focusInput: (frameId) => {
            let firenvimElement;
            if (frameId === undefined) {
                firenvimElement = getFocusedElement(global.firenvimElems);
            }
            else {
                firenvimElement = global.firenvimElems.get(frameId);
            }
            _focusInput(global, firenvimElement, true);
        },
        focusPage: (frameId) => {
            const firenvimElement = global.firenvimElems.get(frameId);
            firenvimElement.clearFocusListeners();
            document.activeElement.blur();
            document.documentElement.focus();
        },
        focusNext: (frameId) => {
            focusElementBeforeOrAfter(global, frameId, 1);
        },
        focusPrev: (frameId) => {
            focusElementBeforeOrAfter(global, frameId, -1);
        },
        getEditorInfo: (frameId) => global
            .firenvimElems
            .get(frameId)
            .getBufferInfo(),
        getElementContent: (frameId) => global
            .firenvimElems
            .get(frameId)
            .getPageElementContent(),
        hideEditor: (frameId) => {
            const firenvim = global.firenvimElems.get(frameId);
            firenvim.hide();
            _focusInput(global, firenvim, true);
        },
        killEditor: (frameId) => {
            const firenvim = global.firenvimElems.get(frameId);
            const isFocused = firenvim.isFocused();
            firenvim.detachFromPage();
            const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)();
            if (isFocused) {
                _focusInput(global, firenvim, conf.takeover !== "once");
            }
            global.firenvimElems.delete(frameId);
        },
        pressKeys: (frameId, keys) => {
            global.firenvimElems.get(frameId).pressKeys((0,_utils_keys__WEBPACK_IMPORTED_MODULE_3__.keysToEvents)(keys));
        },
        resizeEditor: (frameId, width, height) => {
            const elem = global.firenvimElems.get(frameId);
            elem.resizeTo(width, height, true);
            elem.putEditorCloseToInputOriginAfterResizeFromFrame();
        },
        setElementContent: (frameId, text) => {
            return global.firenvimElems.get(frameId).setPageElementContent(text);
        },
        setElementCursor: (frameId, line, column) => {
            return global.firenvimElems.get(frameId).setPageElementCursor(line, column);
        },
    };
}
//////////////////////////////////////////////////////////////////////////////
// Definition of a proxy type that lets the frame script transparently call //
// the content script's functions                                           //
//////////////////////////////////////////////////////////////////////////////
;
class PageEventEmitter extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
    constructor() {
        super();
        browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
            switch (request.funcName[0]) {
                case "pause_keyhandler":
                case "frame_sendKey":
                case "resize":
                    this.emit(request.funcName[0], request.args);
                    break;
                case "get_buf_content":
                    return new Promise(resolve => this.emit(request.funcName[0], resolve));
                case "evalInPage":
                case "resizeEditor":
                case "getElementContent":
                case "getEditorInfo":
                    // handled by frame function handler
                    break;
                default:
                    console.error("Unhandled page request:", request);
            }
        });
    }
}
function getPageProxy(frameId) {
    const page = new PageEventEmitter();
    let funcName;
    for (funcName in getNeovimFrameFunctions({})) {
        // We need to declare func here because funcName is a global and would not
        // be captured in the closure otherwise
        const func = funcName;
        page[func] = ((...arr) => {
            return browser.runtime.sendMessage({
                args: {
                    args: [frameId].concat(arr),
                    funcName: [func],
                },
                funcName: ["messagePage"],
            });
        });
    }
    return page;
}
;


/***/ }),

/***/ "./src/utils/configuration.ts":
/*!************************************!*\
  !*** ./src/utils/configuration.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeWithDefaults": () => (/* binding */ mergeWithDefaults),
/* harmony export */   "confReady": () => (/* binding */ confReady),
/* harmony export */   "getGlobalConf": () => (/* binding */ getGlobalConf),
/* harmony export */   "getConf": () => (/* binding */ getConf),
/* harmony export */   "getConfForUrl": () => (/* binding */ getConfForUrl)
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
    makeDefaultLocalSetting(settings, "about:blank\\?compose", {
        cmdline: "firenvim",
        content: "text",
        priority: 1,
        renderer: "canvas",
        selector: 'body',
        takeover: "always",
        filename: "mail_{timestamp%32}.eml",
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

/***/ "./src/utils/keys.ts":
/*!***************************!*\
  !*** ./src/utils/keys.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nonLiteralKeys": () => (/* binding */ nonLiteralKeys),
/* harmony export */   "keysToEvents": () => (/* binding */ keysToEvents),
/* harmony export */   "translateKey": () => (/* binding */ translateKey),
/* harmony export */   "addModifier": () => (/* binding */ addModifier)
/* harmony export */ });
const nonLiteralKeys = {
    " ": "<Space>",
    "<": "<lt>",
    "ArrowDown": "<Down>",
    "ArrowLeft": "<Left>",
    "ArrowRight": "<Right>",
    "ArrowUp": "<Up>",
    "Backspace": "<BS>",
    "Delete": "<Del>",
    "End": "<End>",
    "Enter": "<CR>",
    "Escape": "<Esc>",
    "F1": "<F1>",
    "F10": "<F10>",
    "F11": "<F11>",
    "F12": "<F12>",
    "F13": "<F13>",
    "F14": "<F14>",
    "F15": "<F15>",
    "F16": "<F16>",
    "F17": "<F17>",
    "F18": "<F18>",
    "F19": "<F19>",
    "F2": "<F2>",
    "F20": "<F20>",
    "F21": "<F21>",
    "F22": "<F22>",
    "F23": "<F23>",
    "F24": "<F24>",
    "F3": "<F3>",
    "F4": "<F4>",
    "F5": "<F5>",
    "F6": "<F6>",
    "F7": "<F7>",
    "F8": "<F8>",
    "F9": "<F9>",
    "Home": "<Home>",
    "PageDown": "<PageDown>",
    "PageUp": "<PageUp>",
    "Tab": "<Tab>",
    "\\": "<Bslash>",
    "|": "<Bar>",
};
const nonLiteralVimKeys = Object.fromEntries(Object
    .entries(nonLiteralKeys)
    .map(([x, y]) => [y, x]));
const nonLiteralKeyCodes = {
    "Enter": 13,
    "Space": 32,
    "Tab": 9,
    "Delete": 46,
    "End": 35,
    "Home": 36,
    "Insert": 45,
    "PageDown": 34,
    "PageUp": 33,
    "ArrowDown": 40,
    "ArrowLeft": 37,
    "ArrowRight": 39,
    "ArrowUp": 38,
    "Escape": 27,
};
// Given a "special" key representation (e.g. <Enter> or <M-l>), returns an
// array of three javascript keyevents, the first one representing the
// corresponding keydown, the second one a keypress and the third one a keyup
// event.
function modKeyToEvents(k) {
    let mods = "";
    let key = nonLiteralVimKeys[k];
    let ctrlKey = false;
    let altKey = false;
    let shiftKey = false;
    if (key === undefined) {
        const arr = k.slice(1, -1).split("-");
        mods = arr[0];
        key = arr[1];
        ctrlKey = /c/i.test(mods);
        altKey = /a/i.test(mods);
        const specialChar = "<" + key + ">";
        if (nonLiteralVimKeys[specialChar] !== undefined) {
            key = nonLiteralVimKeys[specialChar];
            shiftKey = false;
        }
        else {
            shiftKey = key !== key.toLocaleLowerCase();
        }
    }
    // Some pages rely on keyCodes to figure out what key was pressed. This is
    // awful because keycodes aren't guaranteed to be the same acrross
    // browsers/OS/keyboard layouts but try to do the right thing anyway.
    // https://github.com/glacambre/firenvim/issues/723
    let keyCode = 0;
    if (/^[a-zA-Z0-9]$/.test(key)) {
        keyCode = key.charCodeAt(0);
    }
    else if (nonLiteralKeyCodes[key] !== undefined) {
        keyCode = nonLiteralKeyCodes[key];
    }
    const init = { key, keyCode, ctrlKey, altKey, shiftKey, bubbles: true };
    return [
        new KeyboardEvent("keydown", init),
        new KeyboardEvent("keypress", init),
        new KeyboardEvent("keyup", init),
    ];
}
// Given a "simple" key (e.g. `a`, `1`…), returns an array of three javascript
// events representing the action of pressing the key.
function keyToEvents(key) {
    const shiftKey = key !== key.toLocaleLowerCase();
    return [
        new KeyboardEvent("keydown", { key, shiftKey, bubbles: true }),
        new KeyboardEvent("keypress", { key, shiftKey, bubbles: true }),
        new KeyboardEvent("keyup", { key, shiftKey, bubbles: true }),
    ];
}
// Given an array of string representation of keys (e.g. ["a", "<Enter>", …]),
// returns an array of javascript keyboard events that simulate these keys
// being pressed.
function keysToEvents(keys) {
    // Code to split mod keys and non-mod keys:
    // const keys = str.match(/([<>][^<>]+[<>])|([^<>]+)/g)
    // if (keys === null) {
    //     return [];
    // }
    return keys.map((key) => {
        if (key[0] === "<") {
            return modKeyToEvents(key);
        }
        return keyToEvents(key);
    }).flat();
}
// Turns a non-literal key (e.g. "Enter") into a vim-equivalent "<Enter>"
function translateKey(key) {
    if (nonLiteralKeys[key] !== undefined) {
        return nonLiteralKeys[key];
    }
    return key;
}
// Add modifier `mod` (`A`, `C`, `S`…) to `text` (a vim key `b`, `<Enter>`,
// `<CS-x>`…)
function addModifier(mod, text) {
    let match;
    let modifiers = "";
    let key = "";
    if ((match = text.match(/^<([A-Z]{1,5})-(.+)>$/))) {
        modifiers = match[1];
        key = match[2];
    }
    else if ((match = text.match(/^<(.+)>$/))) {
        key = match[1];
    }
    else {
        key = text;
    }
    return "<" + mod + modifiers + "-" + key + ">";
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
/* harmony export */   "isChrome": () => (/* binding */ isChrome),
/* harmony export */   "isThunderbird": () => (/* binding */ isThunderbird),
/* harmony export */   "executeInPage": () => (/* binding */ executeInPage),
/* harmony export */   "getIconImageData": () => (/* binding */ getIconImageData),
/* harmony export */   "toFileName": () => (/* binding */ toFileName),
/* harmony export */   "languageToExtensions": () => (/* binding */ languageToExtensions),
/* harmony export */   "parseSingleGuifont": () => (/* binding */ parseSingleGuifont),
/* harmony export */   "parseGuifont": () => (/* binding */ parseGuifont),
/* harmony export */   "computeSelector": () => (/* binding */ computeSelector),
/* harmony export */   "toHexCss": () => (/* binding */ toHexCss)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let curHost;
// Can't get coverage for thunderbird.
/* istanbul ignore next */
if (browser.composeScripts !== undefined || document.location.href === "about:blank?compose") {
    curHost = "thunderbird";
    // Chrome doesn't have a "browser" object, instead it uses "chrome".
}
else if (window.location.protocol === "moz-extension:") {
    curHost = "firefox";
}
else if (window.location.protocol === "chrome-extension:") {
    curHost = "chrome";
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
function isThunderbird() {
    // Can't cover error condition
    /* istanbul ignore next */
    if (curHost === undefined) {
        throw Error("Used isThunderbird in content script!");
    }
    return curHost === "thunderbird";
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
    let parsedURL;
    try {
        parsedURL = new URL(url);
    }
    catch (e) {
        // Only happens with thunderbird, where we can't get coverage
        /* istanbul ignore next */
        parsedURL = { hostname: 'thunderbird', pathname: 'mail' };
    }
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
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firenvimGlobal": () => (/* binding */ firenvimGlobal),
/* harmony export */   "frameFunctions": () => (/* binding */ frameFunctions),
/* harmony export */   "activeFunctions": () => (/* binding */ activeFunctions),
/* harmony export */   "tabFunctions": () => (/* binding */ tabFunctions),
/* harmony export */   "listenersSetup": () => (/* binding */ listenersSetup)
/* harmony export */ });
/* harmony import */ var _FirenvimElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FirenvimElement */ "./src/FirenvimElement.ts");
/* harmony import */ var _autofill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autofill */ "./src/autofill.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page */ "./src/page.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");




if (document.location.href === "https://github.com/glacambre/firenvim/issues/new"
    || document.location.protocol === "file:" && document.location.href.endsWith("github.html")) {
    addEventListener("load", _autofill__WEBPACK_IMPORTED_MODULE_1__.autofill);
}
// Promise used to implement a locking mechanism preventing concurrent creation
// of neovim frames
let frameIdLock = Promise.resolve();
const firenvimGlobal = {
    // Whether Firenvim is disabled in this tab
    disabled: browser.runtime.sendMessage({
        args: ["disabled"],
        funcName: ["getTabValue"],
    })
        // Note: this relies on setDisabled existing in the object returned by
        // getFunctions and attached to the window object
        .then((disabled) => window.setDisabled(disabled)),
    // Promise-resolution function called when a frameId is received from the
    // background script
    frameIdResolve: (_) => undefined,
    // lastFocusedContentScript keeps track of the last content frame that has
    // been focused. This is necessary in pages that contain multiple frames
    // (and thus multiple content scripts): for example, if users press the
    // global keyboard shortcut <C-n>, the background script sends a "global"
    // message to all of the active tab's content scripts. For a content script
    // to know if it should react to a global message, it just needs to check
    // if it is the last active content script.
    lastFocusedContentScript: 0,
    // nvimify: triggered when an element is focused, takes care of creating
    // the editor iframe, appending it to the page and focusing it.
    nvimify: async (evt) => {
        if (firenvimGlobal.disabled instanceof Promise) {
            await firenvimGlobal.disabled;
        }
        // When creating new frames, we need to know their frameId in order to
        // communicate with them. This can't be retrieved through a
        // synchronous, in-page call so the new frame has to tell the
        // background script to send its frame id to the page. Problem is, if
        // multiple frames are created in a very short amount of time, we
        // aren't guaranteed to receive these frameIds in the order in which
        // the frames were created. So we have to implement a locking mechanism
        // to make sure that we don't create new frames until we received the
        // frameId of the previously created frame.
        let lock;
        while (lock !== frameIdLock) {
            lock = frameIdLock;
            await frameIdLock;
        }
        frameIdLock = new Promise(async (unlock) => {
            // auto is true when nvimify() is called as an event listener, false
            // when called from forceNvimify()
            const auto = (evt instanceof FocusEvent);
            const takeover = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)().takeover;
            if (firenvimGlobal.disabled || (auto && takeover === "never")) {
                unlock();
                return;
            }
            const firenvim = new _FirenvimElement__WEBPACK_IMPORTED_MODULE_0__.FirenvimElement(evt.target, firenvimGlobal.nvimify, (id) => firenvimGlobal.firenvimElems.delete(id));
            const editor = firenvim.getEditor();
            // If this element already has a neovim frame, stop
            const alreadyRunning = Array.from(firenvimGlobal.firenvimElems.values())
                .find((instance) => instance.getElement() === editor.getElement());
            if (alreadyRunning !== undefined) {
                // The span might have been removed from the page by the page
                // (this happens on Jira/Confluence for example) so we check
                // for that.
                const span = alreadyRunning.getSpan();
                if (span.ownerDocument.contains(span)) {
                    alreadyRunning.show();
                    alreadyRunning.focus();
                    unlock();
                    return;
                }
                else {
                    // If the span has been removed from the page, the editor
                    // is dead because removing an iframe from the page kills
                    // the websocket connection inside of it.
                    // We just tell the editor to clean itself up and go on as
                    // if it didn't exist.
                    alreadyRunning.detachFromPage();
                }
            }
            if (auto && (takeover === "empty" || takeover === "nonempty")) {
                const content = (await editor.getContent()).trim();
                if ((content !== "" && takeover === "empty")
                    || (content === "" && takeover === "nonempty")) {
                    unlock();
                    return;
                }
            }
            firenvim.prepareBufferInfo();
            const frameIdPromise = new Promise((resolve, reject) => {
                firenvimGlobal.frameIdResolve = resolve;
                // TODO: make this timeout the same as the one in background.ts
                setTimeout(reject, 10000);
            });
            frameIdPromise.then((frameId) => {
                firenvimGlobal.firenvimElems.set(frameId, firenvim);
                firenvimGlobal.frameIdResolve = () => undefined;
                unlock();
            });
            frameIdPromise.catch(unlock);
            firenvim.attachToPage(frameIdPromise);
        });
    },
    // fienvimElems maps frame ids to firenvim elements.
    firenvimElems: new Map(),
};
const ownFrameId = browser.runtime.sendMessage({ args: [], funcName: ["getOwnFrameId"] });
async function announceFocus() {
    const frameId = await ownFrameId;
    firenvimGlobal.lastFocusedContentScript = frameId;
    browser.runtime.sendMessage({
        args: {
            args: [frameId],
            funcName: ["setLastFocusedContentScript"]
        },
        funcName: ["messagePage"]
    });
}
// When the frame is created, we might receive focus, check for that
ownFrameId.then(_ => {
    if (document.hasFocus()) {
        announceFocus();
    }
});
async function addFocusListener() {
    window.removeEventListener("focus", announceFocus);
    window.addEventListener("focus", announceFocus);
}
addFocusListener();
// We need to use setInterval to periodically re-add the focus listeners as in
// frames the document could get deleted and re-created without our knowledge.
const intervalId = setInterval(addFocusListener, 100);
// But we don't want to syphon the user's battery so we stop checking after a second
setTimeout(() => clearInterval(intervalId), 1000);
const frameFunctions = (0,_page__WEBPACK_IMPORTED_MODULE_3__.getNeovimFrameFunctions)(firenvimGlobal);
const activeFunctions = (0,_page__WEBPACK_IMPORTED_MODULE_3__.getActiveContentFunctions)(firenvimGlobal);
const tabFunctions = (0,_page__WEBPACK_IMPORTED_MODULE_3__.getTabFunctions)(firenvimGlobal);
Object.assign(window, frameFunctions, activeFunctions, tabFunctions);
browser.runtime.onMessage.addListener(async (request) => {
    // All content scripts must react to tab functions
    let fn = request.funcName.reduce((acc, cur) => acc[cur], tabFunctions);
    if (fn !== undefined) {
        return fn(...request.args);
    }
    // The only content script that should react to activeFunctions is the active one
    fn = request.funcName.reduce((acc, cur) => acc[cur], activeFunctions);
    if (fn !== undefined) {
        if (firenvimGlobal.lastFocusedContentScript === await ownFrameId) {
            return fn(...request.args);
        }
        return new Promise(() => undefined);
    }
    // The only content script that should react to frameFunctions is the one
    // that owns the frame that sent the request
    fn = request.funcName.reduce((acc, cur) => acc[cur], frameFunctions);
    if (fn !== undefined) {
        if (firenvimGlobal.firenvimElems.get(request.args[0]) !== undefined) {
            return fn(...request.args);
        }
        return new Promise(() => undefined);
    }
    throw new Error(`Error: unhandled content request: ${JSON.stringify(request)}.`);
});
function setupListeners(selector) {
    function onScroll(cont) {
        window.requestAnimationFrame(() => {
            const posChanged = Array.from(firenvimGlobal.firenvimElems.entries())
                .map(([_, elem]) => elem.putEditorCloseToInputOrigin())
                .find(changed => changed.posChanged);
            if (posChanged) {
                // As long as one editor changes position, try to resize
                onScroll(true);
            }
            else if (cont) {
                // No editor has moved, but this might be because the website
                // implements some kind of smooth scrolling that doesn't make
                // the textarea move immediately. In order to deal with these
                // cases, schedule a last redraw in a few milliseconds
                setTimeout(() => onScroll(false), 100);
            }
        });
    }
    function doScroll() {
        return onScroll(true);
    }
    window.addEventListener("scroll", doScroll);
    window.addEventListener("wheel", doScroll);
    (new (window.ResizeObserver)((_) => {
        onScroll(true);
    })).observe(document.documentElement);
    function addNvimListener(elem) {
        elem.removeEventListener("focus", firenvimGlobal.nvimify);
        elem.addEventListener("focus", firenvimGlobal.nvimify);
        let parent = elem.parentElement;
        while (parent) {
            parent.removeEventListener("scroll", doScroll);
            parent.addEventListener("scroll", doScroll);
            parent = parent.parentElement;
        }
    }
    (new MutationObserver((changes, _) => {
        if (changes.filter(change => change.addedNodes.length > 0).length <= 0) {
            return;
        }
        // This mutation observer is triggered every time an element is
        // added/removed from the page. When this happens, try to apply
        // listeners again, in case a new textarea/input field has been added.
        const toPossiblyNvimify = Array.from(document.querySelectorAll(selector));
        toPossiblyNvimify.forEach(elem => addNvimListener(elem));
        const takeover = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)().takeover;
        function shouldNvimify(node) {
            // Ideally, the takeover !== "never" check shouldn't be performed
            // here: it should live in nvimify(). However, nvimify() only
            // checks for takeover === "never" if it is called from an event
            // handler (this is necessary in order to allow manually nvimifying
            // elements). Thus, we need to check if takeover !== "never" here
            // too.
            return takeover !== "never"
                && document.activeElement === node
                && toPossiblyNvimify.includes(node);
        }
        // We also need to check if the currently focused element is among the
        // newly created elements and if it is, nvimify it.
        // Note that we can't do this unconditionally: we would turn the active
        // element into a neovim frame even for unrelated dom changes.
        for (const mr of changes) {
            for (const node of mr.addedNodes) {
                if (shouldNvimify(node)) {
                    activeFunctions.forceNvimify();
                    return;
                }
                const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
                while (walker.nextNode()) {
                    if (shouldNvimify(walker.currentNode)) {
                        activeFunctions.forceNvimify();
                        return;
                    }
                }
            }
        }
    })).observe(window.document, { subtree: true, childList: true });
    let elements;
    try {
        elements = Array.from(document.querySelectorAll(selector));
    }
    catch {
        alert(`Firenvim error: invalid CSS selector (${selector}) in your g:firenvim_config.`);
        elements = [];
    }
    elements.forEach(elem => addNvimListener(elem));
}
const listenersSetup = new Promise(resolve => {
    _utils_configuration__WEBPACK_IMPORTED_MODULE_2__.confReady.then(() => {
        const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)();
        if (conf.selector !== undefined && conf.selector !== "") {
            setupListeners(conf.selector);
        }
        resolve(undefined);
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDTyxNQUFNLFlBQVk7SUFBekI7UUFDWSxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztJQWdDMUMsQ0FBQztJQTlCRyxFQUFFLENBQUMsS0FBUSxFQUFFLE9BQVU7UUFDbkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ3hCLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdkM7UUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBUSxFQUFFLEdBQUcsSUFBUztRQUN2QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDekIsSUFBSTtvQkFDQSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDcEI7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsMEJBQTBCO29CQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0g7OzBFQUU4RDtZQUM5RCwwQkFBMEI7WUFDMUIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDM0M7U0FDSjtJQUNMLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQzhDO0FBQ0M7QUFFTDtBQUVwQyxNQUFNLGVBQWU7SUErRnhCLG9EQUFvRDtJQUNwRCx5RUFBeUU7SUFDekUsdUVBQXVFO0lBQ3ZFLDBCQUEwQjtJQUMxQixZQUFhLElBQWlCLEVBQ2pCLFFBQXlELEVBQ3pELFFBQTZCO1FBOUYxQywwRUFBMEU7UUFDMUUsb0VBQW9FO1FBQ3BFLHdFQUF3RTtRQUN4RSwwRUFBMEU7UUFDMUUsNENBQTRDO1FBQ3BDLGNBQVMsR0FBRztZQUNoQixvQkFBb0IsRUFBRSxFQUFXO1lBQ2pDLFdBQVcsRUFBRSxFQUFXO1lBQ3hCLGVBQWUsRUFBRSxFQUFXO1NBQy9CLENBQUM7UUE2Q0YsMkVBQTJFO1FBQzNFLDBFQUEwRTtRQUMxRSx5RUFBeUU7UUFDekUsdUVBQXVFO1FBQ3ZFLDBCQUEwQjtRQUNsQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUN4QiwyRUFBMkU7UUFDM0Usd0VBQXdFO1FBQ3hFLGlFQUFpRTtRQUN6RCxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUN0QixzRUFBc0U7UUFDdEUseUVBQXlFO1FBQ3pFLHlFQUF5RTtRQUN6RSxlQUFlO1FBQ1AscUNBQWdDLEdBQUcsSUFBSSxDQUFDO1FBS2hELHdFQUF3RTtRQUN4RSxvRUFBb0U7UUFDcEUscURBQXFEO1FBQ3JELDJFQUEyRTtRQUMzRSxnRUFBZ0U7UUFDaEUsbUVBQW1FO1FBQ25FLDhEQUE4RDtRQUN0RCxlQUFVLEdBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQ1MsQ0FBQztRQUMzRSwwRUFBMEU7UUFDMUUsdUJBQXVCO1FBQ2YsV0FBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBcUIsQ0FBQztRQVV4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLHlEQUFTLENBQUMsSUFBSSxFQUFFO1lBQzFCLFVBQVUsRUFBRSw2REFBTyxFQUFFLENBQUMsT0FBTyxJQUFJLE1BQU07U0FDMUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO2FBQ1gsYUFBYTthQUNiLGVBQWUsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RCx1RUFBdUU7UUFDdkUsa0VBQWtFO1FBQ2xFLDREQUE0RDtRQUM1RCwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSTthQUNiLGFBQWE7YUFDYixlQUFlLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFzQixDQUFDO1FBQ3BGLCtDQUErQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHVCQUF1QixDQUFDO0lBQzFELENBQUM7SUFFRCxZQUFZLENBQUUsR0FBb0I7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDakIsa0VBQWtFO1lBQ2xFLGlFQUFpRTtZQUNqRSxpRUFBaUU7WUFDakUsOERBQThEO1lBQzlELFFBQVE7WUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILGtFQUFrRTtRQUNsRSx1REFBdUQ7UUFDdkQsd0JBQXdCO1FBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBRW5DLHFFQUFxRTtRQUNyRSwwREFBMEQ7UUFDMUQsY0FBYztRQUNkLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFFLE1BQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBYyxFQUFFLEVBQUU7WUFDM0YsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUMzRSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUM1QixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDN0I7WUFDRCxJQUFJLEtBQUssRUFBRTtnQkFDUCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUNoRSxPQUFPO2lCQUNWO2dCQUNELElBQUksR0FBRyxPQUFPLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7b0JBQ3hCLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87d0JBQ3JCLE9BQU8sRUFBRTs0QkFDTCxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzs0QkFDakQsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQUN2QjtxQkFDSjtvQkFDRCxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQzdCLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFJLE9BQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwRSxzRUFBc0U7UUFDdEUsZ0VBQWdFO1FBQ2hFLHVFQUF1RTtRQUN2RSwwREFBMEQ7UUFDMUQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxnQkFBZ0IsQ0FDcEMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBNEIsRUFBRSxRQUEwQixFQUFFLEVBQUU7WUFDdEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUM5QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7b0JBQ3RDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTt3QkFDZixTQUFTLElBQUksQ0FBQyxDQUFDO3dCQUNmLElBQUksU0FBUyxJQUFJLEVBQUUsRUFBRTs0QkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQywwSUFBMEksQ0FBQyxDQUFDOzRCQUMxSixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7eUJBQ3pCOzZCQUFNOzRCQUNILFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3lCQUM3Rjt3QkFDRCxPQUFPO3FCQUNWO2lCQUNKO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVyRixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUN6RCxzRUFBc0U7UUFDdEUscUVBQXFFO1FBQ3JFLHFCQUFxQjtRQUNyQixJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUM7U0FDL0M7UUFDRCxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixxRUFBcUU7UUFDckUscUVBQXFFO1FBQ3JFLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMvRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0IsbURBQW1EO1lBQ25ELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO1FBQ0wsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFckQsK0RBQStEO1FBQy9ELDJEQUEyRDtRQUMzRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQTJCLEVBQUUsRUFBRTtZQUM5RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEUsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3RCLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7d0JBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDaEQsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2Ysc0VBQXNFO1FBQ3RFLHNFQUFzRTtRQUN0RSxzRUFBc0U7UUFDdEUsNERBQTREO1FBQzVELGtFQUFrRTtRQUNsRSxvRUFBb0U7UUFDcEUsa0VBQWtFO1FBQ2xFLHdEQUF3RDtRQUN4RCx5REFBeUQ7UUFDekQsb0VBQW9FO1FBQ3BFLDZEQUE2RDtRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLO1FBQ0QsdUVBQXVFO1FBQ3ZFLHNFQUFzRTtRQUN0RSx1RUFBdUU7UUFDdkUsb0VBQW9FO1FBQ3BFLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDaEQsMERBQTBEO2dCQUMxRCx1Q0FBdUM7Z0JBQ3ZDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDcEMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN0QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JDLDJEQUEyRDtnQkFDM0QsNERBQTREO2dCQUM1RCwwREFBMEQ7Z0JBQzFELGlCQUFpQjtnQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM3QyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2dCQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDckQsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsb0JBQW9CLENBQUUsV0FBb0I7UUFDckMsUUFBUSxDQUFDLGFBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNuRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELG9CQUFvQjtRQUNoQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBOEIsQ0FBQztRQUNuRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLDZEQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxRQUFRLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxJQUFJO2VBQ3BDLFFBQVEsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNsRCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDM0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNELENBQUMsRUFBeUQsQ0FBQztJQUNoRSxDQUFDO0lBRUQsU0FBUyxDQUFFLElBQXFCO1FBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRCwyQkFBMkI7UUFDdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTlELGtCQUFrQjtRQUNsQixNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFekUsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUM7UUFDNUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1FBQzFFLHNFQUFzRTtRQUN0RSwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztRQUV4QyxvREFBb0Q7UUFDcEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELCtDQUErQztRQUMzQyxxRUFBcUU7UUFDckUsbUVBQW1FO1FBQ25FLGlFQUFpRTtRQUNqRSw2Q0FBNkM7UUFDN0MscUVBQXFFO1FBQ3JFLG9FQUFvRTtRQUNwRSxxRUFBcUU7UUFDckUscUVBQXFFO1FBQ3JFLHNFQUFzRTtRQUN0RSx5QkFBeUI7UUFDekIsb0VBQW9FO1FBQ3BFLHVFQUF1RTtRQUN2RSxhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsZ0NBQWdDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLEtBQUssQ0FBQztZQUM5QyxPQUFPO1NBQ1Y7UUFDRCxPQUFPLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsUUFBUSxDQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsVUFBbUI7UUFDeEQscUVBQXFFO1FBQ3JFLGdCQUFnQjtRQUNoQixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN2QyxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRTtZQUN2RCxjQUFjLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7U0FDekQ7UUFDRCxJQUFJLEtBQUssSUFBSSxjQUFjLEVBQUU7WUFDekIsS0FBSyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDM0IsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDekMsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUU7WUFDekQsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxNQUFNLElBQUksZUFBZSxFQUFFO1lBQzNCLE1BQU0sR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFFRCxxRUFBcUU7UUFDckUsdUVBQXVFO1FBQ3ZFLHVFQUF1RTtRQUN2RSxvQ0FBb0M7UUFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlELE1BQU0sYUFBYSxHQUFHLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLGNBQWMsR0FBRyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekQsaUVBQWlFO1FBQ2pFLHFFQUFxRTtRQUNyRSwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUM7UUFDekMsSUFBSSxlQUFlLElBQUksVUFBVSxFQUFFO1lBQy9CLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixPQUFPLEVBQUU7d0JBQ0wsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO3dCQUN2QyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7cUJBQ3ZCO2lCQUNKO2dCQUNELFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUM3QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxPQUFPLENBQUUsR0FBVztRQUNoQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQy9CLElBQUksRUFBRTtnQkFDRixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7b0JBQ1gsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUM5QjthQUNKO1lBQ0QsUUFBUSxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQzdCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxQkFBcUIsQ0FBRSxJQUFZO1FBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QjtZQUNJLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDM0MsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzNDLElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDM0MsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzlDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBRSxJQUFZLEVBQUUsTUFBYztRQUM5QyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQzFDLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvaEJNLEtBQUssVUFBVSxRQUFRO0lBQzFCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ2hELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQztTQUN0RDtRQUNELFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUNyQixDQUFDLENBQUM7SUFDSCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUNoRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDO1NBQ2xEO1FBQ0QsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ3JCLENBQUMsQ0FBQztJQUNILE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDbEQsSUFBSSxFQUFFLEVBQUU7UUFDUixRQUFRLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztLQUNyQyxDQUFDLENBQUM7SUFDSCxNQUFNLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEcsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUMxRSxJQUFJLElBQUksQ0FBQztJQUNULElBQUksT0FBTyxDQUFDO0lBQ1osMkRBQTJEO0lBQzNELDBCQUEwQjtJQUMxQixJQUFJLGFBQWEsRUFBRTtRQUNmLENBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkQ7U0FBTTtRQUNILElBQUksR0FBRyxTQUFTLENBQUM7UUFDakIsT0FBTyxHQUFHLFNBQVMsQ0FBQztLQUN2QjtJQUNELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ3RDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFRLENBQUM7SUFDOUQsTUFBTSxDQUNGLFFBQVEsRUFDUixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDaEIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUNuRyxpREFBaUQ7SUFDakQsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ3JGLE9BQU87S0FDVjtJQUNELFFBQVEsQ0FBQyxLQUFLLEdBQUcsYUFBYTtTQUN6QixPQUFPLENBQUMsYUFBYSxFQUFFLGVBQWUsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckUsT0FBTyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO1NBQzVFLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSwwQkFBMEIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQy9FLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSwwQkFBMEIsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBQzFGLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRGdEO0FBRUQ7QUFDUTtBQUNUO0FBYy9DLDZDQUE2QztBQUM3Qyw2Q0FBNkM7QUFDN0MsNkNBQTZDO0FBRTdDLFNBQVMsV0FBVyxDQUFDLE1BQW9CLEVBQUUsUUFBeUIsRUFBRSxXQUFvQjtJQUN0RixJQUFJLFdBQVcsRUFBRTtRQUNiLGtFQUFrRTtRQUNsRSwrQkFBK0I7UUFDL0IsTUFBTSxJQUFJLEdBQUcsNkRBQU8sRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuRSxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUN2RDtLQUNKO0lBQ0QsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFFLGFBQTJDO0lBQ25FLE9BQU8sS0FBSztTQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVELGtFQUFrRTtBQUMzRCxTQUFTLGVBQWUsQ0FBQyxNQUFvQjtJQUNoRCxPQUFPO1FBQ0gsc0JBQXNCLEVBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJO1FBQ3hELGtCQUFrQixFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDcEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsV0FBVyxFQUFFLENBQUMsUUFBaUIsRUFBRSxFQUFFO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQy9CLENBQUM7UUFDRCwyQkFBMkIsRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFFO1lBQzdDLE1BQU0sQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUM7UUFDOUMsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsQ0FBYztJQUM3QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUN2QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsdUZBQXVGO0FBQ2hGLFNBQVMseUJBQXlCLENBQUMsTUFBb0I7SUFDMUQsT0FBTztRQUNILFlBQVksRUFBRSxHQUFHLEVBQUU7WUFDZixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsQ0FBQztZQUNuRCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxNQUFNLENBQUM7WUFDNUUsTUFBTSxlQUFlLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsS0FBSyxPQUFPO21CQUNuRCxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVM7dUJBQ3hDLFFBQVEsQ0FBQyxlQUFlLENBQUMsZUFBZSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxNQUFNO21CQUNILENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDO21CQUN0RCxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDUCxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3BELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNQLE9BQU87aUJBQ1Y7YUFDSjtZQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFTLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDckIsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3pELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDSCw4REFBOEQ7Z0JBQzlELDBCQUEwQjtnQkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyx5QkFBeUIsQ0FBQyxNQUFvQixFQUFFLE9BQWUsRUFBRSxDQUFTO0lBQy9FLElBQUksZUFBZSxDQUFDO0lBQ3BCLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN2QixlQUFlLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQzdEO1NBQU07UUFDSCxlQUFlLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkQ7SUFDRCxNQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUU3RCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDZEQUE2RCxDQUFDLENBQUM7U0FDbEgsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUM7U0FDaEQsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRW5ELElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEQsSUFBSSxJQUFhLENBQUM7SUFDbEIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxpRUFBaUU7UUFDakUsdUVBQXVFO1FBQ3ZFLGtFQUFrRTtRQUNsRSx1RUFBdUU7UUFDdkUsbUVBQW1FO1FBQ25FLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDeEMsUUFBUSxDQUFDLElBQUksRUFDYixVQUFVLENBQUMsWUFBWSxFQUN2QjtZQUNJLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssZUFBZSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUUsQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYTtnQkFDMUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7U0FDbEMsQ0FDSixDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFdBQXNCLENBQUM7UUFDcEQsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDO1FBQ1QsT0FBTyxHQUFHLElBQUksR0FBRyxLQUFLLGVBQWUsRUFBRTtZQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ1gsR0FBRyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQWEsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNQLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFhLENBQUM7U0FDM0M7YUFBTTtZQUNILElBQUksR0FBRyxJQUFJLENBQUM7U0FDZjtRQUNELG1DQUFtQztRQUNuQywwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxTQUFTLENBQUM7U0FDcEI7S0FDSjtTQUFNO1FBQ0gsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxRTtJQUVELEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLG1DQUFtQztJQUNuQywwQkFBMEI7SUFDMUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxNQUFNLDhCQUE4QixDQUFDO0tBQ3hDO0lBRUQsdUVBQXVFO0lBQ3ZFLDJEQUEyRDtJQUMzRCxJQUFJLFNBQVMsQ0FBQztJQUNkLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE9BQU8sU0FBUyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLEVBQUU7UUFDeEYsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDckI7UUFDRCxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzVELElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDO0lBRUEsUUFBUSxDQUFDLGFBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN0QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMzQjtJQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsSUFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFTSxTQUFTLHVCQUF1QixDQUFDLE1BQW9CO0lBQ3hELE9BQU87UUFDSCxVQUFVLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBVSxFQUFFLEVBQUUsQ0FBQywyREFBYSxDQUFDLEVBQUUsQ0FBQztRQUN4RCxVQUFVLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRTtZQUM1QixJQUFJLGVBQWUsQ0FBQztZQUNwQixJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0Q7aUJBQU07Z0JBQ0gsZUFBZSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsV0FBVyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELFNBQVMsRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFFO1lBQzNCLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxhQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckMsQ0FBQztRQUNELFNBQVMsRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFFO1lBQzNCLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELFNBQVMsRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFFO1lBQzNCLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsYUFBYSxFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxNQUFNO2FBQ3JDLGFBQWE7YUFDYixHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ1osYUFBYSxFQUFFO1FBQ3BCLGlCQUFpQixFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxNQUFNO2FBQ3pDLGFBQWE7YUFDYixHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ1oscUJBQXFCLEVBQUU7UUFDNUIsVUFBVSxFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDNUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRTtZQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdkMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxHQUFHLDZEQUFPLEVBQUUsQ0FBQztZQUN2QixJQUFJLFNBQVMsRUFBRTtnQkFDWCxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELFNBQVMsRUFBRSxDQUFDLE9BQWUsRUFBRSxJQUFjLEVBQUUsRUFBRTtZQUMzQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMseURBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFDRCxZQUFZLEVBQUUsQ0FBQyxPQUFlLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxFQUFFO1lBQzdELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsK0NBQStDLEVBQUUsQ0FBQztRQUMzRCxDQUFDO1FBQ0QsaUJBQWlCLEVBQUUsQ0FBQyxPQUFlLEVBQUUsSUFBWSxFQUFFLEVBQUU7WUFDakQsT0FBTyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQ0QsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFlLEVBQUUsSUFBWSxFQUFFLE1BQWMsRUFBRSxFQUFFO1lBQ2hFLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hGLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQUVELDhFQUE4RTtBQUM5RSw4RUFBOEU7QUFDOUUsOEVBQThFO0FBQzlFLDhFQUE4RTtBQUM5RSxDQUFDO0FBVU0sTUFBTSxnQkFBaUIsU0FBUSx1REFBc0M7SUFDeEU7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQVksRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFO1lBQ3JGLFFBQVEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekIsS0FBSyxrQkFBa0IsQ0FBQztnQkFDeEIsS0FBSyxlQUFlLENBQUM7Z0JBQ3JCLEtBQUssUUFBUTtvQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QyxNQUFNO2dCQUNWLEtBQUssaUJBQWlCO29CQUNsQixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLEtBQUssWUFBWSxDQUFDO2dCQUNsQixLQUFLLGNBQWMsQ0FBQztnQkFDcEIsS0FBSyxtQkFBbUIsQ0FBQztnQkFDekIsS0FBSyxlQUFlO29CQUNoQixvQ0FBb0M7b0JBQ3BDLE1BQU07Z0JBQ1Y7b0JBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN6RDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBTU0sU0FBUyxZQUFZLENBQUUsT0FBZTtJQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFFcEMsSUFBSSxRQUF3QixDQUFDO0lBQzdCLEtBQUssUUFBUSxJQUFJLHVCQUF1QixDQUFDLEVBQVMsQ0FBQyxFQUFFO1FBQ2pELDBFQUEwRTtRQUMxRSx1Q0FBdUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3JCLElBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFVLEVBQUUsRUFBRTtZQUNyQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUMvQixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDM0IsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUNuQjtnQkFDRCxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUNELE9BQU8sSUFBZ0IsQ0FBQztBQUM1QixDQUFDO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeFFGLElBQUksSUFBSSxHQUFZLFNBQW9CLENBQUM7QUFFbEMsU0FBUyxpQkFBaUIsQ0FBQyxFQUFVLEVBQUUsUUFBYTtJQUN2RCxTQUFTLFlBQVksQ0FBQyxHQUEyQixFQUFFLElBQVksRUFBRSxLQUFVO1FBQ3ZFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLEtBQUs7ZUFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdELE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLElBQUksNENBQTRDLENBQUMsQ0FBQztZQUNwRixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUNELFNBQVMsdUJBQXVCLENBQUMsSUFBK0MsRUFDL0MsSUFBWSxFQUNaLEdBQWdCO1FBQzdDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxLQUFLLE1BQU0sR0FBRyxJQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUEwQixFQUFFO1lBQzFELFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFDRCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7UUFDeEIsUUFBUSxHQUFHLEVBQUUsQ0FBQztLQUNqQjtJQUVELFlBQVksQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsOEJBQThCO0lBQzlCLHlFQUF5RTtJQUN6RSx3RUFBd0U7SUFDeEUsb0JBQW9CO0lBQ3BCLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxRCxZQUFZLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzFELGlEQUFpRDtJQUNqRCxnREFBZ0Q7SUFDaEQsMEVBQTBFO0lBQzFFLHNFQUFzRTtJQUN0RSxZQUFZO0lBQ1osWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNELHlFQUF5RTtJQUN6RSxrRUFBa0U7SUFDbEUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNELFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzRCwwQ0FBMEM7SUFDMUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELGtEQUFrRDtJQUNsRCxZQUFZLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUU5RCw0QkFBNEI7SUFDNUIseUVBQXlFO0lBQ3pFLHNCQUFzQjtJQUN0QixxRUFBcUU7SUFDckUsdUJBQXVCO0lBQ3ZCLDBCQUEwQjtJQUMxQixJQUFJLEVBQUUsS0FBSyxLQUFLLEVBQUU7UUFDZCxZQUFZLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDNUQ7U0FBTTtRQUNILFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN2RDtJQUVELFlBQVksQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7UUFDcEMsbUNBQW1DO1FBQ25DLHNEQUFzRDtRQUN0RCxPQUFPLEVBQUUsVUFBVTtRQUNuQixPQUFPLEVBQUUsTUFBTTtRQUNmLFFBQVEsRUFBRSxDQUFDO1FBQ1gsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLCtDQUErQztRQUN6RCxpRUFBaUU7UUFDakUsa0VBQWtFO1FBQ2xFLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxzRUFBc0U7S0FDbkYsQ0FBQyxDQUFDO0lBQ0gsdUJBQXVCLENBQUMsUUFBUSxFQUFFLHVCQUF1QixFQUFFO1FBQ3ZELE9BQU8sRUFBRSxVQUFVO1FBQ25CLE9BQU8sRUFBRSxNQUFNO1FBQ2YsUUFBUSxFQUFFLENBQUM7UUFDWCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUseUJBQXlCO0tBQ3RDLENBQUMsQ0FBQztJQUNILE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFTSxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtRQUMxQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtJQUNuRCxNQUFNO1NBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNoQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQXVCLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQztBQUVJLFNBQVMsYUFBYTtJQUN6QixzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQzFCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7S0FDbkU7SUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDL0IsQ0FBQztBQUVNLFNBQVMsT0FBTztJQUNuQixPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFTSxTQUFTLGFBQWEsQ0FBQyxHQUFXO0lBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDekMsU0FBUyxHQUFHLENBQUMsR0FBVztRQUNwQixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDbkIsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNELHNCQUFzQjtJQUN0QiwwQkFBMEI7SUFDMUIsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMseUxBQXlMLENBQUMsQ0FBQztLQUM5TTtJQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pELElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDN0QsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFpQixDQUFDLENBQUM7QUFDL0UsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pMTSxNQUFNLGNBQWMsR0FBNEI7SUFDbkQsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsTUFBTTtJQUNYLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLFlBQVksRUFBRSxTQUFTO0lBQ3ZCLFNBQVMsRUFBRSxNQUFNO0lBQ2pCLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLE1BQU07SUFDZixRQUFRLEVBQUUsT0FBTztJQUNqQixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87SUFDZCxLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87SUFDZCxLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87SUFDZCxLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87SUFDZCxLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixVQUFVLEVBQUUsWUFBWTtJQUN4QixRQUFRLEVBQUUsVUFBVTtJQUNwQixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxVQUFVO0lBQ2hCLEdBQUcsRUFBRSxPQUFPO0NBQ2YsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNO0tBQ0wsT0FBTyxDQUFDLGNBQWMsQ0FBQztLQUN2QixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXZFLE1BQU0sa0JBQWtCLEdBQTRCO0lBQ2hELE9BQU8sRUFBTyxFQUFFO0lBQ2hCLE9BQU8sRUFBTyxFQUFFO0lBQ2hCLEtBQUssRUFBUyxDQUFDO0lBQ2YsUUFBUSxFQUFNLEVBQUU7SUFDaEIsS0FBSyxFQUFTLEVBQUU7SUFDaEIsTUFBTSxFQUFRLEVBQUU7SUFDaEIsUUFBUSxFQUFNLEVBQUU7SUFDaEIsVUFBVSxFQUFJLEVBQUU7SUFDaEIsUUFBUSxFQUFNLEVBQUU7SUFDaEIsV0FBVyxFQUFHLEVBQUU7SUFDaEIsV0FBVyxFQUFHLEVBQUU7SUFDaEIsWUFBWSxFQUFFLEVBQUU7SUFDaEIsU0FBUyxFQUFLLEVBQUU7SUFDaEIsUUFBUSxFQUFNLEVBQUU7Q0FDbkIsQ0FBQztBQUVGLDJFQUEyRTtBQUMzRSxzRUFBc0U7QUFDdEUsNkVBQTZFO0FBQzdFLFNBQVM7QUFDVCxTQUFTLGNBQWMsQ0FBQyxDQUFTO0lBQzdCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtRQUNuQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3BDLElBQUksaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzlDLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO2FBQU07WUFDSCxRQUFRLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzlDO0tBQ0o7SUFDRCwwRUFBMEU7SUFDMUUsa0VBQWtFO0lBQ2xFLHFFQUFxRTtJQUNyRSxtREFBbUQ7SUFDbkQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvQjtTQUFNLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQzlDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQztJQUNELE1BQU0sSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDeEUsT0FBTztRQUNILElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7UUFDbEMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztRQUNuQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO0tBQ25DLENBQUM7QUFDTixDQUFDO0FBRUQsOEVBQThFO0FBQzlFLHNEQUFzRDtBQUN0RCxTQUFTLFdBQVcsQ0FBQyxHQUFXO0lBQzVCLE1BQU0sUUFBUSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNqRCxPQUFPO1FBQ0gsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDL0QsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDL0QsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDbEUsQ0FBQztBQUNOLENBQUM7QUFFRCw4RUFBOEU7QUFDOUUsMEVBQTBFO0FBQzFFLGlCQUFpQjtBQUNWLFNBQVMsWUFBWSxDQUFDLElBQWM7SUFDdkMsMkNBQTJDO0lBQzNDLHVEQUF1RDtJQUN2RCx1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLElBQUk7SUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNwQixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDaEIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7UUFDRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCx5RUFBeUU7QUFDbEUsU0FBUyxZQUFZLENBQUMsR0FBVztJQUNwQyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDbkMsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCwyRUFBMkU7QUFDM0UsYUFBYTtBQUNOLFNBQVMsV0FBVyxDQUFDLEdBQVcsRUFBRSxJQUFZO0lBQ2pELElBQUksS0FBSyxDQUFDO0lBQ1YsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ25CLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUU7UUFDL0MsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7UUFDekMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQjtTQUFNO1FBQ0gsR0FBRyxHQUFHLElBQUksQ0FBQztLQUNkO0lBQ0QsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNuRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlKRCxJQUFJLE9BQWdCLENBQUM7QUFFckIsc0NBQXNDO0FBQ3RDLDBCQUEwQjtBQUMxQixJQUFLLE9BQWUsQ0FBQyxjQUFjLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLHFCQUFxQixFQUFFO0lBQ25HLE9BQU8sR0FBRyxhQUFhLENBQUM7SUFDNUIsb0VBQW9FO0NBQ25FO0tBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxnQkFBZ0IsRUFBRTtJQUN0RCxPQUFPLEdBQUcsU0FBUyxDQUFDO0NBQ3ZCO0tBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxtQkFBbUIsRUFBRTtJQUN6RCxPQUFPLEdBQUcsUUFBUSxDQUFDO0NBQ3RCO0FBRUQsb0NBQW9DO0FBQzdCLFNBQVMsUUFBUTtJQUNwQiw4QkFBOEI7SUFDOUIsMEJBQTBCO0lBQzFCLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN2QixNQUFNLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDO0FBQ2hDLENBQUM7QUFDTSxTQUFTLGFBQWE7SUFDekIsOEJBQThCO0lBQzlCLDBCQUEwQjtJQUMxQixJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDdkIsTUFBTSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUN4RDtJQUNELE9BQU8sT0FBTyxLQUFLLGFBQWEsQ0FBQztBQUNyQyxDQUFDO0FBRUQseUVBQXlFO0FBQ3pFLDhFQUE4RTtBQUM5RSxlQUFlO0FBQ1IsU0FBUyxhQUFhLENBQUMsSUFBWTtJQUN0Qyx5RUFBeUU7SUFDekUseURBQXlEO0lBQ3pELGtFQUFrRTtJQUNsRSxxQkFBcUI7SUFDckIsSUFBSyxNQUFjLENBQUMsZUFBZSxFQUFFO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSTtnQkFDQSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO0lBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0UsTUFBTSxDQUFDLFNBQVMsR0FBRzs7O2lDQUdNLElBQUk7Ozs7Ozs7Ozs7OzthQVl4QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDaEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFPLEVBQUUsRUFBRTtZQUNqRCxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQztZQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCw4RUFBOEU7QUFDOUUsUUFBUTtBQUNSLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztBQUMvQixNQUFNLGVBQWUsR0FBRztJQUNwQixRQUFRLEVBQUUsQ0FBQyxHQUFzQixFQUFFLEVBQUU7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQywwQkFBMEI7WUFDMUIsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbEIsU0FBUzthQUNaO1lBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2QsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQUMsR0FBc0IsRUFBRSxFQUFFO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsOEJBQThCO1lBQzlCLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDcEI7U0FDSjtJQUNMLENBQUM7SUFDRCxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQXVCLEVBQUUsRUFBRSxDQUFFLFNBQW1CLENBQUM7SUFDM0QsWUFBWSxFQUFFLENBQUMsR0FBc0IsRUFBRSxFQUFFO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsaUNBQWlDO1lBQ2pDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3BCO1NBQ0o7SUFDTCxDQUFDO0NBQ0osQ0FBQztBQUlGLDZFQUE2RTtBQUM3RSx1RUFBdUU7QUFDaEUsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFjLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRTtJQUNwRSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBc0IsQ0FBQztJQUNyRSxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7UUFDdEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0osR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELDJFQUEyRTtBQUMzRSxtQ0FBbUM7QUFDNUIsU0FBUyxVQUFVLENBQUMsWUFBb0IsRUFBRSxHQUFXLEVBQUUsRUFBVSxFQUFFLFFBQWdCO0lBQ3RGLElBQUksU0FBaUQsQ0FBQztJQUN0RCxJQUFJO1FBQ0EsU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUiw2REFBNkQ7UUFDN0QsMEJBQTBCO1FBQzFCLFNBQVMsR0FBRyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO0tBQzdEO0lBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFM0UsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtRQUMvQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssVUFBVTtnQkFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxNQUFNO1lBQ25ELEtBQUssVUFBVTtnQkFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFBQyxNQUFNO1lBQzdELEtBQUssVUFBVTtnQkFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUMxRSxLQUFLLFdBQVc7Z0JBQUUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDdEUsS0FBSyxXQUFXO2dCQUFFLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFBQyxNQUFNO1lBQ2hFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUM7SUFDMUIsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxFQUFFO1lBQ3RELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNqRDtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELDZFQUE2RTtBQUN0RSxTQUFTLG9CQUFvQixDQUFDLFFBQWdCO0lBQ2pELElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1FBQzdDLFFBQVEsR0FBRyxFQUFFLENBQUM7S0FDakI7SUFDRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsMEJBQTBCO0lBQzFCLFFBQVEsSUFBSSxFQUFFO1FBQ1YsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFdBQVcsQ0FBQyxDQUFRLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssR0FBRyxDQUFDLENBQWdCLE9BQU8sR0FBRyxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLENBQWUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFFBQVEsQ0FBQyxDQUFXLE9BQU8sUUFBUSxDQUFDO1FBQ3pDLEtBQUssT0FBTyxDQUFDLENBQVksT0FBTyxHQUFHLENBQUM7UUFDcEMsS0FBSyxTQUFTLENBQUMsQ0FBVSxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLE9BQU8sQ0FBQyxDQUFZLE9BQU8sUUFBUSxDQUFDO1FBQ3pDLEtBQUssT0FBTyxDQUFDLENBQVksT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxjQUFjLENBQUMsQ0FBSyxPQUFPLFFBQVEsQ0FBQztRQUN6QyxLQUFLLFlBQVksQ0FBQyxDQUFNLE9BQU8sTUFBTSxDQUFDO1FBQ3RDLEtBQUssU0FBUyxDQUFDLENBQVUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFFBQVEsQ0FBQyxDQUFXLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssR0FBRyxDQUFDLENBQWdCLE9BQU8sR0FBRyxDQUFDO1FBQ3BDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxNQUFNLENBQUMsQ0FBYSxPQUFPLE1BQU0sQ0FBQztRQUN2QyxLQUFLLFlBQVksQ0FBQyxDQUFPLE9BQU8sWUFBWSxDQUFDO1FBQzdDLEtBQUssS0FBSyxDQUFDLENBQWMsT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxPQUFPLENBQUMsQ0FBWSxPQUFPLE9BQU8sQ0FBQztRQUN4QyxzREFBc0Q7UUFDdEQsdUNBQXVDO1FBQ3ZDLEtBQUssUUFBUSxDQUFDLENBQVcsT0FBTyxHQUFHLENBQUM7UUFDcEMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFFBQVEsQ0FBQyxDQUFXLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssSUFBSSxDQUFDLENBQWUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxRQUFRLENBQUMsQ0FBVyxPQUFPLFFBQVEsQ0FBQztRQUN6QyxLQUFLLE9BQU8sQ0FBQyxDQUFZLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssU0FBUyxDQUFDLENBQVUsT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLElBQUksQ0FBQyxDQUFlLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLDZDQUE2QztRQUM3QyxLQUFLLEtBQUssQ0FBQyxDQUFjLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssUUFBUSxDQUFDLENBQVcsT0FBTyxRQUFRLENBQUM7UUFDekMsS0FBSyxNQUFNLENBQUMsQ0FBYSxPQUFPLE1BQU0sQ0FBQztRQUN2QyxLQUFLLFlBQVksQ0FBQyxDQUFPLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssU0FBUyxDQUFDLENBQVUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxNQUFNLENBQUMsQ0FBYSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssY0FBYyxDQUFDLENBQUssT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxXQUFXLENBQUMsQ0FBUSxPQUFPLE1BQU0sQ0FBQztRQUN2QyxLQUFLLFNBQVMsQ0FBQyxDQUFVLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssV0FBVyxDQUFDLENBQVEsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxNQUFNLENBQUMsQ0FBYSxPQUFPLE1BQU0sQ0FBQztRQUN2QyxLQUFLLFlBQVksQ0FBQyxDQUFPLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssUUFBUSxDQUFDLENBQVcsT0FBTyxPQUFPLENBQUM7UUFDeEMsS0FBSyxPQUFPLENBQUMsQ0FBWSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLEtBQUssQ0FBQyxDQUFjLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssUUFBUSxDQUFDLENBQVcsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxPQUFPLENBQUMsQ0FBWSxPQUFPLE9BQU8sQ0FBQztRQUN4QyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssS0FBSyxDQUFDLENBQWMsT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxVQUFVLENBQUMsQ0FBUyxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLFFBQVEsQ0FBQyxDQUFZLE9BQU8sSUFBSSxDQUFDO1FBQ3RDLEtBQUssT0FBTyxDQUFDLENBQVksT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxRQUFRLENBQUMsQ0FBVyxPQUFPLEdBQUcsQ0FBQztRQUNwQyxLQUFLLFFBQVEsQ0FBQyxDQUFXLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFlBQVksQ0FBQyxDQUFPLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssUUFBUSxDQUFDLENBQVcsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxHQUFHLENBQUMsQ0FBZ0IsT0FBTyxHQUFHLENBQUM7UUFDcEMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssT0FBTyxDQUFDLENBQVksT0FBTyxPQUFPLENBQUM7UUFDeEMsS0FBSyxRQUFRLENBQUMsQ0FBVyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssV0FBVyxDQUFDLENBQVEsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxPQUFPLENBQUMsQ0FBWSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLEtBQUssQ0FBQyxDQUFjLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxPQUFPLENBQUM7UUFDeEMsS0FBSyxPQUFPLENBQUMsQ0FBWSxPQUFPLE9BQU8sQ0FBQztRQUN4QyxLQUFLLEtBQUssQ0FBQyxDQUFjLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxNQUFNLENBQUMsQ0FBYSxPQUFPLE1BQU0sQ0FBQztRQUN2QyxLQUFLLFlBQVksQ0FBQyxDQUFPLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLENBQWUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxVQUFVLENBQUMsQ0FBUyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFNBQVMsQ0FBQyxDQUFVLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssS0FBSyxDQUFDLENBQWMsT0FBTyxLQUFLLENBQUM7S0FDekM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQztBQUVqQyx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQ25CLFNBQVMsa0JBQWtCLENBQUMsT0FBZSxFQUFFLFFBQWE7SUFDN0QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNELElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO0tBQ3JEO0lBQ0QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN2QyxRQUFRLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNmLEtBQUssR0FBRztnQkFDSixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFDLE1BQU07WUFDVixLQUFLLEdBQUc7Z0JBQ0osR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDNUIsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUM3QixNQUFNO1lBQ1YsS0FBSyxHQUFHO2dCQUNKLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDckMsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxjQUFjLENBQUM7Z0JBQ3hDLE1BQU07WUFDVixLQUFLLEdBQUcsQ0FBQyxDQUFDLHlEQUF5RDtZQUNuRSxLQUFLLEdBQUcsRUFBRSwwQkFBMEI7Z0JBQ2hDLE1BQU07U0FDYjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQyxFQUFFLE1BQWEsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFBQSxDQUFDO0FBRUYseURBQXlEO0FBQ3pELHVDQUF1QztBQUN2Qyx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQ25CLFNBQVMsWUFBWSxDQUFDLE9BQWUsRUFBRSxRQUFhO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFFRCwrQ0FBK0M7QUFDeEMsU0FBUyxlQUFlLENBQUMsT0FBb0I7SUFDaEQsU0FBUyxjQUFjLENBQUMsQ0FBYztRQUNsQyw4RkFBOEY7UUFDOUYsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDeEMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUN4QyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM1QyxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0o7UUFDRCx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUU7WUFBRSxPQUFPLE1BQU0sQ0FBQztTQUFFO1FBQ3hDLHNDQUFzQztRQUN0QyxNQUFNLEtBQUssR0FDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO2FBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUM1QyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLGdCQUFnQixLQUFLLEdBQUcsQ0FBQztJQUNyRixDQUFDO0lBQ0QsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELG9FQUFvRTtBQUM3RCxTQUFTLFFBQVEsQ0FBQyxDQUFTO0lBQzlCLElBQUksQ0FBQyxLQUFLLFNBQVM7UUFDZixPQUFPLFNBQVMsQ0FBQztJQUNyQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLHlCQUF5QjtJQUN6QixPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN0RSxDQUFDOzs7Ozs7O1VDL1ZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOb0Q7QUFDZDtBQUNxQjtBQUNrQztBQUU3RixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLGtEQUFrRDtPQUMxRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO0lBQzdGLGdCQUFnQixDQUFDLE1BQU0sRUFBRSwrQ0FBUSxDQUFDLENBQUM7Q0FDdEM7QUFFRCwrRUFBK0U7QUFDL0UsbUJBQW1CO0FBQ25CLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUU3QixNQUFNLGNBQWMsR0FBRztJQUMxQiwyQ0FBMkM7SUFDM0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQzFCLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNsQixRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDaEMsQ0FBQztRQUNGLHNFQUFzRTtRQUN0RSxpREFBaUQ7U0FDaEQsSUFBSSxDQUFDLENBQUMsUUFBaUIsRUFBRSxFQUFFLENBQUUsTUFBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSx5RUFBeUU7SUFDekUsb0JBQW9CO0lBQ3BCLGNBQWMsRUFBRSxDQUFDLENBQVMsRUFBUSxFQUFFLENBQUMsU0FBUztJQUM5QywwRUFBMEU7SUFDMUUsd0VBQXdFO0lBQ3hFLHVFQUF1RTtJQUN2RSx5RUFBeUU7SUFDekUsMkVBQTJFO0lBQzNFLHlFQUF5RTtJQUN6RSwyQ0FBMkM7SUFDM0Msd0JBQXdCLEVBQUUsQ0FBQztJQUMzQix3RUFBd0U7SUFDeEUsK0RBQStEO0lBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBNEIsRUFBRSxFQUFFO1FBQzVDLElBQUksY0FBYyxDQUFDLFFBQVEsWUFBWSxPQUFPLEVBQUU7WUFDNUMsTUFBTSxjQUFjLENBQUMsUUFBUSxDQUFDO1NBQ2pDO1FBRUQsc0VBQXNFO1FBQ3RFLDJEQUEyRDtRQUMzRCw2REFBNkQ7UUFDN0QscUVBQXFFO1FBQ3JFLGlFQUFpRTtRQUNqRSxvRUFBb0U7UUFDcEUsdUVBQXVFO1FBQ3ZFLHFFQUFxRTtRQUNyRSwyQ0FBMkM7UUFDM0MsSUFBSSxJQUFJLENBQUM7UUFDVCxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDekIsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUNuQixNQUFNLFdBQVcsQ0FBQztTQUNyQjtRQUVELFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBVyxFQUFFLEVBQUU7WUFDNUMsb0VBQW9FO1lBQ3BFLGtDQUFrQztZQUNsQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsWUFBWSxVQUFVLENBQUMsQ0FBQztZQUV6QyxNQUFNLFFBQVEsR0FBRyw2REFBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3BDLElBQUksY0FBYyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLEtBQUssT0FBTyxDQUFDLEVBQUU7Z0JBQzNELE1BQU0sRUFBRSxDQUFDO2dCQUNULE9BQU87YUFDVjtZQUVELE1BQU0sUUFBUSxHQUFHLElBQUksNkRBQWUsQ0FDaEMsR0FBRyxDQUFDLE1BQXFCLEVBQ3pCLGNBQWMsQ0FBQyxPQUFPLEVBQ3RCLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FDMUQsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVwQyxtREFBbUQ7WUFDbkQsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNuRSxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLDZEQUE2RDtnQkFDN0QsNERBQTREO2dCQUM1RCxZQUFZO2dCQUNaLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbkMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN0QixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxDQUFDO29CQUNULE9BQU87aUJBQ1Y7cUJBQU07b0JBQ0gseURBQXlEO29CQUN6RCx5REFBeUQ7b0JBQ3pELHlDQUF5QztvQkFDekMsMERBQTBEO29CQUMxRCxzQkFBc0I7b0JBQ3RCLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDbkM7YUFDSjtZQUVELElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxRQUFRLEtBQUssVUFBVSxDQUFDLEVBQUU7Z0JBQzNELE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksUUFBUSxLQUFLLE9BQU8sQ0FBQzt1QkFDckMsQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLFFBQVEsS0FBSyxVQUFVLENBQUMsRUFBRTtvQkFDNUMsTUFBTSxFQUFFLENBQUM7b0JBQ1QsT0FBTztpQkFDVjthQUNSO1lBRUQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDN0IsTUFBTSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUE0QixFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUN4RSxjQUFjLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztnQkFDeEMsK0RBQStEO2dCQUMvRCxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQWUsRUFBRSxFQUFFO2dCQUNwQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELGNBQWMsQ0FBQyxjQUFjLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNoRCxNQUFNLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1lBQ0gsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixRQUFRLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9EQUFvRDtJQUNwRCxhQUFhLEVBQUUsSUFBSSxHQUFHLEVBQTJCO0NBQ3BELENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFGLEtBQUssVUFBVSxhQUFhO0lBQ3hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sVUFBVSxDQUFDO0lBQ2pDLGNBQWMsQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUM7SUFDbEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDeEIsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLENBQUUsT0FBTyxDQUFFO1lBQ2pCLFFBQVEsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzVDO1FBQ0QsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO0tBQzVCLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxvRUFBb0U7QUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNoQixJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNyQixhQUFhLEVBQUUsQ0FBQztLQUNuQjtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0gsS0FBSyxVQUFVLGdCQUFnQjtJQUMzQixNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUNELGdCQUFnQixFQUFFLENBQUM7QUFDbkIsOEVBQThFO0FBQzlFLDhFQUE4RTtBQUM5RSxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdEQsb0ZBQW9GO0FBQ3BGLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFM0MsTUFBTSxjQUFjLEdBQUcsOERBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDL0QsTUFBTSxlQUFlLEdBQUcsZ0VBQXlCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbEUsTUFBTSxZQUFZLEdBQUcsc0RBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3JFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBNEMsRUFBRSxFQUFFO0lBQ3pGLGtEQUFrRDtJQUNsRCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwRixJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7UUFDbEIsT0FBTyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7SUFFRCxpRkFBaUY7SUFDakYsRUFBRSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ25GLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtRQUNsQixJQUFJLGNBQWMsQ0FBQyx3QkFBd0IsS0FBSyxNQUFNLFVBQVUsRUFBRTtZQUM5RCxPQUFPLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdkM7SUFFRCx5RUFBeUU7SUFDekUsNENBQTRDO0lBQzVDLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRixJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7UUFDbEIsSUFBSSxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ2pFLE9BQU8sRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN2QztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JGLENBQUMsQ0FBQyxDQUFDO0FBR0gsU0FBUyxjQUFjLENBQUMsUUFBZ0I7SUFDcEMsU0FBUyxRQUFRLENBQUMsSUFBYTtRQUMzQixNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFO1lBQzlCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2lCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osd0RBQXdEO2dCQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEI7aUJBQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2IsNkRBQTZEO2dCQUM3RCw2REFBNkQ7Z0JBQzdELDZEQUE2RDtnQkFDN0Qsc0RBQXNEO2dCQUN0RCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUyxRQUFRO1FBQ2IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDLElBQUksQ0FBRSxNQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtRQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXRDLFNBQVMsZUFBZSxDQUFDLElBQWE7UUFDbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNoQyxPQUFPLE1BQU0sRUFBRTtZQUNYLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1QyxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCxDQUFDLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNwRSxPQUFPO1NBQ1Y7UUFDRCwrREFBK0Q7UUFDL0QsK0RBQStEO1FBQy9ELHNFQUFzRTtRQUN0RSxNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFekQsTUFBTSxRQUFRLEdBQUcsNkRBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxTQUFTLGFBQWEsQ0FBQyxJQUFTO1lBQzVCLGlFQUFpRTtZQUNqRSw2REFBNkQ7WUFDN0QsZ0VBQWdFO1lBQ2hFLG1FQUFtRTtZQUNuRSxpRUFBaUU7WUFDakUsT0FBTztZQUNQLE9BQU8sUUFBUSxLQUFLLE9BQU87bUJBQ3BCLFFBQVEsQ0FBQyxhQUFhLEtBQUssSUFBSTttQkFDL0IsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRCxzRUFBc0U7UUFDdEUsbURBQW1EO1FBQ25ELHVFQUF1RTtRQUN2RSw4REFBOEQ7UUFDOUQsS0FBSyxNQUFNLEVBQUUsSUFBSSxPQUFPLEVBQUU7WUFDdEIsS0FBSyxNQUFNLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFO2dCQUM5QixJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDckIsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUMvQixPQUFPO2lCQUNWO2dCQUNELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN4RSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDdEIsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO3dCQUNuQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQy9CLE9BQU87cUJBQ1Y7aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFFakUsSUFBSSxRQUF1QixDQUFDO0lBQzVCLElBQUk7UUFDQSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUM5RDtJQUFDLE1BQU07UUFDSixLQUFLLENBQUMseUNBQXlDLFFBQVEsOEJBQThCLENBQUMsQ0FBQztRQUN2RixRQUFRLEdBQUcsRUFBRSxDQUFDO0tBQ2pCO0lBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFTSxNQUFNLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNoRCxnRUFBYyxDQUFDLEdBQUcsRUFBRTtRQUNoQixNQUFNLElBQUksR0FBeUIsNkRBQU8sRUFBRSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFDckQsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvZWRpdG9yLWFkYXB0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2Rpc3QvYnJvd3Nlci1wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvRmlyZW52aW1FbGVtZW50LnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL2F1dG9maWxsLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3BhZ2UudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy91dGlscy9rZXlzLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9GaXJlbnZpbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvY29udGVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgR2VuZXJpY0Fic3RyYWN0RWRpdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihfZSwgX29wdGlvbnMpIHsgfVxuICAgIDtcbiAgICBzdGF0aWMgbWF0Y2hlcyhfKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hdGNoZXMgZnVuY3Rpb24gbm90IG92ZXJyaWRlblwiKTtcbiAgICB9XG4gICAgO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjbGFzcyBBY2VFZGl0b3IgZXh0ZW5kcyBHZW5lcmljQWJzdHJhY3RFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGUsIF9vcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKGUsIF9vcHRpb25zKTtcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIHN0cmluZ2lmaWVkIGFuZCBpbnNlcnRlZCBpbiBwYWdlIGNvbnRleHQgc28gd2VcbiAgICAgICAgLy8gY2FuJ3QgaW5zdHJ1bWVudCBpdC5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdGhpcy5nZXRBY2UgPSAoc2VsZWMpID0+IHtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoYWNlLmdldFZhbHVlKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEN1cnNvciA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBhY2UgPSBlbGVtLmFjZUVkaXRvciB8fCB1bndyYXAod2luZG93KS5hY2UuZWRpdChlbGVtKTtcbiAgICAgICAgICAgIGlmIChhY2UuZ2V0Q3Vyc29yUG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gYWNlLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGFjZS5zZWxlY3Rpb24uY3Vyc29yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFt3cmFwKHBvc2l0aW9uLnJvdykgKyAxLCB3cmFwKHBvc2l0aW9uLmNvbHVtbildO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldExhbmd1YWdlID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoYWNlLnNlc3Npb24uJG1vZGVJZCkuc3BsaXQoXCIvXCIpLnNsaWNlKC0xKVswXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXAsIHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoYWNlLnNldFZhbHVlKHRleHQsIDEpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCwgbGluZSwgY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBhY2UgPSBlbGVtLmFjZUVkaXRvciB8fCB1bndyYXAod2luZG93KS5hY2UuZWRpdChlbGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGFjZS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHNlbGVjdGlvbi5tb3ZlQ3Vyc29yVG8obGluZSAtIDEsIGNvbHVtbiwgZmFsc2UpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICAgICAgLy8gR2V0IHRoZSB0b3Btb3N0IGFjZSBlbGVtZW50XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKEFjZUVkaXRvci5tYXRjaGVzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBtYXRjaGVzKGUpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvYWNlX2VkaXRvci9naSkudGVzdChwYXJlbnQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY2xhc3MgQ29kZU1pcnJvckVkaXRvciBleHRlbmRzIEdlbmVyaWNBYnN0cmFjdEVkaXRvciB7XG4gICAgY29uc3RydWN0b3IoZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHVud3JhcChlbGVtKS5Db2RlTWlycm9yLmdldFZhbHVlKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEN1cnNvciA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHVud3JhcChlbGVtKS5Db2RlTWlycm9yLmdldEN1cnNvcigpO1xuICAgICAgICAgICAgcmV0dXJuIFt3cmFwKHBvc2l0aW9uLmxpbmUpICsgMSwgd3JhcChwb3NpdGlvbi5jaCldO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldExhbmd1YWdlID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHVud3JhcChlbGVtKS5Db2RlTWlycm9yLmdldE1vZGUoKS5uYW1lKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXAsIHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHVud3JhcChlbGVtKS5Db2RlTWlycm9yLnNldFZhbHVlKHRleHQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCwgbGluZSwgY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh1bndyYXAoZWxlbSkuQ29kZU1pcnJvci5zZXRDdXJzb3IoeyBsaW5lOiBsaW5lIC0gMSwgY2g6IGNvbHVtbiB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZWxlbSA9IGU7XG4gICAgICAgIC8vIEdldCB0aGUgdG9wbW9zdCBDb2RlTWlycm9yIGVsZW1lbnRcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB3aGlsZSAoQ29kZU1pcnJvckVkaXRvci5tYXRjaGVzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBtYXRjaGVzKGUpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvXiguKiApP0NvZGVNaXJyb3IvZ2kpLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNsYXNzIE1vbmFjb0VkaXRvciBleHRlbmRzIEdlbmVyaWNBYnN0cmFjdEVkaXRvciB7XG4gICAgY29uc3RydWN0b3IoZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IHVyaSA9IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS11cmlcIik7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHVud3JhcCh3aW5kb3cpLm1vbmFjby5lZGl0b3IuZ2V0TW9kZWwodXJpKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKG1vZGVsLmdldFZhbHVlKCkpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gZ2V0IE1vbmFjbydzIGN1cnNvciBwb3NpdGlvbjpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9tb25hY28tZWRpdG9yL2lzc3Vlcy8yNThcbiAgICAgICAgdGhpcy5nZXRDdXJzb3IgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFsxLCAwXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRMYW5ndWFnZSA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCB1cmkgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpO1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB1bndyYXAod2luZG93KS5tb25hY28uZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChtb2RlbC5nZXRNb2RlSWQoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q29udGVudCA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwLCB0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCB1cmkgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpO1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB1bndyYXAod2luZG93KS5tb25hY28uZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChtb2RlbC5zZXRWYWx1ZSh0ZXh0KSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEl0J3MgaW1wb3NzaWJsZSB0byBzZXQgTW9uYWNvJ3MgY3Vyc29yIHBvc2l0aW9uOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L21vbmFjby1lZGl0b3IvaXNzdWVzLzI1OFxuICAgICAgICB0aGlzLnNldEN1cnNvciA9IGFzeW5jIChfc2VsZWN0b3IsIF93cmFwLCBfdW53cmFwLCBfbGluZSwgX2NvbHVtbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICAgICAgLy8gRmluZCB0aGUgbW9uYWNvIGVsZW1lbnQgdGhhdCBob2xkcyB0aGUgZGF0YVxuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5lbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlICghKHRoaXMuZWxlbS5jbGFzc05hbWUubWF0Y2goL21vbmFjby1lZGl0b3IvZ2kpXG4gICAgICAgICAgICAmJiB0aGlzLmVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS11cmlcIikubWF0Y2goXCJmaWxlOi8vfGlubWVtb3J5Oi8vfGdpdGxhYjpcIikpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBwYXJlbnQ7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgbWF0Y2hlcyhlKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICgoL21vbmFjby1lZGl0b3IvZ2kpLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vLyBUZXh0YXJlYUVkaXRvciBzb3J0IG9mIHdvcmtzIGZvciBjb250ZW50RWRpdGFibGUgZWxlbWVudHMgYnV0IHRoZXJlIHNob3VsZFxuLy8gcmVhbGx5IGJlIGEgY29udGVudGVkaXRhYmxlLXNwZWNpZmljIGVkaXRvci5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmVsZW0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmVmZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmVsZW0uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5lbGVtLmlubmVyVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudCgpLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5lbGVtLnNlbGVjdGlvblN0YXJ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmVsZW0uc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgICAgIC8vIFNpZnQgdGhyb3VnaCB0aGUgdGV4dCwgY291bnRpbmcgY29sdW1ucyBhbmQgbmV3IGxpbmVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY3Vyc29yID0gMDsgY3Vyc29yIDwgc2VsZWN0aW9uU3RhcnQ7ICsrY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiArPSB0ZXh0LmNoYXJDb2RlQXQoY3Vyc29yKSA8IDB4N0YgPyAxIDogMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbY3Vyc29yXSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW2xpbmUsIGNvbHVtbl07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRMYW5ndWFnZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJlZmVySFRNTCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2h0bWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50ID0gYXN5bmMgKHRleHQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS52YWx1ZSA9IHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByZWZlckhUTUwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yID0gYXN5bmMgKGxpbmUsIGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudCgpLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXJhY3RlciA9IDA7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGxpbmUgdGhlIGN1cnNvciBzaG91bGQgYmUgcHV0IG9uXG4gICAgICAgICAgICAgICAgd2hpbGUgKGxpbmUgPiAxICYmIGNoYXJhY3RlciA8IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2NoYXJhY3Rlcl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGNoYXJhY3RlciBhZnRlciB3aGljaCB0aGUgY3Vyc29yIHNob3VsZCBiZSBtb3ZlZFxuICAgICAgICAgICAgICAgIC8vIE5vdGU6IHdlIGRvbid0IGRvIGNvbHVtbiA9IGNvbHVtbm4gKyBjaGFyYWN0ZXIgYmVjYXVzZSBjb2x1bW5cbiAgICAgICAgICAgICAgICAvLyBtaWdodCBiZSBsYXJnZXIgdGhhbiBhY3R1YWwgbGluZSBsZW5ndGggYW5kIGl0J3MgYmV0dGVyIHRvIGJlIG9uXG4gICAgICAgICAgICAgICAgLy8gdGhlIHJpZ2h0IGxpbmUgYnV0IG9uIHRoZSB3cm9uZyBjb2x1bW4gdGhhbiBvbiB0aGUgd3JvbmcgbGluZVxuICAgICAgICAgICAgICAgIC8vIGFuZCB3cm9uZyBjb2x1bW4uXG4gICAgICAgICAgICAgICAgLy8gTW9yZW92ZXIsIGNvbHVtbiBpcyBhIG51bWJlciBvZiBVVEYtOCBieXRlcyBmcm9tIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgICAgICAvLyBvZiB0aGUgbGluZSB0byB0aGUgY3Vyc29yLiBIb3dldmVyLCBqYXZhc2NyaXB0IHVzZXMgVVRGLTE2LFxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIGlzIDIgYnl0ZXMgcGVyIG5vbi1hc2NpaSBjaGFyYWN0ZXIuIFNvIHdoZW4gd2UgZmluZCBhXG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyIHRoYXQgaXMgbW9yZSB0aGFuIDEgYnl0ZSBsb25nLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGF0XG4gICAgICAgICAgICAgICAgLy8gYW1vdW50IGZyb20gY29sdW1uLCBidXQgb25seSB0d28gY2hhcmFjdGVycyBmcm9tIENIQVJBQ1RFUiFcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uID4gMCAmJiBjaGFyYWN0ZXIgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDYW4ndCBoYXBwZW4sIGJ1dCBiZXR0ZXIgYmUgc2FmZSB0aGFuIHNvcnJ5XG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2NoYXJhY3Rlcl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUgPD0gMHg3Zikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA8PSAweDdmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA+PSAweGQ4MDAgJiYgY29kZSA8PSAweGRmZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA8IDB4ZmZmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbS5zZXRTZWxlY3Rpb25SYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5zZXRTZWxlY3Rpb25SYW5nZShjaGFyYWN0ZXIsIGNoYXJhY3Rlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICB9XG4gICAgc3RhdGljIG1hdGNoZXMoXykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4vLyBDb21wdXRlcyBhIHVuaXF1ZSBzZWxlY3RvciBmb3IgaXRzIGFyZ3VtZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVTZWxlY3RvcihlbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gdW5pcXVlU2VsZWN0b3IoZSkge1xuICAgICAgICAvLyBPbmx5IG1hdGNoaW5nIGFscGhhbnVtZXJpYyBzZWxlY3RvcnMgYmVjYXVzZSBvdGhlcnMgY2hhcnMgbWlnaHQgaGF2ZSBzcGVjaWFsIG1lYW5pbmcgaW4gQ1NTXG4gICAgICAgIGlmIChlLmlkICYmIGUuaWQubWF0Y2goXCJeW2EtekEtWjAtOV8tXSskXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGUudGFnTmFtZSArIGBbaWQ9XCIke2UuaWR9XCJdYDtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGlkKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgICAgICBpZiAoIWUucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiSFRNTFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXkuZnJvbShlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgICAgICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnRhZ05hbWUgPT09IGUudGFnTmFtZSlcbiAgICAgICAgICAgIC5pbmRleE9mKGUpICsgMTtcbiAgICAgICAgcmV0dXJuIGAke3VuaXF1ZVNlbGVjdG9yKGUucGFyZW50RWxlbWVudCl9ID4gJHtlLnRhZ05hbWV9Om50aC1vZi10eXBlKCR7aW5kZXh9KWA7XG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVTZWxlY3RvcihlbGVtZW50KTtcbn1cbi8vIFJ1bnMgQ09ERSBpbiB0aGUgcGFnZSdzIGNvbnRleHQgYnkgc2V0dGluZyB1cCBhIGN1c3RvbSBldmVudCBsaXN0ZW5lcixcbi8vIGVtYmVkZGluZyBhIHNjcmlwdCBlbGVtZW50IHRoYXQgcnVucyB0aGUgcGllY2Ugb2YgY29kZSBhbmQgZW1pdHMgaXRzIHJlc3VsdFxuLy8gYXMgYW4gZXZlbnQuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVJblBhZ2UoY29kZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IGV2ZW50SWQgPSBgJHtNYXRoLnJhbmRvbSgpfWA7XG4gICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBgKGFzeW5jIChldklkKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCB1bndyYXAgPSB4ID0+IHg7XG4gICAgICAgICAgICAgICAgbGV0IHdyYXAgPSB4ID0+IHg7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAke2NvZGV9O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldklkLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgc3VjY2VzczogZmFsc2UsIHJlYXNvbjogZSB9LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoJHtKU09OLnN0cmluZ2lmeShldmVudElkKX0pYDtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRJZCwgKHsgZGV0YWlsIH0pID0+IHtcbiAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICBpZiAoZGV0YWlsLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkZXRhaWwucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZGV0YWlsLnJlYXNvbik7XG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcCh4KSB7XG4gICAgaWYgKHdpbmRvdy53cmFwcGVkSlNPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHgud3JhcHBlZEpTT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4geDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwKHgpIHtcbiAgICBpZiAod2luZG93LlhQQ05hdGl2ZVdyYXBwZXIpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5YUENOYXRpdmVXcmFwcGVyKHgpO1xuICAgIH1cbiAgICByZXR1cm4geDtcbn1cbjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRFZGl0b3IoZWxlbSwgb3B0aW9ucykge1xuICAgIGxldCBlZGl0b3I7XG4gICAgZm9yIChsZXQgY2xhenogb2YgW0FjZUVkaXRvciwgQ29kZU1pcnJvckVkaXRvciwgTW9uYWNvRWRpdG9yXSkge1xuICAgICAgICBpZiAoY2xhenoubWF0Y2hlcyhlbGVtKSkge1xuICAgICAgICAgICAgZWRpdG9yID0gY2xheno7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWRpdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0YXJlYUVkaXRvcihlbGVtLCBvcHRpb25zKTtcbiAgICB9XG4gICAgbGV0IGVkID0gbmV3IGVkaXRvcihlbGVtLCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh3aW5kb3cud3JhcHBlZEpTT2JqZWN0KSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBQcm94eShlZCwge1xuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF0oY29tcHV0ZVNlbGVjdG9yKHRhcmdldC5nZXRFbGVtZW50KCkpLCB3cmFwLCB1bndyYXAsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBQcm94eShlZCwge1xuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09IFwiZ2V0RWxlbWVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7dGFyZ2V0W3Byb3BdfSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGFyZ2V0LmdldEVsZW1lbnQoKSkpfSwgeCA9PiB4LCB4ID0+IHgsIC4uLiR7SlNPTi5zdHJpbmdpZnkoYXJncyl9KWApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIsIFtcIm1vZHVsZVwiXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZCk7XG4gICAgZ2xvYmFsLmJyb3dzZXIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC44LjAgLSBUdWUgQXByIDIwIDIwMjEgMTE6Mjc6MzggKi9cblxuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG5cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cblxuICAvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gICAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKHR5cGVvZiBicm93c2VyID09PSBcInVuZGVmaW5lZFwiIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihicm93c2VyKSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiO1xuICAgIGNvbnN0IFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORyA9IFwiUmV0dXJuaW5nIGEgUHJvbWlzZSBpcyB0aGUgcHJlZmVycmVkIHdheSB0byBzZW5kIGEgcmVwbHkgZnJvbSBhbiBvbk1lc3NhZ2Uvb25NZXNzYWdlRXh0ZXJuYWwgbGlzdGVuZXIsIGFzIHRoZSBzZW5kUmVzcG9uc2Ugd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIHNwZWNzIChTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvcnVudGltZS9vbk1lc3NhZ2UpXCI7IC8vIFdyYXBwaW5nIHRoZSBidWxrIG9mIHRoaXMgcG9seWZpbGwgaW4gYSBvbmUtdGltZS11c2UgZnVuY3Rpb24gaXMgYSBtaW5vclxuICAgIC8vIG9wdGltaXphdGlvbiBmb3IgRmlyZWZveC4gU2luY2UgU3BpZGVybW9ua2V5IGRvZXMgbm90IGZ1bGx5IHBhcnNlIHRoZVxuICAgIC8vIGNvbnRlbnRzIG9mIGEgZnVuY3Rpb24gdW50aWwgdGhlIGZpcnN0IHRpbWUgaXQncyBjYWxsZWQsIGFuZCBzaW5jZSBpdCB3aWxsXG4gICAgLy8gbmV2ZXIgYWN0dWFsbHkgbmVlZCB0byBiZSBjYWxsZWQsIHRoaXMgYWxsb3dzIHRoZSBwb2x5ZmlsbCB0byBiZSBpbmNsdWRlZFxuICAgIC8vIGluIEZpcmVmb3ggbmVhcmx5IGZvciBmcmVlLlxuXG4gICAgY29uc3Qgd3JhcEFQSXMgPSBleHRlbnNpb25BUElzID0+IHtcbiAgICAgIC8vIE5PVEU6IGFwaU1ldGFkYXRhIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGFwaS1tZXRhZGF0YS5qc29uIGZpbGVcbiAgICAgIC8vIGF0IGJ1aWxkIHRpbWUgYnkgcmVwbGFjaW5nIHRoZSBmb2xsb3dpbmcgXCJpbmNsdWRlXCIgd2l0aCB0aGUgY29udGVudCBvZiB0aGVcbiAgICAgIC8vIEpTT04gZmlsZS5cbiAgICAgIGNvbnN0IGFwaU1ldGFkYXRhID0ge1xuICAgICAgICBcImFsYXJtc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsZWFyQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm9va21hcmtzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldENoaWxkcmVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U3ViVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzZXJBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZGlzYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5Qb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2luZ0RhdGFcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ2FjaGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDb29raWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRG93bmxvYWRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRm9ybURhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVIaXN0b3J5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlTG9jYWxTdG9yYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGFzc3dvcmRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGx1Z2luRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tbWFuZHNcIjoge1xuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dE1lbnVzXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvb2tpZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsQ29va2llU3RvcmVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV2dG9vbHNcIjoge1xuICAgICAgICAgIFwiaW5zcGVjdGVkV2luZG93XCI6IHtcbiAgICAgICAgICAgIFwiZXZhbFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMixcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYW5lbHNcIjoge1xuICAgICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZWxlbWVudHNcIjoge1xuICAgICAgICAgICAgICBcImNyZWF0ZVNpZGViYXJQYW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgXCJjYW5jZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkb3dubG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVyYXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RmlsZUljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGF1c2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGaWxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImV4dGVuc2lvblwiOiB7XG4gICAgICAgICAgXCJpc0FsbG93ZWRGaWxlU2NoZW1lQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaXNBbGxvd2VkSW5jb2duaXRvQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlzdG9yeVwiOiB7XG4gICAgICAgICAgXCJhZGRVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVSYW5nZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFZpc2l0c1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBY2NlcHRMYW5ndWFnZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGVudGl0eVwiOiB7XG4gICAgICAgICAgXCJsYXVuY2hXZWJBdXRoRmxvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkbGVcIjoge1xuICAgICAgICAgIFwicXVlcnlTdGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hbmFnZW1lbnRcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEVuYWJsZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1bmluc3RhbGxTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibm90aWZpY2F0aW9uc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBlcm1pc3Npb25MZXZlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJjb250YWluc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJydW50aW1lXCI6IHtcbiAgICAgICAgICBcImdldEJhY2tncm91bmRQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGxhdGZvcm1JbmZvXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3Blbk9wdGlvbnNQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFVwZGF0ZUNoZWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTmF0aXZlTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFVuaW5zdGFsbFVSTFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlc3Npb25zXCI6IHtcbiAgICAgICAgICBcImdldERldmljZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRseUNsb3NlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3RvcmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzdG9yYWdlXCI6IHtcbiAgICAgICAgICBcImxvY2FsXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibWFuYWdlZFwiOiB7XG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzeW5jXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidGFic1wiOiB7XG4gICAgICAgICAgXCJjYXB0dXJlVmlzaWJsZVRhYlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGlzY2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImR1cGxpY2F0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV4ZWN1dGVTY3JpcHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvQmFja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvRm9yd2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZ2hsaWdodFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImluc2VydENTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRvcFNpdGVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYk5hdmlnYXRpb25cIjoge1xuICAgICAgICAgIFwiZ2V0QWxsRnJhbWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RnJhbWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJSZXF1ZXN0XCI6IHtcbiAgICAgICAgICBcImhhbmRsZXJCZWhhdmlvckNoYW5nZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3aW5kb3dzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRMYXN0Rm9jdXNlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoYXBpTWV0YWRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcGktbWV0YWRhdGEuanNvbiBoYXMgbm90IGJlZW4gaW5jbHVkZWQgaW4gYnJvd3Nlci1wb2x5ZmlsbFwiKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogQSBXZWFrTWFwIHN1YmNsYXNzIHdoaWNoIGNyZWF0ZXMgYW5kIHN0b3JlcyBhIHZhbHVlIGZvciBhbnkga2V5IHdoaWNoIGRvZXNcbiAgICAgICAqIG5vdCBleGlzdCB3aGVuIGFjY2Vzc2VkLCBidXQgYmVoYXZlcyBleGFjdGx5IGFzIGFuIG9yZGluYXJ5IFdlYWtNYXBcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjcmVhdGVJdGVtXG4gICAgICAgKiAgICAgICAgQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBpbiBvcmRlciB0byBjcmVhdGUgdGhlIHZhbHVlIGZvciBhbnlcbiAgICAgICAqICAgICAgICBrZXkgd2hpY2ggZG9lcyBub3QgZXhpc3QsIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGFjY2Vzc2VkLiBUaGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiByZWNlaXZlcywgYXMgaXRzIG9ubHkgYXJndW1lbnQsIHRoZSBrZXkgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNsYXNzIERlZmF1bHRXZWFrTWFwIGV4dGVuZHMgV2Vha01hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNyZWF0ZUl0ZW0sIGl0ZW1zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3VwZXIoaXRlbXMpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlSXRlbSA9IGNyZWF0ZUl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHRoaXMuY3JlYXRlSXRlbShrZXkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBvYmplY3Qgd2l0aCBhIGB0aGVuYCBtZXRob2QsIGFuZCBjYW5cbiAgICAgICAqIHRoZXJlZm9yZSBiZSBhc3N1bWVkIHRvIGJlaGF2ZSBhcyBhIFByb21pc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB0aGVuYWJsZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IGlzVGhlbmFibGUgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBjYWxsZWQsIHdpbGwgcmVzb2x2ZSBvciByZWplY3RcbiAgICAgICAqIHRoZSBnaXZlbiBwcm9taXNlIGJhc2VkIG9uIGhvdyBpdCBpcyBjYWxsZWQ6XG4gICAgICAgKlxuICAgICAgICogLSBJZiwgd2hlbiBjYWxsZWQsIGBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JgIGNvbnRhaW5zIGEgbm9uLW51bGwgb2JqZWN0LFxuICAgICAgICogICB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIElmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBleGFjdGx5IG9uZSBhcmd1bWVudCwgdGhlIHByb21pc2UgaXNcbiAgICAgICAqICAgcmVzb2x2ZWQgdG8gdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gT3RoZXJ3aXNlLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB0byBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGVcbiAgICAgICAqICAgZnVuY3Rpb24ncyBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHByb21pc2VcbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzb2x1dGlvbiBhbmQgcmVqZWN0aW9uIGZ1bmN0aW9ucyBvZiBhXG4gICAgICAgKiAgICAgICAgcHJvbWlzZS5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVzb2x2ZVxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVzb2x1dGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVqZWN0XG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZWplY3Rpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgd3JhcHBlZCBtZXRob2Qgd2hpY2ggaGFzIGNyZWF0ZWQgdGhlIGNhbGxiYWNrLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBtYWtlQ2FsbGJhY2sgPSAocHJvbWlzZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5jYWxsYmFja0FyZ3MpID0+IHtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgfHwgY2FsbGJhY2tBcmdzLmxlbmd0aCA8PSAxICYmIG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJnc1swXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBsdXJhbGl6ZUFyZ3VtZW50cyA9IG51bUFyZ3MgPT4gbnVtQXJncyA9PSAxID8gXCJhcmd1bWVudFwiIDogXCJhcmd1bWVudHNcIjtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gZm9yIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYW5kIG1ldGFkYXRhLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICAgKiAgICAgICAgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB3aGljaCBpcyBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5taW5BcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtdXN0IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggZmV3ZXIgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heEFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG1heSBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIG1vcmUgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24ob2JqZWN0LCAuLi4qKX1cbiAgICAgICAqICAgICAgIFRoZSBnZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbi5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBBc3luY0Z1bmN0aW9uID0gKG5hbWUsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhc3luY0Z1bmN0aW9uV3JhcHBlcih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgQVBJIG1ldGhvZCBoYXMgY3VycmVudGx5IG5vIGNhbGxiYWNrIG9uIENocm9tZSwgYnV0IGl0IHJldHVybiBhIHByb21pc2Ugb24gRmlyZWZveCxcbiAgICAgICAgICAgICAgLy8gYW5kIHNvIHRoZSBwb2x5ZmlsbCB3aWxsIHRyeSB0byBjYWxsIGl0IHdpdGggYSBjYWxsYmFjayBmaXJzdCwgYW5kIGl0IHdpbGwgZmFsbGJhY2tcbiAgICAgICAgICAgICAgLy8gdG8gbm90IHBhc3NpbmcgdGhlIGNhbGxiYWNrIGlmIHRoZSBmaXJzdCBjYWxsIGZhaWxzLlxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGNiRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gQVBJIG1ldGhvZCBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyLCBgICsgXCJmYWxsaW5nIGJhY2sgdG8gY2FsbCBpdCB3aXRob3V0IGEgY2FsbGJhY2s6IFwiLCBjYkVycm9yKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7IC8vIFVwZGF0ZSB0aGUgQVBJIG1ldGhvZCBtZXRhZGF0YSwgc28gdGhhdCB0aGUgbmV4dCBBUEkgY2FsbHMgd2lsbCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB1bnN1cHBvcnRlZCBjYWxsYmFjayBhbnltb3JlLlxuXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5ub0NhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEubm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBleGlzdGluZyBtZXRob2Qgb2YgdGhlIHRhcmdldCBvYmplY3QsIHNvIHRoYXQgY2FsbHMgdG8gaXQgYXJlXG4gICAgICAgKiBpbnRlcmNlcHRlZCBieSB0aGUgZ2l2ZW4gd3JhcHBlciBmdW5jdGlvbi4gVGhlIHdyYXBwZXIgZnVuY3Rpb24gcmVjZWl2ZXMsXG4gICAgICAgKiBhcyBpdHMgZmlyc3QgYXJndW1lbnQsIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YCBvYmplY3QsIGZvbGxvd2VkIGJ5IGVhY2ggb2ZcbiAgICAgICAqIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBvcmlnaW5hbCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHdyYXBwZWQgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAgICAgICAqICAgICAgICBUaGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBQcm94eVxuICAgICAgICogICAgICAgIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHRvIHdyYXAgdGhlIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHdyYXBwZXJcbiAgICAgICAqICAgICAgICBUaGUgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgYSBkaXJlY3QgaW52b2NhdGlvblxuICAgICAgICogICAgICAgIG9mIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8ZnVuY3Rpb24+fVxuICAgICAgICogICAgICAgIEEgUHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbWV0aG9kLCB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIGl0cyBwbGFjZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBNZXRob2QgPSAodGFyZ2V0LCBtZXRob2QsIHdyYXBwZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShtZXRob2QsIHtcbiAgICAgICAgICBhcHBseSh0YXJnZXRNZXRob2QsIHRoaXNPYmosIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyLmNhbGwodGhpc09iaiwgdGFyZ2V0LCAuLi5hcmdzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIG9iamVjdCBpbiBhIFByb3h5IHdoaWNoIGludGVyY2VwdHMgYW5kIHdyYXBzIGNlcnRhaW4gbWV0aG9kc1xuICAgICAgICogYmFzZWQgb24gdGhlIGdpdmVuIGB3cmFwcGVyc2AgYW5kIGBtZXRhZGF0YWAgb2JqZWN0cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gd3JhcC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3dyYXBwZXJzID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyB3cmFwcGVyIGZ1bmN0aW9ucyBmb3Igc3BlY2lhbCBjYXNlcy4gQW55XG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcHJlc2VudCBpbiB0aGlzIG9iamVjdCB0cmVlIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiB0aGVcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlLiBUaGVzZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgbWV0aG9kcyBhcmUgaW52b2tlZCBhcyBkZXNjcmliZWQgaW4ge0BzZWUgd3JhcE1ldGhvZH0uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YSA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgbWV0YWRhdGEgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlXG4gICAgICAgKiAgICAgICAgUHJvbWlzZS1iYXNlZCB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYXN5bmNocm9ub3VzLiBBbnkgZnVuY3Rpb24gaW5cbiAgICAgICAqICAgICAgICB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUgd2hpY2ggaGFzIGEgY29ycmVzcG9uZGluZyBtZXRhZGF0YSBvYmplY3RcbiAgICAgICAqICAgICAgICBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYG1ldGFkYXRhYCB0cmVlIGlzIHJlcGxhY2VkIHdpdGggYW5cbiAgICAgICAqICAgICAgICBhdXRvbWF0aWNhbGx5LWdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAqICAgICAgICB7QHNlZSB3cmFwQXN5bmNGdW5jdGlvbn1cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8b2JqZWN0Pn1cbiAgICAgICAqL1xuXG4gICAgICBjb25zdCB3cmFwT2JqZWN0ID0gKHRhcmdldCwgd3JhcHBlcnMgPSB7fSwgbWV0YWRhdGEgPSB7fSkgPT4ge1xuICAgICAgICBsZXQgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgaGFzKHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQgfHwgcHJvcCBpbiBjYWNoZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZ2V0KHByb3h5VGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShwcm9wIGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuIENoZWNrIGlmIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgICAgLy8gYW55IHdyYXBwaW5nLlxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHdyYXBwZXJzW3Byb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgc3BlY2lhbC1jYXNlIHdyYXBwZXIgZm9yIHRoaXMgbWV0aG9kLlxuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcnNbcHJvcF0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gYXN5bmMgbWV0aG9kIHRoYXQgd2UgaGF2ZSBtZXRhZGF0YSBmb3IuIENyZWF0ZSBhXG4gICAgICAgICAgICAgICAgLy8gUHJvbWlzZSB3cmFwcGVyIGZvciBpdC5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHdyYXBBc3luY0Z1bmN0aW9uKHByb3AsIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2QgdGhhdCB3ZSBkb24ndCBrbm93IG9yIGNhcmUgYWJvdXQuIFJldHVybiB0aGVcbiAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBtZXRob2QsIGJvdW5kIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmJpbmQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgKGhhc093blByb3BlcnR5KHdyYXBwZXJzLCBwcm9wKSB8fCBoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gb2JqZWN0IHRoYXQgd2UgbmVlZCB0byBkbyBzb21lIHdyYXBwaW5nIGZvciB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgICAgLy8gb2YuIENyZWF0ZSBhIHN1Yi1vYmplY3Qgd3JhcHBlciBmb3IgaXQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hpbGRcbiAgICAgICAgICAgICAgLy8gbWV0YWRhdGEuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIFwiKlwiKSkge1xuICAgICAgICAgICAgICAvLyBXcmFwIGFsbCBwcm9wZXJ0aWVzIGluICogbmFtZXNwYWNlLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtcIipcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnkgd3JhcHBpbmcgZm9yIHRoaXMgcHJvcGVydHksXG4gICAgICAgICAgICAgIC8vIHNvIGp1c3QgZm9yd2FyZCBhbGwgYWNjZXNzIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzZXQocHJveHlUYXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVmaW5lUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3AsIGRlc2MpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCBkZXNjKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVsZXRlUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGNhY2hlLCBwcm9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfTsgLy8gUGVyIGNvbnRyYWN0IG9mIHRoZSBQcm94eSBBUEksIHRoZSBcImdldFwiIHByb3h5IGhhbmRsZXIgbXVzdCByZXR1cm4gdGhlXG4gICAgICAgIC8vIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSB0YXJnZXQgaWYgdGhhdCB2YWx1ZSBpcyBkZWNsYXJlZCByZWFkLW9ubHkgYW5kXG4gICAgICAgIC8vIG5vbi1jb25maWd1cmFibGUuIEZvciB0aGlzIHJlYXNvbiwgd2UgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAgICAvLyBwcm90b3R5cGUgc2V0IHRvIGB0YXJnZXRgIGluc3RlYWQgb2YgdXNpbmcgYHRhcmdldGAgZGlyZWN0bHkuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW5ub3QgcmV0dXJuIGEgY3VzdG9tIG9iamVjdCBmb3IgQVBJcyB0aGF0XG4gICAgICAgIC8vIGFyZSBkZWNsYXJlZCByZWFkLW9ubHkgYW5kIG5vbi1jb25maWd1cmFibGUsIHN1Y2ggYXMgYGNocm9tZS5kZXZ0b29sc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBwcm94eSBoYW5kbGVycyB0aGVtc2VsdmVzIHdpbGwgc3RpbGwgdXNlIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIHRoZSBgcHJveHlUYXJnZXRgLCBzbyB0aGF0IHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuICAgICAgICAvLyBkZXJlZmVyZW5jZWQgdmlhIHRoZSBvcmlnaW5hbCB0YXJnZXRzLlxuXG4gICAgICAgIGxldCBwcm94eVRhcmdldCA9IE9iamVjdC5jcmVhdGUodGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShwcm94eVRhcmdldCwgaGFuZGxlcnMpO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHNldCBvZiB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgb2JqZWN0LCB3aGljaCBoYW5kbGVzXG4gICAgICAgKiB3cmFwcGluZyBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdGhhdCB0aG9zZSBtZXNzYWdlcyBhcmUgcGFzc2VkLlxuICAgICAgICpcbiAgICAgICAqIEEgc2luZ2xlIHdyYXBwZXIgaXMgY3JlYXRlZCBmb3IgZWFjaCBsaXN0ZW5lciBmdW5jdGlvbiwgYW5kIHN0b3JlZCBpbiBhXG4gICAgICAgKiBtYXAuIFN1YnNlcXVlbnQgY2FsbHMgdG8gYGFkZExpc3RlbmVyYCwgYGhhc0xpc3RlbmVyYCwgb3IgYHJlbW92ZUxpc3RlbmVyYFxuICAgICAgICogcmV0cmlldmUgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIHNvIHRoYXQgIGF0dGVtcHRzIHRvIHJlbW92ZSBhXG4gICAgICAgKiBwcmV2aW91c2x5LWFkZGVkIGxpc3RlbmVyIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtEZWZhdWx0V2Vha01hcDxmdW5jdGlvbiwgZnVuY3Rpb24+fSB3cmFwcGVyTWFwXG4gICAgICAgKiAgICAgICAgQSBEZWZhdWx0V2Vha01hcCBvYmplY3Qgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBmb3IgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB3aGVuIG9uZSBkb2VzIG5vdCBleGlzdCwgYW5kIHJldHJpZXZlXG4gICAgICAgKiAgICAgICAgYW4gZXhpc3Rpbmcgb25lIHdoZW4gaXQgZG9lcy5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcEV2ZW50ID0gd3JhcHBlck1hcCA9PiAoe1xuICAgICAgICBhZGRMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyLCAuLi5hcmdzKSB7XG4gICAgICAgICAgdGFyZ2V0LmFkZExpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSwgLi4uYXJncyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFzTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuaGFzTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGFuIG9uUmVxdWVzdEZpbmlzaGVkIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgd2lsbCByZXR1cm4gYVxuICAgICAgICAgKiBgZ2V0Q29udGVudCgpYCBwcm9wZXJ0eSB3aGljaCByZXR1cm5zIGEgYFByb21pc2VgIHJhdGhlciB0aGFuIHVzaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2sgQVBJLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAgICAgICAqICAgICAgICBUaGUgSEFSIGVudHJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldHdvcmsgcmVxdWVzdC5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25SZXF1ZXN0RmluaXNoZWQocmVxKSB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZFJlcSA9IHdyYXBPYmplY3QocmVxLCB7fVxuICAgICAgICAgIC8qIHdyYXBwZXJzICovXG4gICAgICAgICAgLCB7XG4gICAgICAgICAgICBnZXRDb250ZW50OiB7XG4gICAgICAgICAgICAgIG1pbkFyZ3M6IDAsXG4gICAgICAgICAgICAgIG1heEFyZ3M6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0ZW5lcih3cmFwcGVkUmVxKTtcbiAgICAgICAgfTtcbiAgICAgIH0pOyAvLyBLZWVwIHRyYWNrIGlmIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIGhhcyBiZWVuIGxvZ2dlZCBhdCBsZWFzdCBvbmNlLlxuXG4gICAgICBsZXQgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYSBtZXNzYWdlIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IHNlbmQgcmVzcG9uc2VzIGJhc2VkIG9uXG4gICAgICAgICAqIGl0cyByZXR1cm4gdmFsdWUsIHJhdGhlciB0aGFuIGJ5IHJldHVybmluZyBhIHNlbnRpbmVsIHZhbHVlIGFuZCBjYWxsaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2suIElmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSwgdGhlIHJlc3BvbnNlIGlzXG4gICAgICAgICAqIHNlbnQgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHsqfSBtZXNzYWdlXG4gICAgICAgICAqICAgICAgICBUaGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBvdGhlciBlbmQgb2YgdGhlIGNoYW5uZWwuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZW5kZXJcbiAgICAgICAgICogICAgICAgIERldGFpbHMgYWJvdXQgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gc2VuZFJlc3BvbnNlXG4gICAgICAgICAqICAgICAgICBBIGNhbGxiYWNrIHdoaWNoLCB3aGVuIGNhbGxlZCB3aXRoIGFuIGFyYml0cmFyeSBhcmd1bWVudCwgc2VuZHNcbiAgICAgICAgICogICAgICAgIHRoYXQgdmFsdWUgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqICAgICAgICBUcnVlIGlmIHRoZSB3cmFwcGVkIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgd2hpY2ggd2lsbCBsYXRlclxuICAgICAgICAgKiAgICAgICAgeWllbGQgYSByZXNwb25zZS4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICAgIGxldCB3cmFwcGVkU2VuZFJlc3BvbnNlO1xuICAgICAgICAgIGxldCBzZW5kUmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVkU2VuZFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICghbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORywgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbGlzdGVuZXIobWVzc2FnZSwgc2VuZGVyLCB3cmFwcGVkU2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNSZXN1bHRUaGVuYWJsZSA9IHJlc3VsdCAhPT0gdHJ1ZSAmJiBpc1RoZW5hYmxlKHJlc3VsdCk7IC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cblxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUgJiYgIWlzUmVzdWx0VGhlbmFibGUgJiYgIWRpZENhbGxTZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IC8vIEEgc21hbGwgaGVscGVyIHRvIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgICAvLyBhbmQgYW4gZXJyb3IgaWYgdGhlIHByb21pc2UgcmVqZWN0cyAoYSB3cmFwcGVkIHNlbmRNZXNzYWdlIGhhc1xuICAgICAgICAgIC8vIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgcmVzb2x2ZWQgcHJvbWlzZSBvciBhIHJlamVjdGVkXG4gICAgICAgICAgLy8gcHJvbWlzZSkuXG5cblxuICAgICAgICAgIGNvbnN0IHNlbmRQcm9taXNlZFJlc3VsdCA9IHByb21pc2UgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKG1zZyA9PiB7XG4gICAgICAgICAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgdmFsdWUuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZShtc2cpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAvLyBTZW5kIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaWYgdGhlIHJlamVjdGVkIHZhbHVlXG4gICAgICAgICAgICAgIC8vIGlzIGFuIGluc3RhbmNlIG9mIGVycm9yLCBvciB0aGUgb2JqZWN0IGl0c2VsZiBvdGhlcndpc2UuXG4gICAgICAgICAgICAgIGxldCBtZXNzYWdlO1xuXG4gICAgICAgICAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciB8fCB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9OyAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCBzZW5kIHRoZSByZXNvbHZlZCB2YWx1ZSBhcyBhXG4gICAgICAgICAgLy8gcmVzdWx0LCBvdGhlcndpc2Ugd2FpdCB0aGUgcHJvbWlzZSByZWxhdGVkIHRvIHRoZSB3cmFwcGVkU2VuZFJlc3BvbnNlXG4gICAgICAgICAgLy8gY2FsbGJhY2sgdG8gcmVzb2x2ZSBhbmQgc2VuZCBpdCBhcyBhIHJlc3BvbnNlLlxuXG5cbiAgICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICB9IC8vIExldCBDaHJvbWUga25vdyB0aGF0IHRoZSBsaXN0ZW5lciBpcyByZXBseWluZy5cblxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2sgPSAoe1xuICAgICAgICByZWplY3QsXG4gICAgICAgIHJlc29sdmVcbiAgICAgIH0sIHJlcGx5KSA9PiB7XG4gICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgLy8gRGV0ZWN0IHdoZW4gbm9uZSBvZiB0aGUgbGlzdGVuZXJzIHJlcGxpZWQgdG8gdGhlIHNlbmRNZXNzYWdlIGNhbGwgYW5kIHJlc29sdmVcbiAgICAgICAgICAvLyB0aGUgcHJvbWlzZSB0byB1bmRlZmluZWQgYXMgaW4gRmlyZWZveC5cbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2lzc3Vlcy8xMzBcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlID09PSBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVwbHkgJiYgcmVwbHkuX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fKSB7XG4gICAgICAgICAgLy8gQ29udmVydCBiYWNrIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpbnRvXG4gICAgICAgICAgLy8gYW4gRXJyb3IgaW5zdGFuY2UuXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihyZXBseS5tZXNzYWdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXBseSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZSA9IChuYW1lLCBtZXRhZGF0YSwgYXBpTmFtZXNwYWNlT2JqLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZENiID0gd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2suYmluZChudWxsLCB7XG4gICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXJncy5wdXNoKHdyYXBwZWRDYik7XG4gICAgICAgICAgYXBpTmFtZXNwYWNlT2JqLnNlbmRNZXNzYWdlKC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHN0YXRpY1dyYXBwZXJzID0ge1xuICAgICAgICBkZXZ0b29sczoge1xuICAgICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICAgIG9uUmVxdWVzdEZpbmlzaGVkOiB3cmFwRXZlbnQob25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycylcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICBvbk1lc3NhZ2U6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgb25NZXNzYWdlRXh0ZXJuYWw6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0YWJzOiB7XG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMixcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0dGluZ01ldGFkYXRhID0ge1xuICAgICAgICBjbGVhcjoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBhcGlNZXRhZGF0YS5wcml2YWN5ID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgd2Vic2l0ZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd3JhcE9iamVjdChleHRlbnNpb25BUElzLCBzdGF0aWNXcmFwcGVycywgYXBpTWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGNocm9tZSAhPSBcIm9iamVjdFwiIHx8ICFjaHJvbWUgfHwgIWNocm9tZS5ydW50aW1lIHx8ICFjaHJvbWUucnVudGltZS5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICAgIH0gLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAgIC8vIGBtb2R1bGVgIHZhcmlhYmxlIGF2YWlsYWJsZS5cblxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gYnJvd3NlcjtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLXBvbHlmaWxsLmpzLm1hcFxuIiwiXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyPFQgZXh0ZW5kcyBzdHJpbmcsIFUgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IHZvaWQ+IHtcbiAgICBwcml2YXRlIGxpc3RlbmVycyA9IG5ldyBNYXA8VCwgVVtdPigpO1xuXG4gICAgb24oZXZlbnQ6IFQsIGhhbmRsZXI6IFUpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50KTtcbiAgICAgICAgaWYgKGhhbmRsZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQoZXZlbnQsIGhhbmRsZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIGVtaXQoZXZlbnQ6IFQsIC4uLmRhdGE6IGFueSkge1xuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMubGlzdGVuZXJzLmdldChldmVudCk7XG4gICAgICAgIGlmIChoYW5kbGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgOiBFcnJvcltdID0gW107XG4gICAgICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciguLi5kYXRhKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLyogRXJyb3IgY29uZGl0aW9ucyBoZXJlIGFyZSBpbXBvc3NpYmxlIHRvIHRlc3QgZm9yIGZyb20gc2VsZW5pdW1cbiAgICAgICAgICAgICAqIGJlY2F1c2UgaXQgd291bGQgYXJpc2UgZnJvbSB0aGUgd3JvbmcgdXNlIG9mIHRoZSBBUEksIHdoaWNoIHdlXG4gICAgICAgICAgICAgKiBjYW4ndCBzaGlwIGluIHRoZSBleHRlbnNpb24sIHNvIGRvbid0IHRyeSB0byBpbnN0cnVtZW50LiAqL1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGdldENvbmYgfSBmcm9tIFwiLi91dGlscy9jb25maWd1cmF0aW9uXCJcbmltcG9ydCB7IGNvbXB1dGVTZWxlY3RvciB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBYnN0cmFjdEVkaXRvciB9IGZyb20gXCJlZGl0b3ItYWRhcHRlci9BYnN0cmFjdEVkaXRvclwiO1xuaW1wb3J0IHsgZ2V0RWRpdG9yIH0gZnJvbSBcImVkaXRvci1hZGFwdGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBGaXJlbnZpbUVsZW1lbnQge1xuXG4gICAgLy8gZWRpdG9yIGlzIGFuIG9iamVjdCB0aGF0IHByb3ZpZGVzIGFuIGludGVyZmFjZSB0byBpbnRlcmFjdCAoZS5nLlxuICAgIC8vIHJldHJpZXZlL3NldCBjb250ZW50LCByZXRyaWV2ZS9zZXQgY3Vyc29yIHBvc2l0aW9uKSBjb25zaXN0ZW50bHkgd2l0aFxuICAgIC8vIHVuZGVybHlpbmcgZWxlbWVudHMgKGJlIHRoZXkgc2ltcGxlIHRleHRhcmVhcywgQ29kZU1pcnJvciBlbGVtZW50cyBvclxuICAgIC8vIG90aGVyKS5cbiAgICBwcml2YXRlIGVkaXRvcjogQWJzdHJhY3RFZGl0b3I7XG4gICAgLy8gZm9jdXNJbmZvIGlzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiBmb2N1cyBsaXN0ZW5lcnMgYW5kIHRpbWVvdXRzIGNyZWF0ZWRcbiAgICAvLyBieSBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKS4gRmlyZW52aW1FbGVtZW50LmZvY3VzKCkgY3JlYXRlcyB0aGVzZVxuICAgIC8vIGxpc3RlbmVycyBhbmQgdGltZW91dHMgaW4gb3JkZXIgdG8gd29yayBhcm91bmQgcGFnZXMgdGhhdCB0cnkgdG8gZ3JhYlxuICAgIC8vIHRoZSBmb2N1cyBhZ2FpbiBhZnRlciB0aGUgRmlyZW52aW1FbGVtZW50IGhhcyBiZWVuIGNyZWF0ZWQgb3IgYWZ0ZXIgdGhlXG4gICAgLy8gdW5kZXJseWluZyBlbGVtZW50J3MgY29udGVudCBoYXMgY2hhbmdlZC5cbiAgICBwcml2YXRlIGZvY3VzSW5mbyA9IHtcbiAgICAgICAgZmluYWxSZWZvY3VzVGltZW91dHM6IFtdIGFzIGFueVtdLFxuICAgICAgICByZWZvY3VzUmVmczogW10gYXMgYW55W10sXG4gICAgICAgIHJlZm9jdXNUaW1lb3V0czogW10gYXMgYW55W10sXG4gICAgfTtcbiAgICAvLyBmcmFtZUlkIGlzIHRoZSB3ZWJleHRlbnNpb24gaWQgb2YgdGhlIG5lb3ZpbSBmcmFtZS4gV2UgdXNlIGl0IHRvIHNlbmRcbiAgICAvLyBjb21tYW5kcyB0byB0aGUgZnJhbWUuXG4gICAgcHJpdmF0ZSBmcmFtZUlkOiBudW1iZXI7XG4gICAgLy8gZnJhbWVJZFByb21pc2UgaXMgYSBwcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIHRvIHRoZSBmcmFtZUlkLiBUaGVcbiAgICAvLyBmcmFtZUlkIGNhbid0IGJlIHJldHJpZXZlZCBzeW5jaHJvbm91c2x5IGFzIGl0IG5lZWRzIHRvIGJlIHNlbnQgYnkgdGhlXG4gICAgLy8gYmFja2dyb3VuZCBzY3JpcHQuXG4gICAgcHJpdmF0ZSBmcmFtZUlkUHJvbWlzZTogUHJvbWlzZTxudW1iZXI+O1xuICAgIC8vIGlmcmFtZSBpcyB0aGUgTmVvdmltIGZyYW1lLiBUaGlzIGlzIHRoZSBlbGVtZW50IHRoYXQgcmVjZWl2ZXMgYWxsIGlucHV0c1xuICAgIC8vIGFuZCBkaXNwbGF5cyB0aGUgZWRpdG9yLlxuICAgIHByaXZhdGUgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICAvLyBXZSB1c2UgYW4gaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgdG8gZGV0ZWN0IHdoZW4gdGhlIGVsZW1lbnQgdGhlXG4gICAgLy8gRmlyZW52aW1FbGVtZW50IGlzIHRpZWQgYmVjb21lcyBpbnZpc2libGUuIFdoZW4gdGhpcyBoYXBwZW5zLFxuICAgIC8vIHdlIGhpZGUgdGhlIEZpcmVudmltRWxlbWVudCBmcm9tIHRoZSBwYWdlLlxuICAgIHByaXZhdGUgaW50ZXJzZWN0aW9uT2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xuICAgIC8vIFdlIHVzZSBhIG11dGF0aW9uIG9ic2VydmVyIHRvIGRldGVjdCB3aGV0aGVyIHRoZSBlbGVtZW50IGlzIHJlbW92ZWQgZnJvbVxuICAgIC8vIHRoZSBwYWdlLiBXaGVuIHRoaXMgaGFwcGVucywgdGhlIEZpcmVudmltRWxlbWVudCBpcyByZW1vdmVkIGZyb20gdGhlXG4gICAgLy8gcGFnZS5cbiAgICBwcml2YXRlIHBhZ2VPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgICAvLyBXZSB1c2UgYSBtdXRhdGlvbiBvYnNlcnZlciB0byBkZXRlY3QgaWYgdGhlIHNwYW4gaXMgcmVtb3ZlZCBmcm9tIHRoZVxuICAgIC8vIHBhZ2UgYnkgdGhlIHBhZ2UuIFdoZW4gdGhpcyBoYXBwZW5zLCB0aGUgc3BhbiBpcyByZS1pbnNlcnRlZCBpbiB0aGVcbiAgICAvLyBwYWdlLlxuICAgIHByaXZhdGUgc3Bhbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAgIC8vIG52aW1pZnkgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgbGlzdGVucyBmb3IgZm9jdXMgZXZlbnRzIGFuZCBjcmVhdGVzXG4gICAgLy8gZmlyZW52aW0gZWxlbWVudHMuIFdlIG5lZWQgaXQgaW4gb3JkZXIgdG8gYmUgYWJsZSB0byByZW1vdmUgaXQgYXMgYW5cbiAgICAvLyBldmVudCBsaXN0ZW5lciBmcm9tIHRoZSBlbGVtZW50IHRoZSB1c2VyIHNlbGVjdGVkIHdoZW4gdGhlIHVzZXIgd2FudHMgdG9cbiAgICAvLyBzZWxlY3QgdGhhdCBlbGVtZW50IGFnYWluLlxuICAgIHByaXZhdGUgbnZpbWlmeTogKGV2dDogeyB0YXJnZXQ6IEV2ZW50VGFyZ2V0IH0pID0+IFByb21pc2U8dm9pZD47XG4gICAgLy8gb3JpZ2luYWxFbGVtZW50IGlzIHRoZSBlbGVtZW50IGEgZm9jdXMgZXZlbnQgaGFzIGJlZW4gdHJpZ2dlcmVkIG9uLiBXZVxuICAgIC8vIHVzZSBpdCB0byByZXRyaWV2ZSB0aGUgZWxlbWVudCB0aGUgZWRpdG9yIHNob3VsZCBhcHBlYXIgb3ZlciAoZS5nLiwgaWZcbiAgICAvLyBlbGVtIGlzIGFuIGVsZW1lbnQgaW5zaWRlIGEgQ29kZU1pcnJvciBlZGl0b3IsIGVsZW0gd2lsbCBiZSBhIHNtYWxsXG4gICAgLy8gaW52aXNpYmxlIHRleHRhcmVhIGFuZCB3aGF0IHdlIHJlYWxseSB3YW50IHRvIHB1dCB0aGUgRmlyZW52aW0gZWxlbWVudFxuICAgIC8vIG92ZXIgaXMgdGhlIHBhcmVudCBkaXYgdGhhdCBjb250YWlucyBpdCkgYW5kIHRvIGdpdmUgZm9jdXMgYmFjayB0byB0aGVcbiAgICAvLyBwYWdlIHdoZW4gdGhlIHVzZXIgYXNrcyBmb3IgdGhhdC5cbiAgICBwcml2YXRlIG9yaWdpbmFsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgLy8gcmVzaXplT2JzZXJ2ZXIgaXMgdXNlZCBpbiBvcmRlciB0byBkZXRlY3Qgd2hlbiB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxuICAgIC8vIGJlaW5nIGVkaXRlZCBjaGFuZ2VkLiBXaGVuIHRoaXMgaGFwcGVucywgd2UgcmVzaXplIHRoZSBuZW92aW0gZnJhbWUuXG4gICAgLy8gVE9ETzogcGVyaW9kaWNhbGx5IGNoZWNrIGlmIE1TIGltcGxlbWVudGVkIGEgUmVzaXplT2JzZXJ2ZXIgdHlwZVxuICAgIHByaXZhdGUgcmVzaXplT2JzZXJ2ZXI6IGFueTtcbiAgICAvLyBzcGFuIGlzIHRoZSBzcGFuIGVsZW1lbnQgd2UgdXNlIGluIG9yZGVyIHRvIGluc2VydCB0aGUgbmVvdmltIGZyYW1lIGluXG4gICAgLy8gdGhlIHBhZ2UuIFRoZSBuZW92aW0gZnJhbWUgaXMgYXR0YWNoZWQgdG8gaXRzIHNoYWRvdyBkb20uIFVzaW5nIGEgc3BhblxuICAgIC8vIGlzIG11Y2ggbGVzcyBkaXNydXB0aXZlIHRvIHRoZSBwYWdlIGFuZCBlbmFibGVzIGEgbW9kaWN1bSBvZiBwcml2YWN5XG4gICAgLy8gKHRoZSBwYWdlIHdvbid0IGJlIGFibGUgdG8gY2hlY2sgd2hhdCdzIGluIGl0KS4gSW4gZmlyZWZveCwgcGFnZXMgd2lsbFxuICAgIC8vIHN0aWxsIGJlIGFibGUgdG8gZGV0ZWN0IHRoZSBuZW92aW0gZnJhbWUgYnkgdXNpbmcgd2luZG93LmZyYW1lcyB0aG91Z2guXG4gICAgcHJpdmF0ZSBzcGFuOiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgLy8gcmVzaXplUmVxSWQga2VlcHMgdHJhY2sgb2YgdGhlIG51bWJlciBvZiByZXNpemluZyByZXF1ZXN0cyB0aGF0IGFyZSBzZW50XG4gICAgLy8gdG8gdGhlIGlmcmFtZS4gV2Ugc2VuZCBhbmQgaW5jcmVtZW50IGl0IGZvciBldmVyeSByZXNpemUgcmVxdWVzdHMsIHRoaXNcbiAgICAvLyBsZXRzIHRoZSBpZnJhbWUga25vdyB3aGF0IHRoZSBtb3N0IHJlY2VudGx5IHNlbnQgcmVzaXplIHJlcXVlc3QgaXMgYW5kXG4gICAgLy8gdGh1cyBhdm9pZHMgcmVhY3RpbmcgdG8gYW4gb2xkZXIgcmVzaXplIHJlcXVlc3QgaWYgYSBtb3JlIHJlY2VudCBoYXNcbiAgICAvLyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkLlxuICAgIHByaXZhdGUgcmVzaXplUmVxSWQgPSAwO1xuICAgIC8vIHJlbGF0aXZlWC9ZIGlzIHRoZSBwb3NpdGlvbiB0aGUgaWZyYW1lIHNob3VsZCBoYXZlIHJlbGF0aXZlIHRvIHRoZSBpbnB1dFxuICAgIC8vIGVsZW1lbnQgaW4gb3JkZXIgdG8gYmUgYm90aCBhcyBjbG9zZSBhcyBwb3NzaWJsZSB0byB0aGUgaW5wdXQgZWxlbWVudFxuICAgIC8vIGFuZCBmaXQgaW4gdGhlIHdpbmRvdyB3aXRob3V0IG92ZXJmbG93aW5nIG91dCBvZiB0aGUgdmlld3BvcnQuXG4gICAgcHJpdmF0ZSByZWxhdGl2ZVggPSAwO1xuICAgIHByaXZhdGUgcmVsYXRpdmVZID0gMDtcbiAgICAvLyBmaXJzdFB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiBrZWVwcyB0cmFjayBvZiB3aGV0aGVyIHRoaXMgaXMgdGhlXG4gICAgLy8gZmlyc3QgdGltZSB0aGUgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luIGZ1bmN0aW9uIGlzIGNhbGxlZCBmcm9tIHRoZVxuICAgIC8vIGlmcmFtZS4gU2VlIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbkFmdGVyUmVzaXplRnJvbUZyYW1lKCkgZm9yIG1vcmVcbiAgICAvLyBpbmZvcm1hdGlvbi5cbiAgICBwcml2YXRlIGZpcnN0UHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luID0gdHJ1ZTtcbiAgICAvLyBvbkRldGFjaCBpcyBhIGNhbGxiYWNrIHByb3ZpZGVkIGJ5IHRoZSBjb250ZW50IHNjcmlwdCB3aGVuIGl0IGNyZWF0ZXNcbiAgICAvLyB0aGUgRmlyZW52aW1FbGVtZW50LiBJdCBpcyBjYWxsZWQgd2hlbiB0aGUgZGV0YWNoKCkgZnVuY3Rpb24gaXMgY2FsbGVkLFxuICAgIC8vIGFmdGVyIGFsbCBGaXJlbnZpbSBlbGVtZW50cyBoYXZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBwYWdlLlxuICAgIHByaXZhdGUgb25EZXRhY2g6IChpZDogbnVtYmVyKSA9PiBhbnk7XG4gICAgLy8gYnVmZmVySW5mbzogYSBbdXJsLCBzZWxlY3RvciwgY3Vyc29yLCBsYW5nXSB0dXBsZSBpbmRpY2F0aW5nIHRoZSBwYWdlXG4gICAgLy8gdGhlIGxhc3QgaWZyYW1lIHdhcyBjcmVhdGVkIG9uLCB0aGUgc2VsZWN0b3Igb2YgdGhlIGNvcnJlc3BvbmRpbmdcbiAgICAvLyB0ZXh0YXJlYSBhbmQgdGhlIGNvbHVtbi9saW5lIG51bWJlciBvZiB0aGUgY3Vyc29yLlxuICAgIC8vIE5vdGUgdGhhdCB0aGVzZSBhcmUgX19kZWZhdWx0X18gdmFsdWVzLiBSZWFsIHZhbHVlcyBtdXN0IGJlIGNyZWF0ZWQgd2l0aFxuICAgIC8vIHByZXBhcmVCdWZmZXJJbmZvKCkuIFRoZSByZWFzb24gd2UncmUgbm90IGRvaW5nIHRoaXMgZnJvbSB0aGVcbiAgICAvLyBjb25zdHJ1Y3RvciBpcyB0aGF0IGl0J3MgZXhwZW5zaXZlIGFuZCBkaXNydXB0aXZlIC0gZ2V0dGluZyB0aGlzXG4gICAgLy8gaW5mb3JtYXRpb24gcmVxdWlyZXMgZXZhbHVhdGluZyBjb2RlIGluIHRoZSBwYWdlJ3MgY29udGV4dC5cbiAgICBwcml2YXRlIGJ1ZmZlckluZm8gPSAoUHJvbWlzZS5yZXNvbHZlKFtcIlwiLCBcIlwiLCBbMSwgMV0sIHVuZGVmaW5lZF0pIGFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2U8W3N0cmluZywgc3RyaW5nLCBbbnVtYmVyLCBudW1iZXJdLCBzdHJpbmddPik7XG4gICAgLy8gY3Vyc29yOiBsYXN0IGtub3duIGN1cnNvciBwb3NpdGlvbi4gVXBkYXRlZCBvbiBnZXRQYWdlRWxlbWVudEN1cnNvciBhbmRcbiAgICAvLyBzZXRQYWdlRWxlbWVudEN1cnNvclxuICAgIHByaXZhdGUgY3Vyc29yID0gWzEsIDFdIGFzIFtudW1iZXIsIG51bWJlcl07XG5cblxuICAgIC8vIGVsZW0gaXMgdGhlIGVsZW1lbnQgdGhhdCByZWNlaXZlZCB0aGUgZm9jdXNFdmVudC5cbiAgICAvLyBOdmltaWZ5IGlzIHRoZSBmdW5jdGlvbiB0aGF0IGxpc3RlbnMgZm9yIGZvY3VzIGV2ZW50cy4gV2UgbmVlZCB0byBrbm93XG4gICAgLy8gYWJvdXQgaXQgaW4gb3JkZXIgdG8gcmVtb3ZlIGl0IGJlZm9yZSBmb2N1c2luZyBlbGVtIChvdGhlcndpc2Ugd2UnbGxcbiAgICAvLyBqdXN0IGdyYWIgZm9jdXMgYWdhaW4pLlxuICAgIGNvbnN0cnVjdG9yIChlbGVtOiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgbGlzdGVuZXI6IChldnQ6IHsgdGFyZ2V0OiBFdmVudFRhcmdldCB9KSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgICBvbkRldGFjaDogKGlkOiBudW1iZXIpID0+IGFueSkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudCA9IGVsZW07XG4gICAgICAgIHRoaXMubnZpbWlmeSA9IGxpc3RlbmVyO1xuICAgICAgICB0aGlzLm9uRGV0YWNoID0gb25EZXRhY2g7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZ2V0RWRpdG9yKGVsZW0sIHtcbiAgICAgICAgICAgIHByZWZlckhUTUw6IGdldENvbmYoKS5jb250ZW50ID09IFwiaHRtbFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3BhbiA9IGVsZW1cbiAgICAgICAgICAgIC5vd25lckRvY3VtZW50XG4gICAgICAgICAgICAuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcInNwYW5cIik7XG4gICAgICAgIC8vIE1ha2Ugbm9uLWZvY3VzYWJsZSwgYXMgb3RoZXJ3aXNlIDxUYWI+IGFuZCA8Uy1UYWI+IGluIHRoZSBwYWdlIHdvdWxkXG4gICAgICAgIC8vIGZvY3VzIHRoZSBpZnJhbWUgYXQgdGhlIGVuZCBvZiB0aGUgcGFnZSBpbnN0ZWFkIG9mIGZvY3VzaW5nIHRoZVxuICAgICAgICAvLyBicm93c2VyJ3MgVUkuIFRoZSBvbmx5IHdheSB0byA8VGFiPi1mb2N1cyB0aGUgZnJhbWUgaXMgdG9cbiAgICAgICAgLy8gPFRhYj4tZm9jdXMgdGhlIGNvcnJlc3BvbmRpbmcgaW5wdXQgZWxlbWVudC5cbiAgICAgICAgdGhpcy5zcGFuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuaWZyYW1lID0gZWxlbVxuICAgICAgICAgICAgLm93bmVyRG9jdW1lbnRcbiAgICAgICAgICAgIC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwiaWZyYW1lXCIpIGFzIEhUTUxJRnJhbWVFbGVtZW50O1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlcmUgaXNuJ3QgYW55IGV4dHJhIHdpZHRoL2hlaWdodFxuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5wYWRkaW5nID0gXCIwcHhcIjtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUubWFyZ2luID0gXCIwcHhcIjtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuYm9yZGVyID0gXCIwcHhcIjtcbiAgICAgICAgLy8gV2Ugc3RpbGwgbmVlZCBhIGJvcmRlciwgdXNlIGEgc2hhZG93IGZvciB0aGF0XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmJveFNoYWRvdyA9IFwiMHB4IDBweCAxcHggMXB4IGJsYWNrXCI7XG4gICAgfVxuXG4gICAgYXR0YWNoVG9QYWdlIChmaXA6IFByb21pc2U8bnVtYmVyPikge1xuICAgICAgICB0aGlzLmZyYW1lSWRQcm9taXNlID0gZmlwLnRoZW4oKGY6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5mcmFtZUlkID0gZjtcbiAgICAgICAgICAgIC8vIE9uY2UgYSBmcmFtZUlkIGhhcyBiZWVuIGFjcXVpcmVkLCB0aGUgRmlyZW52aW1FbGVtZW50IHdvdWxkIGRpZVxuICAgICAgICAgICAgLy8gaWYgaXRzIHNwYW4gd2FzIHJlbW92ZWQgZnJvbSB0aGUgcGFnZS4gVGh1cyB0aGVyZSBpcyBubyB1c2UgaW5cbiAgICAgICAgICAgIC8vIGtlZXBpbmcgaXRzIHNwYW5PYnNlcnZlciBhcm91bmQuIEl0J2QgZXZlbiBjYXVzZSBpc3N1ZXMgYXMgdGhlXG4gICAgICAgICAgICAvLyBzcGFuT2JzZXJ2ZXIgd291bGQgYXR0ZW1wdCB0byByZS1pbnNlcnQgYSBkZWFkIGZyYW1lIGluIHRoZVxuICAgICAgICAgICAgLy8gcGFnZS5cbiAgICAgICAgICAgIHRoaXMuc3Bhbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYW1lSWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdGhlIGlmcmFtZSB0byBiZSBhcHBlbmRlZCB0byB0aGUgcGFnZSBpbiBvcmRlciB0b1xuICAgICAgICAvLyByZXNpemUgaXQgYmVjYXVzZSB3ZSdyZSBqdXN0IHVzaW5nIHRoZSBjb3JyZXNwb25kaW5nXG4gICAgICAgIC8vIGlucHV0L3RleHRhcmVhJ3Mgc2l6ZVxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuZ2V0RWxlbWVudCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLnJlc2l6ZVRvKHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVsYXRpdmVYID0gMDtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZVkgPSAwO1xuICAgICAgICB0aGlzLnB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbigpO1xuXG4gICAgICAgIC8vIFVzZSBhIFJlc2l6ZU9ic2VydmVyIHRvIGRldGVjdCB3aGVuIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQnc1xuICAgICAgICAvLyBzaXplIGNoYW5nZXMgYW5kIGNoYW5nZSB0aGUgc2l6ZSBvZiB0aGUgRmlyZW52aW1FbGVtZW50XG4gICAgICAgIC8vIGFjY29yZGluZ2x5XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgKCh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlcikoKChzZWxmKSA9PiBhc3luYyAoZW50cmllczogYW55W10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gZW50cmllcy5maW5kKChlbnQ6IGFueSkgPT4gZW50LnRhcmdldCA9PT0gc2VsZi5nZXRFbGVtZW50KCkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuZnJhbWVJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5mcmFtZUlkUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1JlY3QgPSB0aGlzLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVjdC53aWR0aCA9PT0gbmV3UmVjdC53aWR0aCAmJiByZWN0LmhlaWdodCA9PT0gbmV3UmVjdC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWN0ID0gbmV3UmVjdDtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc2l6ZVRvKHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc2l6ZVJlcUlkICs9IDE7XG4gICAgICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVJZDogc2VsZi5mcmFtZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtzZWxmLnJlc2l6ZVJlcUlkLCByZWN0LndpZHRoLCByZWN0LmhlaWdodF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcInJlc2l6ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcIm1lc3NhZ2VGcmFtZVwiXSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5nZXRFbGVtZW50KCksIHsgYm94OiBcImJvcmRlci1ib3hcIiB9KTtcblxuICAgICAgICB0aGlzLmlmcmFtZS5zcmMgPSAoYnJvd3NlciBhcyBhbnkpLmV4dGVuc2lvbi5nZXRVUkwoXCIvaW5kZXguaHRtbFwiKTtcbiAgICAgICAgdGhpcy5zcGFuLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwiY2xvc2VkXCIgfSkuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpO1xuXG4gICAgICAgIC8vIFNvIHBhZ2VzIChlLmcuIEppcmEsIENvbmZsdWVuY2UpIHJlbW92ZSBzcGFucyBmcm9tIHRoZSBwYWdlIGFzIHNvb25cbiAgICAgICAgLy8gYXMgdGhleSdyZSBpbnNlcnRlZC4gV2UgZG9uJ3Qgd2FudCB0aGF0LCBzbyBmb3IgdGhlIDUgc2Vjb25kc1xuICAgICAgICAvLyBmb2xsb3dpbmcgdGhlIGluc2VydGlvbiwgZGV0ZWN0IGlmIHRoZSBzcGFuIGlzIHJlbW92ZWQgZnJvbSB0aGUgcGFnZVxuICAgICAgICAvLyBieSBjaGVja2luZyB2aXNpYmlsaXR5IGNoYW5nZXMgYW5kIHJlLWluc2VydCBpZiBuZWVkZWQuXG4gICAgICAgIGxldCByZWluc2VydHMgPSAwO1xuICAgICAgICB0aGlzLnNwYW5PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFxuICAgICAgICAgICAgKHNlbGYgPT4gKG11dGF0aW9ucyA6IE11dGF0aW9uUmVjb3JkW10sIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gc2VsZi5nZXRTcGFuKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtdXRhdGlvbi5yZW1vdmVkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT09IHNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlaW5zZXJ0cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlaW5zZXJ0cyA+PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGaXJlbnZpbSBpcyB0cnlpbmcgdG8gY3JlYXRlIGFuIGlmcmFtZSBvbiB0aGlzIHNpdGUgYnV0IHRoZSBwYWdlIGlzIGNvbnN0YW50bHkgcmVtb3ZpbmcgaXQuIENvbnNpZGVyIGRpc2FibGluZyBGaXJlbnZpbSBvbiB0aGlzIHdlYnNpdGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZWxmLmdldEVsZW1lbnQoKS5vd25lckRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3BhbiksIHJlaW5zZXJ0cyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zcGFuT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmdldEVsZW1lbnQoKS5vd25lckRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuXG4gICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50KCkub3duZXJEb2N1bWVudC5ib2R5O1xuICAgICAgICAvLyBXZSBjYW4ndCBpbnNlcnQgdGhlIGZyYW1lIGluIHRoZSBib2R5IGlmIHRoZSBlbGVtZW50IHdlJ3JlIGdvaW5nIHRvXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIGNvbnRlbnQgb2YgaXMgdGhlIGJvZHksIGFzIHJlcGxhY2luZyB0aGUgY29udGVudCB3b3VsZFxuICAgICAgICAvLyBkZXN0cm95IHRoZSBmcmFtZS5cbiAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQgPT09IHRoaXMuZ2V0RWxlbWVudCgpKSB7XG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zcGFuKTtcblxuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgLy8gSXQgaXMgcHJldHR5IGhhcmQgdG8gdGVsbCB3aGVuIGFuIGVsZW1lbnQgZGlzYXBwZWFycyBmcm9tIHRoZSBwYWdlXG4gICAgICAgIC8vIChlaXRoZXIgYnkgYmVpbmcgcmVtb3ZlZCBvciBieSBiZWluZyBoaWRkZW4gYnkgb3RoZXIgZWxlbWVudHMpLCBzb1xuICAgICAgICAvLyB3ZSB1c2UgYW4gaW50ZXJzZWN0aW9uIG9ic2VydmVyLCB3aGljaCBpcyB0cmlnZ2VyZWQgZXZlcnkgdGltZSB0aGVcbiAgICAgICAgLy8gZWxlbWVudCBiZWNvbWVzIG1vcmUgb3IgbGVzcyB2aXNpYmxlLlxuICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChzZWxmID0+ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBzZWxmLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgIC8vIElmIGVsZW0gZG9lc24ndCBoYXZlIGEgcmVjdCBhbnltb3JlLCBpdCdzIGhpZGRlblxuICAgICAgICAgICAgaWYgKGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHRoaXMpLCB7IHJvb3Q6IG51bGwsIHRocmVzaG9sZDogMC4xIH0pO1xuICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5nZXRFbGVtZW50KCkpO1xuXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBGaXJlbnZpbUVsZW1lbnQgZnJvbSB0aGUgcGFnZSB3aGVuIHRoZVxuICAgICAgICAvLyBjb3JyZXNwb25kaW5nIGVsZW1lbnQgaXMgcmVtb3ZlZC4gV2UgZG8gdGhpcyBieSBhZGRpbmcgYVxuICAgICAgICAvLyBtdXRhdGlvbk9ic2VydmVyIHRvIGl0cyBwYXJlbnQuXG4gICAgICAgIHRoaXMucGFnZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHNlbGYgPT4gKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHNlbGYuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2gobXV0YXRpb24gPT4gbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfQUxMKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhbGtlci5jdXJyZW50Tm9kZSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZWxmLmRldGFjaEZyb21QYWdlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgIHRoaXMucGFnZU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyRm9jdXNMaXN0ZW5lcnMgKCkge1xuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIHRyaWVzIHRvIGA6dyB8IGNhbGwgZmlyZW52aW0jZm9jdXNfcGFnZSgpYCBpbiBOZW92aW0sXG4gICAgICAgIC8vIHdlIGhhdmUgYSBwcm9ibGVtLiBgOndgIHJlc3VsdHMgaW4gYSBjYWxsIHRvIHNldFBhZ2VFbGVtZW50Q29udGVudCxcbiAgICAgICAgLy8gd2hpY2ggY2FsbHMgRmlyZW52aW1FbGVtZW50LmZvY3VzKCksIGJlY2F1c2Ugc29tZSBwYWdlcyB0cnkgdG8gZ3JhYlxuICAgICAgICAvLyBmb2N1cyB3aGVuIHRoZSBjb250ZW50IG9mIHRoZSB1bmRlcmx5aW5nIGVsZW1lbnQgY2hhbmdlcy5cbiAgICAgICAgLy8gRmlyZW52aW1FbGVtZW50LmZvY3VzKCkgY3JlYXRlcyBldmVudCBsaXN0ZW5lcnMgYW5kIHRpbWVvdXRzIHRvXG4gICAgICAgIC8vIGRldGVjdCB3aGVuIHRoZSBwYWdlIHRyaWVzIHRvIGdyYWIgZm9jdXMgYW5kIGJyaW5nIGl0IGJhY2sgdG8gdGhlXG4gICAgICAgIC8vIEZpcmVudmltRWxlbWVudC4gQnV0IHNpbmNlIGBjYWxsIGZpcmVudmltI2ZvY3VzX3BhZ2UoKWAgaGFwcGVuc1xuICAgICAgICAvLyByaWdodCBhZnRlciB0aGUgYDp3YCwgZm9jdXNfcGFnZSgpIHRyaWdnZXJzIHRoZSBldmVudFxuICAgICAgICAvLyBsaXN0ZW5lcnMvdGltZW91dHMgY3JlYXRlZCBieSBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKSFcbiAgICAgICAgLy8gU28gd2UgbmVlZCBhIHdheSB0byBjbGVhciB0aGUgdGltZW91dHMgYW5kIGV2ZW50IGxpc3RlbmVycyBiZWZvcmVcbiAgICAgICAgLy8gcGVyZm9ybWluZyBmb2N1c19wYWdlLCBhbmQgdGhhdCdzIHdoYXQgdGhpcyBmdW5jdGlvbiBkb2VzLlxuICAgICAgICB0aGlzLmZvY3VzSW5mby5maW5hbFJlZm9jdXNUaW1lb3V0cy5mb3JFYWNoKHQgPT4gY2xlYXJUaW1lb3V0KHQpKTtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8ucmVmb2N1c1RpbWVvdXRzLmZvckVhY2godCA9PiBjbGVhclRpbWVvdXQodCkpO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzUmVmcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgdGhpcy5pZnJhbWUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZik7XG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5maW5hbFJlZm9jdXNUaW1lb3V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzVGltZW91dHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8ucmVmb2N1c1JlZnMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBkZXRhY2hGcm9tUGFnZSAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJGb2N1c0xpc3RlbmVycygpO1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW0pO1xuICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZShlbGVtKTtcbiAgICAgICAgdGhpcy5wYWdlT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLnNwYW5PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuc3Bhbi5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5vbkRldGFjaCh0aGlzLmZyYW1lSWQpO1xuICAgIH1cblxuICAgIGZvY3VzICgpIHtcbiAgICAgICAgLy8gU29tZSBpbnB1dHMgdHJ5IHRvIGdyYWIgdGhlIGZvY3VzIGFnYWluIGFmdGVyIHdlIGFwcGVuZGVkIHRoZSBpZnJhbWVcbiAgICAgICAgLy8gdG8gdGhlIHBhZ2UsIHNvIHdlIG5lZWQgdG8gcmVmb2N1cyBpdCBlYWNoIHRpbWUgaXQgbG9zZXMgZm9jdXMuIEJ1dFxuICAgICAgICAvLyB0aGUgdXNlciBtaWdodCB3YW50IHRvIHN0b3AgZm9jdXNpbmcgdGhlIGlmcmFtZSBhdCBzb21lIHBvaW50LCBzbyB3ZVxuICAgICAgICAvLyBhY3R1YWxseSBzdG9wIHJlZm9jdXNpbmcgdGhlIGlmcmFtZSBhIHNlY29uZCBhZnRlciBpdCBpcyBjcmVhdGVkLlxuICAgICAgICBjb25zdCByZWZvY3VzID0gKChzZWxmKSA9PiAoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmZvY3VzSW5mby5yZWZvY3VzVGltZW91dHMucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCwgZGVzdHJveSBjdXJyZW50IHNlbGVjdGlvbi4gU29tZSB3ZWJzaXRlcyB1c2UgdGhlXG4gICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uIHRvIGZvcmNlLWZvY3VzIGFuIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAvLyBUaGVyZSdzIGEgcmFjZSBjb25kaXRpb24gaW4gdGhlIHRlc3RzdWl0ZSBvbiBjaHJvbWUgdGhhdFxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdHMgaW4gc2VsZi5zcGFuIG5vdCBiZWluZyBpbiB0aGUgZG9jdW1lbnQgYW5kIGVycm9yc1xuICAgICAgICAgICAgICAgIC8vIGJlaW5nIGxvZ2dlZCwgc28gd2UgY2hlY2sgaWYgc2VsZi5zcGFuIHJlYWxseSBpcyBpbiBpdHNcbiAgICAgICAgICAgICAgICAvLyBvd25lckRvY3VtZW50LlxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNwYW4ub3duZXJEb2N1bWVudC5jb250YWlucyhzZWxmLnNwYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbGYuc3BhbiwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5pZnJhbWUuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDApKTtcbiAgICAgICAgfSkodGhpcyk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNSZWZzLnB1c2gocmVmb2N1cyk7XG4gICAgICAgIHRoaXMuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHJlZm9jdXMpO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgcmVmb2N1cyk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLmZpbmFsUmVmb2N1c1RpbWVvdXRzLnB1c2goc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZWZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCByZWZvY3VzKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCByZWZvY3VzKTtcbiAgICAgICAgfSwgMTAwKSk7XG4gICAgICAgIHJlZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c09yaWdpbmFsRWxlbWVudCAoYWRkTGlzdGVuZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgYW55KS5ibHVyKCk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLm52aW1pZnkpO1xuICAgICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsRWxlbWVudC5vd25lckRvY3VtZW50LmNvbnRhaW5zKHRoaXMub3JpZ2luYWxFbGVtZW50KSkge1xuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQodGhpcy5vcmlnaW5hbEVsZW1lbnQsIDApO1xuICAgICAgICB9XG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudC5mb2N1cygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoYWRkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLm52aW1pZnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QnVmZmVySW5mbyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlckluZm87XG4gICAgfVxuXG4gICAgZ2V0RWRpdG9yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZ2V0RWxlbWVudCgpO1xuICAgIH1cblxuICAgIGdldFBhZ2VFbGVtZW50Q29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVkaXRvcigpLmdldENvbnRlbnQoKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlRWxlbWVudEN1cnNvciAoKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3IoKS5jYXRjaCgoKSA9PiBbMSwgMV0pIGFzIFByb21pc2U8W251bWJlciwgbnVtYmVyXT47XG4gICAgICAgIHAudGhlbihjID0+IHRoaXMuY3Vyc29yID0gYyk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGdldE9yaWdpbmFsRWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RvciAoKSB7XG4gICAgICAgIHJldHVybiBjb21wdXRlU2VsZWN0b3IodGhpcy5nZXRFbGVtZW50KCkpO1xuICAgIH1cblxuICAgIGdldFNwYW4gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGFuO1xuICAgIH1cblxuICAgIGhpZGUgKCkge1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgaXNGb2N1c2VkICgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuc3BhblxuICAgICAgICAgICAgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pZnJhbWU7XG4gICAgfVxuXG4gICAgcHJlcGFyZUJ1ZmZlckluZm8gKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlckluZm8gPSAoYXN5bmMgKCkgPT4gW1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgIHRoaXMuZ2V0U2VsZWN0b3IoKSxcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0UGFnZUVsZW1lbnRDdXJzb3IoKSxcbiAgICAgICAgICAgIGF3YWl0ICh0aGlzLmVkaXRvci5nZXRMYW5ndWFnZSgpLmNhdGNoKCgpID0+IHVuZGVmaW5lZCkpXG4gICAgICAgIF0pKCkgYXMgUHJvbWlzZTxbc3RyaW5nLCBzdHJpbmcsIFtudW1iZXIsIG51bWJlcl0sIHN0cmluZ10+O1xuICAgIH1cblxuICAgIHByZXNzS2V5cyAoa2V5czogS2V5Ym9hcmRFdmVudFtdKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgICAgICBrZXlzLmZvckVhY2goZXYgPT4gdGhpcy5vcmlnaW5hbEVsZW1lbnQuZGlzcGF0Y2hFdmVudChldikpO1xuICAgICAgICBpZiAoZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luICgpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWRpdG9yLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAvLyBTYXZlIGF0dHJpYnV0ZXNcbiAgICAgICAgY29uc3QgcG9zQXR0cnMgPSBbXCJsZWZ0XCIsIFwicG9zaXRpb25cIiwgXCJ0b3BcIiwgXCJ6SW5kZXhcIl07XG4gICAgICAgIGNvbnN0IG9sZFBvc0F0dHJzID0gcG9zQXR0cnMubWFwKChhdHRyOiBhbnkpID0+IHRoaXMuaWZyYW1lLnN0eWxlW2F0dHJdKTtcblxuICAgICAgICAvLyBBc3NpZ24gbmV3IHZhbHVlc1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0ICsgd2luZG93LnNjcm9sbFggKyB0aGlzLnJlbGF0aXZlWH1weGA7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS50b3AgPSBgJHtyZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZICsgdGhpcy5yZWxhdGl2ZVl9cHhgO1xuICAgICAgICAvLyAyMTM5OTk5OTk1IGlzIGhvcGVmdWxseSBoaWdoZXIgdGhhbiBldmVyeXRoaW5nIGVsc2Ugb24gdGhlIHBhZ2UgYnV0XG4gICAgICAgIC8vIGxvd2VyIHRoYW4gVmltaXVtJ3MgZWxlbWVudHNcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuekluZGV4ID0gXCIyMTM5OTk5OTk1XCI7XG5cbiAgICAgICAgLy8gQ29tcGFyZSwgdG8ga25vdyB3aGV0aGVyIHRoZSBlbGVtZW50IG1vdmVkIG9yIG5vdFxuICAgICAgICBjb25zdCBwb3NDaGFuZ2VkID0gISFwb3NBdHRycy5maW5kKChhdHRyOiBhbnksIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlW2F0dHJdICE9PSBvbGRQb3NBdHRyc1tpbmRleF0pO1xuICAgICAgICByZXR1cm4geyBwb3NDaGFuZ2VkLCBuZXdSZWN0OiByZWN0IH07XG4gICAgfVxuXG4gICAgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luQWZ0ZXJSZXNpemVGcm9tRnJhbWUgKCkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgdmVyeSB3ZWlyZCwgY29tcGxpY2F0ZWQgYW5kIGJhZCBwaWVjZSBvZiBjb2RlLiBBbGwgY2FsbHNcbiAgICAgICAgLy8gdG8gYHJlc2l6ZUVkaXRvcigpYCBoYXZlIHRvIHJlc3VsdCBpbiBhIGNhbGwgdG8gYHJlc2l6ZVRvKClgIGFuZFxuICAgICAgICAvLyB0aGVuIGBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKWAgaW4gb3JkZXIgdG8gbWFrZSBzdXJlIHRoZVxuICAgICAgICAvLyBpZnJhbWUgZG9lc24ndCBvdmVyZmxvdyBmcm9tIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgLy8gSG93ZXZlciwgd2hlbiB3ZSBjcmVhdGUgdGhlIGlmcmFtZSwgd2UgZG9uJ3Qgd2FudCBpdCB0byBmaXQgaW4gdGhlXG4gICAgICAgIC8vIHZpZXdwb3J0IGF0IGFsbCBjb3N0LiBJbnN0ZWFkLCB3ZSB3YW50IGl0IHRvIGNvdmVyIHRoZSB1bmRlcmx5aW5nXG4gICAgICAgIC8vIGlucHV0IGFzIG11Y2ggYXMgcG9zc2libGUuIFRoZSBwcm9ibGVtIGlzIHRoYXQgd2hlbiBpdCBpcyBjcmVhdGVkLFxuICAgICAgICAvLyB0aGUgaWZyYW1lIHdpbGwgYXNrIGZvciBhIHJlc2l6ZSAoYmVjYXVzZSBOZW92aW0gYXNrcyBmb3Igb25lKSBhbmRcbiAgICAgICAgLy8gd2lsbCB0aHVzIGFsc28gYWNjaWRlbnRhbGx5IGNhbGwgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luLCB3aGljaFxuICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIGNhbGwuXG4gICAgICAgIC8vIFNvIHdlIGhhdmUgdG8gdHJhY2sgdGhlIGNhbGxzIHRvIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiB0aGF0XG4gICAgICAgIC8vIGFyZSBtYWRlIGZyb20gdGhlIGlmcmFtZSAoaS5lLiBmcm9tIGByZXNpemVFZGl0b3IoKWApIGFuZCBpZ25vcmUgdGhlXG4gICAgICAgIC8vIGZpcnN0IG9uZS5cbiAgICAgICAgaWYgKHRoaXMuZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpdmVYID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpdmVZID0gMDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKTtcbiAgICB9XG5cbiAgICAvLyBSZXNpemUgdGhlIGlmcmFtZSwgbWFraW5nIHN1cmUgaXQgZG9lc24ndCBnZXQgbGFyZ2VyIHRoYW4gdGhlIHdpbmRvd1xuICAgIHJlc2l6ZVRvICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgd2FybklmcmFtZTogYm9vbGVhbikge1xuICAgICAgICAvLyBJZiB0aGUgZGltZW5zaW9ucyB0aGF0IGFyZSBhc2tlZCBmb3IgYXJlIHRvbyBiaWcsIG1ha2UgdGhlbSBhcyBiaWdcbiAgICAgICAgLy8gYXMgdGhlIHdpbmRvd1xuICAgICAgICBsZXQgY2FudEZ1bGx5UmVzaXplID0gZmFsc2U7XG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBpZiAoYXZhaWxhYmxlV2lkdGggPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA+PSBhdmFpbGFibGVXaWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBhdmFpbGFibGVXaWR0aCAtIDE7XG4gICAgICAgICAgICBjYW50RnVsbHlSZXNpemUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGlmIChhdmFpbGFibGVIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgPj0gYXZhaWxhYmxlSGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBhdmFpbGFibGVIZWlnaHQgLSAxO1xuICAgICAgICAgICAgY2FudEZ1bGx5UmVzaXplID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBkaW1lbnNpb25zIHRoYXQgd2VyZSBhc2tlZCBmb3IgbWlnaHQgbWFrZSB0aGUgaWZyYW1lIG92ZXJmbG93LlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIG5lZWQgdG8gY29tcHV0ZSBob3cgbXVjaCB3ZSBuZWVkIHRvIG1vdmUgdGhlIGlmcmFtZVxuICAgICAgICAvLyB0byB0aGUgbGVmdC90b3AgaW4gb3JkZXIgdG8gaGF2ZSBpdCBib3R0b20tcmlnaHQgY29ybmVyIHNpdCByaWdodCBpblxuICAgICAgICAvLyB0aGUgd2luZG93J3MgYm90dG9tLXJpZ2h0IGNvcm5lci5cbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWRpdG9yLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IGF2YWlsYWJsZVdpZHRoIC0gKHJlY3QubGVmdCArIHdpZHRoKTtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZVggPSByaWdodE92ZXJmbG93IDwgMCA/IHJpZ2h0T3ZlcmZsb3cgOiAwO1xuICAgICAgICBjb25zdCBib3R0b21PdmVyZmxvdyA9IGF2YWlsYWJsZUhlaWdodCAtIChyZWN0LnRvcCArIGhlaWdodCk7XG4gICAgICAgIHRoaXMucmVsYXRpdmVZID0gYm90dG9tT3ZlcmZsb3cgPCAwID8gYm90dG9tT3ZlcmZsb3cgOiAwO1xuXG4gICAgICAgIC8vIE5vdyBhY3R1YWxseSBzZXQgdGhlIHdpZHRoL2hlaWdodCwgbW92ZSB0aGUgZWRpdG9yIHdoZXJlIGl0IGlzXG4gICAgICAgIC8vIHN1cHBvc2VkIHRvIGJlIGFuZCBpZiB0aGUgbmV3IGlmcmFtZSBjYW4ndCBiZSBhcyBiaWcgYXMgcmVxdWVzdGVkLFxuICAgICAgICAvLyB3YXJuIHRoZSBpZnJhbWUgc2NyaXB0LlxuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgaWYgKGNhbnRGdWxseVJlc2l6ZSAmJiB3YXJuSWZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVJlcUlkICs9IDE7XG4gICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVJZDogdGhpcy5mcmFtZUlkLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbdGhpcy5yZXNpemVSZXFJZCwgd2lkdGgsIGhlaWdodF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wicmVzaXplXCJdLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZUZyYW1lXCJdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZW5kS2V5IChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICBmcmFtZUlkOiB0aGlzLmZyYW1lSWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcImZyYW1lX3NlbmRLZXlcIl0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlRnJhbWVcIl0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFBhZ2VFbGVtZW50Q29udGVudCAodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRDb250ZW50KHRleHQpO1xuICAgICAgICBbXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXlkb3duXCIsICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXl1cFwiLCAgICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXlwcmVzc1wiLCAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJiZWZvcmVpbnB1dFwiLCB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJpbnB1dFwiLCAgICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwgICAgICB7IGJ1YmJsZXM6IHRydWUgfSlcbiAgICAgICAgXS5mb3JFYWNoKGV2ID0+IHRoaXMub3JpZ2luYWxFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpKTtcbiAgICAgICAgaWYgKGZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhZ2VFbGVtZW50Q3Vyc29yIChsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuY3Vyc29yWzBdID0gbGluZTtcbiAgICAgICAgdGhpcy5jdXJzb3JbMV0gPSBjb2x1bW47XG4gICAgICAgIGlmICh0aGlzLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgICAgICBwID0gdGhpcy5lZGl0b3Iuc2V0Q3Vyc29yKGxpbmUsIGNvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgc2hvdyAoKSB7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcImluaXRpYWxcIjtcbiAgICB9XG5cbn1cbiIsIlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF1dG9maWxsKCkge1xuICAgIGNvbnN0IHBsYXRJbmZvUHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGFyZ3M6IFtdLFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcImJyb3dzZXJcIiwgXCJydW50aW1lXCIsIFwiZ2V0UGxhdGZvcm1JbmZvXCJdLFxuICAgICAgICB9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZXhlY1wiXSxcbiAgICB9KTtcbiAgICBjb25zdCBtYW5pZmVzdFByb21pc2UgPSBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICBhcmdzOiBbXSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJicm93c2VyXCIsIFwicnVudGltZVwiLCBcImdldE1hbmlmZXN0XCJdLFxuICAgICAgICB9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZXhlY1wiXSxcbiAgICB9KTtcbiAgICBjb25zdCBudmltUGx1Z2luUHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHt9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZ2V0TnZpbVBsdWdpblZlcnNpb25cIl0sXG4gICAgfSk7XG4gICAgY29uc3QgaXNzdWVUZW1wbGF0ZVByb21pc2UgPSBmZXRjaChicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwiSVNTVUVfVEVNUExBVEUubWRcIikpLnRoZW4ocCA9PiBwLnRleHQoKSk7XG4gICAgY29uc3QgYnJvd3NlclN0cmluZyA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhmaXJlZm94fGNocm9tKVteIF0rL2dpKTtcbiAgICBsZXQgbmFtZTtcbiAgICBsZXQgdmVyc2lvbjtcbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQsIGFzIGNvdmVyYWdlIGlzIG9ubHkgcmVjb3JkZWQgb24gZmlyZWZveFxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGJyb3dzZXJTdHJpbmcpIHtcbiAgICAgICAgWyBuYW1lLCB2ZXJzaW9uIF0gPSBicm93c2VyU3RyaW5nWzBdLnNwbGl0KFwiL1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuYW1lID0gXCJ1bmtub3duXCI7XG4gICAgICAgIHZlcnNpb24gPSBcInVua25vd25cIjtcbiAgICB9XG4gICAgY29uc3QgdmVuZG9yID0gbmF2aWdhdG9yLnZlbmRvciB8fCBcIlwiO1xuICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpc3N1ZV9ib2R5XCIpIGFzIGFueTtcbiAgICBjb25zdCBbXG4gICAgICAgIHBsYXRJbmZvLFxuICAgICAgICBtYW5pZmVzdCxcbiAgICAgICAgbnZpbVBsdWdpblZlcnNpb24sXG4gICAgICAgIGlzc3VlVGVtcGxhdGUsXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtwbGF0SW5mb1Byb21pc2UsIG1hbmlmZXN0UHJvbWlzZSwgbnZpbVBsdWdpblByb21pc2UsIGlzc3VlVGVtcGxhdGVQcm9taXNlXSk7XG4gICAgLy8gQ2FuJ3QgaGFwcGVuLCBidXQgZG9lc24ndCBjb3N0IG11Y2ggdG8gaGFuZGxlIVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKCF0ZXh0YXJlYSB8fCB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKC9cXHIvZywgXCJcIikgIT09IGlzc3VlVGVtcGxhdGUucmVwbGFjZSgvXFxyL2csIFwiXCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGV4dGFyZWEudmFsdWUgPSBpc3N1ZVRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwiT1MgVmVyc2lvbjpcIiwgYE9TIFZlcnNpb246ICR7cGxhdEluZm8ub3N9ICR7cGxhdEluZm8uYXJjaH1gKVxuICAgICAgICAucmVwbGFjZShcIkJyb3dzZXIgVmVyc2lvbjpcIiwgYEJyb3dzZXIgVmVyc2lvbjogJHt2ZW5kb3J9ICR7bmFtZX0gJHt2ZXJzaW9ufWApXG4gICAgICAgIC5yZXBsYWNlKFwiQnJvd3NlciBBZGRvbiBWZXJzaW9uOlwiLCBgQnJvd3NlciBBZGRvbiBWZXJzaW9uOiAke21hbmlmZXN0LnZlcnNpb259YClcbiAgICAgICAgLnJlcGxhY2UoXCJOZW92aW0gUGx1Z2luIFZlcnNpb246XCIsIGBOZW92aW0gUGx1Z2luIFZlcnNpb246ICR7bnZpbVBsdWdpblZlcnNpb259YCk7XG59XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgICAgfSBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCB7IEZpcmVudmltRWxlbWVudCB9IGZyb20gXCIuL0ZpcmVudmltRWxlbWVudFwiO1xuaW1wb3J0IHsgZXhlY3V0ZUluUGFnZSAgIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IGdldENvbmYgICAgICAgICB9IGZyb20gXCIuL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGtleXNUb0V2ZW50cyAgICB9IGZyb20gXCIuL3V0aWxzL2tleXNcIjtcblxuLy8gVGhpcyBtb2R1bGUgaXMgbG9hZGVkIGluIGJvdGggdGhlIGJyb3dzZXIncyBjb250ZW50IHNjcmlwdCwgdGhlIGJyb3dzZXInc1xuLy8gZnJhbWUgc2NyaXB0IGFuZCB0aHVuZGVyYmlyZCdzIGNvbXBvc2Ugc2NyaXB0LlxuLy8gQXMgc3VjaCwgaXQgc2hvdWxkIG5vdCBoYXZlIGFueSBzaWRlIGVmZmVjdHMuXG5cbmludGVyZmFjZSBJR2xvYmFsU3RhdGUge1xuICAgIGRpc2FibGVkOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcbiAgICBsYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQ6IG51bWJlcjtcbiAgICBmaXJlbnZpbUVsZW1zOiBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+O1xuICAgIGZyYW1lSWRSZXNvbHZlOiAoXzogbnVtYmVyKSA9PiB2b2lkO1xuICAgIG52aW1pZnk6IChldnQ6IEZvY3VzRXZlbnQpID0+IHZvaWQ7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRnVuY3Rpb25zIHJ1bm5pbmcgaW4gdGhlIGNvbnRlbnQgc2NyaXB0IC8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gX2ZvY3VzSW5wdXQoZ2xvYmFsOiBJR2xvYmFsU3RhdGUsIGZpcmVudmltOiBGaXJlbnZpbUVsZW1lbnQsIGFkZExpc3RlbmVyOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZExpc3RlbmVyKSB7XG4gICAgICAgIC8vIE9ubHkgcmUtYWRkIGV2ZW50IGxpc3RlbmVyIGlmIGlucHV0J3Mgc2VsZWN0b3IgbWF0Y2hlcyB0aGUgb25lc1xuICAgICAgICAvLyB0aGF0IHNob3VsZCBiZSBhdXRvbnZpbWlmaWVkXG4gICAgICAgIGNvbnN0IGNvbmYgPSBnZXRDb25mKCk7XG4gICAgICAgIGlmIChjb25mLnNlbGVjdG9yICYmIGNvbmYuc2VsZWN0b3IgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmYuc2VsZWN0b3IpKTtcbiAgICAgICAgICAgIGFkZExpc3RlbmVyID0gZWxlbXMuaW5jbHVkZXMoZmlyZW52aW0uZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaXJlbnZpbS5mb2N1c09yaWdpbmFsRWxlbWVudChhZGRMaXN0ZW5lcik7XG59XG5cbmZ1bmN0aW9uIGdldEZvY3VzZWRFbGVtZW50IChmaXJlbnZpbUVsZW1zOiBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+KSB7XG4gICAgcmV0dXJuIEFycmF5XG4gICAgICAgIC5mcm9tKGZpcmVudmltRWxlbXMudmFsdWVzKCkpXG4gICAgICAgIC5maW5kKGluc3RhbmNlID0+IGluc3RhbmNlLmlzRm9jdXNlZCgpKTtcbn1cblxuLy8gVGFiIGZ1bmN0aW9ucyBhcmUgZnVuY3Rpb25zIGFsbCBjb250ZW50IHNjcmlwdHMgc2hvdWxkIHJlYWN0IHRvXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFiRnVuY3Rpb25zKGdsb2JhbDogSUdsb2JhbFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0QWN0aXZlSW5zdGFuY2VDb3VudCA6ICgpID0+IGdsb2JhbC5maXJlbnZpbUVsZW1zLnNpemUsXG4gICAgICAgIHJlZ2lzdGVyTmV3RnJhbWVJZDogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmZyYW1lSWRSZXNvbHZlKGZyYW1lSWQpO1xuICAgICAgICB9LFxuICAgICAgICBzZXREaXNhYmxlZDogKGRpc2FibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TGFzdEZvY3VzZWRDb250ZW50U2NyaXB0OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwubGFzdEZvY3VzZWRDb250ZW50U2NyaXB0ID0gZnJhbWVJZDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZShlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IHJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdIZWlnaHQgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHJldHVybiAhKHJlY3QuYm90dG9tIDwgMCB8fCByZWN0LnRvcCAtIHZpZXdIZWlnaHQgPj0gMCk7XG59XG5cbi8vIEFjdGl2ZUNvbnRlbnQgZnVuY3Rpb25zIGFyZSBmdW5jdGlvbnMgb25seSB0aGUgYWN0aXZlIGNvbnRlbnQgc2NyaXB0IHNob3VsZCByZWFjdCB0b1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMoZ2xvYmFsOiBJR2xvYmFsU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JjZU52aW1pZnk6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGlzTnVsbCA9IGVsZW0gPT09IG51bGwgfHwgZWxlbSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgcGFnZU5vdEVkaXRhYmxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRlbnRFZGl0YWJsZSAhPT0gXCJ0cnVlXCI7XG4gICAgICAgICAgICBjb25zdCBib2R5Tm90RWRpdGFibGUgPSAoZG9jdW1lbnQuYm9keS5jb250ZW50RWRpdGFibGUgPT09IFwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGRvY3VtZW50LmJvZHkuY29udGVudEVkaXRhYmxlID09PSBcImluaGVyaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250ZW50RWRpdGFibGUgIT09IFwidHJ1ZVwiKSk7XG4gICAgICAgICAgICBpZiAoaXNOdWxsXG4gICAgICAgICAgICAgICAgfHwgKGVsZW0gPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBwYWdlTm90RWRpdGFibGUpXG4gICAgICAgICAgICAgICAgfHwgKGVsZW0gPT09IGRvY3VtZW50LmJvZHkgJiYgYm9keU5vdEVkaXRhYmxlKSkge1xuICAgICAgICAgICAgICAgIGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGV4dGFyZWFcIikpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKGlzVmlzaWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZChlID0+IGUudHlwZSA9PT0gXCJ0ZXh0XCIgJiYgaXNWaXNpYmxlKGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbG9iYWwubnZpbWlmeSh7IHRhcmdldDogZWxlbSB9IGFzIGFueSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbmRLZXk6IChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBnZXRGb2N1c2VkRWxlbWVudChnbG9iYWwuZmlyZW52aW1FbGVtcyk7XG4gICAgICAgICAgICBpZiAoZmlyZW52aW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpcmVudmltLnNlbmRLZXkoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdGhyb3cgdGhpcyBlcnJvciBhcyB0aGUgYmFja2dyb3VuZCBzY3JpcHRcbiAgICAgICAgICAgICAgICAvLyB3aWxsIGV4ZWN1dGUgYSBmYWxsYmFja1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZpcmVudmltIGZyYW1lIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGZvY3VzRWxlbWVudEJlZm9yZU9yQWZ0ZXIoZ2xvYmFsOiBJR2xvYmFsU3RhdGUsIGZyYW1lSWQ6IG51bWJlciwgaTogMSB8IC0xKSB7XG4gICAgbGV0IGZpcmVudmltRWxlbWVudDtcbiAgICBpZiAoZnJhbWVJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZpcmVudmltRWxlbWVudCA9IGdldEZvY3VzZWRFbGVtZW50KGdsb2JhbC5maXJlbnZpbUVsZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmaXJlbnZpbUVsZW1lbnQgPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgfVxuICAgIGNvbnN0IG9yaWdpbmFsRWxlbWVudCA9IGZpcmVudmltRWxlbWVudC5nZXRPcmlnaW5hbEVsZW1lbnQoKTtcblxuICAgIGNvbnN0IHRhYmluZGV4ID0gKGU6IEVsZW1lbnQpID0+ICgoeCA9PiBpc05hTih4KSA/IDAgOiB4KShwYXJzZUludChlLmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpKSkpO1xuICAgIGNvbnN0IGZvY3VzYWJsZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCBvYmplY3QsIFt0YWJpbmRleF0sIFtocmVmXVwiKSlcbiAgICAgICAgLmZpbHRlcihlID0+IGUuZ2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIikgIT09IFwiLTFcIilcbiAgICAgICAgLnNvcnQoKGUxLCBlMikgPT4gdGFiaW5kZXgoZTEpIC0gdGFiaW5kZXgoZTIpKTtcblxuICAgIGxldCBpbmRleCA9IGZvY3VzYWJsZXMuaW5kZXhPZihvcmlnaW5hbEVsZW1lbnQpO1xuICAgIGxldCBlbGVtOiBFbGVtZW50O1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgLy8gb3JpZ2luYWxFbGVtZW50IGlzbid0IGluIHRoZSBsaXN0IG9mIGZvY3VzYWJsZXMsIHNvIHdlIGhhdmUgdG9cbiAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IHRoZSBjbG9zZXN0IGVsZW1lbnQgaXMuIFdlIGRvIHRoaXMgYnkgaXRlcmF0aW5nIG92ZXJcbiAgICAgICAgLy8gYWxsIGVsZW1lbnRzIG9mIHRoZSBkb20sIGFjY2VwdGluZyBvbmx5IG9yaWdpbmFsRWxlbWVudCBhbmQgdGhlXG4gICAgICAgIC8vIGVsZW1lbnRzIHRoYXQgYXJlIGZvY3VzYWJsZS4gT25jZSB3ZSBmaW5kIG9yaWdpbmFsRWxlbWVudCwgd2Ugc2VsZWN0XG4gICAgICAgIC8vIGVpdGhlciB0aGUgcHJldmlvdXMgb3IgbmV4dCBlbGVtZW50IGRlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgaS5cbiAgICAgICAgY29uc3QgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LFxuICAgICAgICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWNjZXB0Tm9kZTogbiA9PiAoKG4gPT09IG9yaWdpbmFsRWxlbWVudCB8fCBmb2N1c2FibGVzLmluZGV4T2YoKG4gYXMgRWxlbWVudCkpICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFRcbiAgICAgICAgICAgICAgICAgICAgOiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1QpXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaXJzdE5vZGUgPSB0cmVlV2Fsa2VyLmN1cnJlbnROb2RlIGFzIEVsZW1lbnQ7XG4gICAgICAgIGxldCBjdXIgPSBmaXJzdE5vZGU7XG4gICAgICAgIGxldCBwcmV2O1xuICAgICAgICB3aGlsZSAoY3VyICYmIGN1ciAhPT0gb3JpZ2luYWxFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2ID0gY3VyO1xuICAgICAgICAgICAgY3VyID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpIGFzIEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICBlbGVtID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpIGFzIEVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtID0gcHJldjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTYW5pdHkgY2hlY2ssIGNhbid0IGJlIGV4ZXJjaXNlZFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgIGVsZW0gPSBmaXJzdE5vZGU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtID0gZm9jdXNhYmxlc1soaW5kZXggKyBpICsgZm9jdXNhYmxlcy5sZW5ndGgpICUgZm9jdXNhYmxlcy5sZW5ndGhdO1xuICAgIH1cblxuICAgIGluZGV4ID0gZm9jdXNhYmxlcy5pbmRleE9mKGVsZW0pO1xuICAgIC8vIFNhbml0eSBjaGVjaywgY2FuJ3QgYmUgZXhlcmNpc2VkXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IFwiT2ggbXksIHNvbWV0aGluZyB3ZW50IHdyb25nIVwiO1xuICAgIH1cblxuICAgIC8vIE5vdyB0aGF0IHdlIGtub3cgd2UgaGF2ZSBhbiBlbGVtZW50IHRoYXQgaXMgaW4gdGhlIGZvY3VzYWJsZSBlbGVtZW50XG4gICAgLy8gbGlzdCwgaXRlcmF0ZSBvdmVyIHRoZSBsaXN0IHRvIGZpbmQgb25lIHRoYXQgaXMgdmlzaWJsZS5cbiAgICBsZXQgc3RhcnRlZEF0O1xuICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gICAgd2hpbGUgKHN0YXJ0ZWRBdCAhPT0gaW5kZXggJiYgKHN0eWxlLnZpc2liaWxpdHkgIT09IFwidmlzaWJsZVwiIHx8IHN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSkge1xuICAgICAgICBpZiAoc3RhcnRlZEF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWRBdCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gKGluZGV4ICsgaSArIGZvY3VzYWJsZXMubGVuZ3RoKSAlIGZvY3VzYWJsZXMubGVuZ3RoO1xuICAgICAgICBlbGVtID0gZm9jdXNhYmxlc1tpbmRleF07XG4gICAgICAgIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgICB9XG5cbiAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIGlmIChlbGVtLm93bmVyRG9jdW1lbnQuY29udGFpbnMoZWxlbSkpIHtcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZWxlbSwgMCk7XG4gICAgfVxuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgIChlbGVtIGFzIEhUTUxFbGVtZW50KS5mb2N1cygpO1xuICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZW92aW1GcmFtZUZ1bmN0aW9ucyhnbG9iYWw6IElHbG9iYWxTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGV2YWxJblBhZ2U6IChfOiBudW1iZXIsIGpzOiBzdHJpbmcpID0+IGV4ZWN1dGVJblBhZ2UoanMpLFxuICAgICAgICBmb2N1c0lucHV0OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyZW52aW1FbGVtZW50O1xuICAgICAgICAgICAgaWYgKGZyYW1lSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpcmVudmltRWxlbWVudCA9IGdldEZvY3VzZWRFbGVtZW50KGdsb2JhbC5maXJlbnZpbUVsZW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1FbGVtZW50ID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbUVsZW1lbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBmb2N1c1BhZ2U6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltRWxlbWVudCA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGZpcmVudmltRWxlbWVudC5jbGVhckZvY3VzTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICBmb2N1c05leHQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGZvY3VzRWxlbWVudEJlZm9yZU9yQWZ0ZXIoZ2xvYmFsLCBmcmFtZUlkLCAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNQcmV2OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBmb2N1c0VsZW1lbnRCZWZvcmVPckFmdGVyKGdsb2JhbCwgZnJhbWVJZCwgLTEpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRFZGl0b3JJbmZvOiAoZnJhbWVJZDogbnVtYmVyKSA9PiBnbG9iYWxcbiAgICAgICAgICAgIC5maXJlbnZpbUVsZW1zXG4gICAgICAgICAgICAuZ2V0KGZyYW1lSWQpXG4gICAgICAgICAgICAuZ2V0QnVmZmVySW5mbygpLFxuICAgICAgICBnZXRFbGVtZW50Q29udGVudDogKGZyYW1lSWQ6IG51bWJlcikgPT4gZ2xvYmFsXG4gICAgICAgICAgICAuZmlyZW52aW1FbGVtc1xuICAgICAgICAgICAgLmdldChmcmFtZUlkKVxuICAgICAgICAgICAgLmdldFBhZ2VFbGVtZW50Q29udGVudCgpLFxuICAgICAgICBoaWRlRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGZpcmVudmltLmhpZGUoKTtcbiAgICAgICAgICAgIF9mb2N1c0lucHV0KGdsb2JhbCwgZmlyZW52aW0sIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBraWxsRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZpcmVudmltLmlzRm9jdXNlZCgpO1xuICAgICAgICAgICAgZmlyZW52aW0uZGV0YWNoRnJvbVBhZ2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmYgPSBnZXRDb25mKCk7XG4gICAgICAgICAgICBpZiAoaXNGb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbSwgY29uZi50YWtlb3ZlciAhPT0gXCJvbmNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2xvYmFsLmZpcmVudmltRWxlbXMuZGVsZXRlKGZyYW1lSWQpO1xuICAgICAgICB9LFxuICAgICAgICBwcmVzc0tleXM6IChmcmFtZUlkOiBudW1iZXIsIGtleXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCkucHJlc3NLZXlzKGtleXNUb0V2ZW50cyhrZXlzKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2l6ZUVkaXRvcjogKGZyYW1lSWQ6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBlbGVtLnJlc2l6ZVRvKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgZWxlbS5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW5BZnRlclJlc2l6ZUZyb21GcmFtZSgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRFbGVtZW50Q29udGVudDogKGZyYW1lSWQ6IG51bWJlciwgdGV4dDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpLnNldFBhZ2VFbGVtZW50Q29udGVudCh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RWxlbWVudEN1cnNvcjogKGZyYW1lSWQ6IG51bWJlciwgbGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKS5zZXRQYWdlRWxlbWVudEN1cnNvcihsaW5lLCBjb2x1bW4pO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRGVmaW5pdGlvbiBvZiBhIHByb3h5IHR5cGUgdGhhdCBsZXRzIHRoZSBmcmFtZSBzY3JpcHQgdHJhbnNwYXJlbnRseSBjYWxsIC8vXG4vLyB0aGUgY29udGVudCBzY3JpcHQncyBmdW5jdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuO1xuXG4vLyBUaGUgcHJveHkgYXV0b21hdGljYWxseSBhcHBlbmRzIHRoZSBmcmFtZUlkIHRvIHRoZSByZXF1ZXN0LCBzbyB3ZSBoaWRlIHRoYXQgZnJvbSB1c2Vyc1xudHlwZSBBcmd1bWVudHNUeXBlPFQ+ID0gVCBleHRlbmRzICh4OiBhbnksIC4uLmFyZ3M6IGluZmVyIFUpID0+IGFueSA/IFU6IG5ldmVyO1xudHlwZSBQcm9taXNpZnk8VD4gPSBUIGV4dGVuZHMgUHJvbWlzZTxhbnk+ID8gVCA6IFByb21pc2U8VD47XG5cbnR5cGUgZnQgPSBSZXR1cm5UeXBlPHR5cGVvZiBnZXROZW92aW1GcmFtZUZ1bmN0aW9ucz5cblxudHlwZSBQYWdlRXZlbnRzID0gXCJyZXNpemVcIiB8IFwiZnJhbWVfc2VuZEtleVwiIHwgXCJnZXRfYnVmX2NvbnRlbnRcIiB8IFwicGF1c2Vfa2V5aGFuZGxlclwiO1xudHlwZSBQYWdlSGFuZGxlcnMgPSAoYXJnczogYW55W10pID0+IHZvaWQ7XG5leHBvcnQgY2xhc3MgUGFnZUV2ZW50RW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlcjxQYWdlRXZlbnRzLCBQYWdlSGFuZGxlcnM+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdDogYW55LCBfc2VuZGVyOiBhbnksIF9zZW5kUmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChyZXF1ZXN0LmZ1bmNOYW1lWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBhdXNlX2tleWhhbmRsZXJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZnJhbWVfc2VuZEtleVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNpemVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KHJlcXVlc3QuZnVuY05hbWVbMF0sIHJlcXVlc3QuYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJnZXRfYnVmX2NvbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5lbWl0KHJlcXVlc3QuZnVuY05hbWVbMF0sIHJlc29sdmUpKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXZhbEluUGFnZVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNpemVFZGl0b3JcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0RWxlbWVudENvbnRlbnRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0RWRpdG9ySW5mb1wiOlxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGVkIGJ5IGZyYW1lIGZ1bmN0aW9uIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuaGFuZGxlZCBwYWdlIHJlcXVlc3Q6XCIsIHJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VUeXBlID0gUGFnZUV2ZW50RW1pdHRlciAmIHtcbiAgICBbayBpbiBrZXlvZiBmdF06ICguLi5hcmdzOiBBcmd1bWVudHNUeXBlPGZ0W2tdPikgPT4gUHJvbWlzaWZ5PFJldHVyblR5cGU8ZnRba10+Pjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYWdlUHJveHkgKGZyYW1lSWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHBhZ2UgPSBuZXcgUGFnZUV2ZW50RW1pdHRlcigpO1xuXG4gICAgbGV0IGZ1bmNOYW1lOiBrZXlvZiBQYWdlVHlwZTtcbiAgICBmb3IgKGZ1bmNOYW1lIGluIGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zKHt9IGFzIGFueSkpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWNsYXJlIGZ1bmMgaGVyZSBiZWNhdXNlIGZ1bmNOYW1lIGlzIGEgZ2xvYmFsIGFuZCB3b3VsZCBub3RcbiAgICAgICAgLy8gYmUgY2FwdHVyZWQgaW4gdGhlIGNsb3N1cmUgb3RoZXJ3aXNlXG4gICAgICAgIGNvbnN0IGZ1bmMgPSBmdW5jTmFtZTtcbiAgICAgICAgKHBhZ2UgYXMgYW55KVtmdW5jXSA9ICgoLi4uYXJyOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbZnJhbWVJZF0uY29uY2F0KGFyciksXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbZnVuY10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZVBhZ2VcIl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwYWdlIGFzIFBhZ2VUeXBlO1xufTtcbiIsIi8vIFRoZXNlIG1vZGVzIGFyZSBkZWZpbmVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9uZW92aW0vbmVvdmltL2Jsb2IvbWFzdGVyL3NyYy9udmltL2N1cnNvcl9zaGFwZS5jXG5leHBvcnQgdHlwZSBOdmltTW9kZSA9IFwiYWxsXCJcbiAgfCBcIm5vcm1hbFwiXG4gIHwgXCJ2aXN1YWxcIlxuICB8IFwiaW5zZXJ0XCJcbiAgfCBcInJlcGxhY2VcIlxuICB8IFwiY21kbGluZV9ub3JtYWxcIlxuICB8IFwiY21kbGluZV9pbnNlcnRcIlxuICB8IFwiY21kbGluZV9yZXBsYWNlXCJcbiAgfCBcIm9wZXJhdG9yXCJcbiAgfCBcInZpc3VhbF9zZWxlY3RcIlxuICB8IFwiY21kbGluZV9ob3ZlclwiXG4gIHwgXCJzdGF0dXNsaW5lX2hvdmVyXCJcbiAgfCBcInN0YXR1c2xpbmVfZHJhZ1wiXG4gIHwgXCJ2c2VwX2hvdmVyXCJcbiAgfCBcInZzZXBfZHJhZ1wiXG4gIHwgXCJtb3JlXCJcbiAgfCBcIm1vcmVfbGFzdGxpbmVcIlxuICB8IFwic2hvd21hdGNoXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNpdGVDb25maWcge1xuICAgIGNtZGxpbmU6IFwibmVvdmltXCIgfCBcImZpcmVudmltXCI7XG4gICAgY29udGVudDogXCJodG1sXCIgfCBcInRleHRcIjtcbiAgICBwcmlvcml0eTogbnVtYmVyO1xuICAgIHJlbmRlcmVyOiBcImh0bWxcIiB8IFwiY2FudmFzXCI7XG4gICAgc2VsZWN0b3I6IHN0cmluZztcbiAgICB0YWtlb3ZlcjogXCJhbHdheXNcIiB8IFwib25jZVwiIHwgXCJlbXB0eVwiIHwgXCJub25lbXB0eVwiIHwgXCJuZXZlclwiO1xuICAgIGZpbGVuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEdsb2JhbFNldHRpbmdzID0ge1xuICBhbHQ6IFwiYWxwaGFudW1cIiB8IFwiYWxsXCIsXG4gIFwiPEMtbj5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgXCI8Qy10PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICBcIjxDLXc+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPENTLW4+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPENTLXQ+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPENTLXc+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIGlnbm9yZUtleXM6IHsgW2tleSBpbiBOdmltTW9kZV06IHN0cmluZ1tdIH0sXG4gIGNtZGxpbmVUaW1lb3V0OiBudW1iZXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgZ2xvYmFsU2V0dGluZ3M6IEdsb2JhbFNldHRpbmdzO1xuICAgIGxvY2FsU2V0dGluZ3M6IHsgW2tleTogc3RyaW5nXTogSVNpdGVDb25maWcgfTtcbn1cblxubGV0IGNvbmY6IElDb25maWcgPSB1bmRlZmluZWQgYXMgSUNvbmZpZztcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlV2l0aERlZmF1bHRzKG9zOiBzdHJpbmcsIHNldHRpbmdzOiBhbnkpOiBJQ29uZmlnIHtcbiAgICBmdW5jdGlvbiBtYWtlRGVmYXVsdHMob2JqOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKG9ialtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW25hbWVdICE9PSB0eXBlb2YgdmFsdWVcbiAgICAgICAgICAgICAgICAgICB8fCBBcnJheS5pc0FycmF5KG9ialtuYW1lXSkgIT09IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFVzZXIgY29uZmlnIGVudHJ5ICR7bmFtZX0gZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgdHlwZS4gT3ZlcnJpZGluZy5gKTtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1ha2VEZWZhdWx0TG9jYWxTZXR0aW5nKHNldHQ6IHsgbG9jYWxTZXR0aW5nczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmo6IElTaXRlQ29uZmlnKSB7XG4gICAgICAgIG1ha2VEZWZhdWx0cyhzZXR0LmxvY2FsU2V0dGluZ3MsIHNpdGUsIHt9KTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgKE9iamVjdC5rZXlzKG9iaikgYXMgKGtleW9mIHR5cGVvZiBvYmopW10pKSB7XG4gICAgICAgICAgICBtYWtlRGVmYXVsdHMoc2V0dC5sb2NhbFNldHRpbmdzW3NpdGVdLCBrZXksIG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZXR0aW5ncyA9IHt9O1xuICAgIH1cblxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncywgXCJnbG9iYWxTZXR0aW5nc1wiLCB7fSk7XG4gICAgLy8gXCI8S0VZPlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiXG4gICAgLy8gIzEwMzogV2hlbiB1c2luZyB0aGUgYnJvd3NlcidzIGNvbW1hbmQgQVBJIHRvIGFsbG93IHNlbmRpbmcgYDxDLXc+YCB0b1xuICAgIC8vIGZpcmVudmltLCB3aGV0aGVyIHRoZSBkZWZhdWx0IGFjdGlvbiBzaG91bGQgYmUgcGVyZm9ybWVkIGlmIG5vIG5lb3ZpbVxuICAgIC8vIGZyYW1lIGlzIGZvY3VzZWQuXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcIjxDLW4+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPEMtdD5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Qy13PlwiLCBcImRlZmF1bHRcIik7XG4gICAgLy8gTm90ZTogPENTLSo+IGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYmVjYXVzZSBvZlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZW92aW0vbmVvdmltL2lzc3Vlcy8xMjAzN1xuICAgIC8vIE5vdGU6IDxDUy1uPiBkb2Vzbid0IG1hdGNoIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9uIGZpcmVmb3ggYmVjYXVzZSB0aGlzXG4gICAgLy8gd291bGQgcmVxdWlyZSB0aGUgc2Vzc2lvbnMgQVBJLiBJbnN0ZWFkLCBGaXJlZm94J3MgYmVoYXZpb3IgbWF0Y2hlc1xuICAgIC8vIENocm9tZSdzLlxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Q1Mtbj5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIC8vIE5vdGU6IDxDUy10PiBpcyB0aGVyZSBmb3IgY29tcGxldGVuZXNzIHNha2UncyBidXQgY2FuJ3QgYmUgZW11bGF0ZWQgaW5cbiAgICAvLyBDaHJvbWUgYW5kIEZpcmVmb3ggYmVjYXVzZSB0aGlzIHdvdWxkIHJlcXVpcmUgdGhlIHNlc3Npb25zIEFQSS5cbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPENTLXQ+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPENTLXc+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICAvLyAjNzE3OiBhbGxvdyBwYXNzaW5nIGtleXMgdG8gdGhlIGJyb3dzZXJcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiaWdub3JlS2V5c1wiLCB7fSk7XG4gICAgLy8gIzEwNTA6IGN1cnNvciBzb21ldGltZXMgY292ZXJlZCBieSBjb21tYW5kIGxpbmVcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiY21kbGluZVRpbWVvdXRcIiwgMzAwMCk7XG5cbiAgICAvLyBcImFsdFwiOiBcImFsbFwiIHwgXCJhbHBoYW51bVwiXG4gICAgLy8gIzIwMjogT25seSByZWdpc3RlciBhbHQga2V5IG9uIGFscGhhbnVtcyB0byBsZXQgc3dlZGlzaCBvc3ggdXNlcnMgdHlwZVxuICAgIC8vICAgICAgIHNwZWNpYWwgY2hhcnNcbiAgICAvLyBPbmx5IHRlc3RlZCBvbiBPU1gsIHdoZXJlIHdlIGRvbid0IHB1bGwgY292ZXJhZ2UgcmVwb3J0cywgc28gZG9uJ3RcbiAgICAvLyBpbnN0cnVtZW50IGZ1bmN0aW9uLlxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKG9zID09PSBcIm1hY1wiKSB7XG4gICAgICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCJhbHRcIiwgXCJhbHBoYW51bVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiYWx0XCIsIFwiYWxsXCIpO1xuICAgIH1cblxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncywgXCJsb2NhbFNldHRpbmdzXCIsIHt9KTtcbiAgICBtYWtlRGVmYXVsdExvY2FsU2V0dGluZyhzZXR0aW5ncywgXCIuKlwiLCB7XG4gICAgICAgIC8vIFwiY21kbGluZVwiOiBcIm5lb3ZpbVwiIHwgXCJmaXJlbnZpbVwiXG4gICAgICAgIC8vICMxNjg6IFVzZSBhbiBleHRlcm5hbCBjb21tYW5kbGluZSB0byBwcmVzZXJ2ZSBzcGFjZVxuICAgICAgICBjbWRsaW5lOiBcImZpcmVudmltXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwidGV4dFwiLFxuICAgICAgICBwcmlvcml0eTogMCxcbiAgICAgICAgcmVuZGVyZXI6IFwiY2FudmFzXCIsXG4gICAgICAgIHNlbGVjdG9yOiAndGV4dGFyZWE6bm90KFtyZWFkb25seV0pLCBkaXZbcm9sZT1cInRleHRib3hcIl0nLFxuICAgICAgICAvLyBcInRha2VvdmVyXCI6IFwiYWx3YXlzXCIgfCBcIm9uY2VcIiB8IFwiZW1wdHlcIiB8IFwibm9uZW1wdHlcIiB8IFwibmV2ZXJcIlxuICAgICAgICAvLyAjMjY1OiBPbiBcIm9uY2VcIiwgZG9uJ3QgYXV0b21hdGljYWxseSBicmluZyBiYWNrIGFmdGVyIDpxJ2luZyBpdFxuICAgICAgICB0YWtlb3ZlcjogXCJhbHdheXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwie2hvc3RuYW1lJTMyfV97cGF0aG5hbWUlMzJ9X3tzZWxlY3RvciUzMn1fe3RpbWVzdGFtcCUzMn0ue2V4dGVuc2lvbn1cIixcbiAgICB9KTtcbiAgICBtYWtlRGVmYXVsdExvY2FsU2V0dGluZyhzZXR0aW5ncywgXCJhYm91dDpibGFua1xcXFw/Y29tcG9zZVwiLCB7XG4gICAgICAgIGNtZGxpbmU6IFwiZmlyZW52aW1cIixcbiAgICAgICAgY29udGVudDogXCJ0ZXh0XCIsXG4gICAgICAgIHByaW9yaXR5OiAxLFxuICAgICAgICByZW5kZXJlcjogXCJjYW52YXNcIixcbiAgICAgICAgc2VsZWN0b3I6ICdib2R5JyxcbiAgICAgICAgdGFrZW92ZXI6IFwiYWx3YXlzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcIm1haWxfe3RpbWVzdGFtcCUzMn0uZW1sXCIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHNldHRpbmdzO1xufVxuXG5leHBvcnQgY29uc3QgY29uZlJlYWR5ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldCgpLnRoZW4oKG9iajogYW55KSA9PiB7XG4gICAgICAgIGNvbmYgPSBvYmo7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuYnJvd3Nlci5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcigoY2hhbmdlczogYW55KSA9PiB7XG4gICAgT2JqZWN0XG4gICAgICAgIC5lbnRyaWVzKGNoYW5nZXMpXG4gICAgICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV06IFtrZXlvZiBJQ29uZmlnLCBhbnldKSA9PiBjb25mUmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25mW2tleV0gPSB2YWx1ZS5uZXdWYWx1ZTtcbiAgICAgICAgfSkpO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHbG9iYWxDb25mKCkge1xuICAgIC8vIENhbid0IGJlIHRlc3RlZCBmb3JcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChjb25mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0R2xvYmFsQ29uZiBjYWxsZWQgYmVmb3JlIGNvbmZpZyB3YXMgcmVhZHlcIik7XG4gICAgfVxuICAgIHJldHVybiBjb25mLmdsb2JhbFNldHRpbmdzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZigpIHtcbiAgICByZXR1cm4gZ2V0Q29uZkZvclVybChkb2N1bWVudC5sb2NhdGlvbi5ocmVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZGb3JVcmwodXJsOiBzdHJpbmcpOiBJU2l0ZUNvbmZpZyB7XG4gICAgY29uc3QgbG9jYWxTZXR0aW5ncyA9IGNvbmYubG9jYWxTZXR0aW5ncztcbiAgICBmdW5jdGlvbiBvcjEodmFsOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQgZm9yXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAobG9jYWxTZXR0aW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiB5b3VyIHNldHRpbmdzIGFyZSB1bmRlZmluZWQuIFRyeSByZWxvYWRpbmcgdGhlIHBhZ2UuIElmIHRoaXMgZXJyb3IgcGVyc2lzdHMsIHRyeSB0aGUgdHJvdWJsZXNob290aW5nIGd1aWRlOiBodHRwczovL2dpdGh1Yi5jb20vZ2xhY2FtYnJlL2ZpcmVudmltL2Jsb2IvbWFzdGVyL1RST1VCTEVTSE9PVElORy5tZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oT2JqZWN0LmVudHJpZXMobG9jYWxTZXR0aW5ncykpXG4gICAgICAgIC5maWx0ZXIoKFtwYXQsIF9dKSA9PiAobmV3IFJlZ0V4cChwYXQpKS50ZXN0KHVybCkpXG4gICAgICAgIC5zb3J0KChlMSwgZTIpID0+IChvcjEoZTFbMV0ucHJpb3JpdHkpIC0gb3IxKGUyWzFdLnByaW9yaXR5KSkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgW18sIGN1cl0pID0+IE9iamVjdC5hc3NpZ24oYWNjLCBjdXIpLCB7fSBhcyBJU2l0ZUNvbmZpZyk7XG59XG4iLCJleHBvcnQgY29uc3Qgbm9uTGl0ZXJhbEtleXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgIFwiIFwiOiBcIjxTcGFjZT5cIixcbiAgICBcIjxcIjogXCI8bHQ+XCIsXG4gICAgXCJBcnJvd0Rvd25cIjogXCI8RG93bj5cIixcbiAgICBcIkFycm93TGVmdFwiOiBcIjxMZWZ0PlwiLFxuICAgIFwiQXJyb3dSaWdodFwiOiBcIjxSaWdodD5cIixcbiAgICBcIkFycm93VXBcIjogXCI8VXA+XCIsXG4gICAgXCJCYWNrc3BhY2VcIjogXCI8QlM+XCIsXG4gICAgXCJEZWxldGVcIjogXCI8RGVsPlwiLFxuICAgIFwiRW5kXCI6IFwiPEVuZD5cIixcbiAgICBcIkVudGVyXCI6IFwiPENSPlwiLFxuICAgIFwiRXNjYXBlXCI6IFwiPEVzYz5cIixcbiAgICBcIkYxXCI6IFwiPEYxPlwiLFxuICAgIFwiRjEwXCI6IFwiPEYxMD5cIixcbiAgICBcIkYxMVwiOiBcIjxGMTE+XCIsXG4gICAgXCJGMTJcIjogXCI8RjEyPlwiLFxuICAgIFwiRjEzXCI6IFwiPEYxMz5cIixcbiAgICBcIkYxNFwiOiBcIjxGMTQ+XCIsXG4gICAgXCJGMTVcIjogXCI8RjE1PlwiLFxuICAgIFwiRjE2XCI6IFwiPEYxNj5cIixcbiAgICBcIkYxN1wiOiBcIjxGMTc+XCIsXG4gICAgXCJGMThcIjogXCI8RjE4PlwiLFxuICAgIFwiRjE5XCI6IFwiPEYxOT5cIixcbiAgICBcIkYyXCI6IFwiPEYyPlwiLFxuICAgIFwiRjIwXCI6IFwiPEYyMD5cIixcbiAgICBcIkYyMVwiOiBcIjxGMjE+XCIsXG4gICAgXCJGMjJcIjogXCI8RjIyPlwiLFxuICAgIFwiRjIzXCI6IFwiPEYyMz5cIixcbiAgICBcIkYyNFwiOiBcIjxGMjQ+XCIsXG4gICAgXCJGM1wiOiBcIjxGMz5cIixcbiAgICBcIkY0XCI6IFwiPEY0PlwiLFxuICAgIFwiRjVcIjogXCI8RjU+XCIsXG4gICAgXCJGNlwiOiBcIjxGNj5cIixcbiAgICBcIkY3XCI6IFwiPEY3PlwiLFxuICAgIFwiRjhcIjogXCI8Rjg+XCIsXG4gICAgXCJGOVwiOiBcIjxGOT5cIixcbiAgICBcIkhvbWVcIjogXCI8SG9tZT5cIixcbiAgICBcIlBhZ2VEb3duXCI6IFwiPFBhZ2VEb3duPlwiLFxuICAgIFwiUGFnZVVwXCI6IFwiPFBhZ2VVcD5cIixcbiAgICBcIlRhYlwiOiBcIjxUYWI+XCIsXG4gICAgXCJcXFxcXCI6IFwiPEJzbGFzaD5cIixcbiAgICBcInxcIjogXCI8QmFyPlwiLFxufTtcblxuY29uc3Qgbm9uTGl0ZXJhbFZpbUtleXMgPSBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW50cmllcyhub25MaXRlcmFsS2V5cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKFt4LCB5XSkgPT4gW3ksIHhdKSk7XG5cbmNvbnN0IG5vbkxpdGVyYWxLZXlDb2Rlczoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICAgXCJFbnRlclwiOiAgICAgIDEzLFxuICAgIFwiU3BhY2VcIjogICAgICAzMixcbiAgICBcIlRhYlwiOiAgICAgICAgOSxcbiAgICBcIkRlbGV0ZVwiOiAgICAgNDYsXG4gICAgXCJFbmRcIjogICAgICAgIDM1LFxuICAgIFwiSG9tZVwiOiAgICAgICAzNixcbiAgICBcIkluc2VydFwiOiAgICAgNDUsXG4gICAgXCJQYWdlRG93blwiOiAgIDM0LFxuICAgIFwiUGFnZVVwXCI6ICAgICAzMyxcbiAgICBcIkFycm93RG93blwiOiAgNDAsXG4gICAgXCJBcnJvd0xlZnRcIjogIDM3LFxuICAgIFwiQXJyb3dSaWdodFwiOiAzOSxcbiAgICBcIkFycm93VXBcIjogICAgMzgsXG4gICAgXCJFc2NhcGVcIjogICAgIDI3LFxufTtcblxuLy8gR2l2ZW4gYSBcInNwZWNpYWxcIiBrZXkgcmVwcmVzZW50YXRpb24gKGUuZy4gPEVudGVyPiBvciA8TS1sPiksIHJldHVybnMgYW5cbi8vIGFycmF5IG9mIHRocmVlIGphdmFzY3JpcHQga2V5ZXZlbnRzLCB0aGUgZmlyc3Qgb25lIHJlcHJlc2VudGluZyB0aGVcbi8vIGNvcnJlc3BvbmRpbmcga2V5ZG93biwgdGhlIHNlY29uZCBvbmUgYSBrZXlwcmVzcyBhbmQgdGhlIHRoaXJkIG9uZSBhIGtleXVwXG4vLyBldmVudC5cbmZ1bmN0aW9uIG1vZEtleVRvRXZlbnRzKGs6IHN0cmluZykge1xuICAgIGxldCBtb2RzID0gXCJcIjtcbiAgICBsZXQga2V5ID0gbm9uTGl0ZXJhbFZpbUtleXNba107XG4gICAgbGV0IGN0cmxLZXkgPSBmYWxzZTtcbiAgICBsZXQgYWx0S2V5ID0gZmFsc2U7XG4gICAgbGV0IHNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IGsuc2xpY2UoMSwgLTEpLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgbW9kcyA9IGFyclswXTtcbiAgICAgICAga2V5ID0gYXJyWzFdO1xuICAgICAgICBjdHJsS2V5ID0gL2MvaS50ZXN0KG1vZHMpO1xuICAgICAgICBhbHRLZXkgPSAvYS9pLnRlc3QobW9kcyk7XG4gICAgICAgIGNvbnN0IHNwZWNpYWxDaGFyID0gXCI8XCIgKyBrZXkgKyBcIj5cIjtcbiAgICAgICAgaWYgKG5vbkxpdGVyYWxWaW1LZXlzW3NwZWNpYWxDaGFyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBrZXkgPSBub25MaXRlcmFsVmltS2V5c1tzcGVjaWFsQ2hhcl07XG4gICAgICAgICAgICBzaGlmdEtleSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hpZnRLZXkgPSBrZXkgIT09IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNvbWUgcGFnZXMgcmVseSBvbiBrZXlDb2RlcyB0byBmaWd1cmUgb3V0IHdoYXQga2V5IHdhcyBwcmVzc2VkLiBUaGlzIGlzXG4gICAgLy8gYXdmdWwgYmVjYXVzZSBrZXljb2RlcyBhcmVuJ3QgZ3VhcmFudGVlZCB0byBiZSB0aGUgc2FtZSBhY3Jyb3NzXG4gICAgLy8gYnJvd3NlcnMvT1Mva2V5Ym9hcmQgbGF5b3V0cyBidXQgdHJ5IHRvIGRvIHRoZSByaWdodCB0aGluZyBhbnl3YXkuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9pc3N1ZXMvNzIzXG4gICAgbGV0IGtleUNvZGUgPSAwO1xuICAgIGlmICgvXlthLXpBLVowLTldJC8udGVzdChrZXkpKSB7XG4gICAgICAgIGtleUNvZGUgPSBrZXkuY2hhckNvZGVBdCgwKTtcbiAgICB9IGVsc2UgaWYgKG5vbkxpdGVyYWxLZXlDb2Rlc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAga2V5Q29kZSA9IG5vbkxpdGVyYWxLZXlDb2Rlc1trZXldO1xuICAgIH1cbiAgICBjb25zdCBpbml0ID0geyBrZXksIGtleUNvZGUsIGN0cmxLZXksIGFsdEtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfTtcbiAgICByZXR1cm4gW1xuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleWRvd25cIiwgaW5pdCksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5cHJlc3NcIiwgaW5pdCksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5dXBcIiwgaW5pdCksXG4gICAgXTtcbn1cblxuLy8gR2l2ZW4gYSBcInNpbXBsZVwiIGtleSAoZS5nLiBgYWAsIGAxYOKApiksIHJldHVybnMgYW4gYXJyYXkgb2YgdGhyZWUgamF2YXNjcmlwdFxuLy8gZXZlbnRzIHJlcHJlc2VudGluZyB0aGUgYWN0aW9uIG9mIHByZXNzaW5nIHRoZSBrZXkuXG5mdW5jdGlvbiBrZXlUb0V2ZW50cyhrZXk6IHN0cmluZykge1xuICAgIGNvbnN0IHNoaWZ0S2V5ID0ga2V5ICE9PSBrZXkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleWRvd25cIiwgIHsga2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlwcmVzc1wiLCB7IGtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5dXBcIiwgICAgeyBrZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH0pLFxuICAgIF07XG59XG5cbi8vIEdpdmVuIGFuIGFycmF5IG9mIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBrZXlzIChlLmcuIFtcImFcIiwgXCI8RW50ZXI+XCIsIOKApl0pLFxuLy8gcmV0dXJucyBhbiBhcnJheSBvZiBqYXZhc2NyaXB0IGtleWJvYXJkIGV2ZW50cyB0aGF0IHNpbXVsYXRlIHRoZXNlIGtleXNcbi8vIGJlaW5nIHByZXNzZWQuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvRXZlbnRzKGtleXM6IHN0cmluZ1tdKSB7XG4gICAgLy8gQ29kZSB0byBzcGxpdCBtb2Qga2V5cyBhbmQgbm9uLW1vZCBrZXlzOlxuICAgIC8vIGNvbnN0IGtleXMgPSBzdHIubWF0Y2goLyhbPD5dW148Pl0rWzw+XSl8KFtePD5dKykvZylcbiAgICAvLyBpZiAoa2V5cyA9PT0gbnVsbCkge1xuICAgIC8vICAgICByZXR1cm4gW107XG4gICAgLy8gfVxuICAgIHJldHVybiBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGlmIChrZXlbMF0gPT09IFwiPFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kS2V5VG9FdmVudHMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5VG9FdmVudHMoa2V5KTtcbiAgICB9KS5mbGF0KCk7XG59XG5cbi8vIFR1cm5zIGEgbm9uLWxpdGVyYWwga2V5IChlLmcuIFwiRW50ZXJcIikgaW50byBhIHZpbS1lcXVpdmFsZW50IFwiPEVudGVyPlwiXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleTogc3RyaW5nKSB7XG4gICAgaWYgKG5vbkxpdGVyYWxLZXlzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbm9uTGl0ZXJhbEtleXNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cblxuLy8gQWRkIG1vZGlmaWVyIGBtb2RgIChgQWAsIGBDYCwgYFNg4oCmKSB0byBgdGV4dGAgKGEgdmltIGtleSBgYmAsIGA8RW50ZXI+YCxcbi8vIGA8Q1MteD5g4oCmKVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1vZGlmaWVyKG1vZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBsZXQgbWF0Y2g7XG4gICAgbGV0IG1vZGlmaWVycyA9IFwiXCI7XG4gICAgbGV0IGtleSA9IFwiXCI7XG4gICAgaWYgKChtYXRjaCA9IHRleHQubWF0Y2goL148KFtBLVpdezEsNX0pLSguKyk+JC8pKSkge1xuICAgICAgICBtb2RpZmllcnMgPSBtYXRjaFsxXTtcbiAgICAgICAga2V5ID0gbWF0Y2hbMl07XG4gICAgfSBlbHNlIGlmICgobWF0Y2ggPSB0ZXh0Lm1hdGNoKC9ePCguKyk+JC8pKSkge1xuICAgICAgICBrZXkgPSBtYXRjaFsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgPSB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gXCI8XCIgKyBtb2QgKyBtb2RpZmllcnMgKyBcIi1cIiArIGtleSArIFwiPlwiO1xufVxuIiwibGV0IGN1ckhvc3QgOiBzdHJpbmc7XG5cbi8vIENhbid0IGdldCBjb3ZlcmFnZSBmb3IgdGh1bmRlcmJpcmQuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKChicm93c2VyIGFzIGFueSkuY29tcG9zZVNjcmlwdHMgIT09IHVuZGVmaW5lZCB8fCBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID09PSBcImFib3V0OmJsYW5rP2NvbXBvc2VcIikge1xuICAgIGN1ckhvc3QgPSBcInRodW5kZXJiaXJkXCI7XG4vLyBDaHJvbWUgZG9lc24ndCBoYXZlIGEgXCJicm93c2VyXCIgb2JqZWN0LCBpbnN0ZWFkIGl0IHVzZXMgXCJjaHJvbWVcIi5cbn0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcIm1vei1leHRlbnNpb246XCIpIHtcbiAgICBjdXJIb3N0ID0gXCJmaXJlZm94XCI7XG59IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJjaHJvbWUtZXh0ZW5zaW9uOlwiKSB7XG4gICAgY3VySG9zdCA9IFwiY2hyb21lXCI7XG59XG5cbi8vIE9ubHkgdXNhYmxlIGluIGJhY2tncm91bmQgc2NyaXB0IVxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIC8vIENhbid0IGNvdmVyIGVycm9yIGNvbmRpdGlvblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGN1ckhvc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBFcnJvcihcIlVzZWQgaXNDaHJvbWUgaW4gY29udGVudCBzY3JpcHQhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gY3VySG9zdCA9PT0gXCJjaHJvbWVcIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1RodW5kZXJiaXJkKCkge1xuICAgIC8vIENhbid0IGNvdmVyIGVycm9yIGNvbmRpdGlvblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGN1ckhvc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBFcnJvcihcIlVzZWQgaXNUaHVuZGVyYmlyZCBpbiBjb250ZW50IHNjcmlwdCFcIik7XG4gICAgfVxuICAgIHJldHVybiBjdXJIb3N0ID09PSBcInRodW5kZXJiaXJkXCI7XG59XG5cbi8vIFJ1bnMgQ09ERSBpbiB0aGUgcGFnZSdzIGNvbnRleHQgYnkgc2V0dGluZyB1cCBhIGN1c3RvbSBldmVudCBsaXN0ZW5lcixcbi8vIGVtYmVkZGluZyBhIHNjcmlwdCBlbGVtZW50IHRoYXQgcnVucyB0aGUgcGllY2Ugb2YgY29kZSBhbmQgZW1pdHMgaXRzIHJlc3VsdFxuLy8gYXMgYW4gZXZlbnQuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUluUGFnZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIE9uIGZpcmVmb3gsIHVzZSBhbiBBUEkgdGhhdCBhbGxvd3MgY2lyY3VtdmVudGluZyBzb21lIENTUCByZXN0cmljdGlvbnNcbiAgICAvLyBVc2Ugd3JhcHBlZEpTT2JqZWN0IHRvIGRldGVjdCBhdmFpbGFiaWxpdHkgb2Ygc2FpZCBBUElcbiAgICAvLyBET04nVCB1c2Ugd2luZG93LmV2YWwgb24gb3RoZXIgcGxhdGVmb3JtcyAtIGl0IGRvZXNuJ3QgaGF2ZSB0aGVcbiAgICAvLyBzZW1hbnRpY3Mgd2UgbmVlZCFcbiAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLndyYXBwZWRKU09iamVjdCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdpbmRvdy5ldmFsKGNvZGUpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBjb25zdCBldmVudElkID0gKG5ldyBVUkwoYnJvd3Nlci5ydW50aW1lLmdldFVSTChcIlwiKSkpLmhvc3RuYW1lICsgTWF0aC5yYW5kb20oKTtcbiAgICAgICAgc2NyaXB0LmlubmVySFRNTCA9IGAoYXN5bmMgKGV2SWQpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAke2NvZGV9O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldklkLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgc3VjY2VzczogZmFsc2UsIHJlYXNvbjogZSB9LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoJHtKU09OLnN0cmluZ2lmeShldmVudElkKX0pYDtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRJZCwgKHsgZGV0YWlsIH06IGFueSkgPT4ge1xuICAgICAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIGlmIChkZXRhaWwuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGRldGFpbC5yZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChkZXRhaWwucmVhc29uKTtcbiAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG59XG5cbi8vIFZhcmlvdXMgZmlsdGVycyB0aGF0IGFyZSB1c2VkIHRvIGNoYW5nZSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgQnJvd3NlckFjdGlvblxuLy8gaWNvbi5cbmNvbnN0IHN2Z3BhdGggPSBcImZpcmVudmltLnN2Z1wiO1xuY29uc3QgdHJhbnNmb3JtYXRpb25zID0ge1xuICAgIGRpc2FibGVkOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gU2tpcCB0cmFuc3BhcmVudCBwaXhlbHNcbiAgICAgICAgICAgIGlmIChpbWdbaSArIDNdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZWFuID0gTWF0aC5mbG9vcigoaW1nW2ldICsgaW1nW2kgKyAxXSArIGltZ1tpICsgMl0pIC8gMyk7XG4gICAgICAgICAgICBpbWdbaV0gPSBtZWFuO1xuICAgICAgICAgICAgaW1nW2kgKyAxXSA9IG1lYW47XG4gICAgICAgICAgICBpbWdbaSArIDJdID0gbWVhbjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3I6IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBUdXJuIHRyYW5zcGFyZW50IHBpeGVscyByZWRcbiAgICAgICAgICAgIGlmIChpbWdbaSArIDNdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1nW2ldID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgM10gPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5vcm1hbDogKChfaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4gKHVuZGVmaW5lZCBhcyBuZXZlcikpLFxuICAgIG5vdGlmaWNhdGlvbjogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFR1cm4gdHJhbnNwYXJlbnQgcGl4ZWxzIHllbGxvd1xuICAgICAgICAgICAgaWYgKGltZ1tpICsgM10gPT09IDApIHtcbiAgICAgICAgICAgICAgICBpbWdbaV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAxXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDNdID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIEljb25LaW5kID0ga2V5b2YgdHlwZW9mIHRyYW5zZm9ybWF0aW9ucztcblxuLy8gVGFrZXMgYW4gaWNvbiBraW5kIGFuZCBkaW1lbnNpb25zIGFzIHBhcmFtZXRlciwgZHJhd3MgdGhhdCB0byBhIGNhbnZhcyBhbmRcbi8vIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCB3aXRoIHRoZSBjYW52YXMnIGltYWdlIGRhdGEuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvbkltYWdlRGF0YShraW5kOiBJY29uS2luZCwgd2lkdGggPSAzMiwgaGVpZ2h0ID0gMzIpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKHdpZHRoLCBoZWlnaHQpO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGNvbnN0IGlkID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdHJhbnNmb3JtYXRpb25zW2tpbmRdKGlkLmRhdGEpO1xuICAgICAgICByZXNvbHZlKGlkKTtcbiAgICB9KSk7XG4gICAgaW1nLnNyYyA9IHN2Z3BhdGg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gR2l2ZW4gYSB1cmwgYW5kIGEgc2VsZWN0b3IsIHRyaWVzIHRvIGNvbXB1dGUgYSBuYW1lIHRoYXQgd2lsbCBiZSB1bmlxdWUsXG4vLyBzaG9ydCBhbmQgcmVhZGFibGUgZm9yIHRoZSB1c2VyLlxuZXhwb3J0IGZ1bmN0aW9uIHRvRmlsZU5hbWUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIHVybDogc3RyaW5nLCBpZDogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgbGV0IHBhcnNlZFVSTDogeyBob3N0bmFtZTogc3RyaW5nLCBwYXRobmFtZTogc3RyaW5nIH07XG4gICAgdHJ5IHtcbiAgICAgICAgcGFyc2VkVVJMID0gbmV3IFVSTCh1cmwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gT25seSBoYXBwZW5zIHdpdGggdGh1bmRlcmJpcmQsIHdoZXJlIHdlIGNhbid0IGdldCBjb3ZlcmFnZVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBwYXJzZWRVUkwgPSB7IGhvc3RuYW1lOiAndGh1bmRlcmJpcmQnLCBwYXRobmFtZTogJ21haWwnIH07XG4gICAgfVxuXG4gICAgY29uc3Qgc2FuaXRpemUgPSAoczogc3RyaW5nKSA9PiAocy5tYXRjaCgvW2EtekEtWjAtOV0rL2cpIHx8IFtdKS5qb2luKFwiLVwiKTtcblxuICAgIGNvbnN0IGV4cGFuZCA9IChwYXR0ZXJuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3Qgbm9CcmFja2V0cyA9IHBhdHRlcm4uc2xpY2UoMSwgLTEpO1xuICAgICAgICBjb25zdCBbc3ltYm9sLCBsZW5ndGhdID0gbm9CcmFja2V0cy5zcGxpdChcIiVcIik7XG4gICAgICAgIGxldCB2YWx1ZSA9IFwiXCI7XG4gICAgICAgIHN3aXRjaCAoc3ltYm9sKSB7XG4gICAgICAgICAgICBjYXNlIFwiaG9zdG5hbWVcIjogdmFsdWUgPSBwYXJzZWRVUkwuaG9zdG5hbWU7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBhdGhuYW1lXCI6IHZhbHVlID0gc2FuaXRpemUocGFyc2VkVVJMLnBhdGhuYW1lKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2VsZWN0b3JcIjogdmFsdWUgPSBzYW5pdGl6ZShpZC5yZXBsYWNlKC86bnRoLW9mLXR5cGUvZywgXCJcIikpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aW1lc3RhbXBcIjogdmFsdWUgPSBzYW5pdGl6ZSgobmV3IERhdGUoKSkudG9JU09TdHJpbmcoKSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImV4dGVuc2lvblwiOiB2YWx1ZSA9IGxhbmd1YWdlVG9FeHRlbnNpb25zKGxhbmd1YWdlKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKGBVbnJlY29nbml6ZWQgZmlsZW5hbWUgcGF0dGVybjogJHtwYXR0ZXJufWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgtbGVuZ3RoKTtcbiAgICB9O1xuXG4gICAgbGV0IHJlc3VsdCA9IGZvcm1hdFN0cmluZztcbiAgICBjb25zdCBtYXRjaGVzID0gZm9ybWF0U3RyaW5nLm1hdGNoKC97W159XSp9L2cpO1xuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcy5maWx0ZXIocyA9PiBzICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShtYXRjaCwgZXhwYW5kKG1hdGNoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gR2l2ZW4gYSBsYW5ndWFnZSBuYW1lLCByZXR1cm5zIGEgZmlsZW5hbWUgZXh0ZW5zaW9uLiBDYW4gcmV0dXJuIHVuZGVmaW5lZC5cbmV4cG9ydCBmdW5jdGlvbiBsYW5ndWFnZVRvRXh0ZW5zaW9ucyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgaWYgKGxhbmd1YWdlID09PSB1bmRlZmluZWQgfHwgbGFuZ3VhZ2UgPT09IG51bGwpIHtcbiAgICAgICAgbGFuZ3VhZ2UgPSBcIlwiO1xuICAgIH1cbiAgICBjb25zdCBsYW5nID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHN3aXRjaCAobGFuZykge1xuICAgICAgICBjYXNlIFwiYXBsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJhcGxcIjtcbiAgICAgICAgY2FzZSBcImJyYWluZnVja1wiOiAgICAgICAgcmV0dXJuIFwiYmZcIjtcbiAgICAgICAgY2FzZSBcImNcIjogICAgICAgICAgICAgICAgcmV0dXJuIFwiY1wiO1xuICAgICAgICBjYXNlIFwiYyNcIjogICAgICAgICAgICAgICByZXR1cm4gXCJjc1wiO1xuICAgICAgICBjYXNlIFwiYysrXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJjcHBcIjtcbiAgICAgICAgY2FzZSBcImNleWxvblwiOiAgICAgICAgICAgcmV0dXJuIFwiY2V5bG9uXCI7XG4gICAgICAgIGNhc2UgXCJjbGlrZVwiOiAgICAgICAgICAgIHJldHVybiBcImNcIjtcbiAgICAgICAgY2FzZSBcImNsb2p1cmVcIjogICAgICAgICAgcmV0dXJuIFwiY2xqXCI7XG4gICAgICAgIGNhc2UgXCJjbWFrZVwiOiAgICAgICAgICAgIHJldHVybiBcIi5jbWFrZVwiO1xuICAgICAgICBjYXNlIFwiY29ib2xcIjogICAgICAgICAgICByZXR1cm4gXCJjYmxcIjtcbiAgICAgICAgY2FzZSBcImNvZmZlZXNjcmlwdFwiOiAgICAgcmV0dXJuIFwiY29mZmVlXCI7XG4gICAgICAgIGNhc2UgXCJjb21tb25saXNwXCI6ICAgICAgcmV0dXJuIFwibGlzcFwiO1xuICAgICAgICBjYXNlIFwiY3J5c3RhbFwiOiAgICAgICAgICByZXR1cm4gXCJjclwiO1xuICAgICAgICBjYXNlIFwiY3NzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJjc3NcIjtcbiAgICAgICAgY2FzZSBcImN5dGhvblwiOiAgICAgICAgICAgcmV0dXJuIFwicHlcIjtcbiAgICAgICAgY2FzZSBcImRcIjogICAgICAgICAgICAgICAgcmV0dXJuIFwiZFwiO1xuICAgICAgICBjYXNlIFwiZGFydFwiOiAgICAgICAgICAgICByZXR1cm4gXCJkYXJ0XCI7XG4gICAgICAgIGNhc2UgXCJkaWZmXCI6ICAgICAgICAgICAgIHJldHVybiBcImRpZmZcIjtcbiAgICAgICAgY2FzZSBcImRvY2tlcmZpbGVcIjogICAgICAgcmV0dXJuIFwiZG9ja2VyZmlsZVwiO1xuICAgICAgICBjYXNlIFwiZHRkXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJkdGRcIjtcbiAgICAgICAgY2FzZSBcImR5bGFuXCI6ICAgICAgICAgICAgcmV0dXJuIFwiZHlsYW5cIjtcbiAgICAgICAgLy8gRWlmZmVsIHdhcyB0aGVyZSBmaXJzdCBidXQgZWxpeGlyIHNlZW1zIG1vcmUgbGlrZWx5XG4gICAgICAgIC8vIGNhc2UgXCJlaWZmZWxcIjogICAgICAgICAgIHJldHVybiBcImVcIjtcbiAgICAgICAgY2FzZSBcImVsaXhpclwiOiAgICAgICAgICAgcmV0dXJuIFwiZVwiO1xuICAgICAgICBjYXNlIFwiZWxtXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJlbG1cIjtcbiAgICAgICAgY2FzZSBcImVybGFuZ1wiOiAgICAgICAgICAgcmV0dXJuIFwiZXJsXCI7XG4gICAgICAgIGNhc2UgXCJmI1wiOiAgICAgICAgICAgICAgIHJldHVybiBcImZzXCI7XG4gICAgICAgIGNhc2UgXCJmYWN0b3JcIjogICAgICAgICAgIHJldHVybiBcImZhY3RvclwiO1xuICAgICAgICBjYXNlIFwiZm9ydGhcIjogICAgICAgICAgICByZXR1cm4gXCJmdGhcIjtcbiAgICAgICAgY2FzZSBcImZvcnRyYW5cIjogICAgICAgICAgcmV0dXJuIFwiZjkwXCI7XG4gICAgICAgIGNhc2UgXCJnYXNcIjogICAgICAgICAgICAgIHJldHVybiBcImFzbVwiO1xuICAgICAgICBjYXNlIFwiZ29cIjogICAgICAgICAgICAgICByZXR1cm4gXCJnb1wiO1xuICAgICAgICAvLyBHRk06IENvZGVNaXJyb3IncyBnaXRodWItZmxhdm9yZWQgbWFya2Rvd25cbiAgICAgICAgY2FzZSBcImdmbVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwibWRcIjtcbiAgICAgICAgY2FzZSBcImdyb292eVwiOiAgICAgICAgICAgcmV0dXJuIFwiZ3Jvb3Z5XCI7XG4gICAgICAgIGNhc2UgXCJoYW1sXCI6ICAgICAgICAgICAgIHJldHVybiBcImhhbWxcIjtcbiAgICAgICAgY2FzZSBcImhhbmRsZWJhcnNcIjogICAgICAgcmV0dXJuIFwiaGJzXCI7XG4gICAgICAgIGNhc2UgXCJoYXNrZWxsXCI6ICAgICAgICAgIHJldHVybiBcImhzXCI7XG4gICAgICAgIGNhc2UgXCJoYXhlXCI6ICAgICAgICAgICAgIHJldHVybiBcImh4XCI7XG4gICAgICAgIGNhc2UgXCJodG1sXCI6ICAgICAgICAgICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImh0bWxlbWJlZGRlZFwiOiAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiaHRtbG1peGVkXCI6ICAgICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJpcHl0aG9uXCI6ICAgICAgICAgIHJldHVybiBcInB5XCI7XG4gICAgICAgIGNhc2UgXCJpcHl0aG9uZm1cIjogICAgICAgIHJldHVybiBcIm1kXCI7XG4gICAgICAgIGNhc2UgXCJqYXZhXCI6ICAgICAgICAgICAgIHJldHVybiBcImphdmFcIjtcbiAgICAgICAgY2FzZSBcImphdmFzY3JpcHRcIjogICAgICAgcmV0dXJuIFwianNcIjtcbiAgICAgICAgY2FzZSBcImppbmphMlwiOiAgICAgICAgICAgcmV0dXJuIFwiamluamFcIjtcbiAgICAgICAgY2FzZSBcImp1bGlhXCI6ICAgICAgICAgICAgcmV0dXJuIFwiamxcIjtcbiAgICAgICAgY2FzZSBcImpzeFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwianN4XCI7XG4gICAgICAgIGNhc2UgXCJrb3RsaW5cIjogICAgICAgICAgIHJldHVybiBcImt0XCI7XG4gICAgICAgIGNhc2UgXCJsYXRleFwiOiAgICAgICAgICAgIHJldHVybiBcImxhdGV4XCI7XG4gICAgICAgIGNhc2UgXCJsZXNzXCI6ICAgICAgICAgICAgIHJldHVybiBcImxlc3NcIjtcbiAgICAgICAgY2FzZSBcImx1YVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwibHVhXCI7XG4gICAgICAgIGNhc2UgXCJtYXJrZG93blwiOiAgICAgICAgIHJldHVybiBcIm1kXCI7XG4gICAgICAgIGNhc2UgXCJtbGxpa2VcIjogICAgICAgICAgICByZXR1cm4gXCJtbFwiO1xuICAgICAgICBjYXNlIFwib2NhbWxcIjogICAgICAgICAgICByZXR1cm4gXCJtbFwiO1xuICAgICAgICBjYXNlIFwib2N0YXZlXCI6ICAgICAgICAgICByZXR1cm4gXCJtXCI7XG4gICAgICAgIGNhc2UgXCJwYXNjYWxcIjogICAgICAgICAgIHJldHVybiBcInBhc1wiO1xuICAgICAgICBjYXNlIFwicGVybFwiOiAgICAgICAgICAgICByZXR1cm4gXCJwbFwiO1xuICAgICAgICBjYXNlIFwicGhwXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJwaHBcIjtcbiAgICAgICAgY2FzZSBcInBvd2Vyc2hlbGxcIjogICAgICAgcmV0dXJuIFwicHMxXCI7XG4gICAgICAgIGNhc2UgXCJweXRob25cIjogICAgICAgICAgIHJldHVybiBcInB5XCI7XG4gICAgICAgIGNhc2UgXCJyXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcInJcIjtcbiAgICAgICAgY2FzZSBcInJzdFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwicnN0XCI7XG4gICAgICAgIGNhc2UgXCJydWJ5XCI6ICAgICAgICAgICAgIHJldHVybiBcInJ1YnlcIjtcbiAgICAgICAgY2FzZSBcInJ1c3RcIjogICAgICAgICAgICAgcmV0dXJuIFwicnNcIjtcbiAgICAgICAgY2FzZSBcInNhc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwic2FzXCI7XG4gICAgICAgIGNhc2UgXCJzYXNzXCI6ICAgICAgICAgICAgIHJldHVybiBcInNhc3NcIjtcbiAgICAgICAgY2FzZSBcInNjYWxhXCI6ICAgICAgICAgICAgcmV0dXJuIFwic2NhbGFcIjtcbiAgICAgICAgY2FzZSBcInNjaGVtZVwiOiAgICAgICAgICAgcmV0dXJuIFwic2NtXCI7XG4gICAgICAgIGNhc2UgXCJzY3NzXCI6ICAgICAgICAgICAgIHJldHVybiBcInNjc3NcIjtcbiAgICAgICAgY2FzZSBcInNtYWxsdGFsa1wiOiAgICAgICAgcmV0dXJuIFwic3RcIjtcbiAgICAgICAgY2FzZSBcInNoZWxsXCI6ICAgICAgICAgICAgcmV0dXJuIFwic2hcIjtcbiAgICAgICAgY2FzZSBcInNxbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwic3FsXCI7XG4gICAgICAgIGNhc2UgXCJzdGV4XCI6ICAgICAgICAgICAgIHJldHVybiBcImxhdGV4XCI7XG4gICAgICAgIGNhc2UgXCJzd2lmdFwiOiAgICAgICAgICAgIHJldHVybiBcInN3aWZ0XCI7XG4gICAgICAgIGNhc2UgXCJ0Y2xcIjogICAgICAgICAgICAgIHJldHVybiBcInRjbFwiO1xuICAgICAgICBjYXNlIFwidG9tbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ0b21sXCI7XG4gICAgICAgIGNhc2UgXCJ0d2lnXCI6ICAgICAgICAgICAgIHJldHVybiBcInR3aWdcIjtcbiAgICAgICAgY2FzZSBcInR5cGVzY3JpcHRcIjogICAgICAgcmV0dXJuIFwidHNcIjtcbiAgICAgICAgY2FzZSBcInZiXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwidmJcIjtcbiAgICAgICAgY2FzZSBcInZic2NyaXB0XCI6ICAgICAgICAgcmV0dXJuIFwidmJzXCI7XG4gICAgICAgIGNhc2UgXCJ2ZXJpbG9nXCI6ICAgICAgICAgIHJldHVybiBcInN2XCI7XG4gICAgICAgIGNhc2UgXCJ2aGRsXCI6ICAgICAgICAgICAgIHJldHVybiBcInZoZGxcIjtcbiAgICAgICAgY2FzZSBcInhtbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwieG1sXCI7XG4gICAgICAgIGNhc2UgXCJ5YW1sXCI6ICAgICAgICAgICAgIHJldHVybiBcInlhbWxcIjtcbiAgICAgICAgY2FzZSBcIno4MFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiejhhXCI7XG4gICAgfVxuICAgIHJldHVybiBcInR4dFwiO1xufVxuXG4vLyBNYWtlIHRzbGludCBoYXBweVxuY29uc3QgZm9udEZhbWlseSA9IFwiZm9udC1mYW1pbHlcIjtcblxuLy8gQ2FuJ3QgYmUgdGVzdGVkIGUyZSA6L1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNpbmdsZUd1aWZvbnQoZ3VpZm9udDogc3RyaW5nLCBkZWZhdWx0czogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGd1aWZvbnQuc3BsaXQoXCI6XCIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzKTtcbiAgICBpZiAoL15bYS16QS1aMC05XSskLy50ZXN0KG9wdGlvbnNbMF0pKSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSA9IG9wdGlvbnNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldID0gSlNPTi5zdHJpbmdpZnkob3B0aW9uc1swXSk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0c1tmb250RmFtaWx5XSkge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gKz0gYCwgJHtkZWZhdWx0c1tmb250RmFtaWx5XX1gO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucy5zbGljZSgxKS5yZWR1Y2UoKGFjYywgb3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvblswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtc2l6ZVwiXSA9IGAke29wdGlvbi5zbGljZSgxKX1wdGA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtd2VpZ2h0XCJdID0gXCJib2xkXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgICAgICAgICAgICAgIGFjY1tcImZvbnQtc3R5bGVcIl0gPSBcIml0YWxpY1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidVwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcInVuZGVybGluZVwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcImxpbmUtdGhyb3VnaFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwid1wiOiAvLyBDYW4ndCBzZXQgZm9udCB3aWR0aC4gV291bGQgaGF2ZSB0byBhZGp1c3QgY2VsbCB3aWR0aC5cbiAgICAgICAgICAgICAgICBjYXNlIFwiY1wiOiAvLyBDYW4ndCBzZXQgY2hhcmFjdGVyIHNldFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHJlc3VsdCBhcyBhbnkpO1xufTtcblxuLy8gUGFyc2VzIGEgZ3VpZm9udCBkZWNsYXJhdGlvbiBhcyBkZXNjcmliZWQgaW4gYDpoIEUyNDRgXG4vLyBkZWZhdWx0czogZGVmYXVsdCB2YWx1ZSBmb3IgZWFjaCBvZi5cbi8vIENhbid0IGJlIHRlc3RlZCBlMmUgOi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHdWlmb250KGd1aWZvbnQ6IHN0cmluZywgZGVmYXVsdHM6IGFueSkge1xuICAgIGNvbnN0IGZvbnRzID0gZ3VpZm9udC5zcGxpdChcIixcIikucmV2ZXJzZSgpO1xuICAgIHJldHVybiBmb250cy5yZWR1Y2UoKGFjYywgY3VyKSA9PiBwYXJzZVNpbmdsZUd1aWZvbnQoY3VyLCBhY2MpLCBkZWZhdWx0cyk7XG59XG5cbi8vIENvbXB1dGVzIGEgdW5pcXVlIHNlbGVjdG9yIGZvciBpdHMgYXJndW1lbnQuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNlbGVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gdW5pcXVlU2VsZWN0b3IoZTogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICAvLyBPbmx5IG1hdGNoaW5nIGFscGhhbnVtZXJpYyBzZWxlY3RvcnMgYmVjYXVzZSBvdGhlcnMgY2hhcnMgbWlnaHQgaGF2ZSBzcGVjaWFsIG1lYW5pbmcgaW4gQ1NTXG4gICAgICAgIGlmIChlLmlkICYmIGUuaWQubWF0Y2goXCJeW2EtekEtWjAtOV8tXSskXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGUudGFnTmFtZSArIGBbaWQ9XCIke2UuaWR9XCJdYDtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGlkKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgICAgICBpZiAoIWUucGFyZW50RWxlbWVudCkgeyByZXR1cm4gXCJIVE1MXCI7IH1cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaW5kZXggPVxuICAgICAgICAgICAgQXJyYXkuZnJvbShlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC50YWdOYW1lID09PSBlLnRhZ05hbWUpXG4gICAgICAgICAgICAgICAgLmluZGV4T2YoZSkgKyAxO1xuICAgICAgICByZXR1cm4gYCR7dW5pcXVlU2VsZWN0b3IoZS5wYXJlbnRFbGVtZW50KX0gPiAke2UudGFnTmFtZX06bnRoLW9mLXR5cGUoJHtpbmRleH0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXF1ZVNlbGVjdG9yKGVsZW1lbnQpO1xufVxuXG4vLyBUdXJucyBhIG51bWJlciBpbnRvIGl0cyBoYXNoKzYgbnVtYmVyIGhleGFkZWNpbWFsIHJlcHJlc2VudGF0aW9uLlxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4Q3NzKG46IG51bWJlcikge1xuICAgIGlmIChuID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RyID0gbi50b1N0cmluZygxNik7XG4gICAgLy8gUGFkIHdpdGggbGVhZGluZyB6ZXJvc1xuICAgIHJldHVybiBcIiNcIiArIChuZXcgQXJyYXkoNiAtIHN0ci5sZW5ndGgpKS5maWxsKFwiMFwiKS5qb2luKFwiXCIpICsgc3RyO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEZpcmVudmltRWxlbWVudCB9IGZyb20gXCIuL0ZpcmVudmltRWxlbWVudFwiO1xuaW1wb3J0IHsgYXV0b2ZpbGwgfSBmcm9tIFwiLi9hdXRvZmlsbFwiO1xuaW1wb3J0IHsgY29uZlJlYWR5LCBnZXRDb25mIH0gZnJvbSBcIi4vdXRpbHMvY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMsIGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMsIGdldFRhYkZ1bmN0aW9ucyB9IGZyb20gXCIuL3BhZ2VcIjtcblxuaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPT09IFwiaHR0cHM6Ly9naXRodWIuY29tL2dsYWNhbWJyZS9maXJlbnZpbS9pc3N1ZXMvbmV3XCJcbiAgICB8fCBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJmaWxlOlwiICYmIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuZW5kc1dpdGgoXCJnaXRodWIuaHRtbFwiKSkge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGF1dG9maWxsKTtcbn1cblxuLy8gUHJvbWlzZSB1c2VkIHRvIGltcGxlbWVudCBhIGxvY2tpbmcgbWVjaGFuaXNtIHByZXZlbnRpbmcgY29uY3VycmVudCBjcmVhdGlvblxuLy8gb2YgbmVvdmltIGZyYW1lc1xubGV0IGZyYW1lSWRMb2NrID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbmV4cG9ydCBjb25zdCBmaXJlbnZpbUdsb2JhbCA9IHtcbiAgICAvLyBXaGV0aGVyIEZpcmVudmltIGlzIGRpc2FibGVkIGluIHRoaXMgdGFiXG4gICAgZGlzYWJsZWQ6IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgYXJnczogW1wiZGlzYWJsZWRcIl0sXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcImdldFRhYlZhbHVlXCJdLFxuICAgICAgICB9KVxuICAgICAgICAvLyBOb3RlOiB0aGlzIHJlbGllcyBvbiBzZXREaXNhYmxlZCBleGlzdGluZyBpbiB0aGUgb2JqZWN0IHJldHVybmVkIGJ5XG4gICAgICAgIC8vIGdldEZ1bmN0aW9ucyBhbmQgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdyBvYmplY3RcbiAgICAgICAgLnRoZW4oKGRpc2FibGVkOiBib29sZWFuKSA9PiAod2luZG93IGFzIGFueSkuc2V0RGlzYWJsZWQoZGlzYWJsZWQpKSxcbiAgICAvLyBQcm9taXNlLXJlc29sdXRpb24gZnVuY3Rpb24gY2FsbGVkIHdoZW4gYSBmcmFtZUlkIGlzIHJlY2VpdmVkIGZyb20gdGhlXG4gICAgLy8gYmFja2dyb3VuZCBzY3JpcHRcbiAgICBmcmFtZUlkUmVzb2x2ZTogKF86IG51bWJlcik6IHZvaWQgPT4gdW5kZWZpbmVkLFxuICAgIC8vIGxhc3RGb2N1c2VkQ29udGVudFNjcmlwdCBrZWVwcyB0cmFjayBvZiB0aGUgbGFzdCBjb250ZW50IGZyYW1lIHRoYXQgaGFzXG4gICAgLy8gYmVlbiBmb2N1c2VkLiBUaGlzIGlzIG5lY2Vzc2FyeSBpbiBwYWdlcyB0aGF0IGNvbnRhaW4gbXVsdGlwbGUgZnJhbWVzXG4gICAgLy8gKGFuZCB0aHVzIG11bHRpcGxlIGNvbnRlbnQgc2NyaXB0cyk6IGZvciBleGFtcGxlLCBpZiB1c2VycyBwcmVzcyB0aGVcbiAgICAvLyBnbG9iYWwga2V5Ym9hcmQgc2hvcnRjdXQgPEMtbj4sIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdCBzZW5kcyBhIFwiZ2xvYmFsXCJcbiAgICAvLyBtZXNzYWdlIHRvIGFsbCBvZiB0aGUgYWN0aXZlIHRhYidzIGNvbnRlbnQgc2NyaXB0cy4gRm9yIGEgY29udGVudCBzY3JpcHRcbiAgICAvLyB0byBrbm93IGlmIGl0IHNob3VsZCByZWFjdCB0byBhIGdsb2JhbCBtZXNzYWdlLCBpdCBqdXN0IG5lZWRzIHRvIGNoZWNrXG4gICAgLy8gaWYgaXQgaXMgdGhlIGxhc3QgYWN0aXZlIGNvbnRlbnQgc2NyaXB0LlxuICAgIGxhc3RGb2N1c2VkQ29udGVudFNjcmlwdDogMCxcbiAgICAvLyBudmltaWZ5OiB0cmlnZ2VyZWQgd2hlbiBhbiBlbGVtZW50IGlzIGZvY3VzZWQsIHRha2VzIGNhcmUgb2YgY3JlYXRpbmdcbiAgICAvLyB0aGUgZWRpdG9yIGlmcmFtZSwgYXBwZW5kaW5nIGl0IHRvIHRoZSBwYWdlIGFuZCBmb2N1c2luZyBpdC5cbiAgICBudmltaWZ5OiBhc3luYyAoZXZ0OiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4ge1xuICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwuZGlzYWJsZWQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBhd2FpdCBmaXJlbnZpbUdsb2JhbC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gY3JlYXRpbmcgbmV3IGZyYW1lcywgd2UgbmVlZCB0byBrbm93IHRoZWlyIGZyYW1lSWQgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gY29tbXVuaWNhdGUgd2l0aCB0aGVtLiBUaGlzIGNhbid0IGJlIHJldHJpZXZlZCB0aHJvdWdoIGFcbiAgICAgICAgLy8gc3luY2hyb25vdXMsIGluLXBhZ2UgY2FsbCBzbyB0aGUgbmV3IGZyYW1lIGhhcyB0byB0ZWxsIHRoZVxuICAgICAgICAvLyBiYWNrZ3JvdW5kIHNjcmlwdCB0byBzZW5kIGl0cyBmcmFtZSBpZCB0byB0aGUgcGFnZS4gUHJvYmxlbSBpcywgaWZcbiAgICAgICAgLy8gbXVsdGlwbGUgZnJhbWVzIGFyZSBjcmVhdGVkIGluIGEgdmVyeSBzaG9ydCBhbW91bnQgb2YgdGltZSwgd2VcbiAgICAgICAgLy8gYXJlbid0IGd1YXJhbnRlZWQgdG8gcmVjZWl2ZSB0aGVzZSBmcmFtZUlkcyBpbiB0aGUgb3JkZXIgaW4gd2hpY2hcbiAgICAgICAgLy8gdGhlIGZyYW1lcyB3ZXJlIGNyZWF0ZWQuIFNvIHdlIGhhdmUgdG8gaW1wbGVtZW50IGEgbG9ja2luZyBtZWNoYW5pc21cbiAgICAgICAgLy8gdG8gbWFrZSBzdXJlIHRoYXQgd2UgZG9uJ3QgY3JlYXRlIG5ldyBmcmFtZXMgdW50aWwgd2UgcmVjZWl2ZWQgdGhlXG4gICAgICAgIC8vIGZyYW1lSWQgb2YgdGhlIHByZXZpb3VzbHkgY3JlYXRlZCBmcmFtZS5cbiAgICAgICAgbGV0IGxvY2s7XG4gICAgICAgIHdoaWxlIChsb2NrICE9PSBmcmFtZUlkTG9jaykge1xuICAgICAgICAgICAgbG9jayA9IGZyYW1lSWRMb2NrO1xuICAgICAgICAgICAgYXdhaXQgZnJhbWVJZExvY2s7XG4gICAgICAgIH1cblxuICAgICAgICBmcmFtZUlkTG9jayA9IG5ldyBQcm9taXNlKGFzeW5jICh1bmxvY2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gYXV0byBpcyB0cnVlIHdoZW4gbnZpbWlmeSgpIGlzIGNhbGxlZCBhcyBhbiBldmVudCBsaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gZm9yY2VOdmltaWZ5KClcbiAgICAgICAgICAgIGNvbnN0IGF1dG8gPSAoZXZ0IGluc3RhbmNlb2YgRm9jdXNFdmVudCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRha2VvdmVyID0gZ2V0Q29uZigpLnRha2VvdmVyO1xuICAgICAgICAgICAgaWYgKGZpcmVudmltR2xvYmFsLmRpc2FibGVkIHx8IChhdXRvICYmIHRha2VvdmVyID09PSBcIm5ldmVyXCIpKSB7XG4gICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IG5ldyBGaXJlbnZpbUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgZXZ0LnRhcmdldCBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5udmltaWZ5LFxuICAgICAgICAgICAgICAgIChpZDogbnVtYmVyKSA9PiBmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLmRlbGV0ZShpZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBmaXJlbnZpbS5nZXRFZGl0b3IoKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGFscmVhZHkgaGFzIGEgbmVvdmltIGZyYW1lLCBzdG9wXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5UnVubmluZyA9IEFycmF5LmZyb20oZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy52YWx1ZXMoKSlcbiAgICAgICAgICAgICAgICAuZmluZCgoaW5zdGFuY2UpID0+IGluc3RhbmNlLmdldEVsZW1lbnQoKSA9PT0gZWRpdG9yLmdldEVsZW1lbnQoKSk7XG4gICAgICAgICAgICBpZiAoYWxyZWFkeVJ1bm5pbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBzcGFuIG1pZ2h0IGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UgYnkgdGhlIHBhZ2VcbiAgICAgICAgICAgICAgICAvLyAodGhpcyBoYXBwZW5zIG9uIEppcmEvQ29uZmx1ZW5jZSBmb3IgZXhhbXBsZSkgc28gd2UgY2hlY2tcbiAgICAgICAgICAgICAgICAvLyBmb3IgdGhhdC5cbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gYWxyZWFkeVJ1bm5pbmcuZ2V0U3BhbigpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuLm93bmVyRG9jdW1lbnQuY29udGFpbnMoc3BhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeVJ1bm5pbmcuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5UnVubmluZy5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzcGFuIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFnZSwgdGhlIGVkaXRvclxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBkZWFkIGJlY2F1c2UgcmVtb3ZpbmcgYW4gaWZyYW1lIGZyb20gdGhlIHBhZ2Uga2lsbHNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHdlYnNvY2tldCBjb25uZWN0aW9uIGluc2lkZSBvZiBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UganVzdCB0ZWxsIHRoZSBlZGl0b3IgdG8gY2xlYW4gaXRzZWxmIHVwIGFuZCBnbyBvbiBhc1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBkaWRuJ3QgZXhpc3QuXG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlSdW5uaW5nLmRldGFjaEZyb21QYWdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXV0byAmJiAodGFrZW92ZXIgPT09IFwiZW1wdHlcIiB8fCB0YWtlb3ZlciA9PT0gXCJub25lbXB0eVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSAoYXdhaXQgZWRpdG9yLmdldENvbnRlbnQoKSkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmICgoY29udGVudCAhPT0gXCJcIiAmJiB0YWtlb3ZlciA9PT0gXCJlbXB0eVwiKVxuICAgICAgICAgICAgICAgICAgICB8fCAoY29udGVudCA9PT0gXCJcIiAmJiB0YWtlb3ZlciA9PT0gXCJub25lbXB0eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZW52aW0ucHJlcGFyZUJ1ZmZlckluZm8oKTtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lSWRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmU6IChfOiBudW1iZXIpID0+IHZvaWQsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGZpcmVudmltR2xvYmFsLmZyYW1lSWRSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgdGltZW91dCB0aGUgc2FtZSBhcyB0aGUgb25lIGluIGJhY2tncm91bmQudHNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJlamVjdCwgMTAwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmcmFtZUlkUHJvbWlzZS50aGVuKChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLnNldChmcmFtZUlkLCBmaXJlbnZpbSk7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1HbG9iYWwuZnJhbWVJZFJlc29sdmUgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZyYW1lSWRQcm9taXNlLmNhdGNoKHVubG9jayk7XG4gICAgICAgICAgICBmaXJlbnZpbS5hdHRhY2hUb1BhZ2UoZnJhbWVJZFByb21pc2UpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gZmllbnZpbUVsZW1zIG1hcHMgZnJhbWUgaWRzIHRvIGZpcmVudmltIGVsZW1lbnRzLlxuICAgIGZpcmVudmltRWxlbXM6IG5ldyBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+KCksXG59O1xuXG5jb25zdCBvd25GcmFtZUlkID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYXJnczogW10sIGZ1bmNOYW1lOiBbXCJnZXRPd25GcmFtZUlkXCJdIH0pO1xuYXN5bmMgZnVuY3Rpb24gYW5ub3VuY2VGb2N1cyAoKSB7XG4gICAgY29uc3QgZnJhbWVJZCA9IGF3YWl0IG93bkZyYW1lSWQ7XG4gICAgZmlyZW52aW1HbG9iYWwubGFzdEZvY3VzZWRDb250ZW50U2NyaXB0ID0gZnJhbWVJZDtcbiAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICBhcmdzOiBbIGZyYW1lSWQgXSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJzZXRMYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHRcIl1cbiAgICAgICAgfSxcbiAgICAgICAgZnVuY05hbWU6IFtcIm1lc3NhZ2VQYWdlXCJdXG4gICAgfSk7XG59XG4vLyBXaGVuIHRoZSBmcmFtZSBpcyBjcmVhdGVkLCB3ZSBtaWdodCByZWNlaXZlIGZvY3VzLCBjaGVjayBmb3IgdGhhdFxub3duRnJhbWVJZC50aGVuKF8gPT4ge1xuICAgIGlmIChkb2N1bWVudC5oYXNGb2N1cygpKSB7XG4gICAgICAgIGFubm91bmNlRm9jdXMoKTtcbiAgICB9XG59KTtcbmFzeW5jIGZ1bmN0aW9uIGFkZEZvY3VzTGlzdGVuZXIgKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgYW5ub3VuY2VGb2N1cyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBhbm5vdW5jZUZvY3VzKTtcbn1cbmFkZEZvY3VzTGlzdGVuZXIoKTtcbi8vIFdlIG5lZWQgdG8gdXNlIHNldEludGVydmFsIHRvIHBlcmlvZGljYWxseSByZS1hZGQgdGhlIGZvY3VzIGxpc3RlbmVycyBhcyBpblxuLy8gZnJhbWVzIHRoZSBkb2N1bWVudCBjb3VsZCBnZXQgZGVsZXRlZCBhbmQgcmUtY3JlYXRlZCB3aXRob3V0IG91ciBrbm93bGVkZ2UuXG5jb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoYWRkRm9jdXNMaXN0ZW5lciwgMTAwKTtcbi8vIEJ1dCB3ZSBkb24ndCB3YW50IHRvIHN5cGhvbiB0aGUgdXNlcidzIGJhdHRlcnkgc28gd2Ugc3RvcCBjaGVja2luZyBhZnRlciBhIHNlY29uZFxuc2V0VGltZW91dCgoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpLCAxMDAwKTtcblxuZXhwb3J0IGNvbnN0IGZyYW1lRnVuY3Rpb25zID0gZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMoZmlyZW52aW1HbG9iYWwpO1xuZXhwb3J0IGNvbnN0IGFjdGl2ZUZ1bmN0aW9ucyA9IGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMoZmlyZW52aW1HbG9iYWwpO1xuZXhwb3J0IGNvbnN0IHRhYkZ1bmN0aW9ucyA9IGdldFRhYkZ1bmN0aW9ucyhmaXJlbnZpbUdsb2JhbCk7XG5PYmplY3QuYXNzaWduKHdpbmRvdywgZnJhbWVGdW5jdGlvbnMsIGFjdGl2ZUZ1bmN0aW9ucywgdGFiRnVuY3Rpb25zKTtcbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3Q6IHsgZnVuY05hbWU6IHN0cmluZ1tdLCBhcmdzOiBhbnlbXSB9KSA9PiB7XG4gICAgLy8gQWxsIGNvbnRlbnQgc2NyaXB0cyBtdXN0IHJlYWN0IHRvIHRhYiBmdW5jdGlvbnNcbiAgICBsZXQgZm4gPSByZXF1ZXN0LmZ1bmNOYW1lLnJlZHVjZSgoYWNjOiBhbnksIGN1cjogc3RyaW5nKSA9PiBhY2NbY3VyXSwgdGFiRnVuY3Rpb25zKTtcbiAgICBpZiAoZm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZm4oLi4ucmVxdWVzdC5hcmdzKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgb25seSBjb250ZW50IHNjcmlwdCB0aGF0IHNob3VsZCByZWFjdCB0byBhY3RpdmVGdW5jdGlvbnMgaXMgdGhlIGFjdGl2ZSBvbmVcbiAgICBmbiA9IHJlcXVlc3QuZnVuY05hbWUucmVkdWNlKChhY2M6IGFueSwgY3VyOiBzdHJpbmcpID0+IGFjY1tjdXJdLCBhY3RpdmVGdW5jdGlvbnMpO1xuICAgIGlmIChmbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmaXJlbnZpbUdsb2JhbC5sYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQgPT09IGF3YWl0IG93bkZyYW1lSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmbiguLi5yZXF1ZXN0LmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIC8vIFRoZSBvbmx5IGNvbnRlbnQgc2NyaXB0IHRoYXQgc2hvdWxkIHJlYWN0IHRvIGZyYW1lRnVuY3Rpb25zIGlzIHRoZSBvbmVcbiAgICAvLyB0aGF0IG93bnMgdGhlIGZyYW1lIHRoYXQgc2VudCB0aGUgcmVxdWVzdFxuICAgIGZuID0gcmVxdWVzdC5mdW5jTmFtZS5yZWR1Y2UoKGFjYzogYW55LCBjdXI6IHN0cmluZykgPT4gYWNjW2N1cl0sIGZyYW1lRnVuY3Rpb25zKTtcbiAgICBpZiAoZm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQocmVxdWVzdC5hcmdzWzBdKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oLi4ucmVxdWVzdC5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yOiB1bmhhbmRsZWQgY29udGVudCByZXF1ZXN0OiAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3QpfS5gKTtcbn0pO1xuXG5cbmZ1bmN0aW9uIHNldHVwTGlzdGVuZXJzKHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICBmdW5jdGlvbiBvblNjcm9sbChjb250OiBib29sZWFuKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9zQ2hhbmdlZCA9IEFycmF5LmZyb20oZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5lbnRyaWVzKCkpXG4gICAgICAgICAgICAgICAgLm1hcCgoW18sIGVsZW1dKSA9PiBlbGVtLnB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbigpKVxuICAgICAgICAgICAgICAgIC5maW5kKGNoYW5nZWQgPT4gY2hhbmdlZC5wb3NDaGFuZ2VkKTtcbiAgICAgICAgICAgIGlmIChwb3NDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gQXMgbG9uZyBhcyBvbmUgZWRpdG9yIGNoYW5nZXMgcG9zaXRpb24sIHRyeSB0byByZXNpemVcbiAgICAgICAgICAgICAgICBvblNjcm9sbCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udCkge1xuICAgICAgICAgICAgICAgIC8vIE5vIGVkaXRvciBoYXMgbW92ZWQsIGJ1dCB0aGlzIG1pZ2h0IGJlIGJlY2F1c2UgdGhlIHdlYnNpdGVcbiAgICAgICAgICAgICAgICAvLyBpbXBsZW1lbnRzIHNvbWUga2luZCBvZiBzbW9vdGggc2Nyb2xsaW5nIHRoYXQgZG9lc24ndCBtYWtlXG4gICAgICAgICAgICAgICAgLy8gdGhlIHRleHRhcmVhIG1vdmUgaW1tZWRpYXRlbHkuIEluIG9yZGVyIHRvIGRlYWwgd2l0aCB0aGVzZVxuICAgICAgICAgICAgICAgIC8vIGNhc2VzLCBzY2hlZHVsZSBhIGxhc3QgcmVkcmF3IGluIGEgZmV3IG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gb25TY3JvbGwoZmFsc2UpLCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9TY3JvbGwoKSB7XG4gICAgICAgIHJldHVybiBvblNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9TY3JvbGwpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZG9TY3JvbGwpO1xuICAgIChuZXcgKCh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlcikoKF86IGFueVtdKSA9PiB7XG4gICAgICAgIG9uU2Nyb2xsKHRydWUpO1xuICAgIH0pKS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICBmdW5jdGlvbiBhZGROdmltTGlzdGVuZXIoZWxlbTogRWxlbWVudCkge1xuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBmaXJlbnZpbUdsb2JhbC5udmltaWZ5KTtcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZmlyZW52aW1HbG9iYWwubnZpbWlmeSk7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvU2Nyb2xsKTtcbiAgICAgICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvU2Nyb2xsKTtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgKG5ldyBNdXRhdGlvbk9ic2VydmVyKChjaGFuZ2VzLCBfKSA9PiB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmZpbHRlcihjaGFuZ2UgPT4gY2hhbmdlLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIG11dGF0aW9uIG9ic2VydmVyIGlzIHRyaWdnZXJlZCBldmVyeSB0aW1lIGFuIGVsZW1lbnQgaXNcbiAgICAgICAgLy8gYWRkZWQvcmVtb3ZlZCBmcm9tIHRoZSBwYWdlLiBXaGVuIHRoaXMgaGFwcGVucywgdHJ5IHRvIGFwcGx5XG4gICAgICAgIC8vIGxpc3RlbmVycyBhZ2FpbiwgaW4gY2FzZSBhIG5ldyB0ZXh0YXJlYS9pbnB1dCBmaWVsZCBoYXMgYmVlbiBhZGRlZC5cbiAgICAgICAgY29uc3QgdG9Qb3NzaWJseU52aW1pZnkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgdG9Qb3NzaWJseU52aW1pZnkuZm9yRWFjaChlbGVtID0+IGFkZE52aW1MaXN0ZW5lcihlbGVtKSk7XG5cbiAgICAgICAgY29uc3QgdGFrZW92ZXIgPSBnZXRDb25mKCkudGFrZW92ZXI7XG4gICAgICAgIGZ1bmN0aW9uIHNob3VsZE52aW1pZnkobm9kZTogYW55KSB7XG4gICAgICAgICAgICAvLyBJZGVhbGx5LCB0aGUgdGFrZW92ZXIgIT09IFwibmV2ZXJcIiBjaGVjayBzaG91bGRuJ3QgYmUgcGVyZm9ybWVkXG4gICAgICAgICAgICAvLyBoZXJlOiBpdCBzaG91bGQgbGl2ZSBpbiBudmltaWZ5KCkuIEhvd2V2ZXIsIG52aW1pZnkoKSBvbmx5XG4gICAgICAgICAgICAvLyBjaGVja3MgZm9yIHRha2VvdmVyID09PSBcIm5ldmVyXCIgaWYgaXQgaXMgY2FsbGVkIGZyb20gYW4gZXZlbnRcbiAgICAgICAgICAgIC8vIGhhbmRsZXIgKHRoaXMgaXMgbmVjZXNzYXJ5IGluIG9yZGVyIHRvIGFsbG93IG1hbnVhbGx5IG52aW1pZnlpbmdcbiAgICAgICAgICAgIC8vIGVsZW1lbnRzKS4gVGh1cywgd2UgbmVlZCB0byBjaGVjayBpZiB0YWtlb3ZlciAhPT0gXCJuZXZlclwiIGhlcmVcbiAgICAgICAgICAgIC8vIHRvby5cbiAgICAgICAgICAgIHJldHVybiB0YWtlb3ZlciAhPT0gXCJuZXZlclwiXG4gICAgICAgICAgICAgICAgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbm9kZVxuICAgICAgICAgICAgICAgICYmIHRvUG9zc2libHlOdmltaWZ5LmluY2x1ZGVzKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgYWxzbyBuZWVkIHRvIGNoZWNrIGlmIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50IGlzIGFtb25nIHRoZVxuICAgICAgICAvLyBuZXdseSBjcmVhdGVkIGVsZW1lbnRzIGFuZCBpZiBpdCBpcywgbnZpbWlmeSBpdC5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGNhbid0IGRvIHRoaXMgdW5jb25kaXRpb25hbGx5OiB3ZSB3b3VsZCB0dXJuIHRoZSBhY3RpdmVcbiAgICAgICAgLy8gZWxlbWVudCBpbnRvIGEgbmVvdmltIGZyYW1lIGV2ZW4gZm9yIHVucmVsYXRlZCBkb20gY2hhbmdlcy5cbiAgICAgICAgZm9yIChjb25zdCBtciBvZiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbXIuYWRkZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGROdmltaWZ5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZ1bmN0aW9ucy5mb3JjZU52aW1pZnkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZE52aW1pZnkod2Fsa2VyLmN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlRnVuY3Rpb25zLmZvcmNlTnZpbWlmeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpLm9ic2VydmUod2luZG93LmRvY3VtZW50LCB7IHN1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9KTtcblxuICAgIGxldCBlbGVtZW50czogSFRNTEVsZW1lbnRbXTtcbiAgICB0cnkge1xuICAgICAgICBlbGVtZW50cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICBhbGVydChgRmlyZW52aW0gZXJyb3I6IGludmFsaWQgQ1NTIHNlbGVjdG9yICgke3NlbGVjdG9yfSkgaW4geW91ciBnOmZpcmVudmltX2NvbmZpZy5gKTtcbiAgICAgICAgZWxlbWVudHMgPSBbXTtcbiAgICB9XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtID0+IGFkZE52aW1MaXN0ZW5lcihlbGVtKSk7XG59XG5cbmV4cG9ydCBjb25zdCBsaXN0ZW5lcnNTZXR1cCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGNvbmZSZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29uZjogeyBzZWxlY3Rvcjogc3RyaW5nIH0gPSBnZXRDb25mKCk7XG4gICAgICAgIGlmIChjb25mLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgJiYgY29uZi5zZWxlY3RvciAhPT0gXCJcIikge1xuICAgICAgICAgICAgc2V0dXBMaXN0ZW5lcnMoY29uZi5zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=