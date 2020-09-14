var exec = cordova.require("cordova/exec");
var sha256 = require("./Sha256");

if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

var MAJOR_VERSION = 0;
var MINOR_VERSION = 1;
var PATCH_VERSION = 0;
var FEATURE_CHECKING = 0;
var FEATURE_SUPPORTED = 1;
var FEATURE_NOT_SUPPORTED = 2;

var PROXIMITY_UNKNOWN = 0;
var PROXIMITY_IMMEDIATE = 1;
var PROXIMITY_NEAR = 2;
var PROXIMITY_FAR = 3;

var ready = false;
var apiResultReceivedCallbackSet = false;

var _dummy = function () {
};

var apiUserCallbacks = {
    resultReceived: _dummy
};

var userCallbacks = {
    onBackendConnectivityChanged: _dummy,
    qrCodeScanned: _dummy,
    ready: _dummy,
    serviceDataUpdated: _dummy,
    userDataUpdated: _dummy,
    badgeUpdated: _dummy
};

var utils = {
    backgroundSize: (function () {
        var thisBody = document.documentElement || document.body, thisStyle = thisBody.style,
            support = thisStyle.backgroundSize !== undefined;

        return support;
    })(),
    checkCapabilities: function () {
        // Test base64 url support
        var callbackBase64URI = function () {
            rogerthatPlugin.features.base64URI = this.width == 1 && this.height == 1 ? FEATURE_SUPPORTED : FEATURE_NOT_SUPPORTED;
            if (rogerthatPlugin.features.callback !== undefined)
                rogerthatPlugin.features.callback('base64URI');
        };

        var img = new Image();
        img.onload = img.onerror = img.onabort = callbackBase64URI;
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

        // Test css3 support
        rogerthatPlugin.features.backgroundSize = utils.backgroundSize ? FEATURE_SUPPORTED : FEATURE_NOT_SUPPORTED;
        if (rogerthatPlugin.features.callback !== undefined)
            rogerthatPlugin.features.callback('backgroundSize');
    },
    exec: function (success, fail, action, args) {
        if (action !== 'log') {
            utils.logFunctionName("utils.exec -> " + action);
        }
        exec(utils.getSuccessCallback(success, action), utils.getErrorCallback(fail, action), "RogerthatPlugin", action, args);
    },
    generateCallbacksRegister: function (callbacks) {
        var callbacksRegister = {};
        Object.keys(callbacks).forEach(function (key) {
            callbacksRegister[key] = function (callback) {
                callbacks[key] = callback;
            };
        });
        return callbacksRegister;
    },
    logFunctionName: function (functionName) {
        console.log("RogerthatPlugin." + functionName);
    },
    getErrorCallback: function (ecb, functionName) {
        if (typeof ecb === 'function') {
            return ecb;
        } else {
            return function (result) {
                console.log("The injected error callback of '" + functionName + "' received: " + JSON.stringify(result));
            };
        }
    },
    getSuccessCallback: function (scb, functionName) {
        if (typeof scb === 'function') {
            return scb;
        } else {
            return function (result) {
                console.log("The injected success callback of '" + functionName + "' received: " + JSON.stringify(result));
            };
        }
    },
    processCallbackResult: function (result) {
        utils.logFunctionName("processCallbackResult <- " + result.callback);
        if (result.callback === "setInfo") {
            ready = true;
            utils.setRogerthatData(result.args);
            rogerthatPlugin.util._translateHTML();
            userCallbacks.ready();

        } else if (result.callback === "apiResult") {
            apiUserCallbacks.resultReceived(result.args.method, result.args.result, result.args.error, result.args.tag);

        } else if (result.callback === "badgeUpdated") {
            userCallbacks.badgeUpdated(result.args);

        } else if (result.callback === "onBackendConnectivityChanged") {
            userCallbacks.onBackendConnectivityChanged(result.args);

        } else if (result.callback === "qrCodeScanned") {
            userCallbacks.qrCodeScanned(result.args);

        } else if (result.callback === "userDataUpdated") {
            rogerthatPlugin.user.data = result.args;
            userCallbacks.userDataUpdated();

        } else if (result.callback === "serviceDataUpdated") {
            rogerthatPlugin.service.data = result.args;
            userCallbacks.serviceDataUpdated();

        } else {
            utils.logFunctionName("processCallbackResult was unhandled");
        }
    },
    setRogerthatData: function (info) {
        Object.keys(info).forEach(function (key) {
            if (info[key]) {
                rogerthatPlugin[key] = info[key];
            }
        });

        if (info.system === undefined) {
            rogerthatPlugin.system.os = "unknown";
            rogerthatPlugin.system.version = "unknown";
            rogerthatPlugin.system.appVersion = "unknown";
        }

        rogerthatPlugin.user.put = function (data) {
            var crp = {};
            if (data === undefined) {
                crp.u = rogerthatPlugin.user.data;
            } else {
                Object.keys(data).forEach(function (key) {
                    rogerthatPlugin.user.data[key] = data[key];
                });

                crp.smart = true;
                crp.u = data;
            }
            return new Promise(function (resolve, reject) {
                utils.exec(resolve, reject, "user_put", [crp]);
            });
        };
    }
};

