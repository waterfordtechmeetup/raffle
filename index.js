var raffle = require('raffle');
var express = require('express');
var path = require('path');

var app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/draw', function(req, res) {
  var settings = {
    key: process.env.KEY,
    event_id: process.env.EVENT_ID
  };

  raffle(settings, function(winner) {
    console.log(winner);
    return res.json(winner);
  });
});


if (!process.env.MEETUP_KEY || !process.env.MEETUP_EVENT_ID) {
  console.error('MEETUP_KEY or MEETUP_EVENT_ID env vars not set');
  process.exit(-1);
}

app.listen(8000, function() {
  console.log('Listening on 8000');
});