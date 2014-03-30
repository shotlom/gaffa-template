module.exports = function createKey(secretKey){
  var crypto = require('crypto'),
    sha256 = crypto.createHash('sha256'),
    now = new Date(),
    pad = function(value) {
      value = value + '';
      return value.length < 2 ? '0' + value : value;
    };

  sha256.update('' + now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + secretKey, 'utf8');
  //console.log(sha256.digest('hex'));
  return sha256.digest('hex');
};