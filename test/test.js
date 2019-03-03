const { assert } = require('chai');
const utils = require('../index');

describe('Utils', function () {
    describe('#repeat', function () {
        it("should return '0000' when repeat string is '0' and repeat times is 4", function () {
            assert.strictEqual('0000', utils.repeat('0', 4));
        });
        
        it("should return '123412341234' when repeat string is '1234' and repeat times is 3", function () {
            assert.strictEqual('123412341234', utils.repeat('1234', 3));
        });

        it("should return '' when repeat string is any stirng and repeat times is 0", function () {
            assert.strictEqual('', utils.repeat(Math.random() + '', 0));
        });
        
        it("should return '' when repeat string is '' and repeat times is any numbers", function () {
            assert.strictEqual('', utils.repeat('', Math.round(Math.random() * 100)));
        });

        it("", function () {
            assert.strictEqual('0000', utils.repeat('0', 4));
        });
    });

    describe('#pad', function () {
        it("should return 0001 when target is 1 and padStr is 0 and distLen is 4", function () {
            assert.strictEqual('0001', utils.pad(1, 0, 4));
        });
        
        it("should return '0123456abc' when target is 'abc' and padStr is '0123456789' and distLen is 10", function () {
            assert.strictEqual('0123456abc', utils.pad('abc', '0123456789', 10));
        });
        
        it("should return 'abc0123456' when target is 'abc' and padStr is '0123456789' and distLen is 10 and isBack is true", function () {
            assert.strictEqual('abc0123456', utils.pad('abc', '0123456789', 10, true));
        });
    });
    
    describe('#formatTime', function () {
        it("should return '2019-03-02' when stmp is 1551511567458 and scheme is 'YYYY-MM-DD'", function () {
            assert.strictEqual('2019-03-02', utils.formatTime(1551511567458, 'YYYY-MM-DD'));
        });

        it("should return '2019-03-02' when stmp is new Date(1551511567458) and scheme is 'YYYY-MM-DD'", function () {
            assert.strictEqual('2019-03-02', utils.formatTime(new Date(1551511567458), 'YYYY-MM-DD'));
        });
        
        it("should return '2019-03-02 15:26:07' when stmp is 1551511567458 and scheme is 'YYYY-MM-DD hh:mm:ss'", function () {
            assert.strictEqual('2019-03-02 15:26:07', utils.formatTime(1551511567458, 'YYYY-MM-DD hh:mm:ss'));
        });
        
        it("should return '2019-3-2 15:26:7' when stmp is 1551511567458 and scheme is 'YYYY-M-D hh:mm:ss'", function () {
            assert.strictEqual('2019-3-2 15:26:7', utils.formatTime(1551511567458, 'YYYY-M-D h:m:s'));
        });
        
        it("should return '20190302 15:26:07' when stmp is 1551511567458 and scheme is 'YYYY-M-D hh:mm:ss'", function () {
            assert.strictEqual('20190302 15:26:07', utils.formatTime(1551511567458, 'YYYYMMDD hh:mm:ss'));
        });
    });

    describe('#is', function () {
        it("should return true when type is 'Number' and target is 0", function () {
            assert.strictEqual(true, utils.is('Number', 0));
        });
        it("should return true when type is 'Object' and target is {}", function () {
            assert.strictEqual(true, utils.is('Object', {}));
        });
        it("should return true when type is 'Array' and target is []", function () {
            assert.strictEqual(true, utils.is('Array', []));
        });
        it("should return true when type is 'NaN' and target is NaN", function () {
            assert.strictEqual(true, utils.is('NaN', NaN));
        });
        it("should return true when type is 'Undefined' and target is undefined", function () {
            assert.strictEqual(true, utils.is('Undefined', undefined));
        });
    });


    describe('#copy', function () {
        var obj = {};
        beforeEach(function () {
            obj = {
                a: 'a',
                b: {
                    b1: 'b1',
                    b2: ['b21', 'b22', 'b23']
                },
                c: [
                    'c1',
                    { c21: 'c21', c22: 'c22'}
                ]
            };
        });
        it('should return shallow copy', function () {
            var copy = utils.copy(obj);
            assert.deepEqual(obj, copy);
            obj.b.b1 = 'bbbbbbbb';
            assert.deepEqual(obj, copy);
            obj.a = 'aaaaaaaaaaaaaaa';
            assert.notDeepEqual(obj, copy);
        });
    });

    describe('#deepCopy', function () {
        var obj = {};
        beforeEach(function () {
            obj = {
                a: 'a',
                b: {
                    b1: 'b1',
                    b2: ['b21', 'b22', 'b23']
                },
                c: [
                    'c1',
                    { c21: 'c21', c22: 'c22'}
                ]
            };
        });

        it('should return deep copy', function () {
            var copy = utils.deepCopy(obj);
            assert.deepEqual(obj, copy);
            obj.b.b1 = 'bbbbbbbb';
            assert.notDeepEqual(obj, copy);
        });
    });

    describe('#extends', function () {

        var obj = {};
        var target = {};

        beforeEach(function () {
            obj = {
                a: 'a',
                b: {
                    b1: 'b1',
                    b2: ['b21', 'b22', 'b23']
                },
                c: [
                    'c1',
                    { c21: 'c21', c22: 'c22'}
                ]
            };
            target = {
                b: {
                    b3: 'b2'
                }
            };
        });

        it("should return the deep copy when isDeep is true", function () {
            utils.extends(true, target, obj);
            obj.b.b3 = 'b2';
            assert.deepEqual(obj, target);
            obj.b.b1 = 'b111';
            obj.c[1].c21 = 'b211';
            assert.notDeepEqual(obj, target);
        });

        it("should return the shallow copy when isDeep is false or not spefic", function () {
            utils.extends(target, obj);
            assert.deepEqual(obj, target);
            obj.b.b1 = 'b111';
            obj.c[1].c21 = 'b211';
            assert.deepEqual(obj, target);
        });

        it("should return the copy when isDeep is true and pass many objs", function () {
            var obj1 = {a: {a: 'a'}, b: 'b', c: 'c'};
            var obj2 = {a: {a: 'aa'}, c: 'cc', d: 'dd'};
            utils.extends(true, target, obj1, obj2);
            obj.b.b3 = 'b2';
            assert.deepEqual({a: {a: 'aa'}, b: 'b', c: 'cc', d: 'dd'}, target);
        });
    });

    describe('#escape', function () {
        it("should replace '&<>\"`'' to &amp;&lt;&gt;&quot;&#96;&#x27;", function () {
            assert.equal('&amp;&lt;&gt;&quot;&#96;&#x27;', utils.escape('&<>"`\''));
        });
    });

    describe('#unescape', function () {
        it("should replace &amp;&lt;&gt;&quot;&#96;&#x27; to '&<>\"`''", function () {
            assert.equal('&<>"`\'', utils.unescape('&amp;&lt;&gt;&quot;&#96;&#x27;'));
        });
    });

    describe('#kvExchange', function () {
        it('should exchange the keys and value, and skip the value that is not Number and String', function () {
            var origin = {
                'a': '1',
                'b': '2',
                'c': 1,
                'd': [],
                'f': {}
            };
            var dist = {
                '2': 'b',
                1: 'c'
            };
            assert.deepEqual(dist, utils.kvExchange(origin));
        });
    });

    describe('#template', function () {
        it("should replace template by <%=%>", function () {
            var html = utils.template('<div><%=a%></div>', {a: 100});
            assert.equal('<div>100</div>', html);
        });
        it("should replace template by <%%>", function () {
            var html = utils.template('<div><%for(var i=0;i<3;i++){%><%=i%><%}%></div>');
            assert.equal('<div>012</div>', html);
        });
        it("should replace template by <%-%>", function () {
            var html = utils.template('<div><%-"&<>\\\"`\'"%></div>');
            assert.equal('<div>&amp;&lt;&gt;&quot;&#96;&#x27;</div>', html);
        });
        it('can use _print() in <%%> to echo variable', function () {
            var html = utils.template('<div><%for(var i=0;i<3;i++){_print(i);}%></div>');
            assert.equal('<div>012</div>', html);
        });
        it('can use _escape() to translate strings', function () {
            var html = utils.template('<div><%=_escape("&<>\\\"`\'")%></div>');
            assert.equal('<div>&amp;&lt;&gt;&quot;&#96;&#x27;</div>', html);
        });
    });
    
});