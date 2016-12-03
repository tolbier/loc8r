db.locations.drop();
db.locations.insertMany([ 
  {
      "name" : "St4rcups",
      "address" : "125 High Street, Reading, RG6 1PS",
      "rating" : 3.0,
      "facilities" : [ "Hot drinks", "Food", "Premium wifi" ],
      "coords" : [ -0.9690884, 51.455041 ],
      "openingTimes" : [ {
        "days" : "Monday - Friday",
        "opening" : "7:00am",
        "closing" : "7:00pm",
        "closed" : false
      }, {
        "days" : "Saturday",
        "opening" : "8:00am",
        "closing" : "5:00pm",
        "closed" : false
      }, {
        "days" : "Sunday",
        "closed" : true
      } ],
      "reviews" : [
          {
            "author" : "S1mon Holmes",
            "_id" : ObjectId(),
            "rating" : 5.0,
            "timestamp" : {
              "date" : "2013-07-15T22:00:00.000Z"
            },
            "reviewText" : "What a great place. I can't say enough good things about it."
          },
          {
            "author" : "Charlie Chaplin",
            "_id" : ObjectId(),
            "rating" : 3.0,
            "timestamp" : new Date("Jul 16, 2013"),
            "reviewText" : "It was okay. Coffee wasn't great, but the wifi was fast."
          } ]
    } ,
    {
      name: 'Cafe Hero',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 4.0,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      "coords" : [ -0.9690884, 51.455041 ],
      "openingTimes" : [ {
        "days" : "Monday - Friday",
        "opening" : "7:00am",
        "closing" : "7:00pm",
        "closed" : false
      }, {
        "days" : "Saturday",
        "opening" : "8:00am",
        "closing" : "5:00pm",
        "closed" : false
      }, {
        "days" : "Sunday",
        "closed" : true
      } ],
      "reviews" : [
          {
            "author" : "Simon Holmes",
            "_id" : ObjectId(),
            "rating" : 5.0,
            "timestamp" : {
              "date" : "2013-07-15T22:00:00.000Z"
            },
            "reviewText" : "What a great place. I can't say enough good things about it."
          },
          {
            "author" : "Charlie Chaplin",
            "_id" : ObjectId(),
            "rating" : 3.0,
            "timestamp" : new Date("Jul 16, 2013"),
            "reviewText" : "It was okay. Coffee wasn't great, but the wifi was fast."
          } ]
    } ,    
    {
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 2.0,
      facilities: ['Food', 'Premium wifi'],
      "coords" : [ -0.9690884, 51.455041 ],
      "openingTimes" : [ {
        "days" : "Monday - Friday",
        "opening" : "7:00am",
        "closing" : "7:00pm",
        "closed" : false
      }, {
        "days" : "Saturday",
        "opening" : "8:00am",
        "closing" : "5:00pm",
        "closed" : false
      }, {
        "days" : "Sunday",
        "closed" : true
      } ],
      "reviews" : [
          {
            "author" : "Simon Holmes",
            "_id" : ObjectId(),
            "rating" : 5.0,
            "timestamp" : {
              "date" : "2013-07-15T22:00:00.000Z"
            },
            "reviewText" : "What a great place. I can't say enough good things about it."
          },
          {
            "author" : "Charlie Chaplin",
            "_id" : ObjectId(),
            "rating" : 3.0,
            "timestamp" : new Date("Jul 16, 2013"),
            "reviewText" : "It was okay. Coffee wasn't great, but the wifi was fast."
          } ]
    }     
    ]);


