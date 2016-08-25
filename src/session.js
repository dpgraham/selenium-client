var request = require('request');

var Session = function(hostname, port, browserName){
    this.hostname = hostname || 'localhost';
    this.port = port || '4444';
    this.url = 'http://' + this.hostname + ':' + this.port + '/wd/hub/session';
    this.browserName = browserName || 'firefox';
};

Session.prototype.create = function(onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    var formData = {"desiredCapabilities": {"browserName": this.browserName}};
    console.log('Opening session', this.url, formData);

    var ctx = this;
    request.post(this.url, {form: JSON.stringify(formData)}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            ctx.sessionId = data.sessionId;
            onSuccess();
        } else {
            onFailure();
        }
    });

};


module.exports = Session;