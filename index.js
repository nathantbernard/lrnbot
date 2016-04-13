 var _ = require('lomath');
 var express = require('express');
 var app = express();
 var morgan = require('morgan');
 var ejs = require('ejs');
 var bodyParser = require('body-parser');
 var multer = require('multer');

 var bot = require(__dirname + '/bot.js');
 var token = '212731053:AAHcv-Nlg52LCVqr-TAGKMEodl2NWM073Og';
 var webhookUrl = 'https://rocky-headland-41075.herokuapp.com/'
 var bot1 = new bot(process.env.TOKEN || token, process.env.WEBHOOK || webhookUrl);


 app.engine('.html', ejs.__express);
 app.set('view engine', 'html');
 app.set('port', process.env.PORT || 8443);
 app.use(morgan('combined'));
 app.use(express.static(__dirname + '/views'));

 app.use(bodyParser.json());
 app.use(multer());

 app.route('/')
     .get(function(req, res) {
          console.log("you GET")
         res.render('index')
     })
     .post(function(req, res) {
         res.json('okay, received\n');
         bot1.handle(req, res)
     })
     .put(function(req, res) {
         res.send("you just called PUT\n")
     })

 app.listen(app.get('port'), function() {
     console.log('Node app is running on port', app.get('port'));
 });
