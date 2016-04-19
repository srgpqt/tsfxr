"use strict";
var hasOwn = {}.hasOwnProperty;
function extend(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; ++i) {
        var src = sources[i];
        if (src) {
            for (var key in src) {
                if (hasOwn.call(src, key)) {
                    target[key] = src[key];
                }
            }
        }
    }
    return target;
}
exports.__esModule = true;
exports["default"] = extend;
