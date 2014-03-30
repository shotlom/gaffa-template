var addGaffaPageRoute = require('./addGaffaPageRoute'),
    generateKey = require('../../generateKey');

module.exports = function(routes){
    addGaffaPageRoute(routes, "/users", 'users');
    addGaffaPageRoute(routes, "/things", 'things');
    addGaffaPageRoute(routes, "/", 'home');
    routes['/getapikey'] = function(request,response){
    	var authHash = generateKey('kittens');
    	response.retort.ok({apikey: 'demo ' + authHash});
    };
};

//get my apiRoute 