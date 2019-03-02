const assert = require('assert');
const utils = require('../index');

describe('Utils', function () {
    describe('#repeat', function () {
        it("should return '0000' when repeat string is '0' and repeat times is 4", function () {
            assert.equal('0000', utils.repeat('0', 4));
        });
        
        it("should return '123412341234' when repeat string is '1234' and repeat times is 3", function () {
            assert.equal('123412341234', utils.repeat('1234', 3));
        });

        it("should return '' when repeat string is any stirng and repeat times is 0", function () {
            assert.equal('', utils.repeat(Math.random() + '', 0));
        });
        
        it("should return '' when repeat string is '' and repeat times is any numbers", function () {
            assert.equal('', utils.repeat('', Math.round(Math.random() * 100)));
        });
    });

    describe('#pad', function () {
        it("should return 0001 when target is 1 and padStr is 0 and distLen is 4", function () {
            assert.equal('0001', utils.pad(1, 0, 4));
        });
        
        it("should return '0123456abc' when target is 'abc' and padStr is '0123456789' and distLen is 10", function () {
            assert.equal('0123456abc', utils.pad('abc', '0123456789', 10));
        });
        
        it("should return 'abc0123456' when target is 'abc' and padStr is '0123456789' and distLen is 10 and isBack is true", function () {
            assert.equal('abc0123456', utils.pad('abc', '0123456789', 10, true));
        });
    });
    
    describe('#formatTime', function () {
        it("should return '2019-03-02' when stmp is 1551511567458 and scheme is 'YYYY-MM-DD'", function () {
            assert.equal('2019-03-02', utils.formatTime(1551511567458, 'YYYY-MM-DD'));
        });

        it("should return '2019-03-02' when stmp is new Date(1551511567458) and scheme is 'YYYY-MM-DD'", function () {
            assert.equal('2019-03-02', utils.formatTime(new Date(1551511567458), 'YYYY-MM-DD'));
        });
        
        it("should return '2019-03-02 15:26:07' when stmp is 1551511567458 and scheme is 'YYYY-MM-DD hh:mm:ss'", function () {
            assert.equal('2019-03-02 15:26:07', utils.formatTime(1551511567458, 'YYYY-MM-DD hh:mm:ss'));
        });
        
        it("should return '2019-3-2 15:26:7' when stmp is 1551511567458 and scheme is 'YYYY-M-D hh:mm:ss'", function () {
            assert.equal('2019-3-2 15:26:7', utils.formatTime(1551511567458, 'YYYY-M-D h:m:s'));
        });
        
        it("should return '20190302 15:26:07' when stmp is 1551511567458 and scheme is 'YYYY-M-D hh:mm:ss'", function () {
            assert.equal('20190302 15:26:07', utils.formatTime(1551511567458, 'YYYYMMDD hh:mm:ss'));
        });
    });
    
});