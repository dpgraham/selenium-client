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
        };

        var onFail = function(){
            session.close(function () {
                console.log('closed session');
                assert.equal('An API error occurred', true, false);
            });
        };

        session.create(function(){
            session.navigateTo('http://www.google.com', function(){
                session.getTitle(function(title){
                    assert.equal(title, 'Google');

                    session.findElementByCSS('input[type=text]', function(inputElId){
                        session.inputElement(inputElId, 'foo', function(){
                            session.findElementByCSS('button', function(submitElId){
                                session.clickElement(submitElId, function(){
                                    setTimeout(function(){
                                        console.log('finding div.srg');
                                        session.findElementByCSS('div.srg', function(searchResultsID){
                                            session.getText(searchResultsID, function(text){
                                                assert.equal(text.indexOf('foo') >= 0, true);
                                                onDone();
                                            }, onFail);
                                        }, function(){ console.log('didnt find it')});
                                    }, 3000);
                                }, onFail);
                            }, onFail);
                        }, onFail);
                    }, onFail);
                }, onFail);
            }, onFail);
        }, onFail);
    });

});