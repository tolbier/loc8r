var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var responseService =  require('../services/response.service');
var usersAuthService =  require('../services/usersAuth.service');



/* POST a new review, providing a locationid */
/* /api/locations/:locationid/reviews */
module.exports.reviewsCreate = function(req, res) {
  usersAuthService.getUserName(req, res,function(req, res, userName) {
    if (req.params.locationid) {
      Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec(
          function(err, location) {
            if (err) {
              responseService.sendJSONresponse(res, 400, err);
            } else {
              doAddReview(req, res, location, userName);
            }
          }
        );
    } else {
      responseService.sendJSONresponse(res, 404, {
        "message": "Not found, locationid required"
      });
    }
  });
};


var doAddReview = function(req, res, location, author) {
  if (!location) {
    responseService.sendJSONresponse(res, 404, "locationid not found");
  } else {
    location.reviews.push({
      author: author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location) {
      var thisReview;
      if (err) {
        responseService.sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        responseService.sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(locationid) {
  console.log("Update rating average for", locationid);
  Loc
    .findById(locationid)
    .select('reviews')
    .exec(
      function(err, location) {
        if (!err) {
          doSetAverageRating(location);
        }
      });
};

var doSetAverageRating = function(location) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (location.reviews && location.reviews.length > 0) {
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

module.exports.reviewsUpdateOne = function(req, res) {
  if (!req.params.locationid || !req.params.reviewid) {
    responseService.sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec(
      function(err, location) {
        var thisReview;
        if (!location) {
          responseService.sendJSONresponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          responseService.sendJSONresponse(res, 400, err);
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          thisReview = location.reviews.id(req.params.reviewid);
          if (!thisReview) {
            responseService.sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            location.save(function(err, location) {
              if (err) {
                responseService.sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(location._id);
                responseService.sendJSONresponse(res, 200, thisReview);
              }
            });
          }
        } else {
          responseService.sendJSONresponse(res, 404, {
            "message": "No review to update"
          });
        }
      }
    );
};

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location) {
          console.log(location);
          var response, review;
          if (!location) {
            responseService.sendJSONresponse(res, 404, {
              "message": "locationid not found"
            });
            return;
          } else if (err) {
            responseService.sendJSONresponse(res, 400, err);
            return;
          }
          if (location.reviews && location.reviews.length > 0) {
            review = location.reviews.id(req.params.reviewid);
            if (!review) {
              responseService.sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                location: {
                  name: location.name,
                  id: req.params.locationid
                },
                review: review
              };
              responseService.sendJSONresponse(res, 200, response);
            }
          } else {
            responseService.sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
      );
  } else {
    responseService.sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
  }
};

// app.delete('/api/locations/:locationid/reviews/:reviewid'
module.exports.reviewsDeleteOne = function(req, res) {

    usersAuthService.isRoleAdmin(req, res, function(req, res) {
      if (!req.params.locationid || !req.params.reviewid) {
        responseService.sendJSONresponse(res, 404, {
          "message": "Not found, locationid and reviewid are both required"
        });
        return;
      }
      Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec(
          function(err, location) {
            if (!location) {
              responseService.sendJSONresponse(res, 404, {
                "message": "locationid not found"
              });
              return;
            } else if (err) {
              responseService.sendJSONresponse(res, 400, err);
              return;
            }
            if (location.reviews && location.reviews.length > 0) {
              if (!location.reviews.id(req.params.reviewid)) {
                responseService.sendJSONresponse(res, 404, {
                  "message": "reviewid not found"
                });
              } else {
                location.reviews.id(req.params.reviewid).remove();
                location.save(function(err) {
                  if (err) {
                    responseService.sendJSONresponse(res, 404, err);
                  } else {
                    updateAverageRating(location._id);
                    responseService.sendJSONresponse(res, 204, null);
                  }
                });
              }
            } else {
              responseService.sendJSONresponse(res, 404, {
                "message": "No review to delete"
              });
            }
          }
        );
    });
  
  
};
