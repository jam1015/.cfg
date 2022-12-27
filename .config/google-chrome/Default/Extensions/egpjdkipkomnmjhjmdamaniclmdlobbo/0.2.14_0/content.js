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
/* harmony export */   "AceEditor": () => (/* binding */ AceEditor),
/* harmony export */   "CodeMirror6Editor": () => (/* binding */ CodeMirror6Editor),
/* harmony export */   "CodeMirrorEditor": () => (/* binding */ CodeMirrorEditor),
/* harmony export */   "GenericAbstractEditor": () => (/* binding */ GenericAbstractEditor),
/* harmony export */   "MonacoEditor": () => (/* binding */ MonacoEditor),
/* harmony export */   "TextareaEditor": () => (/* binding */ TextareaEditor),
/* harmony export */   "computeSelector": () => (/* binding */ computeSelector),
/* harmony export */   "executeInPage": () => (/* binding */ executeInPage),
/* harmony export */   "getEditor": () => (/* binding */ getEditor),
/* harmony export */   "unwrap": () => (/* binding */ unwrap),
/* harmony export */   "wrap": () => (/* binding */ wrap)
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
class CodeMirror6Editor extends GenericAbstractEditor {
    constructor(e, options) {
        super(e, options);
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).cmView.view.state.doc.toString());
        };
        this.getCursor = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const position = unwrap(elem).cmView.view.state.selection.main.head;
            return [wrap(position.line), wrap(position.ch)];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).dataset.language);
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = unwrap(document.querySelector(selector));
            let length = elem.cmView.view.state.doc.length;
            return wrap(elem.cmView.view.dispatch({ changes: { from: 0, to: length, insert: text } }));
        };
        this.setCursor = async (selector, wrap, unwrap, line, column) => {
            const elem = unwrap(document.querySelector(selector));
            return wrap(elem.vmView.view.dispatch({
                selection: {
                    anchor: elem.cmView.view.doc.line(line) + column
                }
            }));
        };
        this.elem = e;
        // Get the topmost CodeMirror element
        let parent = this.elem.parentElement;
        while (CodeMirror6Editor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/^(.* )?cm-content/gi).test(parent.className)) {
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
/* WARNING: codeMirror6 only works in chrome based browsers for now. Leave it
 * to false or undefined in Firefox. */
function getEditor(elem, options) {
    let editor;
    let classes = [AceEditor, CodeMirrorEditor, MonacoEditor];
    if (options.codeMirror6Enabled) {
        classes.push(CodeMirror6Editor);
    }
    for (let clazz of classes) {
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
            preferHTML: (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getConf)().content == "html",
            codeMirror6Enabled: (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isChrome)()
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
    const textarea = document.getElementById("issue_body");
    if (!textarea) {
        return;
    }
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
    const [platInfo, manifest, nvimPluginVersion, issueTemplate,] = await Promise.all([platInfoPromise, manifestPromise, nvimPluginPromise, issueTemplatePromise]);
    // Can't happen, but doesn't cost much to handle!
    /* istanbul ignore next */
    if (textarea.value.replace(/\r/g, "") !== issueTemplate.replace(/\r/g, "")) {
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
/* harmony export */   "PageEventEmitter": () => (/* binding */ PageEventEmitter),
/* harmony export */   "getActiveContentFunctions": () => (/* binding */ getActiveContentFunctions),
/* harmony export */   "getNeovimFrameFunctions": () => (/* binding */ getNeovimFrameFunctions),
/* harmony export */   "getPageProxy": () => (/* binding */ getPageProxy),
/* harmony export */   "getTabFunctions": () => (/* binding */ getTabFunctions)
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

/***/ "./src/utils/keys.ts":
/*!***************************!*\
  !*** ./src/utils/keys.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addModifier": () => (/* binding */ addModifier),
/* harmony export */   "keysToEvents": () => (/* binding */ keysToEvents),
/* harmony export */   "nonLiteralKeys": () => (/* binding */ nonLiteralKeys),
/* harmony export */   "translateKey": () => (/* binding */ translateKey)
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
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activeFunctions": () => (/* binding */ activeFunctions),
/* harmony export */   "firenvimGlobal": () => (/* binding */ firenvimGlobal),
/* harmony export */   "frameFunctions": () => (/* binding */ frameFunctions),
/* harmony export */   "listenersSetup": () => (/* binding */ listenersSetup),
/* harmony export */   "tabFunctions": () => (/* binding */ tabFunctions)
/* harmony export */ });
/* harmony import */ var _FirenvimElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FirenvimElement */ "./src/FirenvimElement.ts");
/* harmony import */ var _autofill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autofill */ "./src/autofill.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page */ "./src/page.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");




