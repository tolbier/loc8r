var mongoose = require('mongoose');
var User = mongoose.model('User');
var responseService =  require('./response.service');

module.exports.getUser = function(req, res, callback) {
  if (req.payload && req.payload.email) {
    User
      .findOne({
        email: req.payload.email
      })
      .exec(function(err, user) {
        if (!user) {
          responseService.sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          responseService.sendJSONresponse(res, 404, err);
          return;
        }
        callback(req, res, user);
      });
  } else {
    responseService.sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};
module.exports.getUserName = function(req, res, user,callback) {

        callback(req, res, user.name);
};
module.exports.isRoleAdmin = function(req, res, user,callback) {
 
        if (user.role != 'admin') {
          responseService.sendJSONresponse(res, 404, {
            "message": "User has no Admin Role"
          });
          return;
        }
        callback(req, res);
}
