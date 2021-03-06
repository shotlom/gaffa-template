var mongoose = require('mongoose'),
    config = require('../config'),
    dbObject = {};


mongoose.connection.on('error',function(error){
  console.log(error);
});

dbObject.connection = mongoose.connect(config.mongooseConnection)

dbObject.User = require('./schemas/user');


dbObject.Application = require('./schemas/application');


module.exports = dbObject;

