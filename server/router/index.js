var beeline = require('beeline'),
    routes = {};

require('./pageRoutes')(routes);
require('./apiRoutes')(routes);
require('./staticRoutes')(routes); //need to do this last

module.exports = beeline.route(routes);