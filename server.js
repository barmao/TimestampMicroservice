// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
    //If is valid date, convert to unix
    console.log('Date Valid');

    const convertedDate = new Date(date);

    res.json({
      unix:date,
      utc:convertedDate.toUTCString
    });

  } 
  
  
  // else if(){
  //   //If is unix value, convert to normal date
  //   console.log('Date Valid Is Not Valid');
  //   res.json({
  //     unix:'ppppp',
  //     utc:'kkkkkk'
  //   });
  // } 
  
  else {
    console.log('Date Valid Is Not Valid');
    res.json({
      unix:'ppppp',
      utc:'kkkkkk'
    });
  }

  //res.json({greeting: 'hello API ' + date});
});

var checkIfDateIsValid = function isDate(dateStr) {
  return !isNaN(new Date(dateStr).getDate());
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
