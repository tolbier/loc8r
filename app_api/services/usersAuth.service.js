var mongoose = require('mongoose');
var User = mongoose.model('User');
var responseService =  require('./response.service');

User.test();
var getUser = function(req, res, callback) {
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
var getUserName = function(req, res, callback) {
  getUser(req,res,function(req,res,user){  
        callback(req, res, user.name);
  });
};
var isRoleAdmin = function(req, res,callback) {
  getUser(req,res,function(req,res,user){  
      if (user.role != 'admin') {
        responseService.sendJSONresponse(res, 404, {
          "message": "User has no Admin Role"
        });
        return;
      }
      callback(req, res);
  });
}

module.exports = {
  isRoleAdmin: isRoleAdmin,
  getUser: getUser,
  getUserName:getUserName,
}