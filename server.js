var express = require("express");   // Express Package
var app = express();                // Create App
var portNumber = 8000;              // Port the Server will be Listening On

var months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

/*
    API Requests
    Example Request: https://spiritual-grape.glitch.me/gettime/1451606400
      Parameter can be a unix time (1451606400)
      Or a Natural time (January 1, 2016)
*/
app.get("/gettime/:param", function(req, res){
  var param = req.params.param;   // The Request Parameter
  var dt = new Date();            // Create a new Date Object
  var dtc = dt;                   // Create a Control Date Object
  var resPac = {                  // The Response Package in JSON Form
    unixtime: null,               // The Unix Time
    naturaltime: null             // The Natural Time
  };

  // If the Parameter is made of only Numbers
  if(/^[0-9]*$/.test(param)){
    if(param.length === 10) param = param + "000";    // Extend Short Timestamps
    dt = new Date(parseInt(param));                   // Create a new Date
  } else {
    var milis = Date.parse(param);        // Try Convert String to unix Timestamp
    if(milis === NaN){                    // If it Fails, do Nothing
    } else {                              // Otherwise
      dt = new Date(milis);               // Use it to Create a new Date
    }
  }

  /*
      If The Date Object is Still Equal to the Control Date Object,
      or Somehow Became an Unusable Date There was a Problem with
      the Request Parameter
  */
  if(dt === dtc || dt.toString() === "Invalid Date"){
    // Response Code 500 and Return the Default JSON Package
    res.status(500).send(resPac);
  } else {
    // Update the Response Package with Values from the new Date Object
    resPac.unixtime = dt.getTime();
    resPac.naturaltime = months[dt.getMonth()] + " " + dt.getDate()
                           + ", " + dt.getFullYear();

    // Response Code 200 and Return the Updated JSON Package
    res.status(200).send(resPac);
  }
});

app.listen(portNumber, function(){
  console.log("Server Listening on Port: " + portNumber);
});
