var db = require('../../database');

function getUsers(callback){
  db.User.find({},callback);
};

function createUser(userData,callback){
  var newUser = new db.User(userData);
  newUser.save(callback);
};

module.exports = {
    getUsers:getUsers,
    createUser:createUser
};