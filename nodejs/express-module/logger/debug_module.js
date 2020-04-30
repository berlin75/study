var debug = require('debug');
var appDebug = debug('app');
var apiDebug = debug('api');    
appDebug('hello');
apiDebug('hello');
// set DEBUG=app & node debug_module.js
// set DEBUG=api & node debug_module.js
// set DEBUG=app,api & node debug_module.js
// set DEBUG=a* & node debug_module.js