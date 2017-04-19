var raffle = require('raffle');
var express = require('express');
var path = require('path');
var meetup = require('meetup-api')({
  key: process.env.MEETUP_KEY
});

var app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/draw', function(req, res) {

  meetup.getEvents({
    group_urlname: 'Waterford-Tech-Meetup'
  }, function(err, resp) {
    if (err) {
      console.error('Error:', resp);
      return res.status(500).send('Error fetching events');
    }

    if (resp.results && resp.results.length === 0) {
      console.error('No event scheduled, aborting', resp);
      return res.status(500).send('No events');
    }

    var eventId = resp.results[0].id;

    var settings = {
      key: process.env.MEETUP_KEY,
      event_id: eventId
    };

    raffle(settings, function(winner) {
      console.log(winner);
      return res.json(winner);
    });

  });
});

if (!process.env.MEETUP_KEY) {
  console.error('MEETUP_KEY env var not set');
  process.exit(-1);
}

meetup.getEvents({
  group_urlname: 'Waterford-Tech-Meetup'
}, function(err, resp) {
  console.log(err, resp);
});

app.listen(8001, function() {
  console.log('Listening on 8001');
});