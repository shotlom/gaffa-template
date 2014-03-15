var userService = require('../services/user'),
    requestData = require('request-data');

module.exports = function(routes){
  routes['/api/users'] = {
    GET: function(request, response){
      userService.getUsers(function(error,users){
        if (error) {
          response.retort.error(error);
          return;
        }
        response.retort.ok(users);
      });
    },
    POST: requestData( function(request, response, userData){
      userService.createUser(userData, function(error,user){
        if (error) {
          response.retort.error(error);
          return;
        }
        response.retort.ok(user);
        //response.retort.ok({id:user.id});
      });
    })
  };
};
