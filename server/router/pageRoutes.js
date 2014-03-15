var addGaffaPageRoute = require('./addGaffaPageRoute');

module.exports = function(routes){
    addGaffaPageRoute(routes, "/users", 'users');
    addGaffaPageRoute(routes, "/things", 'things');
    addGaffaPageRoute(routes, "/", 'home');
};