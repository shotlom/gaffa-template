var userService = require('../services/user'),
    applicationService = require('../services/application'),
    requestData = require('request-data'),
    beeline = require('beeline'),
    generateKey = require('../../generateKey');

var apiRoutes = beeline.route({
      '/api/users' : {
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
      }
    });

module.exports = function(routes){
  routes['/api/`path...`'] = function(request,response){
    console.log(request.headers.authentication);

    var auth = request.headers.authentication;
    if (! auth ){
      response.retort.unauthorised(new Error('You need a key to access this API') );
      return;
    }

    var authParts = auth.split(' '); 
    var applicationID = authParts[0];
    var authKey = authParts[1];

    //go get from db and secret = kittens
    applicationService.getApplicationSecret(applicationID, function(error,secret){
      if (error){
        response.retort.error(error); /// probably want to have a logger in plase which logs the error but also returns a safe error to user
        return;
      }

      var authHash = generateKey(secret);

      if ( authKey !== authHash ){
      // request.headers.authentication || request.headers.authentication !== '123' ){
        response.retort.unauthorised(new Error('You need a key to access this API') );
        return;
      }
      
      apiRoutes(request,response);

    });
  }  
};