function RogerthatPlugin() {
    patchConsole();

    this.news = {
        getNewsGroup: function (request) {
            return new Promise(function (resolve, reject) {
                utils.exec(resolve, reject, "news_getNewsGroup", [request]);
            });
        },
        getNewsGroups: function (request) {
            return new Promise(function (resolve, reject) {
                utils.exec(resolve, reject, "news_getNewsGroups", [request]);
            });
        },
        getNewsStreamItems: function (request) {
            return new Promise(function (resolve, reject) {
                utils.exec(resolve, reject, "news_getNewsStreamItems", [request]);
            });
        },
    };
}

var apiCallbacksRegister = utils.generateCallbacksRegister(apiUserCallbacks);
apiCallbacksRegister.resultReceived = function (callback) {
    // Can only be set once
    if (apiResultReceivedCallbackSet) {
        console.log("Can only set resultReceived callback once.");
        return;
    }

    apiUserCallbacks.resultReceived = callback;
    apiResultReceivedCallbackSet = true;

    // Notify the app that a resultHandler is set
    utils.exec(null, null, "api_resultHandlerConfigured", []);
};

RogerthatPlugin.prototype.api = {
    callbacks: apiCallbacksRegister,
    call: function (method, params, tag, synchronous) {
        return new Promise(function (resolve, reject) {
            utils.exec(resolve, reject, "api_call", [{method: method, params: params, tag: tag, synchronous: synchronous}]);
        });

    }
};

RogerthatPlugin.prototype.app = {
    exit: function () {
        utils.exec(null, null, "app_exit", []);
    },
    exitWithResult: function (result) {
        utils.exec(null, null, "app_exitWithResult", [{"result": result}]);
    }
};

var callbacksRegister = utils.generateCallbacksRegister(userCallbacks);
callbacksRegister.ready = function (callback) {
    userCallbacks.ready = function () {
        callback();
    };
    if (ready) {
        userCallbacks.ready();
    }
};

RogerthatPlugin.prototype.MAJOR_VERSION = MAJOR_VERSION;
RogerthatPlugin.prototype.MINOR_VERSION = MINOR_VERSION;
RogerthatPlugin.prototype.PATCH_VERSION = PATCH_VERSION;
RogerthatPlugin.prototype.PROXIMITY_UNKNOWN = PROXIMITY_UNKNOWN;
RogerthatPlugin.prototype.PROXIMITY_IMMEDIATE = PROXIMITY_IMMEDIATE;
RogerthatPlugin.prototype.PROXIMITY_NEAR = PROXIMITY_NEAR;
RogerthatPlugin.prototype.PROXIMITY_FAR = PROXIMITY_FAR;
RogerthatPlugin.prototype.VERSION = MAJOR_VERSION + "." + MINOR_VERSION + "." + PATCH_VERSION;

RogerthatPlugin.prototype.callbacks = callbacksRegister;

RogerthatPlugin.prototype.camera = {
    FRONT: "front",
    BACK: "back",
    startScanningQrCode: function (cameraType, successCallback, errorCallback) {
        return new Promise(function (resolve, reject) {
            utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "camera_startScanningQrCode", []);
        });
    },
    stopScanningQrCode: function (cameraType, successCallback, errorCallback) {
        return new Promise(function (resolve, reject) {
            utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "camera_stopScanningQrCode", []);
        });
    }
};

