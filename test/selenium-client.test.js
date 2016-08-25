var Session = require('../src/selenium-client');

describe('when using client', function(){

    it('should be able to open a new session and then close it', function(done){
        var session = new Session('localhost', '4444', 'firefox');

        session.create(function(){
            session.navigateTo('http://www.google.com', function(){
                session.close(function(){
                    console.log('closed session');
                    done();
                });
            });
        });
    });

});