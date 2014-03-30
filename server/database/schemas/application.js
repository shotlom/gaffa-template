var mongoose = require('mongoose'),
  applicationSchema = mongoose.Schema({
    secret : String,
    applicationID : String,
    date : Date
  });

module.exports = mongoose.model('Application', applicationSchema);

