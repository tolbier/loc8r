var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var responseService =  require('../services/response.service');

module.exports.register = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        responseService.sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.role = 'user';
    user.save(function(err) {
        var token;
        if (err) {
            responseService.sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            responseService.sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};

module.exports.login = function(req, res) {
    if (!req.body.email || !req.body.password) {
        responseService.sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info) {
        var token;
        if (err) {
            responseService.sendJSONresponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            responseService.sendJSONresponse(res, 200, {
                "token": token
            });
        } else {
            responseService.sendJSONresponse(res, 401, info);
        }
    })(req, res);
};
