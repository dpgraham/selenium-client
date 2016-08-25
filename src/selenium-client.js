var request = require('request');

var SeleniumClient = function(hostname, port, browserName){
    this.hostname = hostname || 'localhost';
    this.port = port || '4444';
    this.url = 'http://' + this.hostname + ':' + this.port + '/wd/hub/session';
    this.browserName = browserName || 'firefox';
};

/**
 * Opens a new session
 * @param onSuccess {function}
 * @param onFailure {function}
 */
SeleniumClient.prototype.create = function(onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    var formData = {"desiredCapabilities": {"browserName": this.browserName}};
    console.log('Opening session', this.url, formData);

    var ctx = this;
    request.post(this.url, {form: JSON.stringify(formData)}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            ctx.sessionId = data.sessionId;
            console.log('Opened session', data.sessionId);
            onSuccess();
        } else {
            onFailure();
        }
    });
};

/**
 * Ends the session
 * @param onSuccess {function}
 * @param onFailure {function}
 */
SeleniumClient.prototype.close = function(onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    console.log('Closing session', this.sessionId);

    var ctx = this;
    request.delete(this.url + '/' + this.sessionId, function(error, response, body){
        if (!error && response.statusCode == 200) {
            console.log('Closed the session', ctx.sessionId);
            onSuccess();
        } else {
            onFailure();
        }
    });
};

/**
 * Navigates the session to a url
 * @param url {String} The URL to navigate to
 * @param onSuccess {function}
 * @param onFailure {function}
 */
SeleniumClient.prototype.navigateTo = function(url, onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    var formData = {"url": url};
    console.log('Navigating to', url, formData, this.url + '/' + this.sessionId + '/' + url);

    request.post(this.url + '/' + this.sessionId + '/url', {form: JSON.stringify(formData)}, function(error, response, body){
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            console.log('Navigated to', url);
            onSuccess();
        } else {
            onFailure();
        }
    })
};




module.exports = SeleniumClient;