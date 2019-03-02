;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        root.returnExports = factory();
    }
}(this, function () {
    var utils = {

        // repeat a str n times and return it;
        repeat: function (str, n) {
            var ret = '';
            str = str + '';
            if (String.prototype.repeat) { // es6 repeat
                ret = str.repeat(padLen);
            } else {
                ret = new Array(n + 1).join(str);
            }
            return ret;
        },

        // padding string by char
        padChar: function (target, char, distLen, isBack) {
            var dist = target + '';
            var deltaLen = distLen - dist.length;
            char = char + '' || '0';

            // too long needn't padding :D
            if (dist.length >= distLen) return dist;

            // es6 pad;
            if (String.prototype.padStart) {
                return target[isBack ? 'padEnd' : 'padStart'](deltaLen, char);
            }

            var repeat = utils.repeat(char, deltaLen);

            if (isBack) {
                dist = dist + repeat;
            } else {
                dist = repeat + dist;
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
                        return utiles.padChar(date[k], '0', match.length);
                    }
                );
            }

            return scheme;
        }
    };
 
    return utils;
}));