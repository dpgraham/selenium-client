var Session = require('../src/session');

describe('when using client', function(){

    it('should be able to open a new session', function(done){
        var session = new Session('localhost', '4444', 'firefox');
        session.create(function(){
            console.log(session.sessionId);
            done();
        });
    });

});