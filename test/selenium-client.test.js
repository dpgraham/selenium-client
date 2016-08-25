var Session = require('../src/selenium-client');
var assert = require('assert');

describe('when using client', function(){

    it('should be able to open a new session and then close it', function(done){
        var session = new Session('localhost', '4444', 'firefox');

        var onDone = session.close(function(){
            console.log('closed session');
            done();
        });

        session.create(function(){
            session.navigateTo('http://www.google.com', function(){
                session.getTitle(function(title){
                    assert.equal(title, 'Google');

                    session.findElementByCSS('input[type=text]', function(elementId){
                        session.inputElement(elementId, 'foo', function(){
                            console.log("Done inputting!");
                            onDone();
                        });
                    });
                });
            });
        });
    });

});