SELENIUM JS CLIENT
========================

[![Greenkeeper badge](https://badges.greenkeeper.io/dpgraham/selenium-client.svg)](https://greenkeeper.io/)

Requirements
=============

- Must have node.js and NPM installed
- Must install mocha to run unit tests (npm install -g mocha)
- Run npm install (npm install)
- Must have Selenium running on port 4444 localhost 


Description
==============
- Run the tests using 'npm test'
- The unit test is a mocha test that runs the selenium client and performs the operations
- 'src/selenium-client.js' contains the API, the API's all do http requests with callback

Comments
==============
- There is some repetitiveness in the code, time permitting I would clean that up
- The 'selenium-client-test.js' has a lot of nesting, that's something I would fix in the future. This
would indeed be a great candidate for Promises + Async/Await
- I lost about 30 minutes on a bug. I didn't realize that the formData had to be Stringified
- Another addition I would make, time permitting, is to be able to set the URL and port of the Selenium server