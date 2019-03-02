const assert = require('assert');
const utils = require('../index');

describe('Utils', function () {
    describe('#repeat', function () {

        describe('with ES6 String.prototype.repeat', function () {
            it('should return \'0000\' when repeat string is \'0\' and repeat times is 4', function () {
                assert.equal('0000', utils.repeat('0', 4));
            });
            
            it('should return \'123412341234\' when repeat string is \'1234\' and repeat times is 3', function () {
                assert.equal('123412341234', utils.repeat('1234', 3));
            });
    
            it('should return \'\' when repeat string is any stirng and repeat times is 0', function () {
                assert.equal('', utils.repeat(Math.random() + '', 0));
            });
            
            it('should return \'\' when repeat string is \'\' and repeat times is any numbers', function () {
                assert.equal('', utils.repeat('', Math.round(Math.random() * 100)));
            });
        });

        describe('without es6 String.prototype.repeat', function () {

            // remove es6 repeat temporary
            const es6Repeat = String.prototype.repeat;
            String.prototype.repeat = undefined;
    
            it('should return \'0000\' when repeat string is \'0\' and repeat times is 4', function () {
                assert.equal('0000', utils.repeat('0', 4));
            });
            
            it('should return \'123412341234\' when repeat string is \'1234\' and repeat times is 3', function () {
                assert.equal('123412341234', utils.repeat('1234', 3));
            });
    
            it('should return \'\' when repeat string is any stirng and repeat times is 0', function () {
                assert.equal('', utils.repeat(Math.random() + '', 0));
            });
            
            it('should return \'\' when repeat string is \'\' and repeat times is any numbers', function () {
                assert.equal('', utils.repeat('', Math.round(Math.random() * 100)));
            });
    
            String.prototype.repeat = es6Repeat;
        });

    });
    
});