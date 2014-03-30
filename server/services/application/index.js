var db = require('../../database');

function getApplicationSecret(ID,callback){
  db.Application.findOne( { applicationID : ID }, 'secret', function( error,application){
  	if (error){
  		return callback(error);
  	}

  	if (! application){
  		return callback(new Error('No application with ID ['+ID+'] exists'));
  	}
  	
  	if (! application.secret){
  		return callback(new Error('No application secret'));
  	}

  	callback(null,application.secret);

  }); // should have anonymous function with no secret

};

module.exports = {
    getApplicationSecret:getApplicationSecret,
    
};