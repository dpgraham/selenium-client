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

/**
 * Gets the title of the current session
 * @param onSuccess
 * @param onFailure
 */
SeleniumClient.prototype.getTitle = function(onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    console.log('Getting the title');
    request.get(this.url + '/' + this.sessionId + '/title', function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            onSuccess(data.value);
        } else {
            onFailure();
        }
    });

};

/**
 * Get an element by the CSS selector and returns it's element ID
 * @param selector {string}
 * @param onSuccess
 * @param onFailure
 */
SeleniumClient.prototype.findElementByCSS = function(selector, onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    var formData = {"using": "css selector", "value": selector};
    console.log("Finding", selector);


    request.post(this.url + '/' + this.sessionId + '/element', {form: JSON.stringify(formData)}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            onSuccess(data.value.ELEMENT);
        } else {
            onFailure();
        }
    });

};


/**
 * Adds characters to an element
 * @param elementId
 * @param value
 * @param onSuccess
 * @param onFailure
 */
SeleniumClient.prototype.inputElement = function(elementId, value, onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    console.log("Inputting into element", elementId, "value", value);

    var url = this.url + '/' + this.sessionId + '/element/' + elementId + '/value';
    var formData = {"value": value.split('')};

    request.post(url, {form: JSON.stringify(formData)}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            onSuccess();
        } else {
            onFailure();
        }
    });

};

/**
 * Click on an element at the given ID
 * @param elementId
 * @param onSuccess
 * @param onFailure
 */
SeleniumClient.prototype.clickElement = function(elementId, onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    console.log("Clicking", elementId);

    var url = this.url + '/' + this.sessionId + '/element/' + elementId + '/click';

    request.post(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            onSuccess();
        } else {
            onFailure();
        }
    });
};

/**
 * Get text of an element
 * @param elementId
 * @param onSuccess
 * @param onFailure
 */
SeleniumClient.prototype.getText = function(elementId, onSuccess, onFailure){
    onSuccess = onSuccess || function(){};
    onFailure = onFailure || function(){};

    var url = this.url + '/' + this.sessionId + '/element/' + elementId + '/text';

    console.log("Getting text for", elementId, url);

    request.get(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            onSuccess(data.value);
        } else {
            onFailure();
        }
    });
};




module.exports = SeleniumClient;