if (document.location.href.startsWith("https://github.com/")
    || document.location.protocol === "file:" && document.location.href.endsWith("github.html")) {
    addEventListener("load", _autofill__WEBPACK_IMPORTED_MODULE_1__.autofill);
    let lastUrl = location.href;
    // We have to use a MutationObserver to trigger autofill because Github
    // uses "progressive enhancement" and thus doesn't always trigger a load
    // event. But we can't always rely on the MutationObserver without the load
    // event because the MutationObserver won't be triggered on hard page
    // reloads!
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            if (lastUrl === "https://github.com/glacambre/firenvim/issues/new") {
                (0,_autofill__WEBPACK_IMPORTED_MODULE_1__.autofill)();
            }
        }
    }).observe(document, { subtree: true, childList: true });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsV0FBVyxxQ0FBcUM7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCw0QkFBNEI7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx5QkFBeUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsS0FBSztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUNBQWlDLElBQUksVUFBVSxlQUFlLE1BQU07QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsY0FBYztBQUNkO0FBQ0EsOEJBQThCLDJCQUEyQjtBQUN6RCxpQkFBaUI7QUFDakI7QUFDQSxTQUFTLElBQUksd0JBQXdCO0FBQ3JDLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUksWUFBWTtBQUN6QjtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxhQUFhLElBQUkscURBQXFELHVCQUF1QixxQkFBcUI7QUFDL0o7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Y0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFTLENBQUMsQ0FBVSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxjQUFjLENBQUMsQ0FBSyxPQUFPLE1BQU0sQ0FBQztRQUN2QyxLQUFLLFdBQVcsQ0FBQyxDQUFRLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssU0FBUyxDQUFDLENBQVUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxXQUFXLENBQUMsQ0FBUSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLE1BQU0sQ0FBQyxDQUFhLE9BQU8sTUFBTSxDQUFDO1FBQ3ZDLEtBQUssWUFBWSxDQUFDLENBQU8sT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxRQUFRLENBQUMsQ0FBVyxPQUFPLE9BQU8sQ0FBQztRQUN4QyxLQUFLLE9BQU8sQ0FBQyxDQUFZLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssS0FBSyxDQUFDLENBQWMsT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxRQUFRLENBQUMsQ0FBVyxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLE9BQU8sQ0FBQyxDQUFZLE9BQU8sT0FBTyxDQUFDO1FBQ3hDLEtBQUssTUFBTSxDQUFDLENBQWEsT0FBTyxNQUFNLENBQUM7UUFDdkMsS0FBSyxLQUFLLENBQUMsQ0FBYyxPQUFPLEtBQUssQ0FBQztRQUN0QyxLQUFLLFVBQVUsQ0FBQyxDQUFTLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLEtBQUssUUFBUSxDQUFDLENBQVksT0FBTyxJQUFJLENBQUM7UUFDdEMsS0FBSyxPQUFPLENBQUMsQ0FBWSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFLLFFBQVEsQ0FBQyxDQUFXLE9BQU8sR0FBRyxDQUFDO1FBQ3BDLEtBQUssUUFBUSxDQUFDLENBQVcsT0FBTyxLQUFLLENBQUM7UUFDdEMsS0FBSyxNQUFNLENBQUMsQ0FBYSxPQUFPLElBQUksQ0FBQztRQUNyQyxLQUFL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Q0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvZWRpdG9yLWFkYXB0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9ub2RlX21vZHVsZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2Rpc3QvYnJvd3Nlci1wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvRmlyZW52aW1FbGVtZW50LnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL2F1dG9maWxsLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3BhZ2UudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvY29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy91dGlscy9rZXlzLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9GaXJlbnZpbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvY29udGVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgR2VuZXJpY0Fic3RyYWN0RWRpdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihfZSwgX29wdGlvbnMpIHsgfVxuICAgIDtcbiAgICBzdGF0aWMgbWF0Y2hlcyhfKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hdGNoZXMgZnVuY3Rpb24gbm90IG92ZXJyaWRlblwiKTtcbiAgICB9XG4gICAgO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjbGFzcyBBY2VFZGl0b3IgZXh0ZW5kcyBHZW5lcmljQWJzdHJhY3RFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGUsIF9vcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKGUsIF9vcHRpb25zKTtcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIHN0cmluZ2lmaWVkIGFuZCBpbnNlcnRlZCBpbiBwYWdlIGNvbnRleHQgc28gd2VcbiAgICAgICAgLy8gY2FuJ3QgaW5zdHJ1bWVudCBpdC5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdGhpcy5nZXRBY2UgPSAoc2VsZWMpID0+IHtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoYWNlLmdldFZhbHVlKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEN1cnNvciA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBhY2UgPSBlbGVtLmFjZUVkaXRvciB8fCB1bndyYXAod2luZG93KS5hY2UuZWRpdChlbGVtKTtcbiAgICAgICAgICAgIGlmIChhY2UuZ2V0Q3Vyc29yUG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gYWNlLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGFjZS5zZWxlY3Rpb24uY3Vyc29yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFt3cmFwKHBvc2l0aW9uLnJvdykgKyAxLCB3cmFwKHBvc2l0aW9uLmNvbHVtbildO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldExhbmd1YWdlID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoYWNlLnNlc3Npb24uJG1vZGVJZCkuc3BsaXQoXCIvXCIpLnNsaWNlKC0xKVswXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXAsIHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoYWNlLnNldFZhbHVlKHRleHQsIDEpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCwgbGluZSwgY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBhY2UgPSBlbGVtLmFjZUVkaXRvciB8fCB1bndyYXAod2luZG93KS5hY2UuZWRpdChlbGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGFjZS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHNlbGVjdGlvbi5tb3ZlQ3Vyc29yVG8obGluZSAtIDEsIGNvbHVtbiwgZmFsc2UpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICAgICAgLy8gR2V0IHRoZSB0b3Btb3N0IGFjZSBlbGVtZW50XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKEFjZUVkaXRvci5tYXRjaGVzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBtYXRjaGVzKGUpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvYWNlX2VkaXRvci9naSkudGVzdChwYXJlbnQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY2xhc3MgQ29kZU1pcnJvcjZFZGl0b3IgZXh0ZW5kcyBHZW5lcmljQWJzdHJhY3RFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGUsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZ2V0Q29udGVudCA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh1bndyYXAoZWxlbSkuY21WaWV3LnZpZXcuc3RhdGUuZG9jLnRvU3RyaW5nKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEN1cnNvciA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHVud3JhcChlbGVtKS5jbVZpZXcudmlldy5zdGF0ZS5zZWxlY3Rpb24ubWFpbi5oZWFkO1xuICAgICAgICAgICAgcmV0dXJuIFt3cmFwKHBvc2l0aW9uLmxpbmUpLCB3cmFwKHBvc2l0aW9uLmNoKV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0TGFuZ3VhZ2UgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAodW53cmFwKGVsZW0pLmRhdGFzZXQubGFuZ3VhZ2UpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldENvbnRlbnQgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCwgdGV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHVud3JhcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWxlbS5jbVZpZXcudmlldy5zdGF0ZS5kb2MubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoZWxlbS5jbVZpZXcudmlldy5kaXNwYXRjaCh7IGNoYW5nZXM6IHsgZnJvbTogMCwgdG86IGxlbmd0aCwgaW5zZXJ0OiB0ZXh0IH0gfSkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldEN1cnNvciA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwLCBsaW5lLCBjb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSB1bndyYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoZWxlbS52bVZpZXcudmlldy5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvcjogZWxlbS5jbVZpZXcudmlldy5kb2MubGluZShsaW5lKSArIGNvbHVtblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICAgICAgLy8gR2V0IHRoZSB0b3Btb3N0IENvZGVNaXJyb3IgZWxlbWVudFxuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5lbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChDb2RlTWlycm9yNkVkaXRvci5tYXRjaGVzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBtYXRjaGVzKGUpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvXiguKiApP2NtLWNvbnRlbnQvZ2kpLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNsYXNzIENvZGVNaXJyb3JFZGl0b3IgZXh0ZW5kcyBHZW5lcmljQWJzdHJhY3RFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGUsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZ2V0Q29udGVudCA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh1bndyYXAoZWxlbSkuQ29kZU1pcnJvci5nZXRWYWx1ZSgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRDdXJzb3IgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB1bndyYXAoZWxlbSkuQ29kZU1pcnJvci5nZXRDdXJzb3IoKTtcbiAgICAgICAgICAgIHJldHVybiBbd3JhcChwb3NpdGlvbi5saW5lKSArIDEsIHdyYXAocG9zaXRpb24uY2gpXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRMYW5ndWFnZSA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh1bndyYXAoZWxlbSkuQ29kZU1pcnJvci5nZXRNb2RlKCkubmFtZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q29udGVudCA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwLCB0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh1bndyYXAoZWxlbSkuQ29kZU1pcnJvci5zZXRWYWx1ZSh0ZXh0KSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXAsIGxpbmUsIGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAodW53cmFwKGVsZW0pLkNvZGVNaXJyb3Iuc2V0Q3Vyc29yKHsgbGluZTogbGluZSAtIDEsIGNoOiBjb2x1bW4gfSkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsZW0gPSBlO1xuICAgICAgICAvLyBHZXQgdGhlIHRvcG1vc3QgQ29kZU1pcnJvciBlbGVtZW50XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKENvZGVNaXJyb3JFZGl0b3IubWF0Y2hlcyhwYXJlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBwYXJlbnQ7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgbWF0Y2hlcyhlKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICgoL14oLiogKT9Db2RlTWlycm9yL2dpKS50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjbGFzcyBNb25hY29FZGl0b3IgZXh0ZW5kcyBHZW5lcmljQWJzdHJhY3RFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGUsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZ2V0Q29udGVudCA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCB1cmkgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpO1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB1bndyYXAod2luZG93KS5tb25hY28uZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChtb2RlbC5nZXRWYWx1ZSgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gSXQncyBpbXBvc3NpYmxlIHRvIGdldCBNb25hY28ncyBjdXJzb3IgcG9zaXRpb246XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvbW9uYWNvLWVkaXRvci9pc3N1ZXMvMjU4XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbMSwgMF07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0TGFuZ3VhZ2UgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgdXJpID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVyaVwiKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gdW53cmFwKHdpbmRvdykubW9uYWNvLmVkaXRvci5nZXRNb2RlbCh1cmkpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAobW9kZWwuZ2V0TW9kZUlkKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldENvbnRlbnQgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCwgdGV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgdXJpID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVyaVwiKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gdW53cmFwKHdpbmRvdykubW9uYWNvLmVkaXRvci5nZXRNb2RlbCh1cmkpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAobW9kZWwuc2V0VmFsdWUodGV4dCkpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gc2V0IE1vbmFjbydzIGN1cnNvciBwb3NpdGlvbjpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9tb25hY28tZWRpdG9yL2lzc3Vlcy8yNThcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IgPSBhc3luYyAoX3NlbGVjdG9yLCBfd3JhcCwgX3Vud3JhcCwgX2xpbmUsIF9jb2x1bW4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZWxlbSA9IGU7XG4gICAgICAgIC8vIEZpbmQgdGhlIG1vbmFjbyBlbGVtZW50IHRoYXQgaG9sZHMgdGhlIGRhdGFcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB3aGlsZSAoISh0aGlzLmVsZW0uY2xhc3NOYW1lLm1hdGNoKC9tb25hY28tZWRpdG9yL2dpKVxuICAgICAgICAgICAgJiYgdGhpcy5lbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpLm1hdGNoKFwiZmlsZTovL3xpbm1lbW9yeTovL3xnaXRsYWI6XCIpKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gcGFyZW50O1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG1hdGNoZXMoZSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoKC9tb25hY28tZWRpdG9yL2dpKS50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuLy8gVGV4dGFyZWFFZGl0b3Igc29ydCBvZiB3b3JrcyBmb3IgY29udGVudEVkaXRhYmxlIGVsZW1lbnRzIGJ1dCB0aGVyZSBzaG91bGRcbi8vIHJlYWxseSBiZSBhIGNvbnRlbnRlZGl0YWJsZS1zcGVjaWZpYyBlZGl0b3IuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNsYXNzIFRleHRhcmVhRWRpdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZ2V0Q29udGVudCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5lbGVtLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJlZmVySFRNTCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5lbGVtLmlubmVySFRNTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZWxlbS5pbm5lclRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEN1cnNvciA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnQoKS50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuZWxlbS5zZWxlY3Rpb25TdGFydCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5lbGVtLnNlbGVjdGlvblN0YXJ0XG4gICAgICAgICAgICAgICAgICAgIDogMDtcbiAgICAgICAgICAgICAgICAvLyBTaWZ0IHRocm91Z2ggdGhlIHRleHQsIGNvdW50aW5nIGNvbHVtbnMgYW5kIG5ldyBsaW5lc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGN1cnNvciA9IDA7IGN1cnNvciA8IHNlbGVjdGlvblN0YXJ0OyArK2N1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4gKz0gdGV4dC5jaGFyQ29kZUF0KGN1cnNvcikgPCAweDdGID8gMSA6IDI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2N1cnNvcl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtsaW5lLCBjb2x1bW5dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0TGFuZ3VhZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByZWZlckhUTUwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdodG1sJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q29udGVudCA9IGFzeW5jICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW0udmFsdWUgPSB0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmVmZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldEN1cnNvciA9IGFzeW5jIChsaW5lLCBjb2x1bW4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnQoKS50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjaGFyYWN0ZXIgPSAwO1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBsaW5lIHRoZSBjdXJzb3Igc2hvdWxkIGJlIHB1dCBvblxuICAgICAgICAgICAgICAgIHdoaWxlIChsaW5lID4gMSAmJiBjaGFyYWN0ZXIgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtjaGFyYWN0ZXJdID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBjaGFyYWN0ZXIgYWZ0ZXIgd2hpY2ggdGhlIGN1cnNvciBzaG91bGQgYmUgbW92ZWRcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiB3ZSBkb24ndCBkbyBjb2x1bW4gPSBjb2x1bW5uICsgY2hhcmFjdGVyIGJlY2F1c2UgY29sdW1uXG4gICAgICAgICAgICAgICAgLy8gbWlnaHQgYmUgbGFyZ2VyIHRoYW4gYWN0dWFsIGxpbmUgbGVuZ3RoIGFuZCBpdCdzIGJldHRlciB0byBiZSBvblxuICAgICAgICAgICAgICAgIC8vIHRoZSByaWdodCBsaW5lIGJ1dCBvbiB0aGUgd3JvbmcgY29sdW1uIHRoYW4gb24gdGhlIHdyb25nIGxpbmVcbiAgICAgICAgICAgICAgICAvLyBhbmQgd3JvbmcgY29sdW1uLlxuICAgICAgICAgICAgICAgIC8vIE1vcmVvdmVyLCBjb2x1bW4gaXMgYSBudW1iZXIgb2YgVVRGLTggYnl0ZXMgZnJvbSB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICAgICAgLy8gb2YgdGhlIGxpbmUgdG8gdGhlIGN1cnNvci4gSG93ZXZlciwgamF2YXNjcmlwdCB1c2VzIFVURi0xNixcbiAgICAgICAgICAgICAgICAvLyB3aGljaCBpcyAyIGJ5dGVzIHBlciBub24tYXNjaWkgY2hhcmFjdGVyLiBTbyB3aGVuIHdlIGZpbmQgYVxuICAgICAgICAgICAgICAgIC8vIGNoYXJhY3RlciB0aGF0IGlzIG1vcmUgdGhhbiAxIGJ5dGUgbG9uZywgd2UgaGF2ZSB0byByZW1vdmUgdGhhdFxuICAgICAgICAgICAgICAgIC8vIGFtb3VudCBmcm9tIGNvbHVtbiwgYnV0IG9ubHkgdHdvIGNoYXJhY3RlcnMgZnJvbSBDSEFSQUNURVIhXG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA+IDAgJiYgY2hhcmFjdGVyIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuJ3QgaGFwcGVuLCBidXQgYmV0dGVyIGJlIHNhZmUgdGhhbiBzb3JyeVxuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFtjaGFyYWN0ZXJdID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KGNoYXJhY3Rlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlIDw9IDB4N2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUgPD0gMHg3ZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkZmZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlcisrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUgPCAweGZmZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSAzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsZW0uc2V0U2VsZWN0aW9uUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW0uc2V0U2VsZWN0aW9uUmFuZ2UoY2hhcmFjdGVyLCBjaGFyYWN0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuZWxlbSA9IGU7XG4gICAgfVxuICAgIHN0YXRpYyBtYXRjaGVzKF8pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuLy8gQ29tcHV0ZXMgYSB1bmlxdWUgc2VsZWN0b3IgZm9yIGl0cyBhcmd1bWVudC5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlU2VsZWN0b3IoZWxlbWVudCkge1xuICAgIGZ1bmN0aW9uIHVuaXF1ZVNlbGVjdG9yKGUpIHtcbiAgICAgICAgLy8gT25seSBtYXRjaGluZyBhbHBoYW51bWVyaWMgc2VsZWN0b3JzIGJlY2F1c2Ugb3RoZXJzIGNoYXJzIG1pZ2h0IGhhdmUgc3BlY2lhbCBtZWFuaW5nIGluIENTU1xuICAgICAgICBpZiAoZS5pZCAmJiBlLmlkLm1hdGNoKFwiXlthLXpBLVowLTlfLV0rJFwiKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBlLnRhZ05hbWUgKyBgW2lkPVwiJHtlLmlkfVwiXWA7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpZCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgICAgaWYgKCFlLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkhUTUxcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb21wdXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5LmZyb20oZS5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC50YWdOYW1lID09PSBlLnRhZ05hbWUpXG4gICAgICAgICAgICAuaW5kZXhPZihlKSArIDE7XG4gICAgICAgIHJldHVybiBgJHt1bmlxdWVTZWxlY3RvcihlLnBhcmVudEVsZW1lbnQpfSA+ICR7ZS50YWdOYW1lfTpudGgtb2YtdHlwZSgke2luZGV4fSlgO1xuICAgIH1cbiAgICByZXR1cm4gdW5pcXVlU2VsZWN0b3IoZWxlbWVudCk7XG59XG4vLyBSdW5zIENPREUgaW4gdGhlIHBhZ2UncyBjb250ZXh0IGJ5IHNldHRpbmcgdXAgYSBjdXN0b20gZXZlbnQgbGlzdGVuZXIsXG4vLyBlbWJlZGRpbmcgYSBzY3JpcHQgZWxlbWVudCB0aGF0IHJ1bnMgdGhlIHBpZWNlIG9mIGNvZGUgYW5kIGVtaXRzIGl0cyByZXN1bHRcbi8vIGFzIGFuIGV2ZW50LlxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlSW5QYWdlKGNvZGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBjb25zdCBldmVudElkID0gYCR7TWF0aC5yYW5kb20oKX1gO1xuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYChhc3luYyAoZXZJZCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgdW53cmFwID0geCA9PiB4O1xuICAgICAgICAgICAgICAgIGxldCB3cmFwID0geCA9PiB4O1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJHtjb2RlfTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IHN1Y2Nlc3M6IGZhbHNlLCByZWFzb246IGUgfSxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCR7SlNPTi5zdHJpbmdpZnkoZXZlbnRJZCl9KWA7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50SWQsICh7IGRldGFpbCB9KSA9PiB7XG4gICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgaWYgKGRldGFpbC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGV0YWlsLnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGRldGFpbC5yZWFzb24pO1xuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXAoeCkge1xuICAgIGlmICh3aW5kb3cud3JhcHBlZEpTT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB4LndyYXBwZWRKU09iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcCh4KSB7XG4gICAgaWYgKHdpbmRvdy5YUENOYXRpdmVXcmFwcGVyKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuWFBDTmF0aXZlV3JhcHBlcih4KTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG47XG4vKiBXQVJOSU5HOiBjb2RlTWlycm9yNiBvbmx5IHdvcmtzIGluIGNocm9tZSBiYXNlZCBicm93c2VycyBmb3Igbm93LiBMZWF2ZSBpdFxuICogdG8gZmFsc2Ugb3IgdW5kZWZpbmVkIGluIEZpcmVmb3guICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWRpdG9yKGVsZW0sIG9wdGlvbnMpIHtcbiAgICBsZXQgZWRpdG9yO1xuICAgIGxldCBjbGFzc2VzID0gW0FjZUVkaXRvciwgQ29kZU1pcnJvckVkaXRvciwgTW9uYWNvRWRpdG9yXTtcbiAgICBpZiAob3B0aW9ucy5jb2RlTWlycm9yNkVuYWJsZWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENvZGVNaXJyb3I2RWRpdG9yKTtcbiAgICB9XG4gICAgZm9yIChsZXQgY2xhenogb2YgY2xhc3Nlcykge1xuICAgICAgICBpZiAoY2xhenoubWF0Y2hlcyhlbGVtKSkge1xuICAgICAgICAgICAgZWRpdG9yID0gY2xheno7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWRpdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0YXJlYUVkaXRvcihlbGVtLCBvcHRpb25zKTtcbiAgICB9XG4gICAgbGV0IGVkID0gbmV3IGVkaXRvcihlbGVtLCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh3aW5kb3cud3JhcHBlZEpTT2JqZWN0KSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBQcm94eShlZCwge1xuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF0oY29tcHV0ZVNlbGVjdG9yKHRhcmdldC5nZXRFbGVtZW50KCkpLCB3cmFwLCB1bndyYXAsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBQcm94eShlZCwge1xuICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09IFwiZ2V0RWxlbWVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhlY3V0ZUluUGFnZShgKCR7dGFyZ2V0W3Byb3BdfSkoJHtKU09OLnN0cmluZ2lmeShjb21wdXRlU2VsZWN0b3IodGFyZ2V0LmdldEVsZW1lbnQoKSkpfSwgeCA9PiB4LCB4ID0+IHgsIC4uLiR7SlNPTi5zdHJpbmdpZnkoYXJncyl9KWApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIsIFtcIm1vZHVsZVwiXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZCk7XG4gICAgZ2xvYmFsLmJyb3dzZXIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC44LjAgLSBUdWUgQXByIDIwIDIwMjEgMTE6Mjc6MzggKi9cblxuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG5cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cblxuICAvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gICAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKHR5cGVvZiBicm93c2VyID09PSBcInVuZGVmaW5lZFwiIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihicm93c2VyKSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiO1xuICAgIGNvbnN0IFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORyA9IFwiUmV0dXJuaW5nIGEgUHJvbWlzZSBpcyB0aGUgcHJlZmVycmVkIHdheSB0byBzZW5kIGEgcmVwbHkgZnJvbSBhbiBvbk1lc3NhZ2Uvb25NZXNzYWdlRXh0ZXJuYWwgbGlzdGVuZXIsIGFzIHRoZSBzZW5kUmVzcG9uc2Ugd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIHNwZWNzIChTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvcnVudGltZS9vbk1lc3NhZ2UpXCI7IC8vIFdyYXBwaW5nIHRoZSBidWxrIG9mIHRoaXMgcG9seWZpbGwgaW4gYSBvbmUtdGltZS11c2UgZnVuY3Rpb24gaXMgYSBtaW5vclxuICAgIC8vIG9wdGltaXphdGlvbiBmb3IgRmlyZWZveC4gU2luY2UgU3BpZGVybW9ua2V5IGRvZXMgbm90IGZ1bGx5IHBhcnNlIHRoZVxuICAgIC8vIGNvbnRlbnRzIG9mIGEgZnVuY3Rpb24gdW50aWwgdGhlIGZpcnN0IHRpbWUgaXQncyBjYWxsZWQsIGFuZCBzaW5jZSBpdCB3aWxsXG4gICAgLy8gbmV2ZXIgYWN0dWFsbHkgbmVlZCB0byBiZSBjYWxsZWQsIHRoaXMgYWxsb3dzIHRoZSBwb2x5ZmlsbCB0byBiZSBpbmNsdWRlZFxuICAgIC8vIGluIEZpcmVmb3ggbmVhcmx5IGZvciBmcmVlLlxuXG4gICAgY29uc3Qgd3JhcEFQSXMgPSBleHRlbnNpb25BUElzID0+IHtcbiAgICAgIC8vIE5PVEU6IGFwaU1ldGFkYXRhIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGFwaS1tZXRhZGF0YS5qc29uIGZpbGVcbiAgICAgIC8vIGF0IGJ1aWxkIHRpbWUgYnkgcmVwbGFjaW5nIHRoZSBmb2xsb3dpbmcgXCJpbmNsdWRlXCIgd2l0aCB0aGUgY29udGVudCBvZiB0aGVcbiAgICAgIC8vIEpTT04gZmlsZS5cbiAgICAgIGNvbnN0IGFwaU1ldGFkYXRhID0ge1xuICAgICAgICBcImFsYXJtc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsZWFyQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm9va21hcmtzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldENoaWxkcmVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U3ViVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlVHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzZXJBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZGlzYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuYWJsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5Qb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2luZ0RhdGFcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ2FjaGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDb29raWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRG93bmxvYWRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRm9ybURhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVIaXN0b3J5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlTG9jYWxTdG9yYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGFzc3dvcmRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlUGx1Z2luRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tbWFuZHNcIjoge1xuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dE1lbnVzXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvb2tpZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsQ29va2llU3RvcmVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV2dG9vbHNcIjoge1xuICAgICAgICAgIFwiaW5zcGVjdGVkV2luZG93XCI6IHtcbiAgICAgICAgICAgIFwiZXZhbFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMixcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYW5lbHNcIjoge1xuICAgICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZWxlbWVudHNcIjoge1xuICAgICAgICAgICAgICBcImNyZWF0ZVNpZGViYXJQYW5lXCI6IHtcbiAgICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgXCJjYW5jZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkb3dubG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVyYXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RmlsZUljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGF1c2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGaWxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImV4dGVuc2lvblwiOiB7XG4gICAgICAgICAgXCJpc0FsbG93ZWRGaWxlU2NoZW1lQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaXNBbGxvd2VkSW5jb2duaXRvQWNjZXNzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlzdG9yeVwiOiB7XG4gICAgICAgICAgXCJhZGRVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVSYW5nZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFZpc2l0c1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBY2NlcHRMYW5ndWFnZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGVudGl0eVwiOiB7XG4gICAgICAgICAgXCJsYXVuY2hXZWJBdXRoRmxvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkbGVcIjoge1xuICAgICAgICAgIFwicXVlcnlTdGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hbmFnZW1lbnRcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0U2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEVuYWJsZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1bmluc3RhbGxTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibm90aWZpY2F0aW9uc1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBlcm1pc3Npb25MZXZlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VBY3Rpb25cIjoge1xuICAgICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJtaXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJjb250YWluc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJydW50aW1lXCI6IHtcbiAgICAgICAgICBcImdldEJhY2tncm91bmRQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGxhdGZvcm1JbmZvXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3Blbk9wdGlvbnNQYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFVwZGF0ZUNoZWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTmF0aXZlTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFVuaW5zdGFsbFVSTFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlc3Npb25zXCI6IHtcbiAgICAgICAgICBcImdldERldmljZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRseUNsb3NlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3RvcmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzdG9yYWdlXCI6IHtcbiAgICAgICAgICBcImxvY2FsXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibWFuYWdlZFwiOiB7XG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzeW5jXCI6IHtcbiAgICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidGFic1wiOiB7XG4gICAgICAgICAgXCJjYXB0dXJlVmlzaWJsZVRhYlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGlzY2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImR1cGxpY2F0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV4ZWN1dGVTY3JpcHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvQmFja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdvRm9yd2FyZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhpZ2hsaWdodFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImluc2VydENTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbG9hZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNTU1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRvcFNpdGVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYk5hdmlnYXRpb25cIjoge1xuICAgICAgICAgIFwiZ2V0QWxsRnJhbWVzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0RnJhbWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJSZXF1ZXN0XCI6IHtcbiAgICAgICAgICBcImhhbmRsZXJCZWhhdmlvckNoYW5nZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3aW5kb3dzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRMYXN0Rm9jdXNlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoYXBpTWV0YWRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcGktbWV0YWRhdGEuanNvbiBoYXMgbm90IGJlZW4gaW5jbHVkZWQgaW4gYnJvd3Nlci1wb2x5ZmlsbFwiKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogQSBXZWFrTWFwIHN1YmNsYXNzIHdoaWNoIGNyZWF0ZXMgYW5kIHN0b3JlcyBhIHZhbHVlIGZvciBhbnkga2V5IHdoaWNoIGRvZXNcbiAgICAgICAqIG5vdCBleGlzdCB3aGVuIGFjY2Vzc2VkLCBidXQgYmVoYXZlcyBleGFjdGx5IGFzIGFuIG9yZGluYXJ5IFdlYWtNYXBcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjcmVhdGVJdGVtXG4gICAgICAgKiAgICAgICAgQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBpbiBvcmRlciB0byBjcmVhdGUgdGhlIHZhbHVlIGZvciBhbnlcbiAgICAgICAqICAgICAgICBrZXkgd2hpY2ggZG9lcyBub3QgZXhpc3QsIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGFjY2Vzc2VkLiBUaGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiByZWNlaXZlcywgYXMgaXRzIG9ubHkgYXJndW1lbnQsIHRoZSBrZXkgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNsYXNzIERlZmF1bHRXZWFrTWFwIGV4dGVuZHMgV2Vha01hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNyZWF0ZUl0ZW0sIGl0ZW1zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3VwZXIoaXRlbXMpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlSXRlbSA9IGNyZWF0ZUl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHRoaXMuY3JlYXRlSXRlbShrZXkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBvYmplY3Qgd2l0aCBhIGB0aGVuYCBtZXRob2QsIGFuZCBjYW5cbiAgICAgICAqIHRoZXJlZm9yZSBiZSBhc3N1bWVkIHRvIGJlaGF2ZSBhcyBhIFByb21pc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB0aGVuYWJsZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IGlzVGhlbmFibGUgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBjYWxsZWQsIHdpbGwgcmVzb2x2ZSBvciByZWplY3RcbiAgICAgICAqIHRoZSBnaXZlbiBwcm9taXNlIGJhc2VkIG9uIGhvdyBpdCBpcyBjYWxsZWQ6XG4gICAgICAgKlxuICAgICAgICogLSBJZiwgd2hlbiBjYWxsZWQsIGBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JgIGNvbnRhaW5zIGEgbm9uLW51bGwgb2JqZWN0LFxuICAgICAgICogICB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIElmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBleGFjdGx5IG9uZSBhcmd1bWVudCwgdGhlIHByb21pc2UgaXNcbiAgICAgICAqICAgcmVzb2x2ZWQgdG8gdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gT3RoZXJ3aXNlLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB0byBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGVcbiAgICAgICAqICAgZnVuY3Rpb24ncyBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHByb21pc2VcbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzb2x1dGlvbiBhbmQgcmVqZWN0aW9uIGZ1bmN0aW9ucyBvZiBhXG4gICAgICAgKiAgICAgICAgcHJvbWlzZS5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVzb2x2ZVxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVzb2x1dGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVqZWN0XG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZWplY3Rpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgd3JhcHBlZCBtZXRob2Qgd2hpY2ggaGFzIGNyZWF0ZWQgdGhlIGNhbGxiYWNrLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBtYWtlQ2FsbGJhY2sgPSAocHJvbWlzZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5jYWxsYmFja0FyZ3MpID0+IHtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgfHwgY2FsbGJhY2tBcmdzLmxlbmd0aCA8PSAxICYmIG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJnc1swXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBsdXJhbGl6ZUFyZ3VtZW50cyA9IG51bUFyZ3MgPT4gbnVtQXJncyA9PSAxID8gXCJhcmd1bWVudFwiIDogXCJhcmd1bWVudHNcIjtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gZm9yIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYW5kIG1ldGFkYXRhLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICAgKiAgICAgICAgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB3aGljaCBpcyBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5taW5BcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtdXN0IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggZmV3ZXIgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heEFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG1heSBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIG1vcmUgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24ob2JqZWN0LCAuLi4qKX1cbiAgICAgICAqICAgICAgIFRoZSBnZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbi5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBBc3luY0Z1bmN0aW9uID0gKG5hbWUsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhc3luY0Z1bmN0aW9uV3JhcHBlcih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgQVBJIG1ldGhvZCBoYXMgY3VycmVudGx5IG5vIGNhbGxiYWNrIG9uIENocm9tZSwgYnV0IGl0IHJldHVybiBhIHByb21pc2Ugb24gRmlyZWZveCxcbiAgICAgICAgICAgICAgLy8gYW5kIHNvIHRoZSBwb2x5ZmlsbCB3aWxsIHRyeSB0byBjYWxsIGl0IHdpdGggYSBjYWxsYmFjayBmaXJzdCwgYW5kIGl0IHdpbGwgZmFsbGJhY2tcbiAgICAgICAgICAgICAgLy8gdG8gbm90IHBhc3NpbmcgdGhlIGNhbGxiYWNrIGlmIHRoZSBmaXJzdCBjYWxsIGZhaWxzLlxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGNiRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gQVBJIG1ldGhvZCBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyLCBgICsgXCJmYWxsaW5nIGJhY2sgdG8gY2FsbCBpdCB3aXRob3V0IGEgY2FsbGJhY2s6IFwiLCBjYkVycm9yKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7IC8vIFVwZGF0ZSB0aGUgQVBJIG1ldGhvZCBtZXRhZGF0YSwgc28gdGhhdCB0aGUgbmV4dCBBUEkgY2FsbHMgd2lsbCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSB1bnN1cHBvcnRlZCBjYWxsYmFjayBhbnltb3JlLlxuXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5ub0NhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEubm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBleGlzdGluZyBtZXRob2Qgb2YgdGhlIHRhcmdldCBvYmplY3QsIHNvIHRoYXQgY2FsbHMgdG8gaXQgYXJlXG4gICAgICAgKiBpbnRlcmNlcHRlZCBieSB0aGUgZ2l2ZW4gd3JhcHBlciBmdW5jdGlvbi4gVGhlIHdyYXBwZXIgZnVuY3Rpb24gcmVjZWl2ZXMsXG4gICAgICAgKiBhcyBpdHMgZmlyc3QgYXJndW1lbnQsIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YCBvYmplY3QsIGZvbGxvd2VkIGJ5IGVhY2ggb2ZcbiAgICAgICAqIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBvcmlnaW5hbCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHdyYXBwZWQgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAgICAgICAqICAgICAgICBUaGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBQcm94eVxuICAgICAgICogICAgICAgIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHRvIHdyYXAgdGhlIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHdyYXBwZXJcbiAgICAgICAqICAgICAgICBUaGUgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgYSBkaXJlY3QgaW52b2NhdGlvblxuICAgICAgICogICAgICAgIG9mIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8ZnVuY3Rpb24+fVxuICAgICAgICogICAgICAgIEEgUHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbWV0aG9kLCB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIGl0cyBwbGFjZS5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBNZXRob2QgPSAodGFyZ2V0LCBtZXRob2QsIHdyYXBwZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShtZXRob2QsIHtcbiAgICAgICAgICBhcHBseSh0YXJnZXRNZXRob2QsIHRoaXNPYmosIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyLmNhbGwodGhpc09iaiwgdGFyZ2V0LCAuLi5hcmdzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIG9iamVjdCBpbiBhIFByb3h5IHdoaWNoIGludGVyY2VwdHMgYW5kIHdyYXBzIGNlcnRhaW4gbWV0aG9kc1xuICAgICAgICogYmFzZWQgb24gdGhlIGdpdmVuIGB3cmFwcGVyc2AgYW5kIGBtZXRhZGF0YWAgb2JqZWN0cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gd3JhcC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW3dyYXBwZXJzID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyB3cmFwcGVyIGZ1bmN0aW9ucyBmb3Igc3BlY2lhbCBjYXNlcy4gQW55XG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcHJlc2VudCBpbiB0aGlzIG9iamVjdCB0cmVlIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiB0aGVcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlLiBUaGVzZVxuICAgICAgICogICAgICAgIHdyYXBwZXIgbWV0aG9kcyBhcmUgaW52b2tlZCBhcyBkZXNjcmliZWQgaW4ge0BzZWUgd3JhcE1ldGhvZH0uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YSA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgbWV0YWRhdGEgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlXG4gICAgICAgKiAgICAgICAgUHJvbWlzZS1iYXNlZCB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYXN5bmNocm9ub3VzLiBBbnkgZnVuY3Rpb24gaW5cbiAgICAgICAqICAgICAgICB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUgd2hpY2ggaGFzIGEgY29ycmVzcG9uZGluZyBtZXRhZGF0YSBvYmplY3RcbiAgICAgICAqICAgICAgICBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYG1ldGFkYXRhYCB0cmVlIGlzIHJlcGxhY2VkIHdpdGggYW5cbiAgICAgICAqICAgICAgICBhdXRvbWF0aWNhbGx5LWdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAqICAgICAgICB7QHNlZSB3cmFwQXN5bmNGdW5jdGlvbn1cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7UHJveHk8b2JqZWN0Pn1cbiAgICAgICAqL1xuXG4gICAgICBjb25zdCB3cmFwT2JqZWN0ID0gKHRhcmdldCwgd3JhcHBlcnMgPSB7fSwgbWV0YWRhdGEgPSB7fSkgPT4ge1xuICAgICAgICBsZXQgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgaGFzKHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQgfHwgcHJvcCBpbiBjYWNoZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZ2V0KHByb3h5VGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShwcm9wIGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuIENoZWNrIGlmIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgICAgLy8gYW55IHdyYXBwaW5nLlxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHdyYXBwZXJzW3Byb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgc3BlY2lhbC1jYXNlIHdyYXBwZXIgZm9yIHRoaXMgbWV0aG9kLlxuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcnNbcHJvcF0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gYXN5bmMgbWV0aG9kIHRoYXQgd2UgaGF2ZSBtZXRhZGF0YSBmb3IuIENyZWF0ZSBhXG4gICAgICAgICAgICAgICAgLy8gUHJvbWlzZSB3cmFwcGVyIGZvciBpdC5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHdyYXBBc3luY0Z1bmN0aW9uKHByb3AsIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2QgdGhhdCB3ZSBkb24ndCBrbm93IG9yIGNhcmUgYWJvdXQuIFJldHVybiB0aGVcbiAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBtZXRob2QsIGJvdW5kIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmJpbmQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgKGhhc093blByb3BlcnR5KHdyYXBwZXJzLCBwcm9wKSB8fCBoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gb2JqZWN0IHRoYXQgd2UgbmVlZCB0byBkbyBzb21lIHdyYXBwaW5nIGZvciB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgICAgLy8gb2YuIENyZWF0ZSBhIHN1Yi1vYmplY3Qgd3JhcHBlciBmb3IgaXQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hpbGRcbiAgICAgICAgICAgICAgLy8gbWV0YWRhdGEuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIFwiKlwiKSkge1xuICAgICAgICAgICAgICAvLyBXcmFwIGFsbCBwcm9wZXJ0aWVzIGluICogbmFtZXNwYWNlLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtcIipcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnkgd3JhcHBpbmcgZm9yIHRoaXMgcHJvcGVydHksXG4gICAgICAgICAgICAgIC8vIHNvIGp1c3QgZm9yd2FyZCBhbGwgYWNjZXNzIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzZXQocHJveHlUYXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVmaW5lUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3AsIGRlc2MpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCBkZXNjKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZGVsZXRlUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGNhY2hlLCBwcm9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfTsgLy8gUGVyIGNvbnRyYWN0IG9mIHRoZSBQcm94eSBBUEksIHRoZSBcImdldFwiIHByb3h5IGhhbmRsZXIgbXVzdCByZXR1cm4gdGhlXG4gICAgICAgIC8vIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSB0YXJnZXQgaWYgdGhhdCB2YWx1ZSBpcyBkZWNsYXJlZCByZWFkLW9ubHkgYW5kXG4gICAgICAgIC8vIG5vbi1jb25maWd1cmFibGUuIEZvciB0aGlzIHJlYXNvbiwgd2UgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAgICAvLyBwcm90b3R5cGUgc2V0IHRvIGB0YXJnZXRgIGluc3RlYWQgb2YgdXNpbmcgYHRhcmdldGAgZGlyZWN0bHkuXG4gICAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW5ub3QgcmV0dXJuIGEgY3VzdG9tIG9iamVjdCBmb3IgQVBJcyB0aGF0XG4gICAgICAgIC8vIGFyZSBkZWNsYXJlZCByZWFkLW9ubHkgYW5kIG5vbi1jb25maWd1cmFibGUsIHN1Y2ggYXMgYGNocm9tZS5kZXZ0b29sc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBwcm94eSBoYW5kbGVycyB0aGVtc2VsdmVzIHdpbGwgc3RpbGwgdXNlIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIHRoZSBgcHJveHlUYXJnZXRgLCBzbyB0aGF0IHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuICAgICAgICAvLyBkZXJlZmVyZW5jZWQgdmlhIHRoZSBvcmlnaW5hbCB0YXJnZXRzLlxuXG4gICAgICAgIGxldCBwcm94eVRhcmdldCA9IE9iamVjdC5jcmVhdGUodGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShwcm94eVRhcmdldCwgaGFuZGxlcnMpO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHNldCBvZiB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgb2JqZWN0LCB3aGljaCBoYW5kbGVzXG4gICAgICAgKiB3cmFwcGluZyBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdGhhdCB0aG9zZSBtZXNzYWdlcyBhcmUgcGFzc2VkLlxuICAgICAgICpcbiAgICAgICAqIEEgc2luZ2xlIHdyYXBwZXIgaXMgY3JlYXRlZCBmb3IgZWFjaCBsaXN0ZW5lciBmdW5jdGlvbiwgYW5kIHN0b3JlZCBpbiBhXG4gICAgICAgKiBtYXAuIFN1YnNlcXVlbnQgY2FsbHMgdG8gYGFkZExpc3RlbmVyYCwgYGhhc0xpc3RlbmVyYCwgb3IgYHJlbW92ZUxpc3RlbmVyYFxuICAgICAgICogcmV0cmlldmUgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIHNvIHRoYXQgIGF0dGVtcHRzIHRvIHJlbW92ZSBhXG4gICAgICAgKiBwcmV2aW91c2x5LWFkZGVkIGxpc3RlbmVyIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtEZWZhdWx0V2Vha01hcDxmdW5jdGlvbiwgZnVuY3Rpb24+fSB3cmFwcGVyTWFwXG4gICAgICAgKiAgICAgICAgQSBEZWZhdWx0V2Vha01hcCBvYmplY3Qgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBmb3IgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB3aGVuIG9uZSBkb2VzIG5vdCBleGlzdCwgYW5kIHJldHJpZXZlXG4gICAgICAgKiAgICAgICAgYW4gZXhpc3Rpbmcgb25lIHdoZW4gaXQgZG9lcy5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcEV2ZW50ID0gd3JhcHBlck1hcCA9PiAoe1xuICAgICAgICBhZGRMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyLCAuLi5hcmdzKSB7XG4gICAgICAgICAgdGFyZ2V0LmFkZExpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSwgLi4uYXJncyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFzTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHJldHVybiB0YXJnZXQuaGFzTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGFuIG9uUmVxdWVzdEZpbmlzaGVkIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgd2lsbCByZXR1cm4gYVxuICAgICAgICAgKiBgZ2V0Q29udGVudCgpYCBwcm9wZXJ0eSB3aGljaCByZXR1cm5zIGEgYFByb21pc2VgIHJhdGhlciB0aGFuIHVzaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2sgQVBJLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAgICAgICAqICAgICAgICBUaGUgSEFSIGVudHJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldHdvcmsgcmVxdWVzdC5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25SZXF1ZXN0RmluaXNoZWQocmVxKSB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZFJlcSA9IHdyYXBPYmplY3QocmVxLCB7fVxuICAgICAgICAgIC8qIHdyYXBwZXJzICovXG4gICAgICAgICAgLCB7XG4gICAgICAgICAgICBnZXRDb250ZW50OiB7XG4gICAgICAgICAgICAgIG1pbkFyZ3M6IDAsXG4gICAgICAgICAgICAgIG1heEFyZ3M6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0ZW5lcih3cmFwcGVkUmVxKTtcbiAgICAgICAgfTtcbiAgICAgIH0pOyAvLyBLZWVwIHRyYWNrIGlmIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIGhhcyBiZWVuIGxvZ2dlZCBhdCBsZWFzdCBvbmNlLlxuXG4gICAgICBsZXQgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYSBtZXNzYWdlIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IHNlbmQgcmVzcG9uc2VzIGJhc2VkIG9uXG4gICAgICAgICAqIGl0cyByZXR1cm4gdmFsdWUsIHJhdGhlciB0aGFuIGJ5IHJldHVybmluZyBhIHNlbnRpbmVsIHZhbHVlIGFuZCBjYWxsaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2suIElmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSwgdGhlIHJlc3BvbnNlIGlzXG4gICAgICAgICAqIHNlbnQgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHsqfSBtZXNzYWdlXG4gICAgICAgICAqICAgICAgICBUaGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBvdGhlciBlbmQgb2YgdGhlIGNoYW5uZWwuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZW5kZXJcbiAgICAgICAgICogICAgICAgIERldGFpbHMgYWJvdXQgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gc2VuZFJlc3BvbnNlXG4gICAgICAgICAqICAgICAgICBBIGNhbGxiYWNrIHdoaWNoLCB3aGVuIGNhbGxlZCB3aXRoIGFuIGFyYml0cmFyeSBhcmd1bWVudCwgc2VuZHNcbiAgICAgICAgICogICAgICAgIHRoYXQgdmFsdWUgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqICAgICAgICBUcnVlIGlmIHRoZSB3cmFwcGVkIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgd2hpY2ggd2lsbCBsYXRlclxuICAgICAgICAgKiAgICAgICAgeWllbGQgYSByZXNwb25zZS4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICAgIGxldCB3cmFwcGVkU2VuZFJlc3BvbnNlO1xuICAgICAgICAgIGxldCBzZW5kUmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVkU2VuZFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICghbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORywgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbGlzdGVuZXIobWVzc2FnZSwgc2VuZGVyLCB3cmFwcGVkU2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNSZXN1bHRUaGVuYWJsZSA9IHJlc3VsdCAhPT0gdHJ1ZSAmJiBpc1RoZW5hYmxlKHJlc3VsdCk7IC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cblxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUgJiYgIWlzUmVzdWx0VGhlbmFibGUgJiYgIWRpZENhbGxTZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IC8vIEEgc21hbGwgaGVscGVyIHRvIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgICAvLyBhbmQgYW4gZXJyb3IgaWYgdGhlIHByb21pc2UgcmVqZWN0cyAoYSB3cmFwcGVkIHNlbmRNZXNzYWdlIGhhc1xuICAgICAgICAgIC8vIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgcmVzb2x2ZWQgcHJvbWlzZSBvciBhIHJlamVjdGVkXG4gICAgICAgICAgLy8gcHJvbWlzZSkuXG5cblxuICAgICAgICAgIGNvbnN0IHNlbmRQcm9taXNlZFJlc3VsdCA9IHByb21pc2UgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKG1zZyA9PiB7XG4gICAgICAgICAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgdmFsdWUuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZShtc2cpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAvLyBTZW5kIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaWYgdGhlIHJlamVjdGVkIHZhbHVlXG4gICAgICAgICAgICAgIC8vIGlzIGFuIGluc3RhbmNlIG9mIGVycm9yLCBvciB0aGUgb2JqZWN0IGl0c2VsZiBvdGhlcndpc2UuXG4gICAgICAgICAgICAgIGxldCBtZXNzYWdlO1xuXG4gICAgICAgICAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciB8fCB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9OyAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCBzZW5kIHRoZSByZXNvbHZlZCB2YWx1ZSBhcyBhXG4gICAgICAgICAgLy8gcmVzdWx0LCBvdGhlcndpc2Ugd2FpdCB0aGUgcHJvbWlzZSByZWxhdGVkIHRvIHRoZSB3cmFwcGVkU2VuZFJlc3BvbnNlXG4gICAgICAgICAgLy8gY2FsbGJhY2sgdG8gcmVzb2x2ZSBhbmQgc2VuZCBpdCBhcyBhIHJlc3BvbnNlLlxuXG5cbiAgICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICB9IC8vIExldCBDaHJvbWUga25vdyB0aGF0IHRoZSBsaXN0ZW5lciBpcyByZXBseWluZy5cblxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2sgPSAoe1xuICAgICAgICByZWplY3QsXG4gICAgICAgIHJlc29sdmVcbiAgICAgIH0sIHJlcGx5KSA9PiB7XG4gICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgLy8gRGV0ZWN0IHdoZW4gbm9uZSBvZiB0aGUgbGlzdGVuZXJzIHJlcGxpZWQgdG8gdGhlIHNlbmRNZXNzYWdlIGNhbGwgYW5kIHJlc29sdmVcbiAgICAgICAgICAvLyB0aGUgcHJvbWlzZSB0byB1bmRlZmluZWQgYXMgaW4gRmlyZWZveC5cbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2lzc3Vlcy8xMzBcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlID09PSBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVwbHkgJiYgcmVwbHkuX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fKSB7XG4gICAgICAgICAgLy8gQ29udmVydCBiYWNrIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpbnRvXG4gICAgICAgICAgLy8gYW4gRXJyb3IgaW5zdGFuY2UuXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihyZXBseS5tZXNzYWdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXBseSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZSA9IChuYW1lLCBtZXRhZGF0YSwgYXBpTmFtZXNwYWNlT2JqLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlZENiID0gd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2suYmluZChudWxsLCB7XG4gICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXJncy5wdXNoKHdyYXBwZWRDYik7XG4gICAgICAgICAgYXBpTmFtZXNwYWNlT2JqLnNlbmRNZXNzYWdlKC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHN0YXRpY1dyYXBwZXJzID0ge1xuICAgICAgICBkZXZ0b29sczoge1xuICAgICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICAgIG9uUmVxdWVzdEZpbmlzaGVkOiB3cmFwRXZlbnQob25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycylcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICBvbk1lc3NhZ2U6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgb25NZXNzYWdlRXh0ZXJuYWw6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0YWJzOiB7XG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMixcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0dGluZ01ldGFkYXRhID0ge1xuICAgICAgICBjbGVhcjoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBhcGlNZXRhZGF0YS5wcml2YWN5ID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgd2Vic2l0ZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd3JhcE9iamVjdChleHRlbnNpb25BUElzLCBzdGF0aWNXcmFwcGVycywgYXBpTWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGNocm9tZSAhPSBcIm9iamVjdFwiIHx8ICFjaHJvbWUgfHwgIWNocm9tZS5ydW50aW1lIHx8ICFjaHJvbWUucnVudGltZS5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICAgIH0gLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAgIC8vIGBtb2R1bGVgIHZhcmlhYmxlIGF2YWlsYWJsZS5cblxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gYnJvd3NlcjtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLXBvbHlmaWxsLmpzLm1hcFxuIiwiXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyPFQgZXh0ZW5kcyBzdHJpbmcsIFUgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IHZvaWQ+IHtcbiAgICBwcml2YXRlIGxpc3RlbmVycyA9IG5ldyBNYXA8VCwgVVtdPigpO1xuXG4gICAgb24oZXZlbnQ6IFQsIGhhbmRsZXI6IFUpIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGV2ZW50KTtcbiAgICAgICAgaWYgKGhhbmRsZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQoZXZlbnQsIGhhbmRsZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIGVtaXQoZXZlbnQ6IFQsIC4uLmRhdGE6IGFueSkge1xuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMubGlzdGVuZXJzLmdldChldmVudCk7XG4gICAgICAgIGlmIChoYW5kbGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgOiBFcnJvcltdID0gW107XG4gICAgICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciguLi5kYXRhKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLyogRXJyb3IgY29uZGl0aW9ucyBoZXJlIGFyZSBpbXBvc3NpYmxlIHRvIHRlc3QgZm9yIGZyb20gc2VsZW5pdW1cbiAgICAgICAgICAgICAqIGJlY2F1c2UgaXQgd291bGQgYXJpc2UgZnJvbSB0aGUgd3JvbmcgdXNlIG9mIHRoZSBBUEksIHdoaWNoIHdlXG4gICAgICAgICAgICAgKiBjYW4ndCBzaGlwIGluIHRoZSBleHRlbnNpb24sIHNvIGRvbid0IHRyeSB0byBpbnN0cnVtZW50LiAqL1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGdldENvbmYgfSBmcm9tIFwiLi91dGlscy9jb25maWd1cmF0aW9uXCJcbmltcG9ydCB7IGNvbXB1dGVTZWxlY3RvciwgaXNDaHJvbWUgfSBmcm9tIFwiLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQWJzdHJhY3RFZGl0b3IgfSBmcm9tIFwiZWRpdG9yLWFkYXB0ZXIvQWJzdHJhY3RFZGl0b3JcIjtcbmltcG9ydCB7IGdldEVkaXRvciB9IGZyb20gXCJlZGl0b3ItYWRhcHRlclwiO1xuXG5leHBvcnQgY2xhc3MgRmlyZW52aW1FbGVtZW50IHtcblxuICAgIC8vIGVkaXRvciBpcyBhbiBvYmplY3QgdGhhdCBwcm92aWRlcyBhbiBpbnRlcmZhY2UgdG8gaW50ZXJhY3QgKGUuZy5cbiAgICAvLyByZXRyaWV2ZS9zZXQgY29udGVudCwgcmV0cmlldmUvc2V0IGN1cnNvciBwb3NpdGlvbikgY29uc2lzdGVudGx5IHdpdGhcbiAgICAvLyB1bmRlcmx5aW5nIGVsZW1lbnRzIChiZSB0aGV5IHNpbXBsZSB0ZXh0YXJlYXMsIENvZGVNaXJyb3IgZWxlbWVudHMgb3JcbiAgICAvLyBvdGhlcikuXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEFic3RyYWN0RWRpdG9yO1xuICAgIC8vIGZvY3VzSW5mbyBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgZm9jdXMgbGlzdGVuZXJzIGFuZCB0aW1lb3V0cyBjcmVhdGVkXG4gICAgLy8gYnkgRmlyZW52aW1FbGVtZW50LmZvY3VzKCkuIEZpcmVudmltRWxlbWVudC5mb2N1cygpIGNyZWF0ZXMgdGhlc2VcbiAgICAvLyBsaXN0ZW5lcnMgYW5kIHRpbWVvdXRzIGluIG9yZGVyIHRvIHdvcmsgYXJvdW5kIHBhZ2VzIHRoYXQgdHJ5IHRvIGdyYWJcbiAgICAvLyB0aGUgZm9jdXMgYWdhaW4gYWZ0ZXIgdGhlIEZpcmVudmltRWxlbWVudCBoYXMgYmVlbiBjcmVhdGVkIG9yIGFmdGVyIHRoZVxuICAgIC8vIHVuZGVybHlpbmcgZWxlbWVudCdzIGNvbnRlbnQgaGFzIGNoYW5nZWQuXG4gICAgcHJpdmF0ZSBmb2N1c0luZm8gPSB7XG4gICAgICAgIGZpbmFsUmVmb2N1c1RpbWVvdXRzOiBbXSBhcyBhbnlbXSxcbiAgICAgICAgcmVmb2N1c1JlZnM6IFtdIGFzIGFueVtdLFxuICAgICAgICByZWZvY3VzVGltZW91dHM6IFtdIGFzIGFueVtdLFxuICAgIH07XG4gICAgLy8gZnJhbWVJZCBpcyB0aGUgd2ViZXh0ZW5zaW9uIGlkIG9mIHRoZSBuZW92aW0gZnJhbWUuIFdlIHVzZSBpdCB0byBzZW5kXG4gICAgLy8gY29tbWFuZHMgdG8gdGhlIGZyYW1lLlxuICAgIHByaXZhdGUgZnJhbWVJZDogbnVtYmVyO1xuICAgIC8vIGZyYW1lSWRQcm9taXNlIGlzIGEgcHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSB0byB0aGUgZnJhbWVJZC4gVGhlXG4gICAgLy8gZnJhbWVJZCBjYW4ndCBiZSByZXRyaWV2ZWQgc3luY2hyb25vdXNseSBhcyBpdCBuZWVkcyB0byBiZSBzZW50IGJ5IHRoZVxuICAgIC8vIGJhY2tncm91bmQgc2NyaXB0LlxuICAgIHByaXZhdGUgZnJhbWVJZFByb21pc2U6IFByb21pc2U8bnVtYmVyPjtcbiAgICAvLyBpZnJhbWUgaXMgdGhlIE5lb3ZpbSBmcmFtZS4gVGhpcyBpcyB0aGUgZWxlbWVudCB0aGF0IHJlY2VpdmVzIGFsbCBpbnB1dHNcbiAgICAvLyBhbmQgZGlzcGxheXMgdGhlIGVkaXRvci5cbiAgICBwcml2YXRlIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgLy8gV2UgdXNlIGFuIGludGVyc2VjdGlvbk9ic2VydmVyIHRvIGRldGVjdCB3aGVuIHRoZSBlbGVtZW50IHRoZVxuICAgIC8vIEZpcmVudmltRWxlbWVudCBpcyB0aWVkIGJlY29tZXMgaW52aXNpYmxlLiBXaGVuIHRoaXMgaGFwcGVucyxcbiAgICAvLyB3ZSBoaWRlIHRoZSBGaXJlbnZpbUVsZW1lbnQgZnJvbSB0aGUgcGFnZS5cbiAgICBwcml2YXRlIGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbiAgICAvLyBXZSB1c2UgYSBtdXRhdGlvbiBvYnNlcnZlciB0byBkZXRlY3Qgd2hldGhlciB0aGUgZWxlbWVudCBpcyByZW1vdmVkIGZyb21cbiAgICAvLyB0aGUgcGFnZS4gV2hlbiB0aGlzIGhhcHBlbnMsIHRoZSBGaXJlbnZpbUVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tIHRoZVxuICAgIC8vIHBhZ2UuXG4gICAgcHJpdmF0ZSBwYWdlT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgLy8gV2UgdXNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gZGV0ZWN0IGlmIHRoZSBzcGFuIGlzIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAvLyBwYWdlIGJ5IHRoZSBwYWdlLiBXaGVuIHRoaXMgaGFwcGVucywgdGhlIHNwYW4gaXMgcmUtaW5zZXJ0ZWQgaW4gdGhlXG4gICAgLy8gcGFnZS5cbiAgICBwcml2YXRlIHNwYW5PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgICAvLyBudmltaWZ5IGlzIHRoZSBmdW5jdGlvbiB0aGF0IGxpc3RlbnMgZm9yIGZvY3VzIGV2ZW50cyBhbmQgY3JlYXRlc1xuICAgIC8vIGZpcmVudmltIGVsZW1lbnRzLiBXZSBuZWVkIGl0IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gcmVtb3ZlIGl0IGFzIGFuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgZWxlbWVudCB0aGUgdXNlciBzZWxlY3RlZCB3aGVuIHRoZSB1c2VyIHdhbnRzIHRvXG4gICAgLy8gc2VsZWN0IHRoYXQgZWxlbWVudCBhZ2Fpbi5cbiAgICBwcml2YXRlIG52aW1pZnk6IChldnQ6IHsgdGFyZ2V0OiBFdmVudFRhcmdldCB9KSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgIC8vIG9yaWdpbmFsRWxlbWVudCBpcyB0aGUgZWxlbWVudCBhIGZvY3VzIGV2ZW50IGhhcyBiZWVuIHRyaWdnZXJlZCBvbi4gV2VcbiAgICAvLyB1c2UgaXQgdG8gcmV0cmlldmUgdGhlIGVsZW1lbnQgdGhlIGVkaXRvciBzaG91bGQgYXBwZWFyIG92ZXIgKGUuZy4sIGlmXG4gICAgLy8gZWxlbSBpcyBhbiBlbGVtZW50IGluc2lkZSBhIENvZGVNaXJyb3IgZWRpdG9yLCBlbGVtIHdpbGwgYmUgYSBzbWFsbFxuICAgIC8vIGludmlzaWJsZSB0ZXh0YXJlYSBhbmQgd2hhdCB3ZSByZWFsbHkgd2FudCB0byBwdXQgdGhlIEZpcmVudmltIGVsZW1lbnRcbiAgICAvLyBvdmVyIGlzIHRoZSBwYXJlbnQgZGl2IHRoYXQgY29udGFpbnMgaXQpIGFuZCB0byBnaXZlIGZvY3VzIGJhY2sgdG8gdGhlXG4gICAgLy8gcGFnZSB3aGVuIHRoZSB1c2VyIGFza3MgZm9yIHRoYXQuXG4gICAgcHJpdmF0ZSBvcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIC8vIHJlc2l6ZU9ic2VydmVyIGlzIHVzZWQgaW4gb3JkZXIgdG8gZGV0ZWN0IHdoZW4gdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAgICAvLyBiZWluZyBlZGl0ZWQgY2hhbmdlZC4gV2hlbiB0aGlzIGhhcHBlbnMsIHdlIHJlc2l6ZSB0aGUgbmVvdmltIGZyYW1lLlxuICAgIC8vIFRPRE86IHBlcmlvZGljYWxseSBjaGVjayBpZiBNUyBpbXBsZW1lbnRlZCBhIFJlc2l6ZU9ic2VydmVyIHR5cGVcbiAgICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyOiBhbnk7XG4gICAgLy8gc3BhbiBpcyB0aGUgc3BhbiBlbGVtZW50IHdlIHVzZSBpbiBvcmRlciB0byBpbnNlcnQgdGhlIG5lb3ZpbSBmcmFtZSBpblxuICAgIC8vIHRoZSBwYWdlLiBUaGUgbmVvdmltIGZyYW1lIGlzIGF0dGFjaGVkIHRvIGl0cyBzaGFkb3cgZG9tLiBVc2luZyBhIHNwYW5cbiAgICAvLyBpcyBtdWNoIGxlc3MgZGlzcnVwdGl2ZSB0byB0aGUgcGFnZSBhbmQgZW5hYmxlcyBhIG1vZGljdW0gb2YgcHJpdmFjeVxuICAgIC8vICh0aGUgcGFnZSB3b24ndCBiZSBhYmxlIHRvIGNoZWNrIHdoYXQncyBpbiBpdCkuIEluIGZpcmVmb3gsIHBhZ2VzIHdpbGxcbiAgICAvLyBzdGlsbCBiZSBhYmxlIHRvIGRldGVjdCB0aGUgbmVvdmltIGZyYW1lIGJ5IHVzaW5nIHdpbmRvdy5mcmFtZXMgdGhvdWdoLlxuICAgIHByaXZhdGUgc3BhbjogSFRNTFNwYW5FbGVtZW50O1xuICAgIC8vIHJlc2l6ZVJlcUlkIGtlZXBzIHRyYWNrIG9mIHRoZSBudW1iZXIgb2YgcmVzaXppbmcgcmVxdWVzdHMgdGhhdCBhcmUgc2VudFxuICAgIC8vIHRvIHRoZSBpZnJhbWUuIFdlIHNlbmQgYW5kIGluY3JlbWVudCBpdCBmb3IgZXZlcnkgcmVzaXplIHJlcXVlc3RzLCB0aGlzXG4gICAgLy8gbGV0cyB0aGUgaWZyYW1lIGtub3cgd2hhdCB0aGUgbW9zdCByZWNlbnRseSBzZW50IHJlc2l6ZSByZXF1ZXN0IGlzIGFuZFxuICAgIC8vIHRodXMgYXZvaWRzIHJlYWN0aW5nIHRvIGFuIG9sZGVyIHJlc2l6ZSByZXF1ZXN0IGlmIGEgbW9yZSByZWNlbnQgaGFzXG4gICAgLy8gYWxyZWFkeSBiZWVuIHByb2Nlc3NlZC5cbiAgICBwcml2YXRlIHJlc2l6ZVJlcUlkID0gMDtcbiAgICAvLyByZWxhdGl2ZVgvWSBpcyB0aGUgcG9zaXRpb24gdGhlIGlmcmFtZSBzaG91bGQgaGF2ZSByZWxhdGl2ZSB0byB0aGUgaW5wdXRcbiAgICAvLyBlbGVtZW50IGluIG9yZGVyIHRvIGJlIGJvdGggYXMgY2xvc2UgYXMgcG9zc2libGUgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAvLyBhbmQgZml0IGluIHRoZSB3aW5kb3cgd2l0aG91dCBvdmVyZmxvd2luZyBvdXQgb2YgdGhlIHZpZXdwb3J0LlxuICAgIHByaXZhdGUgcmVsYXRpdmVYID0gMDtcbiAgICBwcml2YXRlIHJlbGF0aXZlWSA9IDA7XG4gICAgLy8gZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4ga2VlcHMgdHJhY2sgb2Ygd2hldGhlciB0aGlzIGlzIHRoZVxuICAgIC8vIGZpcnN0IHRpbWUgdGhlIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiBmdW5jdGlvbiBpcyBjYWxsZWQgZnJvbSB0aGVcbiAgICAvLyBpZnJhbWUuIFNlZSBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW5BZnRlclJlc2l6ZUZyb21GcmFtZSgpIGZvciBtb3JlXG4gICAgLy8gaW5mb3JtYXRpb24uXG4gICAgcHJpdmF0ZSBmaXJzdFB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiA9IHRydWU7XG4gICAgLy8gb25EZXRhY2ggaXMgYSBjYWxsYmFjayBwcm92aWRlZCBieSB0aGUgY29udGVudCBzY3JpcHQgd2hlbiBpdCBjcmVhdGVzXG4gICAgLy8gdGhlIEZpcmVudmltRWxlbWVudC4gSXQgaXMgY2FsbGVkIHdoZW4gdGhlIGRldGFjaCgpIGZ1bmN0aW9uIGlzIGNhbGxlZCxcbiAgICAvLyBhZnRlciBhbGwgRmlyZW52aW0gZWxlbWVudHMgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFnZS5cbiAgICBwcml2YXRlIG9uRGV0YWNoOiAoaWQ6IG51bWJlcikgPT4gYW55O1xuICAgIC8vIGJ1ZmZlckluZm86IGEgW3VybCwgc2VsZWN0b3IsIGN1cnNvciwgbGFuZ10gdHVwbGUgaW5kaWNhdGluZyB0aGUgcGFnZVxuICAgIC8vIHRoZSBsYXN0IGlmcmFtZSB3YXMgY3JlYXRlZCBvbiwgdGhlIHNlbGVjdG9yIG9mIHRoZSBjb3JyZXNwb25kaW5nXG4gICAgLy8gdGV4dGFyZWEgYW5kIHRoZSBjb2x1bW4vbGluZSBudW1iZXIgb2YgdGhlIGN1cnNvci5cbiAgICAvLyBOb3RlIHRoYXQgdGhlc2UgYXJlIF9fZGVmYXVsdF9fIHZhbHVlcy4gUmVhbCB2YWx1ZXMgbXVzdCBiZSBjcmVhdGVkIHdpdGhcbiAgICAvLyBwcmVwYXJlQnVmZmVySW5mbygpLiBUaGUgcmVhc29uIHdlJ3JlIG5vdCBkb2luZyB0aGlzIGZyb20gdGhlXG4gICAgLy8gY29uc3RydWN0b3IgaXMgdGhhdCBpdCdzIGV4cGVuc2l2ZSBhbmQgZGlzcnVwdGl2ZSAtIGdldHRpbmcgdGhpc1xuICAgIC8vIGluZm9ybWF0aW9uIHJlcXVpcmVzIGV2YWx1YXRpbmcgY29kZSBpbiB0aGUgcGFnZSdzIGNvbnRleHQuXG4gICAgcHJpdmF0ZSBidWZmZXJJbmZvID0gKFByb21pc2UucmVzb2x2ZShbXCJcIiwgXCJcIiwgWzEsIDFdLCB1bmRlZmluZWRdKSBhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlPFtzdHJpbmcsIHN0cmluZywgW251bWJlciwgbnVtYmVyXSwgc3RyaW5nXT4pO1xuICAgIC8vIGN1cnNvcjogbGFzdCBrbm93biBjdXJzb3IgcG9zaXRpb24uIFVwZGF0ZWQgb24gZ2V0UGFnZUVsZW1lbnRDdXJzb3IgYW5kXG4gICAgLy8gc2V0UGFnZUVsZW1lbnRDdXJzb3JcbiAgICBwcml2YXRlIGN1cnNvciA9IFsxLCAxXSBhcyBbbnVtYmVyLCBudW1iZXJdO1xuXG5cbiAgICAvLyBlbGVtIGlzIHRoZSBlbGVtZW50IHRoYXQgcmVjZWl2ZWQgdGhlIGZvY3VzRXZlbnQuXG4gICAgLy8gTnZpbWlmeSBpcyB0aGUgZnVuY3Rpb24gdGhhdCBsaXN0ZW5zIGZvciBmb2N1cyBldmVudHMuIFdlIG5lZWQgdG8ga25vd1xuICAgIC8vIGFib3V0IGl0IGluIG9yZGVyIHRvIHJlbW92ZSBpdCBiZWZvcmUgZm9jdXNpbmcgZWxlbSAob3RoZXJ3aXNlIHdlJ2xsXG4gICAgLy8ganVzdCBncmFiIGZvY3VzIGFnYWluKS5cbiAgICBjb25zdHJ1Y3RvciAoZWxlbTogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgIGxpc3RlbmVyOiAoZXZ0OiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgICAgICAgICAgICAgICAgb25EZXRhY2g6IChpZDogbnVtYmVyKSA9PiBhbnkpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQgPSBlbGVtO1xuICAgICAgICB0aGlzLm52aW1pZnkgPSBsaXN0ZW5lcjtcbiAgICAgICAgdGhpcy5vbkRldGFjaCA9IG9uRGV0YWNoO1xuICAgICAgICB0aGlzLmVkaXRvciA9IGdldEVkaXRvcihlbGVtLCB7XG4gICAgICAgICAgICBwcmVmZXJIVE1MOiBnZXRDb25mKCkuY29udGVudCA9PSBcImh0bWxcIixcbiAgICAgICAgICAgIGNvZGVNaXJyb3I2RW5hYmxlZDogaXNDaHJvbWUoKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNwYW4gPSBlbGVtXG4gICAgICAgICAgICAub3duZXJEb2N1bWVudFxuICAgICAgICAgICAgLmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgXCJzcGFuXCIpO1xuICAgICAgICAvLyBNYWtlIG5vbi1mb2N1c2FibGUsIGFzIG90aGVyd2lzZSA8VGFiPiBhbmQgPFMtVGFiPiBpbiB0aGUgcGFnZSB3b3VsZFxuICAgICAgICAvLyBmb2N1cyB0aGUgaWZyYW1lIGF0IHRoZSBlbmQgb2YgdGhlIHBhZ2UgaW5zdGVhZCBvZiBmb2N1c2luZyB0aGVcbiAgICAgICAgLy8gYnJvd3NlcidzIFVJLiBUaGUgb25seSB3YXkgdG8gPFRhYj4tZm9jdXMgdGhlIGZyYW1lIGlzIHRvXG4gICAgICAgIC8vIDxUYWI+LWZvY3VzIHRoZSBjb3JyZXNwb25kaW5nIGlucHV0IGVsZW1lbnQuXG4gICAgICAgIHRoaXMuc3Bhbi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmlmcmFtZSA9IGVsZW1cbiAgICAgICAgICAgIC5vd25lckRvY3VtZW50XG4gICAgICAgICAgICAuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcImlmcmFtZVwiKSBhcyBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXJlIGlzbid0IGFueSBleHRyYSB3aWR0aC9oZWlnaHRcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUucGFkZGluZyA9IFwiMHB4XCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmJvcmRlciA9IFwiMHB4XCI7XG4gICAgICAgIC8vIFdlIHN0aWxsIG5lZWQgYSBib3JkZXIsIHVzZSBhIHNoYWRvdyBmb3IgdGhhdFxuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5ib3hTaGFkb3cgPSBcIjBweCAwcHggMXB4IDFweCBibGFja1wiO1xuICAgIH1cblxuICAgIGF0dGFjaFRvUGFnZSAoZmlwOiBQcm9taXNlPG51bWJlcj4pIHtcbiAgICAgICAgdGhpcy5mcmFtZUlkUHJvbWlzZSA9IGZpcC50aGVuKChmOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVJZCA9IGY7XG4gICAgICAgICAgICAvLyBPbmNlIGEgZnJhbWVJZCBoYXMgYmVlbiBhY3F1aXJlZCwgdGhlIEZpcmVudmltRWxlbWVudCB3b3VsZCBkaWVcbiAgICAgICAgICAgIC8vIGlmIGl0cyBzcGFuIHdhcyByZW1vdmVkIGZyb20gdGhlIHBhZ2UuIFRodXMgdGhlcmUgaXMgbm8gdXNlIGluXG4gICAgICAgICAgICAvLyBrZWVwaW5nIGl0cyBzcGFuT2JzZXJ2ZXIgYXJvdW5kLiBJdCdkIGV2ZW4gY2F1c2UgaXNzdWVzIGFzIHRoZVxuICAgICAgICAgICAgLy8gc3Bhbk9ic2VydmVyIHdvdWxkIGF0dGVtcHQgdG8gcmUtaW5zZXJ0IGEgZGVhZCBmcmFtZSBpbiB0aGVcbiAgICAgICAgICAgIC8vIHBhZ2UuXG4gICAgICAgICAgICB0aGlzLnNwYW5PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFtZUlkO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRoZSBpZnJhbWUgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gcmVzaXplIGl0IGJlY2F1c2Ugd2UncmUganVzdCB1c2luZyB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAgICAvLyBpbnB1dC90ZXh0YXJlYSdzIHNpemVcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5yZXNpemVUbyhyZWN0LndpZHRoLCByZWN0LmhlaWdodCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnJlbGF0aXZlWCA9IDA7XG4gICAgICAgIHRoaXMucmVsYXRpdmVZID0gMDtcbiAgICAgICAgdGhpcy5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKTtcblxuICAgICAgICAvLyBVc2UgYSBSZXNpemVPYnNlcnZlciB0byBkZXRlY3Qgd2hlbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50J3NcbiAgICAgICAgLy8gc2l6ZSBjaGFuZ2VzIGFuZCBjaGFuZ2UgdGhlIHNpemUgb2YgdGhlIEZpcmVudmltRWxlbWVudFxuICAgICAgICAvLyBhY2NvcmRpbmdseVxuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3ICgod2luZG93IGFzIGFueSkuUmVzaXplT2JzZXJ2ZXIpKCgoc2VsZikgPT4gYXN5bmMgKGVudHJpZXM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50OiBhbnkpID0+IGVudC50YXJnZXQgPT09IHNlbGYuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmZyYW1lSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZnJhbWVJZFByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdSZWN0ID0gdGhpcy5nZXRFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlY3Qud2lkdGggPT09IG5ld1JlY3Qud2lkdGggJiYgcmVjdC5oZWlnaHQgPT09IG5ld1JlY3QuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVjdCA9IG5ld1JlY3Q7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemVUbyhyZWN0LndpZHRoLCByZWN0LmhlaWdodCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXNpemVSZXFJZCArPSAxO1xuICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lSWQ6IHNlbGYuZnJhbWVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbc2VsZi5yZXNpemVSZXFJZCwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJyZXNpemVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlRnJhbWVcIl0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZ2V0RWxlbWVudCgpLCB7IGJveDogXCJib3JkZXItYm94XCIgfSk7XG5cbiAgICAgICAgdGhpcy5pZnJhbWUuc3JjID0gKGJyb3dzZXIgYXMgYW55KS5leHRlbnNpb24uZ2V0VVJMKFwiL2luZGV4Lmh0bWxcIik7XG4gICAgICAgIHRoaXMuc3Bhbi5hdHRhY2hTaGFkb3coeyBtb2RlOiBcImNsb3NlZFwiIH0pLmFwcGVuZENoaWxkKHRoaXMuaWZyYW1lKTtcblxuICAgICAgICAvLyBTbyBwYWdlcyAoZS5nLiBKaXJhLCBDb25mbHVlbmNlKSByZW1vdmUgc3BhbnMgZnJvbSB0aGUgcGFnZSBhcyBzb29uXG4gICAgICAgIC8vIGFzIHRoZXkncmUgaW5zZXJ0ZWQuIFdlIGRvbid0IHdhbnQgdGhhdCwgc28gZm9yIHRoZSA1IHNlY29uZHNcbiAgICAgICAgLy8gZm9sbG93aW5nIHRoZSBpbnNlcnRpb24sIGRldGVjdCBpZiB0aGUgc3BhbiBpcyByZW1vdmVkIGZyb20gdGhlIHBhZ2VcbiAgICAgICAgLy8gYnkgY2hlY2tpbmcgdmlzaWJpbGl0eSBjaGFuZ2VzIGFuZCByZS1pbnNlcnQgaWYgbmVlZGVkLlxuICAgICAgICBsZXQgcmVpbnNlcnRzID0gMDtcbiAgICAgICAgdGhpcy5zcGFuT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihcbiAgICAgICAgICAgIChzZWxmID0+IChtdXRhdGlvbnMgOiBNdXRhdGlvblJlY29yZFtdLCBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IHNlbGYuZ2V0U3BhbigpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbXV0YXRpb24ucmVtb3ZlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlID09PSBzcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWluc2VydHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWluc2VydHMgPj0gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmlyZW52aW0gaXMgdHJ5aW5nIHRvIGNyZWF0ZSBhbiBpZnJhbWUgb24gdGhpcyBzaXRlIGJ1dCB0aGUgcGFnZSBpcyBjb25zdGFudGx5IHJlbW92aW5nIGl0LiBDb25zaWRlciBkaXNhYmxpbmcgRmlyZW52aW0gb24gdGhpcyB3ZWJzaXRlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2VsZi5nZXRFbGVtZW50KCkub3duZXJEb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNwYW4pLCByZWluc2VydHMgKiAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3Bhbk9ic2VydmVyLm9ic2VydmUodGhpcy5nZXRFbGVtZW50KCkub3duZXJEb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcblxuICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudCgpLm93bmVyRG9jdW1lbnQuYm9keTtcbiAgICAgICAgLy8gV2UgY2FuJ3QgaW5zZXJ0IHRoZSBmcmFtZSBpbiB0aGUgYm9keSBpZiB0aGUgZWxlbWVudCB3ZSdyZSBnb2luZyB0b1xuICAgICAgICAvLyByZXBsYWNlIHRoZSBjb250ZW50IG9mIGlzIHRoZSBib2R5LCBhcyByZXBsYWNpbmcgdGhlIGNvbnRlbnQgd291bGRcbiAgICAgICAgLy8gZGVzdHJveSB0aGUgZnJhbWUuXG4gICAgICAgIGlmIChwYXJlbnRFbGVtZW50ID09PSB0aGlzLmdldEVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3Bhbik7XG5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIC8vIEl0IGlzIHByZXR0eSBoYXJkIHRvIHRlbGwgd2hlbiBhbiBlbGVtZW50IGRpc2FwcGVhcnMgZnJvbSB0aGUgcGFnZVxuICAgICAgICAvLyAoZWl0aGVyIGJ5IGJlaW5nIHJlbW92ZWQgb3IgYnkgYmVpbmcgaGlkZGVuIGJ5IG90aGVyIGVsZW1lbnRzKSwgc29cbiAgICAgICAgLy8gd2UgdXNlIGFuIGludGVyc2VjdGlvbiBvYnNlcnZlciwgd2hpY2ggaXMgdHJpZ2dlcmVkIGV2ZXJ5IHRpbWUgdGhlXG4gICAgICAgIC8vIGVsZW1lbnQgYmVjb21lcyBtb3JlIG9yIGxlc3MgdmlzaWJsZS5cbiAgICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoc2VsZiA9PiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gc2VsZi5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICAvLyBJZiBlbGVtIGRvZXNuJ3QgaGF2ZSBhIHJlY3QgYW55bW9yZSwgaXQncyBoaWRkZW5cbiAgICAgICAgICAgIGlmIChlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSh0aGlzKSwgeyByb290OiBudWxsLCB0aHJlc2hvbGQ6IDAuMSB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZ2V0RWxlbWVudCgpKTtcblxuICAgICAgICAvLyBXZSB3YW50IHRvIHJlbW92ZSB0aGUgRmlyZW52aW1FbGVtZW50IGZyb20gdGhlIHBhZ2Ugd2hlbiB0aGVcbiAgICAgICAgLy8gY29ycmVzcG9uZGluZyBlbGVtZW50IGlzIHJlbW92ZWQuIFdlIGRvIHRoaXMgYnkgYWRkaW5nIGFcbiAgICAgICAgLy8gbXV0YXRpb25PYnNlcnZlciB0byBpdHMgcGFyZW50LlxuICAgICAgICB0aGlzLnBhZ2VPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChzZWxmID0+IChtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBzZWxmLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKG11dGF0aW9uID0+IG11dGF0aW9uLnJlbW92ZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIobm9kZSwgTm9kZUZpbHRlci5TSE9XX0FMTCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3YWxrZXIuY3VycmVudE5vZGUgPT09IGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2VsZi5kZXRhY2hGcm9tUGFnZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB0aGlzLnBhZ2VPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhckZvY3VzTGlzdGVuZXJzICgpIHtcbiAgICAgICAgLy8gV2hlbiB0aGUgdXNlciB0cmllcyB0byBgOncgfCBjYWxsIGZpcmVudmltI2ZvY3VzX3BhZ2UoKWAgaW4gTmVvdmltLFxuICAgICAgICAvLyB3ZSBoYXZlIGEgcHJvYmxlbS4gYDp3YCByZXN1bHRzIGluIGEgY2FsbCB0byBzZXRQYWdlRWxlbWVudENvbnRlbnQsXG4gICAgICAgIC8vIHdoaWNoIGNhbGxzIEZpcmVudmltRWxlbWVudC5mb2N1cygpLCBiZWNhdXNlIHNvbWUgcGFnZXMgdHJ5IHRvIGdyYWJcbiAgICAgICAgLy8gZm9jdXMgd2hlbiB0aGUgY29udGVudCBvZiB0aGUgdW5kZXJseWluZyBlbGVtZW50IGNoYW5nZXMuXG4gICAgICAgIC8vIEZpcmVudmltRWxlbWVudC5mb2N1cygpIGNyZWF0ZXMgZXZlbnQgbGlzdGVuZXJzIGFuZCB0aW1lb3V0cyB0b1xuICAgICAgICAvLyBkZXRlY3Qgd2hlbiB0aGUgcGFnZSB0cmllcyB0byBncmFiIGZvY3VzIGFuZCBicmluZyBpdCBiYWNrIHRvIHRoZVxuICAgICAgICAvLyBGaXJlbnZpbUVsZW1lbnQuIEJ1dCBzaW5jZSBgY2FsbCBmaXJlbnZpbSNmb2N1c19wYWdlKClgIGhhcHBlbnNcbiAgICAgICAgLy8gcmlnaHQgYWZ0ZXIgdGhlIGA6d2AsIGZvY3VzX3BhZ2UoKSB0cmlnZ2VycyB0aGUgZXZlbnRcbiAgICAgICAgLy8gbGlzdGVuZXJzL3RpbWVvdXRzIGNyZWF0ZWQgYnkgRmlyZW52aW1FbGVtZW50LmZvY3VzKCkhXG4gICAgICAgIC8vIFNvIHdlIG5lZWQgYSB3YXkgdG8gY2xlYXIgdGhlIHRpbWVvdXRzIGFuZCBldmVudCBsaXN0ZW5lcnMgYmVmb3JlXG4gICAgICAgIC8vIHBlcmZvcm1pbmcgZm9jdXNfcGFnZSwgYW5kIHRoYXQncyB3aGF0IHRoaXMgZnVuY3Rpb24gZG9lcy5cbiAgICAgICAgdGhpcy5mb2N1c0luZm8uZmluYWxSZWZvY3VzVGltZW91dHMuZm9yRWFjaCh0ID0+IGNsZWFyVGltZW91dCh0KSk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNUaW1lb3V0cy5mb3JFYWNoKHQgPT4gY2xlYXJUaW1lb3V0KHQpKTtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8ucmVmb2N1c1JlZnMuZm9yRWFjaChmID0+IHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGYpO1xuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8uZmluYWxSZWZvY3VzVGltZW91dHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8ucmVmb2N1c1RpbWVvdXRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNSZWZzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgZGV0YWNoRnJvbVBhZ2UgKCkge1xuICAgICAgICB0aGlzLmNsZWFyRm9jdXNMaXN0ZW5lcnMoKTtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZShlbGVtKTtcbiAgICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUoZWxlbSk7XG4gICAgICAgIHRoaXMucGFnZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5zcGFuT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLnNwYW4ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMub25EZXRhY2godGhpcy5mcmFtZUlkKTtcbiAgICB9XG5cbiAgICBmb2N1cyAoKSB7XG4gICAgICAgIC8vIFNvbWUgaW5wdXRzIHRyeSB0byBncmFiIHRoZSBmb2N1cyBhZ2FpbiBhZnRlciB3ZSBhcHBlbmRlZCB0aGUgaWZyYW1lXG4gICAgICAgIC8vIHRvIHRoZSBwYWdlLCBzbyB3ZSBuZWVkIHRvIHJlZm9jdXMgaXQgZWFjaCB0aW1lIGl0IGxvc2VzIGZvY3VzLiBCdXRcbiAgICAgICAgLy8gdGhlIHVzZXIgbWlnaHQgd2FudCB0byBzdG9wIGZvY3VzaW5nIHRoZSBpZnJhbWUgYXQgc29tZSBwb2ludCwgc28gd2VcbiAgICAgICAgLy8gYWN0dWFsbHkgc3RvcCByZWZvY3VzaW5nIHRoZSBpZnJhbWUgYSBzZWNvbmQgYWZ0ZXIgaXQgaXMgY3JlYXRlZC5cbiAgICAgICAgY29uc3QgcmVmb2N1cyA9ICgoc2VsZikgPT4gKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5mb2N1c0luZm8ucmVmb2N1c1RpbWVvdXRzLnB1c2goc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gRmlyc3QsIGRlc3Ryb3kgY3VycmVudCBzZWxlY3Rpb24uIFNvbWUgd2Vic2l0ZXMgdXNlIHRoZVxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiB0byBmb3JjZS1mb2N1cyBhbiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICAgICAgLy8gVGhlcmUncyBhIHJhY2UgY29uZGl0aW9uIGluIHRoZSB0ZXN0c3VpdGUgb24gY2hyb21lIHRoYXRcbiAgICAgICAgICAgICAgICAvLyByZXN1bHRzIGluIHNlbGYuc3BhbiBub3QgYmVpbmcgaW4gdGhlIGRvY3VtZW50IGFuZCBlcnJvcnNcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBsb2dnZWQsIHNvIHdlIGNoZWNrIGlmIHNlbGYuc3BhbiByZWFsbHkgaXMgaW4gaXRzXG4gICAgICAgICAgICAgICAgLy8gb3duZXJEb2N1bWVudC5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zcGFuLm93bmVyRG9jdW1lbnQuY29udGFpbnMoc2VsZi5zcGFuKSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5zZXRTdGFydChzZWxmLnNwYW4sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuaWZyYW1lLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAwKSk7XG4gICAgICAgIH0pKHRoaXMpO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzUmVmcy5wdXNoKHJlZm9jdXMpO1xuICAgICAgICB0aGlzLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCByZWZvY3VzKTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHJlZm9jdXMpO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5maW5hbFJlZm9jdXNUaW1lb3V0cy5wdXNoKHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmVmb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgcmVmb2N1cyk7XG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgcmVmb2N1cyk7XG4gICAgICAgIH0sIDEwMCkpO1xuICAgICAgICByZWZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNPcmlnaW5hbEVsZW1lbnQgKGFkZExpc3RlbmVyOiBib29sZWFuKSB7XG4gICAgICAgIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIGFueSkuYmx1cigpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5udmltaWZ5KTtcbiAgICAgICAgY29uc3Qgc2VsID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICBpZiAodGhpcy5vcmlnaW5hbEVsZW1lbnQub3duZXJEb2N1bWVudC5jb250YWlucyh0aGlzLm9yaWdpbmFsRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHRoaXMub3JpZ2luYWxFbGVtZW50LCAwKTtcbiAgICAgICAgfVxuICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKGFkZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5udmltaWZ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJ1ZmZlckluZm8gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXJJbmZvO1xuICAgIH1cblxuICAgIGdldEVkaXRvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvcjtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmdldEVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlRWxlbWVudENvbnRlbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFZGl0b3IoKS5nZXRDb250ZW50KCk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUVsZW1lbnRDdXJzb3IgKCkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCkuY2F0Y2goKCkgPT4gWzEsIDFdKSBhcyBQcm9taXNlPFtudW1iZXIsIG51bWJlcl0+O1xuICAgICAgICBwLnRoZW4oYyA9PiB0aGlzLmN1cnNvciA9IGMpO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICBnZXRPcmlnaW5hbEVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0b3IgKCkge1xuICAgICAgICByZXR1cm4gY29tcHV0ZVNlbGVjdG9yKHRoaXMuZ2V0RWxlbWVudCgpKTtcbiAgICB9XG5cbiAgICBnZXRTcGFuICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BhbjtcbiAgICB9XG5cbiAgICBoaWRlICgpIHtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cblxuICAgIGlzRm9jdXNlZCAoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLnNwYW5cbiAgICAgICAgICAgIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuaWZyYW1lO1xuICAgIH1cblxuICAgIHByZXBhcmVCdWZmZXJJbmZvICgpIHtcbiAgICAgICAgdGhpcy5idWZmZXJJbmZvID0gKGFzeW5jICgpID0+IFtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICB0aGlzLmdldFNlbGVjdG9yKCksXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldFBhZ2VFbGVtZW50Q3Vyc29yKCksXG4gICAgICAgICAgICBhd2FpdCAodGhpcy5lZGl0b3IuZ2V0TGFuZ3VhZ2UoKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpKVxuICAgICAgICBdKSgpIGFzIFByb21pc2U8W3N0cmluZywgc3RyaW5nLCBbbnVtYmVyLCBudW1iZXJdLCBzdHJpbmddPjtcbiAgICB9XG5cbiAgICBwcmVzc0tleXMgKGtleXM6IEtleWJvYXJkRXZlbnRbXSkge1xuICAgICAgICBjb25zdCBmb2N1c2VkID0gdGhpcy5pc0ZvY3VzZWQoKTtcbiAgICAgICAga2V5cy5mb3JFYWNoKGV2ID0+IHRoaXMub3JpZ2luYWxFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpKTtcbiAgICAgICAgaWYgKGZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiAoKSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVkaXRvci5nZXRFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgLy8gU2F2ZSBhdHRyaWJ1dGVzXG4gICAgICAgIGNvbnN0IHBvc0F0dHJzID0gW1wibGVmdFwiLCBcInBvc2l0aW9uXCIsIFwidG9wXCIsIFwiekluZGV4XCJdO1xuICAgICAgICBjb25zdCBvbGRQb3NBdHRycyA9IHBvc0F0dHJzLm1hcCgoYXR0cjogYW55KSA9PiB0aGlzLmlmcmFtZS5zdHlsZVthdHRyXSk7XG5cbiAgICAgICAgLy8gQXNzaWduIG5ldyB2YWx1ZXNcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUubGVmdCA9IGAke3JlY3QubGVmdCArIHdpbmRvdy5zY3JvbGxYICsgdGhpcy5yZWxhdGl2ZVh9cHhgO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUudG9wID0gYCR7cmVjdC50b3AgKyB3aW5kb3cuc2Nyb2xsWSArIHRoaXMucmVsYXRpdmVZfXB4YDtcbiAgICAgICAgLy8gMjEzOTk5OTk5NSBpcyBob3BlZnVsbHkgaGlnaGVyIHRoYW4gZXZlcnl0aGluZyBlbHNlIG9uIHRoZSBwYWdlIGJ1dFxuICAgICAgICAvLyBsb3dlciB0aGFuIFZpbWl1bSdzIGVsZW1lbnRzXG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLnpJbmRleCA9IFwiMjEzOTk5OTk5NVwiO1xuXG4gICAgICAgIC8vIENvbXBhcmUsIHRvIGtub3cgd2hldGhlciB0aGUgZWxlbWVudCBtb3ZlZCBvciBub3RcbiAgICAgICAgY29uc3QgcG9zQ2hhbmdlZCA9ICEhcG9zQXR0cnMuZmluZCgoYXR0cjogYW55LCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZVthdHRyXSAhPT0gb2xkUG9zQXR0cnNbaW5kZXhdKTtcbiAgICAgICAgcmV0dXJuIHsgcG9zQ2hhbmdlZCwgbmV3UmVjdDogcmVjdCB9O1xuICAgIH1cblxuICAgIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbkFmdGVyUmVzaXplRnJvbUZyYW1lICgpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIHZlcnkgd2VpcmQsIGNvbXBsaWNhdGVkIGFuZCBiYWQgcGllY2Ugb2YgY29kZS4gQWxsIGNhbGxzXG4gICAgICAgIC8vIHRvIGByZXNpemVFZGl0b3IoKWAgaGF2ZSB0byByZXN1bHQgaW4gYSBjYWxsIHRvIGByZXNpemVUbygpYCBhbmRcbiAgICAgICAgLy8gdGhlbiBgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKClgIGluIG9yZGVyIHRvIG1ha2Ugc3VyZSB0aGVcbiAgICAgICAgLy8gaWZyYW1lIGRvZXNuJ3Qgb3ZlcmZsb3cgZnJvbSB0aGUgdmlld3BvcnQuXG4gICAgICAgIC8vIEhvd2V2ZXIsIHdoZW4gd2UgY3JlYXRlIHRoZSBpZnJhbWUsIHdlIGRvbid0IHdhbnQgaXQgdG8gZml0IGluIHRoZVxuICAgICAgICAvLyB2aWV3cG9ydCBhdCBhbGwgY29zdC4gSW5zdGVhZCwgd2Ugd2FudCBpdCB0byBjb3ZlciB0aGUgdW5kZXJseWluZ1xuICAgICAgICAvLyBpbnB1dCBhcyBtdWNoIGFzIHBvc3NpYmxlLiBUaGUgcHJvYmxlbSBpcyB0aGF0IHdoZW4gaXQgaXMgY3JlYXRlZCxcbiAgICAgICAgLy8gdGhlIGlmcmFtZSB3aWxsIGFzayBmb3IgYSByZXNpemUgKGJlY2F1c2UgTmVvdmltIGFza3MgZm9yIG9uZSkgYW5kXG4gICAgICAgIC8vIHdpbGwgdGh1cyBhbHNvIGFjY2lkZW50YWxseSBjYWxsIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiwgd2hpY2hcbiAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBjYWxsLlxuICAgICAgICAvLyBTbyB3ZSBoYXZlIHRvIHRyYWNrIHRoZSBjYWxscyB0byBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4gdGhhdFxuICAgICAgICAvLyBhcmUgbWFkZSBmcm9tIHRoZSBpZnJhbWUgKGkuZS4gZnJvbSBgcmVzaXplRWRpdG9yKClgKSBhbmQgaWdub3JlIHRoZVxuICAgICAgICAvLyBmaXJzdCBvbmUuXG4gICAgICAgIGlmICh0aGlzLmZpcnN0UHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLnJlbGF0aXZlWCA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlbGF0aXZlWSA9IDA7XG4gICAgICAgICAgICB0aGlzLmZpcnN0UHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKCk7XG4gICAgfVxuXG4gICAgLy8gUmVzaXplIHRoZSBpZnJhbWUsIG1ha2luZyBzdXJlIGl0IGRvZXNuJ3QgZ2V0IGxhcmdlciB0aGFuIHRoZSB3aW5kb3dcbiAgICByZXNpemVUbyAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHdhcm5JZnJhbWU6IGJvb2xlYW4pIHtcbiAgICAgICAgLy8gSWYgdGhlIGRpbWVuc2lvbnMgdGhhdCBhcmUgYXNrZWQgZm9yIGFyZSB0b28gYmlnLCBtYWtlIHRoZW0gYXMgYmlnXG4gICAgICAgIC8vIGFzIHRoZSB3aW5kb3dcbiAgICAgICAgbGV0IGNhbnRGdWxseVJlc2l6ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgaWYgKGF2YWlsYWJsZVdpZHRoID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSB7XG4gICAgICAgICAgICBhdmFpbGFibGVXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkdGggPj0gYXZhaWxhYmxlV2lkdGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gYXZhaWxhYmxlV2lkdGggLSAxO1xuICAgICAgICAgICAgY2FudEZ1bGx5UmVzaXplID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBpZiAoYXZhaWxhYmxlSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVpZ2h0ID49IGF2YWlsYWJsZUhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gYXZhaWxhYmxlSGVpZ2h0IC0gMTtcbiAgICAgICAgICAgIGNhbnRGdWxseVJlc2l6ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgZGltZW5zaW9ucyB0aGF0IHdlcmUgYXNrZWQgZm9yIG1pZ2h0IG1ha2UgdGhlIGlmcmFtZSBvdmVyZmxvdy5cbiAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBuZWVkIHRvIGNvbXB1dGUgaG93IG11Y2ggd2UgbmVlZCB0byBtb3ZlIHRoZSBpZnJhbWVcbiAgICAgICAgLy8gdG8gdGhlIGxlZnQvdG9wIGluIG9yZGVyIHRvIGhhdmUgaXQgYm90dG9tLXJpZ2h0IGNvcm5lciBzaXQgcmlnaHQgaW5cbiAgICAgICAgLy8gdGhlIHdpbmRvdydzIGJvdHRvbS1yaWdodCBjb3JuZXIuXG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVkaXRvci5nZXRFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBhdmFpbGFibGVXaWR0aCAtIChyZWN0LmxlZnQgKyB3aWR0aCk7XG4gICAgICAgIHRoaXMucmVsYXRpdmVYID0gcmlnaHRPdmVyZmxvdyA8IDAgPyByaWdodE92ZXJmbG93IDogMDtcbiAgICAgICAgY29uc3QgYm90dG9tT3ZlcmZsb3cgPSBhdmFpbGFibGVIZWlnaHQgLSAocmVjdC50b3AgKyBoZWlnaHQpO1xuICAgICAgICB0aGlzLnJlbGF0aXZlWSA9IGJvdHRvbU92ZXJmbG93IDwgMCA/IGJvdHRvbU92ZXJmbG93IDogMDtcblxuICAgICAgICAvLyBOb3cgYWN0dWFsbHkgc2V0IHRoZSB3aWR0aC9oZWlnaHQsIG1vdmUgdGhlIGVkaXRvciB3aGVyZSBpdCBpc1xuICAgICAgICAvLyBzdXBwb3NlZCB0byBiZSBhbmQgaWYgdGhlIG5ldyBpZnJhbWUgY2FuJ3QgYmUgYXMgYmlnIGFzIHJlcXVlc3RlZCxcbiAgICAgICAgLy8gd2FybiB0aGUgaWZyYW1lIHNjcmlwdC5cbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgICAgIGlmIChjYW50RnVsbHlSZXNpemUgJiYgd2FybklmcmFtZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVSZXFJZCArPSAxO1xuICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lSWQ6IHRoaXMuZnJhbWVJZCxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogW3RoaXMucmVzaXplUmVxSWQsIHdpZHRoLCBoZWlnaHRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcInJlc2l6ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcIm1lc3NhZ2VGcmFtZVwiXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VuZEtleSAoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgZnJhbWVJZDogdGhpcy5mcmFtZUlkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczogW2tleV0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJmcmFtZV9zZW5kS2V5XCJdLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZUZyYW1lXCJdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRQYWdlRWxlbWVudENvbnRlbnQgKHRleHQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBmb2N1c2VkID0gdGhpcy5pc0ZvY3VzZWQoKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0Q29udGVudCh0ZXh0KTtcbiAgICAgICAgW1xuICAgICAgICAgICAgbmV3IEV2ZW50KFwia2V5ZG93blwiLCAgICAgeyBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICAgICAgbmV3IEV2ZW50KFwia2V5dXBcIiwgICAgICAgeyBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICAgICAgbmV3IEV2ZW50KFwia2V5cHJlc3NcIiwgICAgeyBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICAgICAgbmV3IEV2ZW50KFwiYmVmb3JlaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICAgICAgbmV3IEV2ZW50KFwiaW5wdXRcIiwgICAgICAgeyBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICAgICAgbmV3IEV2ZW50KFwiY2hhbmdlXCIsICAgICAgeyBidWJibGVzOiB0cnVlIH0pXG4gICAgICAgIF0uZm9yRWFjaChldiA9PiB0aGlzLm9yaWdpbmFsRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2KSk7XG4gICAgICAgIGlmIChmb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQYWdlRWxlbWVudEN1cnNvciAobGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikge1xuICAgICAgICBsZXQgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLmN1cnNvclswXSA9IGxpbmU7XG4gICAgICAgIHRoaXMuY3Vyc29yWzFdID0gY29sdW1uO1xuICAgICAgICBpZiAodGhpcy5pc0ZvY3VzZWQoKSkge1xuICAgICAgICAgICAgcCA9IHRoaXMuZWRpdG9yLnNldEN1cnNvcihsaW5lLCBjb2x1bW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIHNob3cgKCkge1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJpbml0aWFsXCI7XG4gICAgfVxuXG59XG4iLCJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdXRvZmlsbCgpIHtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNzdWVfYm9keVwiKSBhcyBhbnk7XG4gICAgaWYgKCF0ZXh0YXJlYSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBsYXRJbmZvUHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGFyZ3M6IFtdLFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcImJyb3dzZXJcIiwgXCJydW50aW1lXCIsIFwiZ2V0UGxhdGZvcm1JbmZvXCJdLFxuICAgICAgICB9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZXhlY1wiXSxcbiAgICB9KTtcbiAgICBjb25zdCBtYW5pZmVzdFByb21pc2UgPSBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICBhcmdzOiBbXSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJicm93c2VyXCIsIFwicnVudGltZVwiLCBcImdldE1hbmlmZXN0XCJdLFxuICAgICAgICB9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZXhlY1wiXSxcbiAgICB9KTtcbiAgICBjb25zdCBudmltUGx1Z2luUHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHt9LFxuICAgICAgICBmdW5jTmFtZTogW1wiZ2V0TnZpbVBsdWdpblZlcnNpb25cIl0sXG4gICAgfSk7XG4gICAgY29uc3QgaXNzdWVUZW1wbGF0ZVByb21pc2UgPSBmZXRjaChicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwiSVNTVUVfVEVNUExBVEUubWRcIikpLnRoZW4ocCA9PiBwLnRleHQoKSk7XG4gICAgY29uc3QgYnJvd3NlclN0cmluZyA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhmaXJlZm94fGNocm9tKVteIF0rL2dpKTtcbiAgICBsZXQgbmFtZTtcbiAgICBsZXQgdmVyc2lvbjtcbiAgICAvLyBDYW4ndCBiZSB0ZXN0ZWQsIGFzIGNvdmVyYWdlIGlzIG9ubHkgcmVjb3JkZWQgb24gZmlyZWZveFxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGJyb3dzZXJTdHJpbmcpIHtcbiAgICAgICAgWyBuYW1lLCB2ZXJzaW9uIF0gPSBicm93c2VyU3RyaW5nWzBdLnNwbGl0KFwiL1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuYW1lID0gXCJ1bmtub3duXCI7XG4gICAgICAgIHZlcnNpb24gPSBcInVua25vd25cIjtcbiAgICB9XG4gICAgY29uc3QgdmVuZG9yID0gbmF2aWdhdG9yLnZlbmRvciB8fCBcIlwiO1xuICAgIGNvbnN0IFtcbiAgICAgICAgcGxhdEluZm8sXG4gICAgICAgIG1hbmlmZXN0LFxuICAgICAgICBudmltUGx1Z2luVmVyc2lvbixcbiAgICAgICAgaXNzdWVUZW1wbGF0ZSxcbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW3BsYXRJbmZvUHJvbWlzZSwgbWFuaWZlc3RQcm9taXNlLCBudmltUGx1Z2luUHJvbWlzZSwgaXNzdWVUZW1wbGF0ZVByb21pc2VdKTtcbiAgICAvLyBDYW4ndCBoYXBwZW4sIGJ1dCBkb2Vzbid0IGNvc3QgbXVjaCB0byBoYW5kbGUhXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAodGV4dGFyZWEudmFsdWUucmVwbGFjZSgvXFxyL2csIFwiXCIpICE9PSBpc3N1ZVRlbXBsYXRlLnJlcGxhY2UoL1xcci9nLCBcIlwiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRleHRhcmVhLnZhbHVlID0gaXNzdWVUZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcIk9TIFZlcnNpb246XCIsIGBPUyBWZXJzaW9uOiAke3BsYXRJbmZvLm9zfSAke3BsYXRJbmZvLmFyY2h9YClcbiAgICAgICAgLnJlcGxhY2UoXCJCcm93c2VyIFZlcnNpb246XCIsIGBCcm93c2VyIFZlcnNpb246ICR7dmVuZG9yfSAke25hbWV9ICR7dmVyc2lvbn1gKVxuICAgICAgICAucmVwbGFjZShcIkJyb3dzZXIgQWRkb24gVmVyc2lvbjpcIiwgYEJyb3dzZXIgQWRkb24gVmVyc2lvbjogJHttYW5pZmVzdC52ZXJzaW9ufWApXG4gICAgICAgIC5yZXBsYWNlKFwiTmVvdmltIFBsdWdpbiBWZXJzaW9uOlwiLCBgTmVvdmltIFBsdWdpbiBWZXJzaW9uOiAke252aW1QbHVnaW5WZXJzaW9ufWApO1xufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyICAgIH0gZnJvbSBcIi4vRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgeyBGaXJlbnZpbUVsZW1lbnQgfSBmcm9tIFwiLi9GaXJlbnZpbUVsZW1lbnRcIjtcbmltcG9ydCB7IGV4ZWN1dGVJblBhZ2UgICB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRDb25mICAgICAgICAgfSBmcm9tIFwiLi91dGlscy9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBrZXlzVG9FdmVudHMgICAgfSBmcm9tIFwiLi91dGlscy9rZXlzXCI7XG5cbi8vIFRoaXMgbW9kdWxlIGlzIGxvYWRlZCBpbiBib3RoIHRoZSBicm93c2VyJ3MgY29udGVudCBzY3JpcHQgYW5kIHRoZSBicm93c2VyJ3Ncbi8vIGZyYW1lIHNjcmlwdC5cbi8vIEFzIHN1Y2gsIGl0IHNob3VsZCBub3QgaGF2ZSBhbnkgc2lkZSBlZmZlY3RzLlxuXG5pbnRlcmZhY2UgSUdsb2JhbFN0YXRlIHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XG4gICAgbGFzdEZvY3VzZWRDb250ZW50U2NyaXB0OiBudW1iZXI7XG4gICAgZmlyZW52aW1FbGVtczogTWFwPG51bWJlciwgRmlyZW52aW1FbGVtZW50PjtcbiAgICBmcmFtZUlkUmVzb2x2ZTogKF86IG51bWJlcikgPT4gdm9pZDtcbiAgICBudmltaWZ5OiAoZXZ0OiBGb2N1c0V2ZW50KSA9PiB2b2lkO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEZ1bmN0aW9ucyBydW5uaW5nIGluIHRoZSBjb250ZW50IHNjcmlwdCAvL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmZ1bmN0aW9uIF9mb2N1c0lucHV0KGdsb2JhbDogSUdsb2JhbFN0YXRlLCBmaXJlbnZpbTogRmlyZW52aW1FbGVtZW50LCBhZGRMaXN0ZW5lcjogYm9vbGVhbikge1xuICAgIGlmIChhZGRMaXN0ZW5lcikge1xuICAgICAgICAvLyBPbmx5IHJlLWFkZCBldmVudCBsaXN0ZW5lciBpZiBpbnB1dCdzIHNlbGVjdG9yIG1hdGNoZXMgdGhlIG9uZXNcbiAgICAgICAgLy8gdGhhdCBzaG91bGQgYmUgYXV0b252aW1pZmllZFxuICAgICAgICBjb25zdCBjb25mID0gZ2V0Q29uZigpO1xuICAgICAgICBpZiAoY29uZi5zZWxlY3RvciAmJiBjb25mLnNlbGVjdG9yICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25mLnNlbGVjdG9yKSk7XG4gICAgICAgICAgICBhZGRMaXN0ZW5lciA9IGVsZW1zLmluY2x1ZGVzKGZpcmVudmltLmdldEVsZW1lbnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlyZW52aW0uZm9jdXNPcmlnaW5hbEVsZW1lbnQoYWRkTGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBnZXRGb2N1c2VkRWxlbWVudCAoZmlyZW52aW1FbGVtczogTWFwPG51bWJlciwgRmlyZW52aW1FbGVtZW50Pikge1xuICAgIHJldHVybiBBcnJheVxuICAgICAgICAuZnJvbShmaXJlbnZpbUVsZW1zLnZhbHVlcygpKVxuICAgICAgICAuZmluZChpbnN0YW5jZSA9PiBpbnN0YW5jZS5pc0ZvY3VzZWQoKSk7XG59XG5cbi8vIFRhYiBmdW5jdGlvbnMgYXJlIGZ1bmN0aW9ucyBhbGwgY29udGVudCBzY3JpcHRzIHNob3VsZCByZWFjdCB0b1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhYkZ1bmN0aW9ucyhnbG9iYWw6IElHbG9iYWxTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldEFjdGl2ZUluc3RhbmNlQ291bnQgOiAoKSA9PiBnbG9iYWwuZmlyZW52aW1FbGVtcy5zaXplLFxuICAgICAgICByZWdpc3Rlck5ld0ZyYW1lSWQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5mcmFtZUlkUmVzb2x2ZShmcmFtZUlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGlzYWJsZWQ6IChkaXNhYmxlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldExhc3RGb2N1c2VkQ29udGVudFNjcmlwdDogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmxhc3RGb2N1c2VkQ29udGVudFNjcmlwdCA9IGZyYW1lSWQ7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpc1Zpc2libGUoZTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCByZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3SGVpZ2h0ID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICByZXR1cm4gIShyZWN0LmJvdHRvbSA8IDAgfHwgcmVjdC50b3AgLSB2aWV3SGVpZ2h0ID49IDApO1xufVxuXG4vLyBBY3RpdmVDb250ZW50IGZ1bmN0aW9ucyBhcmUgZnVuY3Rpb25zIG9ubHkgdGhlIGFjdGl2ZSBjb250ZW50IHNjcmlwdCBzaG91bGQgcmVhY3QgdG9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVDb250ZW50RnVuY3Rpb25zKGdsb2JhbDogSUdsb2JhbFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9yY2VOdmltaWZ5OiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBpc051bGwgPSBlbGVtID09PSBudWxsIHx8IGVsZW0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VOb3RFZGl0YWJsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250ZW50RWRpdGFibGUgIT09IFwidHJ1ZVwiO1xuICAgICAgICAgICAgY29uc3QgYm9keU5vdEVkaXRhYmxlID0gKGRvY3VtZW50LmJvZHkuY29udGVudEVkaXRhYmxlID09PSBcImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChkb2N1bWVudC5ib2R5LmNvbnRlbnRFZGl0YWJsZSA9PT0gXCJpbmhlcml0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGVudEVkaXRhYmxlICE9PSBcInRydWVcIikpO1xuICAgICAgICAgICAgaWYgKGlzTnVsbFxuICAgICAgICAgICAgICAgIHx8IChlbGVtID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgcGFnZU5vdEVkaXRhYmxlKVxuICAgICAgICAgICAgICAgIHx8IChlbGVtID09PSBkb2N1bWVudC5ib2R5ICYmIGJvZHlOb3RFZGl0YWJsZSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRleHRhcmVhXCIpKVxuICAgICAgICAgICAgICAgICAgICAuZmluZChpc1Zpc2libGUpO1xuICAgICAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoZSA9PiBlLnR5cGUgPT09IFwidGV4dFwiICYmIGlzVmlzaWJsZShlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2xvYmFsLm52aW1pZnkoeyB0YXJnZXQ6IGVsZW0gfSBhcyBhbnkpO1xuICAgICAgICB9LFxuICAgICAgICBzZW5kS2V5OiAoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltID0gZ2V0Rm9jdXNlZEVsZW1lbnQoZ2xvYmFsLmZpcmVudmltRWxlbXMpO1xuICAgICAgICAgICAgaWYgKGZpcmVudmltICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbS5zZW5kS2V5KGtleSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIHRocm93IHRoaXMgZXJyb3IgYXMgdGhlIGJhY2tncm91bmQgc2NyaXB0XG4gICAgICAgICAgICAgICAgLy8gd2lsbCBleGVjdXRlIGEgZmFsbGJhY2tcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmaXJlbnZpbSBmcmFtZSBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBmb2N1c0VsZW1lbnRCZWZvcmVPckFmdGVyKGdsb2JhbDogSUdsb2JhbFN0YXRlLCBmcmFtZUlkOiBudW1iZXIsIGk6IDEgfCAtMSkge1xuICAgIGxldCBmaXJlbnZpbUVsZW1lbnQ7XG4gICAgaWYgKGZyYW1lSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmaXJlbnZpbUVsZW1lbnQgPSBnZXRGb2N1c2VkRWxlbWVudChnbG9iYWwuZmlyZW52aW1FbGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmlyZW52aW1FbGVtZW50ID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbEVsZW1lbnQgPSBmaXJlbnZpbUVsZW1lbnQuZ2V0T3JpZ2luYWxFbGVtZW50KCk7XG5cbiAgICBjb25zdCB0YWJpbmRleCA9IChlOiBFbGVtZW50KSA9PiAoKHggPT4gaXNOYU4oeCkgPyAwIDogeCkocGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKSkpKTtcbiAgICBjb25zdCBmb2N1c2FibGVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIGJ1dHRvbiwgb2JqZWN0LCBbdGFiaW5kZXhdLCBbaHJlZl1cIikpXG4gICAgICAgIC5maWx0ZXIoZSA9PiBlLmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpICE9PSBcIi0xXCIpXG4gICAgICAgIC5zb3J0KChlMSwgZTIpID0+IHRhYmluZGV4KGUxKSAtIHRhYmluZGV4KGUyKSk7XG5cbiAgICBsZXQgaW5kZXggPSBmb2N1c2FibGVzLmluZGV4T2Yob3JpZ2luYWxFbGVtZW50KTtcbiAgICBsZXQgZWxlbTogRWxlbWVudDtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vIG9yaWdpbmFsRWxlbWVudCBpc24ndCBpbiB0aGUgbGlzdCBvZiBmb2N1c2FibGVzLCBzbyB3ZSBoYXZlIHRvXG4gICAgICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY2xvc2VzdCBlbGVtZW50IGlzLiBXZSBkbyB0aGlzIGJ5IGl0ZXJhdGluZyBvdmVyXG4gICAgICAgIC8vIGFsbCBlbGVtZW50cyBvZiB0aGUgZG9tLCBhY2NlcHRpbmcgb25seSBvcmlnaW5hbEVsZW1lbnQgYW5kIHRoZVxuICAgICAgICAvLyBlbGVtZW50cyB0aGF0IGFyZSBmb2N1c2FibGUuIE9uY2Ugd2UgZmluZCBvcmlnaW5hbEVsZW1lbnQsIHdlIHNlbGVjdFxuICAgICAgICAvLyBlaXRoZXIgdGhlIHByZXZpb3VzIG9yIG5leHQgZWxlbWVudCBkZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIGkuXG4gICAgICAgIGNvbnN0IHRyZWVXYWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keSxcbiAgICAgICAgICAgIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFjY2VwdE5vZGU6IG4gPT4gKChuID09PSBvcmlnaW5hbEVsZW1lbnQgfHwgZm9jdXNhYmxlcy5pbmRleE9mKChuIGFzIEVsZW1lbnQpKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUXG4gICAgICAgICAgICAgICAgICAgIDogTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZmlyc3ROb2RlID0gdHJlZVdhbGtlci5jdXJyZW50Tm9kZSBhcyBFbGVtZW50O1xuICAgICAgICBsZXQgY3VyID0gZmlyc3ROb2RlO1xuICAgICAgICBsZXQgcHJldjtcbiAgICAgICAgd2hpbGUgKGN1ciAmJiBjdXIgIT09IG9yaWdpbmFsRWxlbWVudCkge1xuICAgICAgICAgICAgcHJldiA9IGN1cjtcbiAgICAgICAgICAgIGN1ciA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSBhcyBFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgZWxlbSA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSBhcyBFbGVtZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbSA9IHByZXY7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2FuaXR5IGNoZWNrLCBjYW4ndCBiZSBleGVyY2lzZWRcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICBlbGVtID0gZmlyc3ROb2RlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbSA9IGZvY3VzYWJsZXNbKGluZGV4ICsgaSArIGZvY3VzYWJsZXMubGVuZ3RoKSAlIGZvY3VzYWJsZXMubGVuZ3RoXTtcbiAgICB9XG5cbiAgICBpbmRleCA9IGZvY3VzYWJsZXMuaW5kZXhPZihlbGVtKTtcbiAgICAvLyBTYW5pdHkgY2hlY2ssIGNhbid0IGJlIGV4ZXJjaXNlZFxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBcIk9oIG15LCBzb21ldGhpbmcgd2VudCB3cm9uZyFcIjtcbiAgICB9XG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBrbm93IHdlIGhhdmUgYW4gZWxlbWVudCB0aGF0IGlzIGluIHRoZSBmb2N1c2FibGUgZWxlbWVudFxuICAgIC8vIGxpc3QsIGl0ZXJhdGUgb3ZlciB0aGUgbGlzdCB0byBmaW5kIG9uZSB0aGF0IGlzIHZpc2libGUuXG4gICAgbGV0IHN0YXJ0ZWRBdDtcbiAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuICAgIHdoaWxlIChzdGFydGVkQXQgIT09IGluZGV4ICYmIChzdHlsZS52aXNpYmlsaXR5ICE9PSBcInZpc2libGVcIiB8fCBzdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikpIHtcbiAgICAgICAgaWYgKHN0YXJ0ZWRBdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdGFydGVkQXQgPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IChpbmRleCArIGkgKyBmb2N1c2FibGVzLmxlbmd0aCkgJSBmb2N1c2FibGVzLmxlbmd0aDtcbiAgICAgICAgZWxlbSA9IGZvY3VzYWJsZXNbaW5kZXhdO1xuICAgICAgICBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gICAgfVxuXG4gICAgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgYW55KS5ibHVyKCk7XG4gICAgY29uc3Qgc2VsID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoZWxlbS5vd25lckRvY3VtZW50LmNvbnRhaW5zKGVsZW0pKSB7XG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KGVsZW0sIDApO1xuICAgIH1cbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAoZWxlbSBhcyBIVE1MRWxlbWVudCkuZm9jdXMoKTtcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMoZ2xvYmFsOiBJR2xvYmFsU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBldmFsSW5QYWdlOiAoXzogbnVtYmVyLCBqczogc3RyaW5nKSA9PiBleGVjdXRlSW5QYWdlKGpzKSxcbiAgICAgICAgZm9jdXNJbnB1dDogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcmVudmltRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChmcmFtZUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUVsZW1lbnQgPSBnZXRGb2N1c2VkRWxlbWVudChnbG9iYWwuZmlyZW52aW1FbGVtcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcmVudmltRWxlbWVudCA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9mb2N1c0lucHV0KGdsb2JhbCwgZmlyZW52aW1FbGVtZW50LCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNQYWdlOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbUVsZW1lbnQgPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBmaXJlbnZpbUVsZW1lbnQuY2xlYXJGb2N1c0xpc3RlbmVycygpO1xuICAgICAgICAgICAgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgYW55KS5ibHVyKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNOZXh0OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBmb2N1c0VsZW1lbnRCZWZvcmVPckFmdGVyKGdsb2JhbCwgZnJhbWVJZCwgMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzUHJldjogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZm9jdXNFbGVtZW50QmVmb3JlT3JBZnRlcihnbG9iYWwsIGZyYW1lSWQsIC0xKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RWRpdG9ySW5mbzogKGZyYW1lSWQ6IG51bWJlcikgPT4gZ2xvYmFsXG4gICAgICAgICAgICAuZmlyZW52aW1FbGVtc1xuICAgICAgICAgICAgLmdldChmcmFtZUlkKVxuICAgICAgICAgICAgLmdldEJ1ZmZlckluZm8oKSxcbiAgICAgICAgZ2V0RWxlbWVudENvbnRlbnQ6IChmcmFtZUlkOiBudW1iZXIpID0+IGdsb2JhbFxuICAgICAgICAgICAgLmZpcmVudmltRWxlbXNcbiAgICAgICAgICAgIC5nZXQoZnJhbWVJZClcbiAgICAgICAgICAgIC5nZXRQYWdlRWxlbWVudENvbnRlbnQoKSxcbiAgICAgICAgaGlkZUVkaXRvcjogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBmaXJlbnZpbS5oaWRlKCk7XG4gICAgICAgICAgICBfZm9jdXNJbnB1dChnbG9iYWwsIGZpcmVudmltLCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAga2lsbEVkaXRvcjogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBpc0ZvY3VzZWQgPSBmaXJlbnZpbS5pc0ZvY3VzZWQoKTtcbiAgICAgICAgICAgIGZpcmVudmltLmRldGFjaEZyb21QYWdlKCk7XG4gICAgICAgICAgICBjb25zdCBjb25mID0gZ2V0Q29uZigpO1xuICAgICAgICAgICAgaWYgKGlzRm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIF9mb2N1c0lucHV0KGdsb2JhbCwgZmlyZW52aW0sIGNvbmYudGFrZW92ZXIgIT09IFwib25jZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsb2JhbC5maXJlbnZpbUVsZW1zLmRlbGV0ZShmcmFtZUlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJlc3NLZXlzOiAoZnJhbWVJZDogbnVtYmVyLCBrZXlzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpLnByZXNzS2V5cyhrZXlzVG9FdmVudHMoa2V5cykpO1xuICAgICAgICB9LFxuICAgICAgICByZXNpemVFZGl0b3I6IChmcmFtZUlkOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgZWxlbS5yZXNpemVUbyh3aWR0aCwgaGVpZ2h0LCB0cnVlKTtcbiAgICAgICAgICAgIGVsZW0ucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luQWZ0ZXJSZXNpemVGcm9tRnJhbWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RWxlbWVudENvbnRlbnQ6IChmcmFtZUlkOiBudW1iZXIsIHRleHQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKS5zZXRQYWdlRWxlbWVudENvbnRlbnQodGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEVsZW1lbnRDdXJzb3I6IChmcmFtZUlkOiBudW1iZXIsIGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCkuc2V0UGFnZUVsZW1lbnRDdXJzb3IobGluZSwgY29sdW1uKTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIERlZmluaXRpb24gb2YgYSBwcm94eSB0eXBlIHRoYXQgbGV0cyB0aGUgZnJhbWUgc2NyaXB0IHRyYW5zcGFyZW50bHkgY2FsbCAvL1xuLy8gdGhlIGNvbnRlbnQgc2NyaXB0J3MgZnVuY3Rpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbjtcblxuLy8gVGhlIHByb3h5IGF1dG9tYXRpY2FsbHkgYXBwZW5kcyB0aGUgZnJhbWVJZCB0byB0aGUgcmVxdWVzdCwgc28gd2UgaGlkZSB0aGF0IGZyb20gdXNlcnNcbnR5cGUgQXJndW1lbnRzVHlwZTxUPiA9IFQgZXh0ZW5kcyAoeDogYW55LCAuLi5hcmdzOiBpbmZlciBVKSA9PiBhbnkgPyBVOiBuZXZlcjtcbnR5cGUgUHJvbWlzaWZ5PFQ+ID0gVCBleHRlbmRzIFByb21pc2U8YW55PiA/IFQgOiBQcm9taXNlPFQ+O1xuXG50eXBlIGZ0ID0gUmV0dXJuVHlwZTx0eXBlb2YgZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnM+XG5cbnR5cGUgUGFnZUV2ZW50cyA9IFwicmVzaXplXCIgfCBcImZyYW1lX3NlbmRLZXlcIiB8IFwiZ2V0X2J1Zl9jb250ZW50XCIgfCBcInBhdXNlX2tleWhhbmRsZXJcIjtcbnR5cGUgUGFnZUhhbmRsZXJzID0gKGFyZ3M6IGFueVtdKSA9PiB2b2lkO1xuZXhwb3J0IGNsYXNzIFBhZ2VFdmVudEVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50cywgUGFnZUhhbmRsZXJzPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3Q6IGFueSwgX3NlbmRlcjogYW55LCBfc2VuZFJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAocmVxdWVzdC5mdW5jTmFtZVswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwYXVzZV9rZXloYW5kbGVyXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImZyYW1lX3NlbmRLZXlcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVzaXplXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChyZXF1ZXN0LmZ1bmNOYW1lWzBdLCByZXF1ZXN0LmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0X2J1Zl9jb250ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHRoaXMuZW1pdChyZXF1ZXN0LmZ1bmNOYW1lWzBdLCByZXNvbHZlKSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImV2YWxJblBhZ2VcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVzaXplRWRpdG9yXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImdldEVsZW1lbnRDb250ZW50XCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImdldEVkaXRvckluZm9cIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlZCBieSBmcmFtZSBmdW5jdGlvbiBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmhhbmRsZWQgcGFnZSByZXF1ZXN0OlwiLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBQYWdlVHlwZSA9IFBhZ2VFdmVudEVtaXR0ZXIgJiB7XG4gICAgW2sgaW4ga2V5b2YgZnRdOiAoLi4uYXJnczogQXJndW1lbnRzVHlwZTxmdFtrXT4pID0+IFByb21pc2lmeTxSZXR1cm5UeXBlPGZ0W2tdPj47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFnZVByb3h5IChmcmFtZUlkOiBudW1iZXIpIHtcbiAgICBjb25zdCBwYWdlID0gbmV3IFBhZ2VFdmVudEVtaXR0ZXIoKTtcblxuICAgIGxldCBmdW5jTmFtZToga2V5b2YgUGFnZVR5cGU7XG4gICAgZm9yIChmdW5jTmFtZSBpbiBnZXROZW92aW1GcmFtZUZ1bmN0aW9ucyh7fSBhcyBhbnkpKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGVjbGFyZSBmdW5jIGhlcmUgYmVjYXVzZSBmdW5jTmFtZSBpcyBhIGdsb2JhbCBhbmQgd291bGQgbm90XG4gICAgICAgIC8vIGJlIGNhcHR1cmVkIGluIHRoZSBjbG9zdXJlIG90aGVyd2lzZVxuICAgICAgICBjb25zdCBmdW5jID0gZnVuY05hbWU7XG4gICAgICAgIChwYWdlIGFzIGFueSlbZnVuY10gPSAoKC4uLmFycjogYW55W10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczogW2ZyYW1lSWRdLmNvbmNhdChhcnIpLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW2Z1bmNdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcIm1lc3NhZ2VQYWdlXCJdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZSBhcyBQYWdlVHlwZTtcbn07XG4iLCIvLyBUaGVzZSBtb2RlcyBhcmUgZGVmaW5lZCBpbiBodHRwczovL2dpdGh1Yi5jb20vbmVvdmltL25lb3ZpbS9ibG9iL21hc3Rlci9zcmMvbnZpbS9jdXJzb3Jfc2hhcGUuY1xuZXhwb3J0IHR5cGUgTnZpbU1vZGUgPSBcImFsbFwiXG4gIHwgXCJub3JtYWxcIlxuICB8IFwidmlzdWFsXCJcbiAgfCBcImluc2VydFwiXG4gIHwgXCJyZXBsYWNlXCJcbiAgfCBcImNtZGxpbmVfbm9ybWFsXCJcbiAgfCBcImNtZGxpbmVfaW5zZXJ0XCJcbiAgfCBcImNtZGxpbmVfcmVwbGFjZVwiXG4gIHwgXCJvcGVyYXRvclwiXG4gIHwgXCJ2aXN1YWxfc2VsZWN0XCJcbiAgfCBcImNtZGxpbmVfaG92ZXJcIlxuICB8IFwic3RhdHVzbGluZV9ob3ZlclwiXG4gIHwgXCJzdGF0dXNsaW5lX2RyYWdcIlxuICB8IFwidnNlcF9ob3ZlclwiXG4gIHwgXCJ2c2VwX2RyYWdcIlxuICB8IFwibW9yZVwiXG4gIHwgXCJtb3JlX2xhc3RsaW5lXCJcbiAgfCBcInNob3dtYXRjaFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaXRlQ29uZmlnIHtcbiAgICBjbWRsaW5lOiBcIm5lb3ZpbVwiIHwgXCJmaXJlbnZpbVwiIHwgXCJub25lXCI7XG4gICAgY29udGVudDogXCJodG1sXCIgfCBcInRleHRcIjtcbiAgICBwcmlvcml0eTogbnVtYmVyO1xuICAgIHJlbmRlcmVyOiBcImh0bWxcIiB8IFwiY2FudmFzXCI7XG4gICAgc2VsZWN0b3I6IHN0cmluZztcbiAgICB0YWtlb3ZlcjogXCJhbHdheXNcIiB8IFwib25jZVwiIHwgXCJlbXB0eVwiIHwgXCJub25lbXB0eVwiIHwgXCJuZXZlclwiO1xuICAgIGZpbGVuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEdsb2JhbFNldHRpbmdzID0ge1xuICBhbHQ6IFwiYWxwaGFudW1cIiB8IFwiYWxsXCIsXG4gIFwiPEMtbj5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgXCI8Qy10PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICBcIjxDLXc+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPENTLW4+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPENTLXQ+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPENTLXc+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIGlnbm9yZUtleXM6IHsgW2tleSBpbiBOdmltTW9kZV06IHN0cmluZ1tdIH0sXG4gIGNtZGxpbmVUaW1lb3V0OiBudW1iZXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgZ2xvYmFsU2V0dGluZ3M6IEdsb2JhbFNldHRpbmdzO1xuICAgIGxvY2FsU2V0dGluZ3M6IHsgW2tleTogc3RyaW5nXTogSVNpdGVDb25maWcgfTtcbn1cblxubGV0IGNvbmY6IElDb25maWcgPSB1bmRlZmluZWQgYXMgSUNvbmZpZztcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlV2l0aERlZmF1bHRzKG9zOiBzdHJpbmcsIHNldHRpbmdzOiBhbnkpOiBJQ29uZmlnIHtcbiAgICBmdW5jdGlvbiBtYWtlRGVmYXVsdHMob2JqOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKG9ialtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW25hbWVdICE9PSB0eXBlb2YgdmFsdWVcbiAgICAgICAgICAgICAgICAgICB8fCBBcnJheS5pc0FycmF5KG9ialtuYW1lXSkgIT09IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFVzZXIgY29uZmlnIGVudHJ5ICR7bmFtZX0gZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgdHlwZS4gT3ZlcnJpZGluZy5gKTtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1ha2VEZWZhdWx0TG9jYWxTZXR0aW5nKHNldHQ6IHsgbG9jYWxTZXR0aW5nczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmo6IElTaXRlQ29uZmlnKSB7XG4gICAgICAgIG1ha2VEZWZhdWx0cyhzZXR0LmxvY2FsU2V0dGluZ3MsIHNpdGUsIHt9KTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgKE9iamVjdC5rZXlzKG9iaikgYXMgKGtleW9mIHR5cGVvZiBvYmopW10pKSB7XG4gICAgICAgICAgICBtYWtlRGVmYXVsdHMoc2V0dC5sb2NhbFNldHRpbmdzW3NpdGVdLCBrZXksIG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZXR0aW5ncyA9IHt9O1xuICAgIH1cblxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncywgXCJnbG9iYWxTZXR0aW5nc1wiLCB7fSk7XG4gICAgLy8gXCI8S0VZPlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiXG4gICAgLy8gIzEwMzogV2hlbiB1c2luZyB0aGUgYnJvd3NlcidzIGNvbW1hbmQgQVBJIHRvIGFsbG93IHNlbmRpbmcgYDxDLXc+YCB0b1xuICAgIC8vIGZpcmVudmltLCB3aGV0aGVyIHRoZSBkZWZhdWx0IGFjdGlvbiBzaG91bGQgYmUgcGVyZm9ybWVkIGlmIG5vIG5lb3ZpbVxuICAgIC8vIGZyYW1lIGlzIGZvY3VzZWQuXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcIjxDLW4+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPEMtdD5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Qy13PlwiLCBcImRlZmF1bHRcIik7XG4gICAgLy8gTm90ZTogPENTLSo+IGFyZSBjdXJyZW50bHkgZGlzYWJsZWQgYmVjYXVzZSBvZlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZW92aW0vbmVvdmltL2lzc3Vlcy8xMjAzN1xuICAgIC8vIE5vdGU6IDxDUy1uPiBkb2Vzbid0IG1hdGNoIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9uIGZpcmVmb3ggYmVjYXVzZSB0aGlzXG4gICAgLy8gd291bGQgcmVxdWlyZSB0aGUgc2Vzc2lvbnMgQVBJLiBJbnN0ZWFkLCBGaXJlZm94J3MgYmVoYXZpb3IgbWF0Y2hlc1xuICAgIC8vIENocm9tZSdzLlxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Q1Mtbj5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIC8vIE5vdGU6IDxDUy10PiBpcyB0aGVyZSBmb3IgY29tcGxldGVuZXNzIHNha2UncyBidXQgY2FuJ3QgYmUgZW11bGF0ZWQgaW5cbiAgICAvLyBDaHJvbWUgYW5kIEZpcmVmb3ggYmVjYXVzZSB0aGlzIHdvdWxkIHJlcXVpcmUgdGhlIHNlc3Npb25zIEFQSS5cbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPENTLXQ+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPENTLXc+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICAvLyAjNzE3OiBhbGxvdyBwYXNzaW5nIGtleXMgdG8gdGhlIGJyb3dzZXJcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiaWdub3JlS2V5c1wiLCB7fSk7XG4gICAgLy8gIzEwNTA6IGN1cnNvciBzb21ldGltZXMgY292ZXJlZCBieSBjb21tYW5kIGxpbmVcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiY21kbGluZVRpbWVvdXRcIiwgMzAwMCk7XG5cbiAgICAvLyBcImFsdFwiOiBcImFsbFwiIHwgXCJhbHBoYW51bVwiXG4gICAgLy8gIzIwMjogT25seSByZWdpc3RlciBhbHQga2V5IG9uIGFscGhhbnVtcyB0byBsZXQgc3dlZGlzaCBvc3ggdXNlcnMgdHlwZVxuICAgIC8vICAgICAgIHNwZWNpYWwgY2hhcnNcbiAgICAvLyBPbmx5IHRlc3RlZCBvbiBPU1gsIHdoZXJlIHdlIGRvbid0IHB1bGwgY292ZXJhZ2UgcmVwb3J0cywgc28gZG9uJ3RcbiAgICAvLyBpbnN0cnVtZW50IGZ1bmN0aW9uLlxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKG9zID09PSBcIm1hY1wiKSB7XG4gICAgICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCJhbHRcIiwgXCJhbHBoYW51bVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiYWx0XCIsIFwiYWxsXCIpO1xuICAgIH1cblxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncywgXCJsb2NhbFNldHRpbmdzXCIsIHt9KTtcbiAgICBtYWtlRGVmYXVsdExvY2FsU2V0dGluZyhzZXR0aW5ncywgXCIuKlwiLCB7XG4gICAgICAgIC8vIFwiY21kbGluZVwiOiBcIm5lb3ZpbVwiIHwgXCJmaXJlbnZpbVwiXG4gICAgICAgIC8vICMxNjg6IFVzZSBhbiBleHRlcm5hbCBjb21tYW5kbGluZSB0byBwcmVzZXJ2ZSBzcGFjZVxuICAgICAgICBjbWRsaW5lOiBcImZpcmVudmltXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwidGV4dFwiLFxuICAgICAgICBwcmlvcml0eTogMCxcbiAgICAgICAgcmVuZGVyZXI6IFwiY2FudmFzXCIsXG4gICAgICAgIHNlbGVjdG9yOiAndGV4dGFyZWE6bm90KFtyZWFkb25seV0pLCBkaXZbcm9sZT1cInRleHRib3hcIl0nLFxuICAgICAgICAvLyBcInRha2VvdmVyXCI6IFwiYWx3YXlzXCIgfCBcIm9uY2VcIiB8IFwiZW1wdHlcIiB8IFwibm9uZW1wdHlcIiB8IFwibmV2ZXJcIlxuICAgICAgICAvLyAjMjY1OiBPbiBcIm9uY2VcIiwgZG9uJ3QgYXV0b21hdGljYWxseSBicmluZyBiYWNrIGFmdGVyIDpxJ2luZyBpdFxuICAgICAgICB0YWtlb3ZlcjogXCJhbHdheXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwie2hvc3RuYW1lJTMyfV97cGF0aG5hbWUlMzJ9X3tzZWxlY3RvciUzMn1fe3RpbWVzdGFtcCUzMn0ue2V4dGVuc2lvbn1cIixcbiAgICB9KTtcbiAgICByZXR1cm4gc2V0dGluZ3M7XG59XG5cbmV4cG9ydCBjb25zdCBjb25mUmVhZHkgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KCkudGhlbigob2JqOiBhbnkpID0+IHtcbiAgICAgICAgY29uZiA9IG9iajtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5icm93c2VyLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKChjaGFuZ2VzOiBhbnkpID0+IHtcbiAgICBPYmplY3RcbiAgICAgICAgLmVudHJpZXMoY2hhbmdlcylcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXTogW2tleW9mIElDb25maWcsIGFueV0pID0+IGNvbmZSZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZba2V5XSA9IHZhbHVlLm5ld1ZhbHVlO1xuICAgICAgICB9KSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdsb2JhbENvbmYoKSB7XG4gICAgLy8gQ2FuJ3QgYmUgdGVzdGVkIGZvclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGNvbmYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRHbG9iYWxDb25mIGNhbGxlZCBiZWZvcmUgY29uZmlnIHdhcyByZWFkeVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmYuZ2xvYmFsU2V0dGluZ3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25mKCkge1xuICAgIHJldHVybiBnZXRDb25mRm9yVXJsKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZkZvclVybCh1cmw6IHN0cmluZyk6IElTaXRlQ29uZmlnIHtcbiAgICBjb25zdCBsb2NhbFNldHRpbmdzID0gY29uZi5sb2NhbFNldHRpbmdzO1xuICAgIGZ1bmN0aW9uIG9yMSh2YWw6IG51bWJlcikge1xuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIC8vIENhbid0IGJlIHRlc3RlZCBmb3JcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChsb2NhbFNldHRpbmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IHlvdXIgc2V0dGluZ3MgYXJlIHVuZGVmaW5lZC4gVHJ5IHJlbG9hZGluZyB0aGUgcGFnZS4gSWYgdGhpcyBlcnJvciBwZXJzaXN0cywgdHJ5IHRoZSB0cm91Ymxlc2hvb3RpbmcgZ3VpZGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9nbGFjYW1icmUvZmlyZW52aW0vYmxvYi9tYXN0ZXIvVFJPVUJMRVNIT09USU5HLm1kXCIpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShPYmplY3QuZW50cmllcyhsb2NhbFNldHRpbmdzKSlcbiAgICAgICAgLmZpbHRlcigoW3BhdCwgX10pID0+IChuZXcgUmVnRXhwKHBhdCkpLnRlc3QodXJsKSlcbiAgICAgICAgLnNvcnQoKGUxLCBlMikgPT4gKG9yMShlMVsxXS5wcmlvcml0eSkgLSBvcjEoZTJbMV0ucHJpb3JpdHkpKSlcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBbXywgY3VyXSkgPT4gT2JqZWN0LmFzc2lnbihhY2MsIGN1ciksIHt9IGFzIElTaXRlQ29uZmlnKTtcbn1cbiIsImV4cG9ydCBjb25zdCBub25MaXRlcmFsS2V5czoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgXCIgXCI6IFwiPFNwYWNlPlwiLFxuICAgIFwiPFwiOiBcIjxsdD5cIixcbiAgICBcIkFycm93RG93blwiOiBcIjxEb3duPlwiLFxuICAgIFwiQXJyb3dMZWZ0XCI6IFwiPExlZnQ+XCIsXG4gICAgXCJBcnJvd1JpZ2h0XCI6IFwiPFJpZ2h0PlwiLFxuICAgIFwiQXJyb3dVcFwiOiBcIjxVcD5cIixcbiAgICBcIkJhY2tzcGFjZVwiOiBcIjxCUz5cIixcbiAgICBcIkRlbGV0ZVwiOiBcIjxEZWw+XCIsXG4gICAgXCJFbmRcIjogXCI8RW5kPlwiLFxuICAgIFwiRW50ZXJcIjogXCI8Q1I+XCIsXG4gICAgXCJFc2NhcGVcIjogXCI8RXNjPlwiLFxuICAgIFwiRjFcIjogXCI8RjE+XCIsXG4gICAgXCJGMTBcIjogXCI8RjEwPlwiLFxuICAgIFwiRjExXCI6IFwiPEYxMT5cIixcbiAgICBcIkYxMlwiOiBcIjxGMTI+XCIsXG4gICAgXCJGMTNcIjogXCI8RjEzPlwiLFxuICAgIFwiRjE0XCI6IFwiPEYxND5cIixcbiAgICBcIkYxNVwiOiBcIjxGMTU+XCIsXG4gICAgXCJGMTZcIjogXCI8RjE2PlwiLFxuICAgIFwiRjE3XCI6IFwiPEYxNz5cIixcbiAgICBcIkYxOFwiOiBcIjxGMTg+XCIsXG4gICAgXCJGMTlcIjogXCI8RjE5PlwiLFxuICAgIFwiRjJcIjogXCI8RjI+XCIsXG4gICAgXCJGMjBcIjogXCI8RjIwPlwiLFxuICAgIFwiRjIxXCI6IFwiPEYyMT5cIixcbiAgICBcIkYyMlwiOiBcIjxGMjI+XCIsXG4gICAgXCJGMjNcIjogXCI8RjIzPlwiLFxuICAgIFwiRjI0XCI6IFwiPEYyND5cIixcbiAgICBcIkYzXCI6IFwiPEYzPlwiLFxuICAgIFwiRjRcIjogXCI8RjQ+XCIsXG4gICAgXCJGNVwiOiBcIjxGNT5cIixcbiAgICBcIkY2XCI6IFwiPEY2PlwiLFxuICAgIFwiRjdcIjogXCI8Rjc+XCIsXG4gICAgXCJGOFwiOiBcIjxGOD5cIixcbiAgICBcIkY5XCI6IFwiPEY5PlwiLFxuICAgIFwiSG9tZVwiOiBcIjxIb21lPlwiLFxuICAgIFwiUGFnZURvd25cIjogXCI8UGFnZURvd24+XCIsXG4gICAgXCJQYWdlVXBcIjogXCI8UGFnZVVwPlwiLFxuICAgIFwiVGFiXCI6IFwiPFRhYj5cIixcbiAgICBcIlxcXFxcIjogXCI8QnNsYXNoPlwiLFxuICAgIFwifFwiOiBcIjxCYXI+XCIsXG59O1xuXG5jb25zdCBub25MaXRlcmFsVmltS2V5cyA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyaWVzKG5vbkxpdGVyYWxLZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoW3gsIHldKSA9PiBbeSwgeF0pKTtcblxuY29uc3Qgbm9uTGl0ZXJhbEtleUNvZGVzOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSA9IHtcbiAgICBcIkVudGVyXCI6ICAgICAgMTMsXG4gICAgXCJTcGFjZVwiOiAgICAgIDMyLFxuICAgIFwiVGFiXCI6ICAgICAgICA5LFxuICAgIFwiRGVsZXRlXCI6ICAgICA0NixcbiAgICBcIkVuZFwiOiAgICAgICAgMzUsXG4gICAgXCJIb21lXCI6ICAgICAgIDM2LFxuICAgIFwiSW5zZXJ0XCI6ICAgICA0NSxcbiAgICBcIlBhZ2VEb3duXCI6ICAgMzQsXG4gICAgXCJQYWdlVXBcIjogICAgIDMzLFxuICAgIFwiQXJyb3dEb3duXCI6ICA0MCxcbiAgICBcIkFycm93TGVmdFwiOiAgMzcsXG4gICAgXCJBcnJvd1JpZ2h0XCI6IDM5LFxuICAgIFwiQXJyb3dVcFwiOiAgICAzOCxcbiAgICBcIkVzY2FwZVwiOiAgICAgMjcsXG59O1xuXG4vLyBHaXZlbiBhIFwic3BlY2lhbFwiIGtleSByZXByZXNlbnRhdGlvbiAoZS5nLiA8RW50ZXI+IG9yIDxNLWw+KSwgcmV0dXJucyBhblxuLy8gYXJyYXkgb2YgdGhyZWUgamF2YXNjcmlwdCBrZXlldmVudHMsIHRoZSBmaXJzdCBvbmUgcmVwcmVzZW50aW5nIHRoZVxuLy8gY29ycmVzcG9uZGluZyBrZXlkb3duLCB0aGUgc2Vjb25kIG9uZSBhIGtleXByZXNzIGFuZCB0aGUgdGhpcmQgb25lIGEga2V5dXBcbi8vIGV2ZW50LlxuZnVuY3Rpb24gbW9kS2V5VG9FdmVudHMoazogc3RyaW5nKSB7XG4gICAgbGV0IG1vZHMgPSBcIlwiO1xuICAgIGxldCBrZXkgPSBub25MaXRlcmFsVmltS2V5c1trXTtcbiAgICBsZXQgY3RybEtleSA9IGZhbHNlO1xuICAgIGxldCBhbHRLZXkgPSBmYWxzZTtcbiAgICBsZXQgc2hpZnRLZXkgPSBmYWxzZTtcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYXJyID0gay5zbGljZSgxLCAtMSkuc3BsaXQoXCItXCIpO1xuICAgICAgICBtb2RzID0gYXJyWzBdO1xuICAgICAgICBrZXkgPSBhcnJbMV07XG4gICAgICAgIGN0cmxLZXkgPSAvYy9pLnRlc3QobW9kcyk7XG4gICAgICAgIGFsdEtleSA9IC9hL2kudGVzdChtb2RzKTtcbiAgICAgICAgY29uc3Qgc3BlY2lhbENoYXIgPSBcIjxcIiArIGtleSArIFwiPlwiO1xuICAgICAgICBpZiAobm9uTGl0ZXJhbFZpbUtleXNbc3BlY2lhbENoYXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGtleSA9IG5vbkxpdGVyYWxWaW1LZXlzW3NwZWNpYWxDaGFyXTtcbiAgICAgICAgICAgIHNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaGlmdEtleSA9IGtleSAhPT0ga2V5LnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU29tZSBwYWdlcyByZWx5IG9uIGtleUNvZGVzIHRvIGZpZ3VyZSBvdXQgd2hhdCBrZXkgd2FzIHByZXNzZWQuIFRoaXMgaXNcbiAgICAvLyBhd2Z1bCBiZWNhdXNlIGtleWNvZGVzIGFyZW4ndCBndWFyYW50ZWVkIHRvIGJlIHRoZSBzYW1lIGFjcnJvc3NcbiAgICAvLyBicm93c2Vycy9PUy9rZXlib2FyZCBsYXlvdXRzIGJ1dCB0cnkgdG8gZG8gdGhlIHJpZ2h0IHRoaW5nIGFueXdheS5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2xhY2FtYnJlL2ZpcmVudmltL2lzc3Vlcy83MjNcbiAgICBsZXQga2V5Q29kZSA9IDA7XG4gICAgaWYgKC9eW2EtekEtWjAtOV0kLy50ZXN0KGtleSkpIHtcbiAgICAgICAga2V5Q29kZSA9IGtleS5jaGFyQ29kZUF0KDApO1xuICAgIH0gZWxzZSBpZiAobm9uTGl0ZXJhbEtleUNvZGVzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlDb2RlID0gbm9uTGl0ZXJhbEtleUNvZGVzW2tleV07XG4gICAgfVxuICAgIGNvbnN0IGluaXQgPSB7IGtleSwga2V5Q29kZSwgY3RybEtleSwgYWx0S2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9O1xuICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5ZG93blwiLCBpbml0KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlwcmVzc1wiLCBpbml0KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXl1cFwiLCBpbml0KSxcbiAgICBdO1xufVxuXG4vLyBHaXZlbiBhIFwic2ltcGxlXCIga2V5IChlLmcuIGBhYCwgYDFg4oCmKSwgcmV0dXJucyBhbiBhcnJheSBvZiB0aHJlZSBqYXZhc2NyaXB0XG4vLyBldmVudHMgcmVwcmVzZW50aW5nIHRoZSBhY3Rpb24gb2YgcHJlc3NpbmcgdGhlIGtleS5cbmZ1bmN0aW9uIGtleVRvRXZlbnRzKGtleTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2hpZnRLZXkgPSBrZXkgIT09IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5ZG93blwiLCAgeyBrZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleXByZXNzXCIsIHsga2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXl1cFwiLCAgICB7IGtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfSksXG4gICAgXTtcbn1cblxuLy8gR2l2ZW4gYW4gYXJyYXkgb2Ygc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGtleXMgKGUuZy4gW1wiYVwiLCBcIjxFbnRlcj5cIiwg4oCmXSksXG4vLyByZXR1cm5zIGFuIGFycmF5IG9mIGphdmFzY3JpcHQga2V5Ym9hcmQgZXZlbnRzIHRoYXQgc2ltdWxhdGUgdGhlc2Uga2V5c1xuLy8gYmVpbmcgcHJlc3NlZC5cbmV4cG9ydCBmdW5jdGlvbiBrZXlzVG9FdmVudHMoa2V5czogc3RyaW5nW10pIHtcbiAgICAvLyBDb2RlIHRvIHNwbGl0IG1vZCBrZXlzIGFuZCBub24tbW9kIGtleXM6XG4gICAgLy8gY29uc3Qga2V5cyA9IHN0ci5tYXRjaCgvKFs8Pl1bXjw+XStbPD5dKXwoW148Pl0rKS9nKVxuICAgIC8vIGlmIChrZXlzID09PSBudWxsKSB7XG4gICAgLy8gICAgIHJldHVybiBbXTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleVswXSA9PT0gXCI8XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RLZXlUb0V2ZW50cyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlUb0V2ZW50cyhrZXkpO1xuICAgIH0pLmZsYXQoKTtcbn1cblxuLy8gVHVybnMgYSBub24tbGl0ZXJhbCBrZXkgKGUuZy4gXCJFbnRlclwiKSBpbnRvIGEgdmltLWVxdWl2YWxlbnQgXCI8RW50ZXI+XCJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAobm9uTGl0ZXJhbEtleXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBub25MaXRlcmFsS2V5c1trZXldO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xufVxuXG4vLyBBZGQgbW9kaWZpZXIgYG1vZGAgKGBBYCwgYENgLCBgU2DigKYpIHRvIGB0ZXh0YCAoYSB2aW0ga2V5IGBiYCwgYDxFbnRlcj5gLFxuLy8gYDxDUy14PmDigKYpXG5leHBvcnQgZnVuY3Rpb24gYWRkTW9kaWZpZXIobW9kOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGxldCBtYXRjaDtcbiAgICBsZXQgbW9kaWZpZXJzID0gXCJcIjtcbiAgICBsZXQga2V5ID0gXCJcIjtcbiAgICBpZiAoKG1hdGNoID0gdGV4dC5tYXRjaCgvXjwoW0EtWl17MSw1fSktKC4rKT4kLykpKSB7XG4gICAgICAgIG1vZGlmaWVycyA9IG1hdGNoWzFdO1xuICAgICAgICBrZXkgPSBtYXRjaFsyXTtcbiAgICB9IGVsc2UgaWYgKChtYXRjaCA9IHRleHQubWF0Y2goL148KC4rKT4kLykpKSB7XG4gICAgICAgIGtleSA9IG1hdGNoWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSA9IHRleHQ7XG4gICAgfVxuICAgIHJldHVybiBcIjxcIiArIG1vZCArIG1vZGlmaWVycyArIFwiLVwiICsga2V5ICsgXCI+XCI7XG59XG4iLCJsZXQgY3VySG9zdCA6IHN0cmluZztcblxuLy8gQ2hyb21lIGRvZXNuJ3QgaGF2ZSBhIFwiYnJvd3NlclwiIG9iamVjdCwgaW5zdGVhZCBpdCB1c2VzIFwiY2hyb21lXCIuXG5pZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcIm1vei1leHRlbnNpb246XCIpIHtcbiAgICBjdXJIb3N0ID0gXCJmaXJlZm94XCI7XG59IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJjaHJvbWUtZXh0ZW5zaW9uOlwiKSB7XG4gICAgY3VySG9zdCA9IFwiY2hyb21lXCI7XG59IGVsc2UgaWYgKCh3aW5kb3cgYXMgYW55KS5JbnN0YWxsVHJpZ2dlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY3VySG9zdCA9IFwiY2hyb21lXCI7XG59IGVsc2Uge1xuICAgIGN1ckhvc3QgPSBcImZpcmVmb3hcIjtcbn1cblxuLy8gT25seSB1c2FibGUgaW4gYmFja2dyb3VuZCBzY3JpcHQhXG5leHBvcnQgZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgLy8gQ2FuJ3QgY292ZXIgZXJyb3IgY29uZGl0aW9uXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoY3VySG9zdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiVXNlZCBpc0Nocm9tZSBpbiBjb250ZW50IHNjcmlwdCFcIik7XG4gICAgfVxuICAgIHJldHVybiBjdXJIb3N0ID09PSBcImNocm9tZVwiO1xufVxuXG4vLyBSdW5zIENPREUgaW4gdGhlIHBhZ2UncyBjb250ZXh0IGJ5IHNldHRpbmcgdXAgYSBjdXN0b20gZXZlbnQgbGlzdGVuZXIsXG4vLyBlbWJlZGRpbmcgYSBzY3JpcHQgZWxlbWVudCB0aGF0IHJ1bnMgdGhlIHBpZWNlIG9mIGNvZGUgYW5kIGVtaXRzIGl0cyByZXN1bHRcbi8vIGFzIGFuIGV2ZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVJblBhZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBPbiBmaXJlZm94LCB1c2UgYW4gQVBJIHRoYXQgYWxsb3dzIGNpcmN1bXZlbnRpbmcgc29tZSBDU1AgcmVzdHJpY3Rpb25zXG4gICAgLy8gVXNlIHdyYXBwZWRKU09iamVjdCB0byBkZXRlY3QgYXZhaWxhYmlsaXR5IG9mIHNhaWQgQVBJXG4gICAgLy8gRE9OJ1QgdXNlIHdpbmRvdy5ldmFsIG9uIG90aGVyIHBsYXRlZm9ybXMgLSBpdCBkb2Vzbid0IGhhdmUgdGhlXG4gICAgLy8gc2VtYW50aWNzIHdlIG5lZWQhXG4gICAgaWYgKCh3aW5kb3cgYXMgYW55KS53cmFwcGVkSlNPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuZXZhbChjb2RlKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgY29uc3QgZXZlbnRJZCA9IChuZXcgVVJMKGJyb3dzZXIucnVudGltZS5nZXRVUkwoXCJcIikpKS5ob3N0bmFtZSArIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBgKGFzeW5jIChldklkKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJHtjb2RlfTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IHN1Y2Nlc3M6IGZhbHNlLCByZWFzb246IGUgfSxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCR7SlNPTi5zdHJpbmdpZnkoZXZlbnRJZCl9KWA7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50SWQsICh7IGRldGFpbCB9OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICBpZiAoZGV0YWlsLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkZXRhaWwucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZGV0YWlsLnJlYXNvbik7XG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xufVxuXG4vLyBWYXJpb3VzIGZpbHRlcnMgdGhhdCBhcmUgdXNlZCB0byBjaGFuZ2UgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIEJyb3dzZXJBY3Rpb25cbi8vIGljb24uXG5jb25zdCBzdmdwYXRoID0gXCJmaXJlbnZpbS5zdmdcIjtcbmNvbnN0IHRyYW5zZm9ybWF0aW9ucyA9IHtcbiAgICBkaXNhYmxlZDogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFNraXAgdHJhbnNwYXJlbnQgcGl4ZWxzXG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWVhbiA9IE1hdGguZmxvb3IoKGltZ1tpXSArIGltZ1tpICsgMV0gKyBpbWdbaSArIDJdKSAvIDMpO1xuICAgICAgICAgICAgaW1nW2ldID0gbWVhbjtcbiAgICAgICAgICAgIGltZ1tpICsgMV0gPSBtZWFuO1xuICAgICAgICAgICAgaW1nW2kgKyAyXSA9IG1lYW47XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gVHVybiB0cmFuc3BhcmVudCBwaXhlbHMgcmVkXG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltZ1tpXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDNdID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBub3JtYWw6ICgoX2ltZzogVWludDhDbGFtcGVkQXJyYXkpID0+ICh1bmRlZmluZWQgYXMgbmV2ZXIpKSxcbiAgICBub3RpZmljYXRpb246IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBUdXJuIHRyYW5zcGFyZW50IHBpeGVscyB5ZWxsb3dcbiAgICAgICAgICAgIGlmIChpbWdbaSArIDNdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1nW2ldID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgMV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5leHBvcnQgdHlwZSBJY29uS2luZCA9IGtleW9mIHR5cGVvZiB0cmFuc2Zvcm1hdGlvbnM7XG5cbi8vIFRha2VzIGFuIGljb24ga2luZCBhbmQgZGltZW5zaW9ucyBhcyBwYXJhbWV0ZXIsIGRyYXdzIHRoYXQgdG8gYSBjYW52YXMgYW5kXG4vLyByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgY2FudmFzJyBpbWFnZSBkYXRhLlxuZXhwb3J0IGZ1bmN0aW9uIGdldEljb25JbWFnZURhdGEoa2luZDogSWNvbktpbmQsIHdpZHRoID0gMzIsIGhlaWdodCA9IDMyKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb25zdCBpZCA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uc1traW5kXShpZC5kYXRhKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgfSkpO1xuICAgIGltZy5zcmMgPSBzdmdwYXRoO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEdpdmVuIGEgdXJsIGFuZCBhIHNlbGVjdG9yLCB0cmllcyB0byBjb21wdXRlIGEgbmFtZSB0aGF0IHdpbGwgYmUgdW5pcXVlLFxuLy8gc2hvcnQgYW5kIHJlYWRhYmxlIGZvciB0aGUgdXNlci5cbmV4cG9ydCBmdW5jdGlvbiB0b0ZpbGVOYW1lKGZvcm1hdFN0cmluZzogc3RyaW5nLCB1cmw6IHN0cmluZywgaWQ6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcnNlZFVSTCA9IG5ldyBVUkwodXJsKTtcblxuICAgIGNvbnN0IHNhbml0aXplID0gKHM6IHN0cmluZykgPT4gKHMubWF0Y2goL1thLXpBLVowLTldKy9nKSB8fCBbXSkuam9pbihcIi1cIik7XG5cbiAgICBjb25zdCBleHBhbmQgPSAocGF0dGVybjogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vQnJhY2tldHMgPSBwYXR0ZXJuLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgY29uc3QgW3N5bWJvbCwgbGVuZ3RoXSA9IG5vQnJhY2tldHMuc3BsaXQoXCIlXCIpO1xuICAgICAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKHN5bWJvbCkge1xuICAgICAgICAgICAgY2FzZSBcImhvc3RuYW1lXCI6IHZhbHVlID0gcGFyc2VkVVJMLmhvc3RuYW1lOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwYXRobmFtZVwiOiB2YWx1ZSA9IHNhbml0aXplKHBhcnNlZFVSTC5wYXRobmFtZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNlbGVjdG9yXCI6IHZhbHVlID0gc2FuaXRpemUoaWQucmVwbGFjZSgvOm50aC1vZi10eXBlL2csIFwiXCIpKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidGltZXN0YW1wXCI6IHZhbHVlID0gc2FuaXRpemUoKG5ldyBEYXRlKCkpLnRvSVNPU3RyaW5nKCkpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJleHRlbnNpb25cIjogdmFsdWUgPSBsYW5ndWFnZVRvRXh0ZW5zaW9ucyhsYW5ndWFnZSk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihgVW5yZWNvZ25pemVkIGZpbGVuYW1lIHBhdHRlcm46ICR7cGF0dGVybn1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoLWxlbmd0aCk7XG4gICAgfTtcblxuICAgIGxldCByZXN1bHQgPSBmb3JtYXRTdHJpbmc7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGZvcm1hdFN0cmluZy5tYXRjaCgve1tefV0qfS9nKTtcbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMuZmlsdGVyKHMgPT4gcyAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UobWF0Y2gsIGV4cGFuZChtYXRjaCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEdpdmVuIGEgbGFuZ3VhZ2UgbmFtZSwgcmV0dXJucyBhIGZpbGVuYW1lIGV4dGVuc2lvbi4gQ2FuIHJldHVybiB1bmRlZmluZWQuXG5leHBvcnQgZnVuY3Rpb24gbGFuZ3VhZ2VUb0V4dGVuc2lvbnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGlmIChsYW5ndWFnZSA9PT0gdW5kZWZpbmVkIHx8IGxhbmd1YWdlID09PSBudWxsKSB7XG4gICAgICAgIGxhbmd1YWdlID0gXCJcIjtcbiAgICB9XG4gICAgY29uc3QgbGFuZyA9IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBzd2l0Y2ggKGxhbmcpIHtcbiAgICAgICAgY2FzZSBcImFwbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiYXBsXCI7XG4gICAgICAgIGNhc2UgXCJicmFpbmZ1Y2tcIjogICAgICAgIHJldHVybiBcImJmXCI7XG4gICAgICAgIGNhc2UgXCJjXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImNcIjtcbiAgICAgICAgY2FzZSBcImMjXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiY3NcIjtcbiAgICAgICAgY2FzZSBcImMrK1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3BwXCI7XG4gICAgICAgIGNhc2UgXCJjZXlsb25cIjogICAgICAgICAgIHJldHVybiBcImNleWxvblwiO1xuICAgICAgICBjYXNlIFwiY2xpa2VcIjogICAgICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgICAgIGNhc2UgXCJjbG9qdXJlXCI6ICAgICAgICAgIHJldHVybiBcImNsalwiO1xuICAgICAgICBjYXNlIFwiY21ha2VcIjogICAgICAgICAgICByZXR1cm4gXCIuY21ha2VcIjtcbiAgICAgICAgY2FzZSBcImNvYm9sXCI6ICAgICAgICAgICAgcmV0dXJuIFwiY2JsXCI7XG4gICAgICAgIGNhc2UgXCJjb2ZmZWVzY3JpcHRcIjogICAgIHJldHVybiBcImNvZmZlZVwiO1xuICAgICAgICBjYXNlIFwiY29tbW9ubGlzcFwiOiAgICAgIHJldHVybiBcImxpc3BcIjtcbiAgICAgICAgY2FzZSBcImNyeXN0YWxcIjogICAgICAgICAgcmV0dXJuIFwiY3JcIjtcbiAgICAgICAgY2FzZSBcImNzc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3NzXCI7XG4gICAgICAgIGNhc2UgXCJjeXRob25cIjogICAgICAgICAgIHJldHVybiBcInB5XCI7XG4gICAgICAgIGNhc2UgXCJkXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImRcIjtcbiAgICAgICAgY2FzZSBcImRhcnRcIjogICAgICAgICAgICAgcmV0dXJuIFwiZGFydFwiO1xuICAgICAgICBjYXNlIFwiZGlmZlwiOiAgICAgICAgICAgICByZXR1cm4gXCJkaWZmXCI7XG4gICAgICAgIGNhc2UgXCJkb2NrZXJmaWxlXCI6ICAgICAgIHJldHVybiBcImRvY2tlcmZpbGVcIjtcbiAgICAgICAgY2FzZSBcImR0ZFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZHRkXCI7XG4gICAgICAgIGNhc2UgXCJkeWxhblwiOiAgICAgICAgICAgIHJldHVybiBcImR5bGFuXCI7XG4gICAgICAgIC8vIEVpZmZlbCB3YXMgdGhlcmUgZmlyc3QgYnV0IGVsaXhpciBzZWVtcyBtb3JlIGxpa2VseVxuICAgICAgICAvLyBjYXNlIFwiZWlmZmVsXCI6ICAgICAgICAgICByZXR1cm4gXCJlXCI7XG4gICAgICAgIGNhc2UgXCJlbGl4aXJcIjogICAgICAgICAgIHJldHVybiBcImVcIjtcbiAgICAgICAgY2FzZSBcImVsbVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZWxtXCI7XG4gICAgICAgIGNhc2UgXCJlcmxhbmdcIjogICAgICAgICAgIHJldHVybiBcImVybFwiO1xuICAgICAgICBjYXNlIFwiZiNcIjogICAgICAgICAgICAgICByZXR1cm4gXCJmc1wiO1xuICAgICAgICBjYXNlIFwiZmFjdG9yXCI6ICAgICAgICAgICByZXR1cm4gXCJmYWN0b3JcIjtcbiAgICAgICAgY2FzZSBcImZvcnRoXCI6ICAgICAgICAgICAgcmV0dXJuIFwiZnRoXCI7XG4gICAgICAgIGNhc2UgXCJmb3J0cmFuXCI6ICAgICAgICAgIHJldHVybiBcImY5MFwiO1xuICAgICAgICBjYXNlIFwiZ2FzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJhc21cIjtcbiAgICAgICAgY2FzZSBcImdvXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiZ29cIjtcbiAgICAgICAgLy8gR0ZNOiBDb2RlTWlycm9yJ3MgZ2l0aHViLWZsYXZvcmVkIG1hcmtkb3duXG4gICAgICAgIGNhc2UgXCJnZm1cIjogICAgICAgICAgICAgIHJldHVybiBcIm1kXCI7XG4gICAgICAgIGNhc2UgXCJncm9vdnlcIjogICAgICAgICAgIHJldHVybiBcImdyb292eVwiO1xuICAgICAgICBjYXNlIFwiaGFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJoYW1sXCI7XG4gICAgICAgIGNhc2UgXCJoYW5kbGViYXJzXCI6ICAgICAgIHJldHVybiBcImhic1wiO1xuICAgICAgICBjYXNlIFwiaGFza2VsbFwiOiAgICAgICAgICByZXR1cm4gXCJoc1wiO1xuICAgICAgICBjYXNlIFwiaGF4ZVwiOiAgICAgICAgICAgICByZXR1cm4gXCJoeFwiO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJodG1sZW1iZWRkZWRcIjogICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImh0bWxtaXhlZFwiOiAgICAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiaXB5dGhvblwiOiAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiaXB5dGhvbmZtXCI6ICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwiamF2YVwiOiAgICAgICAgICAgICByZXR1cm4gXCJqYXZhXCI7XG4gICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0XCI6ICAgICAgIHJldHVybiBcImpzXCI7XG4gICAgICAgIGNhc2UgXCJqaW5qYTJcIjogICAgICAgICAgIHJldHVybiBcImppbmphXCI7XG4gICAgICAgIGNhc2UgXCJqdWxpYVwiOiAgICAgICAgICAgIHJldHVybiBcImpsXCI7XG4gICAgICAgIGNhc2UgXCJqc3hcIjogICAgICAgICAgICAgIHJldHVybiBcImpzeFwiO1xuICAgICAgICBjYXNlIFwia290bGluXCI6ICAgICAgICAgICByZXR1cm4gXCJrdFwiO1xuICAgICAgICBjYXNlIFwibGF0ZXhcIjogICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwibGVzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJsZXNzXCI7XG4gICAgICAgIGNhc2UgXCJsdWFcIjogICAgICAgICAgICAgIHJldHVybiBcImx1YVwiO1xuICAgICAgICBjYXNlIFwibWFya2Rvd25cIjogICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwibWxsaWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jYW1sXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jdGF2ZVwiOiAgICAgICAgICAgcmV0dXJuIFwibVwiO1xuICAgICAgICBjYXNlIFwicGFzY2FsXCI6ICAgICAgICAgICByZXR1cm4gXCJwYXNcIjtcbiAgICAgICAgY2FzZSBcInBlcmxcIjogICAgICAgICAgICAgcmV0dXJuIFwicGxcIjtcbiAgICAgICAgY2FzZSBcInBocFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwicGhwXCI7XG4gICAgICAgIGNhc2UgXCJwb3dlcnNoZWxsXCI6ICAgICAgIHJldHVybiBcInBzMVwiO1xuICAgICAgICBjYXNlIFwicHl0aG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiclwiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJyXCI7XG4gICAgICAgIGNhc2UgXCJyc3RcIjogICAgICAgICAgICAgIHJldHVybiBcInJzdFwiO1xuICAgICAgICBjYXNlIFwicnVieVwiOiAgICAgICAgICAgICByZXR1cm4gXCJydWJ5XCI7XG4gICAgICAgIGNhc2UgXCJydXN0XCI6ICAgICAgICAgICAgIHJldHVybiBcInJzXCI7XG4gICAgICAgIGNhc2UgXCJzYXNcIjogICAgICAgICAgICAgIHJldHVybiBcInNhc1wiO1xuICAgICAgICBjYXNlIFwic2Fzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzYXNzXCI7XG4gICAgICAgIGNhc2UgXCJzY2FsYVwiOiAgICAgICAgICAgIHJldHVybiBcInNjYWxhXCI7XG4gICAgICAgIGNhc2UgXCJzY2hlbWVcIjogICAgICAgICAgIHJldHVybiBcInNjbVwiO1xuICAgICAgICBjYXNlIFwic2Nzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzY3NzXCI7XG4gICAgICAgIGNhc2UgXCJzbWFsbHRhbGtcIjogICAgICAgIHJldHVybiBcInN0XCI7XG4gICAgICAgIGNhc2UgXCJzaGVsbFwiOiAgICAgICAgICAgIHJldHVybiBcInNoXCI7XG4gICAgICAgIGNhc2UgXCJzcWxcIjogICAgICAgICAgICAgIHJldHVybiBcInNxbFwiO1xuICAgICAgICBjYXNlIFwic3RleFwiOiAgICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwic3dpZnRcIjogICAgICAgICAgICByZXR1cm4gXCJzd2lmdFwiO1xuICAgICAgICBjYXNlIFwidGNsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ0Y2xcIjtcbiAgICAgICAgY2FzZSBcInRvbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwidG9tbFwiO1xuICAgICAgICBjYXNlIFwidHdpZ1wiOiAgICAgICAgICAgICByZXR1cm4gXCJ0d2lnXCI7XG4gICAgICAgIGNhc2UgXCJ0eXBlc2NyaXB0XCI6ICAgICAgIHJldHVybiBcInRzXCI7XG4gICAgICAgIGNhc2UgXCJ2YlwiOiAgICAgICAgICAgICAgIHJldHVybiBcInZiXCI7XG4gICAgICAgIGNhc2UgXCJ2YnNjcmlwdFwiOiAgICAgICAgIHJldHVybiBcInZic1wiO1xuICAgICAgICBjYXNlIFwidmVyaWxvZ1wiOiAgICAgICAgICByZXR1cm4gXCJzdlwiO1xuICAgICAgICBjYXNlIFwidmhkbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ2aGRsXCI7XG4gICAgICAgIGNhc2UgXCJ4bWxcIjogICAgICAgICAgICAgIHJldHVybiBcInhtbFwiO1xuICAgICAgICBjYXNlIFwieWFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ5YW1sXCI7XG4gICAgICAgIGNhc2UgXCJ6ODBcIjogICAgICAgICAgICAgIHJldHVybiBcIno4YVwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJ0eHRcIjtcbn1cblxuLy8gTWFrZSB0c2xpbnQgaGFwcHlcbmNvbnN0IGZvbnRGYW1pbHkgPSBcImZvbnQtZmFtaWx5XCI7XG5cbi8vIENhbid0IGJlIHRlc3RlZCBlMmUgOi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTaW5nbGVHdWlmb250KGd1aWZvbnQ6IHN0cmluZywgZGVmYXVsdHM6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBndWlmb250LnNwbGl0KFwiOlwiKTtcbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7XG4gICAgaWYgKC9eW2EtekEtWjAtOV0rJC8udGVzdChvcHRpb25zWzBdKSkge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gPSBvcHRpb25zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnNbMF0pO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdHNbZm9udEZhbWlseV0pIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldICs9IGAsICR7ZGVmYXVsdHNbZm9udEZhbWlseV19YDtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnMuc2xpY2UoMSkucmVkdWNlKChhY2MsIG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvcHRpb25bMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaFwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXNpemVcIl0gPSBgJHtvcHRpb24uc2xpY2UoMSl9cHRgO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYlwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXdlaWdodFwiXSA9IFwiYm9sZFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaVwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXN0eWxlXCJdID0gXCJpdGFsaWNcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInVcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1widGV4dC1kZWNvcmF0aW9uXCJdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1widGV4dC1kZWNvcmF0aW9uXCJdID0gXCJsaW5lLXRocm91Z2hcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIndcIjogLy8gQ2FuJ3Qgc2V0IGZvbnQgd2lkdGguIFdvdWxkIGhhdmUgdG8gYWRqdXN0IGNlbGwgd2lkdGguXG4gICAgICAgICAgICAgICAgY2FzZSBcImNcIjogLy8gQ2FuJ3Qgc2V0IGNoYXJhY3RlciBzZXRcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCByZXN1bHQgYXMgYW55KTtcbn07XG5cbi8vIFBhcnNlcyBhIGd1aWZvbnQgZGVjbGFyYXRpb24gYXMgZGVzY3JpYmVkIGluIGA6aCBFMjQ0YFxuLy8gZGVmYXVsdHM6IGRlZmF1bHQgdmFsdWUgZm9yIGVhY2ggb2YuXG4vLyBDYW4ndCBiZSB0ZXN0ZWQgZTJlIDovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR3VpZm9udChndWlmb250OiBzdHJpbmcsIGRlZmF1bHRzOiBhbnkpIHtcbiAgICBjb25zdCBmb250cyA9IGd1aWZvbnQuc3BsaXQoXCIsXCIpLnJldmVyc2UoKTtcbiAgICByZXR1cm4gZm9udHMucmVkdWNlKChhY2MsIGN1cikgPT4gcGFyc2VTaW5nbGVHdWlmb250KGN1ciwgYWNjKSwgZGVmYXVsdHMpO1xufVxuXG4vLyBDb21wdXRlcyBhIHVuaXF1ZSBzZWxlY3RvciBmb3IgaXRzIGFyZ3VtZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVTZWxlY3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGZ1bmN0aW9uIHVuaXF1ZVNlbGVjdG9yKGU6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgLy8gT25seSBtYXRjaGluZyBhbHBoYW51bWVyaWMgc2VsZWN0b3JzIGJlY2F1c2Ugb3RoZXJzIGNoYXJzIG1pZ2h0IGhhdmUgc3BlY2lhbCBtZWFuaW5nIGluIENTU1xuICAgICAgICBpZiAoZS5pZCAmJiBlLmlkLm1hdGNoKFwiXlthLXpBLVowLTlfLV0rJFwiKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBlLnRhZ05hbWUgKyBgW2lkPVwiJHtlLmlkfVwiXWA7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpZCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgICAgaWYgKCFlLnBhcmVudEVsZW1lbnQpIHsgcmV0dXJuIFwiSFRNTFwiOyB9XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGluZGV4ID1cbiAgICAgICAgICAgIEFycmF5LmZyb20oZS5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQudGFnTmFtZSA9PT0gZS50YWdOYW1lKVxuICAgICAgICAgICAgICAgIC5pbmRleE9mKGUpICsgMTtcbiAgICAgICAgcmV0dXJuIGAke3VuaXF1ZVNlbGVjdG9yKGUucGFyZW50RWxlbWVudCl9ID4gJHtlLnRhZ05hbWV9Om50aC1vZi10eXBlKCR7aW5kZXh9KWA7XG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVTZWxlY3RvcihlbGVtZW50KTtcbn1cblxuLy8gVHVybnMgYSBudW1iZXIgaW50byBpdHMgaGFzaCs2IG51bWJlciBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvbi5cbmV4cG9ydCBmdW5jdGlvbiB0b0hleENzcyhuOiBudW1iZXIpIHtcbiAgICBpZiAobiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0ciA9IG4udG9TdHJpbmcoMTYpO1xuICAgIC8vIFBhZCB3aXRoIGxlYWRpbmcgemVyb3NcbiAgICByZXR1cm4gXCIjXCIgKyAobmV3IEFycmF5KDYgLSBzdHIubGVuZ3RoKSkuZmlsbChcIjBcIikuam9pbihcIlwiKSArIHN0cjtcbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBGaXJlbnZpbUVsZW1lbnQgfSBmcm9tIFwiLi9GaXJlbnZpbUVsZW1lbnRcIjtcbmltcG9ydCB7IGF1dG9maWxsIH0gZnJvbSBcIi4vYXV0b2ZpbGxcIjtcbmltcG9ydCB7IGNvbmZSZWFkeSwgZ2V0Q29uZiB9IGZyb20gXCIuL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zLCBnZXRBY3RpdmVDb250ZW50RnVuY3Rpb25zLCBnZXRUYWJGdW5jdGlvbnMgfSBmcm9tIFwiLi9wYWdlXCI7XG5cbmlmIChkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoXCJodHRwczovL2dpdGh1Yi5jb20vXCIpXG4gICAgfHwgZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiZmlsZTpcIiAmJiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLmVuZHNXaXRoKFwiZ2l0aHViLmh0bWxcIikpIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBhdXRvZmlsbCk7XG4gICAgbGV0IGxhc3RVcmwgPSBsb2NhdGlvbi5ocmVmOyBcbiAgICAvLyBXZSBoYXZlIHRvIHVzZSBhIE11dGF0aW9uT2JzZXJ2ZXIgdG8gdHJpZ2dlciBhdXRvZmlsbCBiZWNhdXNlIEdpdGh1YlxuICAgIC8vIHVzZXMgXCJwcm9ncmVzc2l2ZSBlbmhhbmNlbWVudFwiIGFuZCB0aHVzIGRvZXNuJ3QgYWx3YXlzIHRyaWdnZXIgYSBsb2FkXG4gICAgLy8gZXZlbnQuIEJ1dCB3ZSBjYW4ndCBhbHdheXMgcmVseSBvbiB0aGUgTXV0YXRpb25PYnNlcnZlciB3aXRob3V0IHRoZSBsb2FkXG4gICAgLy8gZXZlbnQgYmVjYXVzZSB0aGUgTXV0YXRpb25PYnNlcnZlciB3b24ndCBiZSB0cmlnZ2VyZWQgb24gaGFyZCBwYWdlXG4gICAgLy8gcmVsb2FkcyFcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgaWYgKHVybCAhPT0gbGFzdFVybCkge1xuICAgICAgICBsYXN0VXJsID0gdXJsO1xuICAgICAgICBpZiAobGFzdFVybCA9PT0gXCJodHRwczovL2dpdGh1Yi5jb20vZ2xhY2FtYnJlL2ZpcmVudmltL2lzc3Vlcy9uZXdcIikge1xuICAgICAgICAgICAgYXV0b2ZpbGwoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLm9ic2VydmUoZG9jdW1lbnQsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcbn1cblxuLy8gUHJvbWlzZSB1c2VkIHRvIGltcGxlbWVudCBhIGxvY2tpbmcgbWVjaGFuaXNtIHByZXZlbnRpbmcgY29uY3VycmVudCBjcmVhdGlvblxuLy8gb2YgbmVvdmltIGZyYW1lc1xubGV0IGZyYW1lSWRMb2NrID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbmV4cG9ydCBjb25zdCBmaXJlbnZpbUdsb2JhbCA9IHtcbiAgICAvLyBXaGV0aGVyIEZpcmVudmltIGlzIGRpc2FibGVkIGluIHRoaXMgdGFiXG4gICAgZGlzYWJsZWQ6IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgYXJnczogW1wiZGlzYWJsZWRcIl0sXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcImdldFRhYlZhbHVlXCJdLFxuICAgICAgICB9KVxuICAgICAgICAvLyBOb3RlOiB0aGlzIHJlbGllcyBvbiBzZXREaXNhYmxlZCBleGlzdGluZyBpbiB0aGUgb2JqZWN0IHJldHVybmVkIGJ5XG4gICAgICAgIC8vIGdldEZ1bmN0aW9ucyBhbmQgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdyBvYmplY3RcbiAgICAgICAgLnRoZW4oKGRpc2FibGVkOiBib29sZWFuKSA9PiAod2luZG93IGFzIGFueSkuc2V0RGlzYWJsZWQoZGlzYWJsZWQpKSxcbiAgICAvLyBQcm9taXNlLXJlc29sdXRpb24gZnVuY3Rpb24gY2FsbGVkIHdoZW4gYSBmcmFtZUlkIGlzIHJlY2VpdmVkIGZyb20gdGhlXG4gICAgLy8gYmFja2dyb3VuZCBzY3JpcHRcbiAgICBmcmFtZUlkUmVzb2x2ZTogKF86IG51bWJlcik6IHZvaWQgPT4gdW5kZWZpbmVkLFxuICAgIC8vIGxhc3RGb2N1c2VkQ29udGVudFNjcmlwdCBrZWVwcyB0cmFjayBvZiB0aGUgbGFzdCBjb250ZW50IGZyYW1lIHRoYXQgaGFzXG4gICAgLy8gYmVlbiBmb2N1c2VkLiBUaGlzIGlzIG5lY2Vzc2FyeSBpbiBwYWdlcyB0aGF0IGNvbnRhaW4gbXVsdGlwbGUgZnJhbWVzXG4gICAgLy8gKGFuZCB0aHVzIG11bHRpcGxlIGNvbnRlbnQgc2NyaXB0cyk6IGZvciBleGFtcGxlLCBpZiB1c2VycyBwcmVzcyB0aGVcbiAgICAvLyBnbG9iYWwga2V5Ym9hcmQgc2hvcnRjdXQgPEMtbj4sIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdCBzZW5kcyBhIFwiZ2xvYmFsXCJcbiAgICAvLyBtZXNzYWdlIHRvIGFsbCBvZiB0aGUgYWN0aXZlIHRhYidzIGNvbnRlbnQgc2NyaXB0cy4gRm9yIGEgY29udGVudCBzY3JpcHRcbiAgICAvLyB0byBrbm93IGlmIGl0IHNob3VsZCByZWFjdCB0byBhIGdsb2JhbCBtZXNzYWdlLCBpdCBqdXN0IG5lZWRzIHRvIGNoZWNrXG4gICAgLy8gaWYgaXQgaXMgdGhlIGxhc3QgYWN0aXZlIGNvbnRlbnQgc2NyaXB0LlxuICAgIGxhc3RGb2N1c2VkQ29udGVudFNjcmlwdDogMCxcbiAgICAvLyBudmltaWZ5OiB0cmlnZ2VyZWQgd2hlbiBhbiBlbGVtZW50IGlzIGZvY3VzZWQsIHRha2VzIGNhcmUgb2YgY3JlYXRpbmdcbiAgICAvLyB0aGUgZWRpdG9yIGlmcmFtZSwgYXBwZW5kaW5nIGl0IHRvIHRoZSBwYWdlIGFuZCBmb2N1c2luZyBpdC5cbiAgICBudmltaWZ5OiBhc3luYyAoZXZ0OiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4ge1xuICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwuZGlzYWJsZWQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBhd2FpdCBmaXJlbnZpbUdsb2JhbC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gY3JlYXRpbmcgbmV3IGZyYW1lcywgd2UgbmVlZCB0byBrbm93IHRoZWlyIGZyYW1lSWQgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gY29tbXVuaWNhdGUgd2l0aCB0aGVtLiBUaGlzIGNhbid0IGJlIHJldHJpZXZlZCB0aHJvdWdoIGFcbiAgICAgICAgLy8gc3luY2hyb25vdXMsIGluLXBhZ2UgY2FsbCBzbyB0aGUgbmV3IGZyYW1lIGhhcyB0byB0ZWxsIHRoZVxuICAgICAgICAvLyBiYWNrZ3JvdW5kIHNjcmlwdCB0byBzZW5kIGl0cyBmcmFtZSBpZCB0byB0aGUgcGFnZS4gUHJvYmxlbSBpcywgaWZcbiAgICAgICAgLy8gbXVsdGlwbGUgZnJhbWVzIGFyZSBjcmVhdGVkIGluIGEgdmVyeSBzaG9ydCBhbW91bnQgb2YgdGltZSwgd2VcbiAgICAgICAgLy8gYXJlbid0IGd1YXJhbnRlZWQgdG8gcmVjZWl2ZSB0aGVzZSBmcmFtZUlkcyBpbiB0aGUgb3JkZXIgaW4gd2hpY2hcbiAgICAgICAgLy8gdGhlIGZyYW1lcyB3ZXJlIGNyZWF0ZWQuIFNvIHdlIGhhdmUgdG8gaW1wbGVtZW50IGEgbG9ja2luZyBtZWNoYW5pc21cbiAgICAgICAgLy8gdG8gbWFrZSBzdXJlIHRoYXQgd2UgZG9uJ3QgY3JlYXRlIG5ldyBmcmFtZXMgdW50aWwgd2UgcmVjZWl2ZWQgdGhlXG4gICAgICAgIC8vIGZyYW1lSWQgb2YgdGhlIHByZXZpb3VzbHkgY3JlYXRlZCBmcmFtZS5cbiAgICAgICAgbGV0IGxvY2s7XG4gICAgICAgIHdoaWxlIChsb2NrICE9PSBmcmFtZUlkTG9jaykge1xuICAgICAgICAgICAgbG9jayA9IGZyYW1lSWRMb2NrO1xuICAgICAgICAgICAgYXdhaXQgZnJhbWVJZExvY2s7XG4gICAgICAgIH1cblxuICAgICAgICBmcmFtZUlkTG9jayA9IG5ldyBQcm9taXNlKGFzeW5jICh1bmxvY2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gYXV0byBpcyB0cnVlIHdoZW4gbnZpbWlmeSgpIGlzIGNhbGxlZCBhcyBhbiBldmVudCBsaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gZm9yY2VOdmltaWZ5KClcbiAgICAgICAgICAgIGNvbnN0IGF1dG8gPSAoZXZ0IGluc3RhbmNlb2YgRm9jdXNFdmVudCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRha2VvdmVyID0gZ2V0Q29uZigpLnRha2VvdmVyO1xuICAgICAgICAgICAgaWYgKGZpcmVudmltR2xvYmFsLmRpc2FibGVkIHx8IChhdXRvICYmIHRha2VvdmVyID09PSBcIm5ldmVyXCIpKSB7XG4gICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IG5ldyBGaXJlbnZpbUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgZXZ0LnRhcmdldCBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5udmltaWZ5LFxuICAgICAgICAgICAgICAgIChpZDogbnVtYmVyKSA9PiBmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLmRlbGV0ZShpZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBmaXJlbnZpbS5nZXRFZGl0b3IoKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGFscmVhZHkgaGFzIGEgbmVvdmltIGZyYW1lLCBzdG9wXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5UnVubmluZyA9IEFycmF5LmZyb20oZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy52YWx1ZXMoKSlcbiAgICAgICAgICAgICAgICAuZmluZCgoaW5zdGFuY2UpID0+IGluc3RhbmNlLmdldEVsZW1lbnQoKSA9PT0gZWRpdG9yLmdldEVsZW1lbnQoKSk7XG4gICAgICAgICAgICBpZiAoYWxyZWFkeVJ1bm5pbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBzcGFuIG1pZ2h0IGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UgYnkgdGhlIHBhZ2VcbiAgICAgICAgICAgICAgICAvLyAodGhpcyBoYXBwZW5zIG9uIEppcmEvQ29uZmx1ZW5jZSBmb3IgZXhhbXBsZSkgc28gd2UgY2hlY2tcbiAgICAgICAgICAgICAgICAvLyBmb3IgdGhhdC5cbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gYWxyZWFkeVJ1bm5pbmcuZ2V0U3BhbigpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuLm93bmVyRG9jdW1lbnQuY29udGFpbnMoc3BhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeVJ1bm5pbmcuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5UnVubmluZy5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzcGFuIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFnZSwgdGhlIGVkaXRvclxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBkZWFkIGJlY2F1c2UgcmVtb3ZpbmcgYW4gaWZyYW1lIGZyb20gdGhlIHBhZ2Uga2lsbHNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHdlYnNvY2tldCBjb25uZWN0aW9uIGluc2lkZSBvZiBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UganVzdCB0ZWxsIHRoZSBlZGl0b3IgdG8gY2xlYW4gaXRzZWxmIHVwIGFuZCBnbyBvbiBhc1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBkaWRuJ3QgZXhpc3QuXG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlSdW5uaW5nLmRldGFjaEZyb21QYWdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXV0byAmJiAodGFrZW92ZXIgPT09IFwiZW1wdHlcIiB8fCB0YWtlb3ZlciA9PT0gXCJub25lbXB0eVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSAoYXdhaXQgZWRpdG9yLmdldENvbnRlbnQoKSkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmICgoY29udGVudCAhPT0gXCJcIiAmJiB0YWtlb3ZlciA9PT0gXCJlbXB0eVwiKVxuICAgICAgICAgICAgICAgICAgICB8fCAoY29udGVudCA9PT0gXCJcIiAmJiB0YWtlb3ZlciA9PT0gXCJub25lbXB0eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZW52aW0ucHJlcGFyZUJ1ZmZlckluZm8oKTtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lSWRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmU6IChfOiBudW1iZXIpID0+IHZvaWQsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGZpcmVudmltR2xvYmFsLmZyYW1lSWRSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgdGltZW91dCB0aGUgc2FtZSBhcyB0aGUgb25lIGluIGJhY2tncm91bmQudHNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJlamVjdCwgMTAwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmcmFtZUlkUHJvbWlzZS50aGVuKChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLnNldChmcmFtZUlkLCBmaXJlbnZpbSk7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1HbG9iYWwuZnJhbWVJZFJlc29sdmUgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZyYW1lSWRQcm9taXNlLmNhdGNoKHVubG9jayk7XG4gICAgICAgICAgICBmaXJlbnZpbS5hdHRhY2hUb1BhZ2UoZnJhbWVJZFByb21pc2UpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gZmllbnZpbUVsZW1zIG1hcHMgZnJhbWUgaWRzIHRvIGZpcmVudmltIGVsZW1lbnRzLlxuICAgIGZpcmVudmltRWxlbXM6IG5ldyBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+KCksXG59O1xuXG5jb25zdCBvd25GcmFtZUlkID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYXJnczogW10sIGZ1bmNOYW1lOiBbXCJnZXRPd25GcmFtZUlkXCJdIH0pO1xuYXN5bmMgZnVuY3Rpb24gYW5ub3VuY2VGb2N1cyAoKSB7XG4gICAgY29uc3QgZnJhbWVJZCA9IGF3YWl0IG93bkZyYW1lSWQ7XG4gICAgZmlyZW52aW1HbG9iYWwubGFzdEZvY3VzZWRDb250ZW50U2NyaXB0ID0gZnJhbWVJZDtcbiAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICBhcmdzOiBbIGZyYW1lSWQgXSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJzZXRMYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHRcIl1cbiAgICAgICAgfSxcbiAgICAgICAgZnVuY05hbWU6IFtcIm1lc3NhZ2VQYWdlXCJdXG4gICAgfSk7XG59XG4vLyBXaGVuIHRoZSBmcmFtZSBpcyBjcmVhdGVkLCB3ZSBtaWdodCByZWNlaXZlIGZvY3VzLCBjaGVjayBmb3IgdGhhdFxub3duRnJhbWVJZC50aGVuKF8gPT4ge1xuICAgIGlmIChkb2N1bWVudC5oYXNGb2N1cygpKSB7XG4gICAgICAgIGFubm91bmNlRm9jdXMoKTtcbiAgICB9XG59KTtcbmFzeW5jIGZ1bmN0aW9uIGFkZEZvY3VzTGlzdGVuZXIgKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgYW5ub3VuY2VGb2N1cyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBhbm5vdW5jZUZvY3VzKTtcbn1cbmFkZEZvY3VzTGlzdGVuZXIoKTtcbi8vIFdlIG5lZWQgdG8gdXNlIHNldEludGVydmFsIHRvIHBlcmlvZGljYWxseSByZS1hZGQgdGhlIGZvY3VzIGxpc3RlbmVycyBhcyBpblxuLy8gZnJhbWVzIHRoZSBkb2N1bWVudCBjb3VsZCBnZXQgZGVsZXRlZCBhbmQgcmUtY3JlYXRlZCB3aXRob3V0IG91ciBrbm93bGVkZ2UuXG5jb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoYWRkRm9jdXNMaXN0ZW5lciwgMTAwKTtcbi8vIEJ1dCB3ZSBkb24ndCB3YW50IHRvIHN5cGhvbiB0aGUgdXNlcidzIGJhdHRlcnkgc28gd2Ugc3RvcCBjaGVja2luZyBhZnRlciBhIHNlY29uZFxuc2V0VGltZW91dCgoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpLCAxMDAwKTtcblxuZXhwb3J0IGNvbnN0IGZyYW1lRnVuY3Rpb25zID0gZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMoZmlyZW52aW1HbG9iYWwpO1xuZXhwb3J0IGNvbnN0IGFjdGl2ZUZ1bmN0aW9ucyA9IGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMoZmlyZW52aW1HbG9iYWwpO1xuZXhwb3J0IGNvbnN0IHRhYkZ1bmN0aW9ucyA9IGdldFRhYkZ1bmN0aW9ucyhmaXJlbnZpbUdsb2JhbCk7XG5PYmplY3QuYXNzaWduKHdpbmRvdywgZnJhbWVGdW5jdGlvbnMsIGFjdGl2ZUZ1bmN0aW9ucywgdGFiRnVuY3Rpb25zKTtcbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3Q6IHsgZnVuY05hbWU6IHN0cmluZ1tdLCBhcmdzOiBhbnlbXSB9KSA9PiB7XG4gICAgLy8gQWxsIGNvbnRlbnQgc2NyaXB0cyBtdXN0IHJlYWN0IHRvIHRhYiBmdW5jdGlvbnNcbiAgICBsZXQgZm4gPSByZXF1ZXN0LmZ1bmNOYW1lLnJlZHVjZSgoYWNjOiBhbnksIGN1cjogc3RyaW5nKSA9PiBhY2NbY3VyXSwgdGFiRnVuY3Rpb25zKTtcbiAgICBpZiAoZm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZm4oLi4ucmVxdWVzdC5hcmdzKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgb25seSBjb250ZW50IHNjcmlwdCB0aGF0IHNob3VsZCByZWFjdCB0byBhY3RpdmVGdW5jdGlvbnMgaXMgdGhlIGFjdGl2ZSBvbmVcbiAgICBmbiA9IHJlcXVlc3QuZnVuY05hbWUucmVkdWNlKChhY2M6IGFueSwgY3VyOiBzdHJpbmcpID0+IGFjY1tjdXJdLCBhY3RpdmVGdW5jdGlvbnMpO1xuICAgIGlmIChmbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmaXJlbnZpbUdsb2JhbC5sYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQgPT09IGF3YWl0IG93bkZyYW1lSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmbiguLi5yZXF1ZXN0LmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIC8vIFRoZSBvbmx5IGNvbnRlbnQgc2NyaXB0IHRoYXQgc2hvdWxkIHJlYWN0IHRvIGZyYW1lRnVuY3Rpb25zIGlzIHRoZSBvbmVcbiAgICAvLyB0aGF0IG93bnMgdGhlIGZyYW1lIHRoYXQgc2VudCB0aGUgcmVxdWVzdFxuICAgIGZuID0gcmVxdWVzdC5mdW5jTmFtZS5yZWR1Y2UoKGFjYzogYW55LCBjdXI6IHN0cmluZykgPT4gYWNjW2N1cl0sIGZyYW1lRnVuY3Rpb25zKTtcbiAgICBpZiAoZm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQocmVxdWVzdC5hcmdzWzBdKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oLi4ucmVxdWVzdC5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yOiB1bmhhbmRsZWQgY29udGVudCByZXF1ZXN0OiAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3QpfS5gKTtcbn0pO1xuXG5cbmZ1bmN0aW9uIHNldHVwTGlzdGVuZXJzKHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICBmdW5jdGlvbiBvblNjcm9sbChjb250OiBib29sZWFuKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9zQ2hhbmdlZCA9IEFycmF5LmZyb20oZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5lbnRyaWVzKCkpXG4gICAgICAgICAgICAgICAgLm1hcCgoW18sIGVsZW1dKSA9PiBlbGVtLnB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbigpKVxuICAgICAgICAgICAgICAgIC5maW5kKGNoYW5nZWQgPT4gY2hhbmdlZC5wb3NDaGFuZ2VkKTtcbiAgICAgICAgICAgIGlmIChwb3NDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gQXMgbG9uZyBhcyBvbmUgZWRpdG9yIGNoYW5nZXMgcG9zaXRpb24sIHRyeSB0byByZXNpemVcbiAgICAgICAgICAgICAgICBvblNjcm9sbCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udCkge1xuICAgICAgICAgICAgICAgIC8vIE5vIGVkaXRvciBoYXMgbW92ZWQsIGJ1dCB0aGlzIG1pZ2h0IGJlIGJlY2F1c2UgdGhlIHdlYnNpdGVcbiAgICAgICAgICAgICAgICAvLyBpbXBsZW1lbnRzIHNvbWUga2luZCBvZiBzbW9vdGggc2Nyb2xsaW5nIHRoYXQgZG9lc24ndCBtYWtlXG4gICAgICAgICAgICAgICAgLy8gdGhlIHRleHRhcmVhIG1vdmUgaW1tZWRpYXRlbHkuIEluIG9yZGVyIHRvIGRlYWwgd2l0aCB0aGVzZVxuICAgICAgICAgICAgICAgIC8vIGNhc2VzLCBzY2hlZHVsZSBhIGxhc3QgcmVkcmF3IGluIGEgZmV3IG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gb25TY3JvbGwoZmFsc2UpLCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9TY3JvbGwoKSB7XG4gICAgICAgIHJldHVybiBvblNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9TY3JvbGwpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZG9TY3JvbGwpO1xuICAgIChuZXcgKCh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlcikoKF86IGFueVtdKSA9PiB7XG4gICAgICAgIG9uU2Nyb2xsKHRydWUpO1xuICAgIH0pKS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICBmdW5jdGlvbiBhZGROdmltTGlzdGVuZXIoZWxlbTogRWxlbWVudCkge1xuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBmaXJlbnZpbUdsb2JhbC5udmltaWZ5KTtcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZmlyZW52aW1HbG9iYWwubnZpbWlmeSk7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvU2Nyb2xsKTtcbiAgICAgICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvU2Nyb2xsKTtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgKG5ldyBNdXRhdGlvbk9ic2VydmVyKChjaGFuZ2VzLCBfKSA9PiB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmZpbHRlcihjaGFuZ2UgPT4gY2hhbmdlLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIG11dGF0aW9uIG9ic2VydmVyIGlzIHRyaWdnZXJlZCBldmVyeSB0aW1lIGFuIGVsZW1lbnQgaXNcbiAgICAgICAgLy8gYWRkZWQvcmVtb3ZlZCBmcm9tIHRoZSBwYWdlLiBXaGVuIHRoaXMgaGFwcGVucywgdHJ5IHRvIGFwcGx5XG4gICAgICAgIC8vIGxpc3RlbmVycyBhZ2FpbiwgaW4gY2FzZSBhIG5ldyB0ZXh0YXJlYS9pbnB1dCBmaWVsZCBoYXMgYmVlbiBhZGRlZC5cbiAgICAgICAgY29uc3QgdG9Qb3NzaWJseU52aW1pZnkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgdG9Qb3NzaWJseU52aW1pZnkuZm9yRWFjaChlbGVtID0+IGFkZE52aW1MaXN0ZW5lcihlbGVtKSk7XG5cbiAgICAgICAgY29uc3QgdGFrZW92ZXIgPSBnZXRDb25mKCkudGFrZW92ZXI7XG4gICAgICAgIGZ1bmN0aW9uIHNob3VsZE52aW1pZnkobm9kZTogYW55KSB7XG4gICAgICAgICAgICAvLyBJZGVhbGx5LCB0aGUgdGFrZW92ZXIgIT09IFwibmV2ZXJcIiBjaGVjayBzaG91bGRuJ3QgYmUgcGVyZm9ybWVkXG4gICAgICAgICAgICAvLyBoZXJlOiBpdCBzaG91bGQgbGl2ZSBpbiBudmltaWZ5KCkuIEhvd2V2ZXIsIG52aW1pZnkoKSBvbmx5XG4gICAgICAgICAgICAvLyBjaGVja3MgZm9yIHRha2VvdmVyID09PSBcIm5ldmVyXCIgaWYgaXQgaXMgY2FsbGVkIGZyb20gYW4gZXZlbnRcbiAgICAgICAgICAgIC8vIGhhbmRsZXIgKHRoaXMgaXMgbmVjZXNzYXJ5IGluIG9yZGVyIHRvIGFsbG93IG1hbnVhbGx5IG52aW1pZnlpbmdcbiAgICAgICAgICAgIC8vIGVsZW1lbnRzKS4gVGh1cywgd2UgbmVlZCB0byBjaGVjayBpZiB0YWtlb3ZlciAhPT0gXCJuZXZlclwiIGhlcmVcbiAgICAgICAgICAgIC8vIHRvby5cbiAgICAgICAgICAgIHJldHVybiB0YWtlb3ZlciAhPT0gXCJuZXZlclwiXG4gICAgICAgICAgICAgICAgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbm9kZVxuICAgICAgICAgICAgICAgICYmIHRvUG9zc2libHlOdmltaWZ5LmluY2x1ZGVzKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgYWxzbyBuZWVkIHRvIGNoZWNrIGlmIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50IGlzIGFtb25nIHRoZVxuICAgICAgICAvLyBuZXdseSBjcmVhdGVkIGVsZW1lbnRzIGFuZCBpZiBpdCBpcywgbnZpbWlmeSBpdC5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGNhbid0IGRvIHRoaXMgdW5jb25kaXRpb25hbGx5OiB3ZSB3b3VsZCB0dXJuIHRoZSBhY3RpdmVcbiAgICAgICAgLy8gZWxlbWVudCBpbnRvIGEgbmVvdmltIGZyYW1lIGV2ZW4gZm9yIHVucmVsYXRlZCBkb20gY2hhbmdlcy5cbiAgICAgICAgZm9yIChjb25zdCBtciBvZiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbXIuYWRkZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGROdmltaWZ5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZ1bmN0aW9ucy5mb3JjZU52aW1pZnkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZE52aW1pZnkod2Fsa2VyLmN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlRnVuY3Rpb25zLmZvcmNlTnZpbWlmeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpLm9ic2VydmUod2luZG93LmRvY3VtZW50LCB7IHN1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9KTtcblxuICAgIGxldCBlbGVtZW50czogSFRNTEVsZW1lbnRbXTtcbiAgICB0cnkge1xuICAgICAgICBlbGVtZW50cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICBhbGVydChgRmlyZW52aW0gZXJyb3I6IGludmFsaWQgQ1NTIHNlbGVjdG9yICgke3NlbGVjdG9yfSkgaW4geW91ciBnOmZpcmVudmltX2NvbmZpZy5gKTtcbiAgICAgICAgZWxlbWVudHMgPSBbXTtcbiAgICB9XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtID0+IGFkZE52aW1MaXN0ZW5lcihlbGVtKSk7XG59XG5cbmV4cG9ydCBjb25zdCBsaXN0ZW5lcnNTZXR1cCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGNvbmZSZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29uZjogeyBzZWxlY3Rvcjogc3RyaW5nIH0gPSBnZXRDb25mKCk7XG4gICAgICAgIGlmIChjb25mLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgJiYgY29uZi5zZWxlY3RvciAhPT0gXCJcIikge1xuICAgICAgICAgICAgc2V0dXBMaXN0ZW5lcnMoY29uZi5zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=