RogerthatPlugin.prototype.context = function (successCallback, errorCallback) {
    return new Promise(function (resolve, reject) {
        utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "context", []);
    });
};

RogerthatPlugin.prototype.features = {
    FEATURE_CHECKING: FEATURE_CHECKING,
    FEATURE_SUPPORTED: FEATURE_SUPPORTED,
    FEATURE_NOT_SUPPORTED: FEATURE_NOT_SUPPORTED,
    base64URI: FEATURE_CHECKING,
    backgroundSize: FEATURE_CHECKING,
    callback: undefined
};

RogerthatPlugin.prototype.message = {
    open: function (messageKey, successCallback, errorCallback) {
        return new Promise(function (resolve, reject) {
            utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "message_open", [{"message_key": messageKey}]);
        });
    }
};

// Set via info call
RogerthatPlugin.prototype.menuItem = null;

RogerthatPlugin.prototype.service = {};

RogerthatPlugin.prototype.system = {
    onBackendConnectivityChanged: function (successCallback, errorCallback) {
        return new Promise(function (resolve, reject) {
            utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "system_onBackendConnectivityChanged", []);
        });
    }
};

RogerthatPlugin.prototype.ui = {
    hideKeyboard: function () {
        return new Promise(function (resolve, reject) {
            utils.exec(resolve, reject, "ui_hideKeyboard", []);
        });
    }
};

RogerthatPlugin.prototype.user = {};

function execCallback(promiseCallback, regularCallback) {
    return function (result) {
        if (regularCallback) {
            console.warn('Callback is deprecated, use promise instead');
            regularCallback(result);
        }
        promiseCallback(result);
    };
}

RogerthatPlugin.prototype.util = {
    isConnectedToInternet: function (successCallback, errorCallback) {
        return new Promise(function (resolve, reject) {
            utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "util_isConnectedToInternet", []);
        });
    },
    open: function (params, successCallback, errorCallback) {
        var paramsCopy = Object.assign({}, params);
        if (paramsCopy.action_type) {
            if (paramsCopy.action_type === "click" || paramsCopy.action_type === "action") {
                // TODO move this to native android/ios and remove the sha256 js library
                paramsCopy.action = sha256(paramsCopy.action);
            }
        }
        return new Promise(function (resolve, reject) {
            utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "util_open", [paramsCopy]);
        });
    },
    playAudio: function (url, successCallback, errorCallback) {
        return new Promise(function (resolve, reject) {
            utils.exec(execCallback(resolve, successCallback), execCallback(reject, errorCallback), "util_playAudio", [{"url": url}]);
        });
    },
    translate: function (key, parameters) {
        var language = rogerthatPlugin.user.language || rogerthatPlugin.util._translations.defaultLanguage;
        var translation = undefined;
        if (language != rogerthatPlugin.util._translations.defaultLanguage) {
            var translationSet = rogerthatPlugin.util._translations.values[key];
            if (translationSet) {
                translation = translationSet[language];
                if (translation === undefined) {
                    if (language.indexOf('_') != -1) {
                        language = language.split('_')[0];
                        translation = translationSet[language];
                    }
                }
            }
        }

        if (translation == undefined) {
            // language is defaultLanguage / key is missing / key is not translated
            translation = key;
        }

        if (parameters) {
            $.each(parameters, function (param, value) {
                translation = translation.replace('%(' + param + ')s', value);
            });
        }
        return translation;
    },
    uuid: function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    _translateHTML: function () {
        var tags = document.getElementsByTagName('x-rogerthat-t');
        for (var i = tags.length - 1; i >= 0; i--) {
            var obj = tags[i];
            var translatedString = rogerthatPlugin.util.translate(obj.innerHTML);
            if (obj.outerHTML) {
                obj.outerHTML = translatedString;
            } else {
                var tmpObj = document.createElement("div");
                tmpObj.innerHTML = '<!--THIS DATA SHOULD BE REPLACED-->';
                var objParent = obj.parentNode;
                objParent.replaceChild(tmpObj, obj);
                objParent.innerHTML = objParent.innerHTML.replace('<div><!--THIS DATA SHOULD BE REPLACED--></div>', translatedString);
            }
        }
    },
    _translations: {
        defaultLanguage: "en",
        values: {
            // eg; "Name": { "fr": "Nom", "nl": "Naam" }
        }
    }
};


