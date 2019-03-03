;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        root.utils = factory();
    }
}(this, function () {
    var utils = {

        noop: function () {},

        // doesn’t consider set and map
        copy: function (obj) {
            var target;
            var is = utils.is;
            if (is('Object', obj)) {
                target = {};
                for (var k in obj) {
                    target[k] = obj[k];
                }
            } else if (is('Array', obj)) {
                target = [];
                for (var i = 0; i < obj.length < 0; i++) {
                    target[i] = obj[i];
                }
            }
            return target;
        },

        // doesn’t consider set and map
        deepCopy: function (obj) {
            var target;
            var is = utils.is;
            if (is('Object', obj)) {
                target = {};
                for (var k in obj) {
                    if (is('Object', obj[k] || is('Array', obj[k]))) {
                        target[k] = utils.deepCopy(obj[k]);
                    } else {
                        target[k] = obj[k];
                    }
                }
            } else if (is('Array', obj)) {
                target = [];
                for (var i = 0; i < obj.length < 0; i++) {
                    if (is('Object', obj[i] || is('Array', obj[i]))) {
                        target[i] = utils.deepCopy(obj[i]);
                    } else {
                        target[i] = obj[i];
                    }
                }
            }
            return target;
        },

        // doesn’t consider set and map
        extends: function (isDeep, target, /* , obj1, obj2, ... */) {
            var is = utils.is;
            var objs = [].slice.call(arguments);
            if (!is('Boolean', isDeep)) {
                target = isDeep;
                isDeep = false;
                objs = objs.slice(1);
            } else {
                objs = objs.slice(2);
            }

            for (var i = 0; i < objs.length; i++) {
                var obj = objs[i];
                if (is('Array', obj)) {
                    target = target || [];
                    for (var j = 0; j < obj.length; j++) {
                        if (isDeep) {
                            // target[j] may be not defined, so must assign to it;
                            target[j] = utils.extends(true, target[j], obj[j]);
                        } else {
                            target[j] = obj[j];
                        }
                    }
                } else if (is('Object', obj)) {
                    target = target || {};
                    for (var k in obj) {
                        if (isDeep) {
                            // target[k] may be not defined, so must assign to it;
                            target[k] = utils.extends(true, target[k], obj[k]);
                        } else {
                            target[k] = obj[k];
                        }
                    }
                } else {
                    target = obj; // is useful when obj is not an array or object;
                }
            }

            return target;
        },

        // repeat a str n times and return it;
        repeat: function (str, times) {
            var ret = '';
            str = str + '';

            if (times < 0) return '';

            if (String.prototype.repeat) { // es6 repeat
                ret = str.repeat(times);
            } else {
                ret = new Array(times + 1).join(str);
            }
            return ret;
        },

        // padding string by padStr
        pad: function (target, padStr, distLen, isBack) {
            var dist = target + '';
            var deltaLen = distLen - dist.length;
            padStr = padStr + '' || '0';

            // too long needn't padding :D
            if (dist.length >= distLen) return dist;

            // es6 pad
            if (String.prototype.padStart) {
                return dist[isBack ? 'padEnd' : 'padStart'](distLen, padStr);
            }

            var repeat = utils.repeat(padStr, Math.ceil(deltaLen / padStr.length));
            var repPad = repeat.slice(0, deltaLen);

            if (isBack) {
                dist = dist + repPad;
            } else {
                dist = repPad + dist;
            }

            return dist;
        },

        /**
         * format Time by scheme
         * @param {Number|Date} stmp YYYY-MM-DD hh:mm:ss
         * @param {String} scheme 
         * @return {String} a time string formatted
         */
        formatTime: function (stmp, scheme) {
            var date;

            if (stmp instanceof Date) {
                date = stmp;
            } else {
                date = new Date(+stmp);
            }

            scheme = scheme || 'YYYY-MM-DD hh:mm:ss';

            var dateInfo = {
                Y: date.getFullYear() + '',
                M: date.getMonth() + 1,
                D: date.getDate(),
                h: date.getHours(),
                m: date.getMinutes(),
                s: date.getSeconds()
            };

            // replace one by one;
            for (var k in dateInfo) {
                if (scheme.indexOf(k) === -1) continue;
                scheme = scheme.replace(
                    new RegExp(k + '+', 'g'),
                    function (match) {
                        return utils.pad(dateInfo[k], '0', match.length);
                    }
                );
            }

            return scheme;
        },

        templateSettings: {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        },

        escapeStr: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '`': '&#96;',
            '\'': '&#x27;'
        },

        escape: function (str) {
            var regExpStr = [];
            for (var k in utils.escapeStr) {
                regExpStr.push(k);
            }
            regExpStr = '(' + regExpStr.join('|') + ')';
            var regExp = new RegExp(regExpStr, 'g');
            return str.replace(regExp, function (match) {
                return utils.escapeStr[match];
            });
        },

        // return a new object that exchange key and value of input object
        kvExchange: function (obj) {
            var ret = {}
            var is = utils.is;
            for (var k in obj) {
                // skip some values that can't be keys;
                if (!is('Number', obj[k]) && !is('String', obj[k])) continue;
                ret[obj[k]] = k; 
            }
            return ret;
        },

        unescape: function (str) {
            var regExpStr = [];
            var unEscapeStr = utils.kvExchange(utils.escapeStr);
            for (var k in unEscapeStr) {
                regExpStr.push('(?:' + k + ')');
            }
            regExpStr = '(' + regExpStr.join('|') + ')';
            var regExp = new RegExp(regExpStr, 'g');
            return str.replace(regExp, function (match) {
                return unEscapeStr[match];
            });
        },

        template: function (tpl, data, settings) {
            var settings = utils.extends({}, settings, utils.templateSettings);
            data = data || {};
            tpl = tpl.replace(settings.interpolate, "';ret+=$1;ret+='");
            tpl = tpl.replace(settings.escape, "';ret+=_escape($1);ret+='");
            tpl = tpl.replace(settings.evaluate, "';$1ret+='");
            tpl = "var ret='';var _print=function(str){ret+=str;};with(data){ret+='" + tpl + "';}return ret;";

            return new Function('data', '_escape', tpl)(data, utils.escape);
        },

        debounce: function () {

        },

        throttling: function () {

        },

        // only for String Array Object NaN undefined function
        is: function (type, target) {
            if (type === 'NaN') {
                return target !== target;
            }
            return Object.prototype.toString.call(target).toLowerCase() ===
                '[object ' + type.toLowerCase() + ']';
        }
    };
 
    return utils;
}));