// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//api endpoint to convert normal date to unix or convert unix time to normal date
app.get("/api/:date", function (req, res) {
  var date = req.params.date;
  //Check if date is normal date or unix date
  //Check if normal date is valid, if not say invalid

  if(!isNaN(date)){
    var dateString = moment.unix(1451001600000).utc();
    res.json({
      unix:date,
      utc:dateString
    });
  } else if(moment(date).isValid()){
    var tmsx = moment(date).format("X");
    res.json({
      unix:tmsx,
      utc:date
    });
  } else {
    res.json('Date is not valide');
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
