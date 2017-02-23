'use strict';

var express = require('express');
var nunjucks = require('nunjucks');
var _ = require('lodash');
var app = express();

var PORT = process.env.PORT || 3000;
var IP = process.env.IP || '127.0.0.1';

nunjucks.configure('stories', {
    autoescape: true,
    express: app
});

var context = require('./lib/misc.js').getPOS(__dirname, 'pos');

// When no template is specified, choose one randomly
app.get('/', function(req, res) {
  var allLayouts = require('./lib/misc.js').requireLayout(__dirname, 'stories');
  res.render(_.sample(allLayouts), context);
});

app.get('/favicon.ico', function (req, res) {
  // Ignore favicon.
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
  return;
});

// Route to a particular template if one is specified
app.get('/:template', function(req, res) {
  res.render(req.params.template, context);
});


var server = app.listen(PORT, function () {
  console.log('Example app listening at http://%s:%s', IP, PORT);
});