function exceptionToObject(exception) {
    var result = {};
    if (!exception) {
        return result;
    }
    if (typeof exception.name !== 'undefined') {
        result.name = exception.name;
    }
    if (typeof exception.message !== 'undefined') {
        result.message = exception.message;
    }
    if (typeof exception.stack !== 'undefined') {
        result.stack = exception.stack;
    }
    if (typeof exception.fileName !== 'undefined') {
        result.fileName = exception.fileName;
    }
    if (typeof exception.lineNumber !== 'undefined') {
        result.lineNumber = exception.lineNumber;
    }
    if (typeof exception.columnNumber !== 'undefined') {
        result.columnNumber = exception.columnNumber;
    }
    if (typeof exception.description !== 'undefined') {
        result.description = exception.description;
    }
    return result;
}

var bind = function (context, fn) {
    return function () {
        return fn.apply(context, arguments);
    };
};

function windowErrorHandler(msg, url, line, column, errorObj) {
    var result = {
        msg: msg,
        url: url,
        line: line,
        column: column,
        errorObj: exceptionToObject(errorObj)
    };
    utils.exec(_dummy, _dummy, "log", [{"e": JSON.stringify(result)}]);
}

if (typeof window !== 'undefined') {
    window.onerror = bind(this, windowErrorHandler);
}

if (typeof rogerthat_translations !== "undefined") {
    RogerthatPlugin.prototype.util._translations = rogerthat_translations;
}

function getStackTrace(e) {
    if (RogerthatPlugin.prototype.system !== undefined && RogerthatPlugin.prototype.system.os === 'android') {
        var stack = (e.stack + '\n').replace(/^\S[^\(]+?[\n$]/gm, '')
            .replace(/^\s+(at eval )?at\s+/gm, '')
            .replace(/^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2')
            .replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1').split('\n');
        stack.pop();
        return stack.join('\n');
    } else {
        return e.stack.replace(/\[native code]\n/m, '')
            .replace(/^(?=\w+Error:).*$\n/m, '')
            .replace(/^@/gm, '{anonymous}()@');
    }
}

/**
 * Extends the default console functions so it dispatches the logs to the app
 * This can can in turn dispatch it to the server if log forwarding is enabled.
 * Only patches console.error for android because the rest is handled by CordovaWebChromeClient#onConsoleMessage
 */
function patchConsole() {
    var methods = ['debug', 'info', 'log', 'warn', 'error'];
    var newConsole = window.console;

    function logToApp(args) {
        var log;
        try {
            log = args.length === 1 ? JSON.stringify(args[0]) : JSON.stringify(args);
        } catch (ignored) {
            log = args.length === 1 ? args[0] : args;
        }
        utils.exec(_dummy, _dummy, 'log', [{m: log}]);
    }

    function logErrorToApp(args) {
        var message = '';
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (arg instanceof Error) {
                message += arg.name + ': ' + arg.message + '\n' + getStackTrace(arg);
            } else {
                message += arg + '\n';
            }
        }
        utils.exec(_dummy, _dummy, 'log', [{e: JSON.stringify(message)}]);
    }


    function intercept(method) {
        var original = newConsole[method]
        newConsole[method] = function () {
            if (method === 'error') {
                logErrorToApp(arguments);
            } else {
                logToApp(arguments);
            }
            original.apply(newConsole, arguments);
        };
    }

    for (var i = 0; i < methods.length; i++) {
        if (methods[i] === 'error' || RogerthatPlugin.prototype.system && RogerthatPlugin.prototype.system.os === 'ios') {
            intercept(methods[i]);
        }
    }
}

var rogerthatPlugin = new RogerthatPlugin();
module.exports = rogerthatPlugin;

utils.checkCapabilities();
utils.exec(utils.processCallbackResult, null, "start", []);
