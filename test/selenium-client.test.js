var Session = require('../src/selenium-client');
var assert = require('assert');

describe('when using client', function(){

    it('should be able to open a new session and then close it', function(done){
        var session = new Session('localhost', '4444', 'firefox');

        var onDone = function() {
            session.close(function () {
                console.log('closed session');
                done();
            });
        }

        session.create(function(){
            session.navigateTo('http://www.google.com', function(){
                session.getTitle(function(title){
                    assert.equal(title, 'Google');

                    session.findElementByCSS('input[type=text]', function(inputElId){
                        session.inputElement(inputElId, 'foo', function(){
                            session.findElementByCSS('button', function(submitElId){
                                session.clickElement(submitElId, function(){
                                    onDone();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});