var mongoose = require('mongoose'),
  userSchema = mongoose.Schema({
    userName : String,
    firstName : String,
    lastName : String,
    date : Date,
    data : {},
    tags : [String]
  });

module.exports = mongoose.model('User', userSchema);

