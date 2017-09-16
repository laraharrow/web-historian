var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var defaultHeaders = httpHelpers.headers;

var indexHandler = function(req, res) {
  fs.readFile(path.join(__dirname, './public/index.html'), function read(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, defaultHeaders);
      res.end(data);
    }
  });
};

var cssHandler = function(req, res) {
  fs.readFile(path.join(__dirname, './public/styles.css'), function read(err, data) {
    if (err) {
      console.log(err);
    } else {
      var headers = defaultHeaders;
      headers['Content-Type'] = 'text/css';
      res.writeHead(200, headers);
      res.end(data);
    }
  });
};


exports.handleRequest = function (req, res) {
  console.log('url', req.url);
  
  //this is GET request for Index.html
  if (req.url === '/') {
    indexHandler(req, res);
  } else if (req.url === '/public/styles.css') {
    cssHandler(req, res);
  } else if (req.url === '/favicon.ico' || req.url === '/styles.css') {

  } else {
    console.log('url', req.url);
    var givenUrl = req.url.split('?').splice(-1)[0];
    
    var finalResponse = function(webpage) {
      fs.readFile(path.join(__dirname, webpage), function read(err, data) {
        if (err) {
          console.log(err);
        } else {
          var headers = defaultHeaders;
          headers['Content-Type'] = 'text/html';
          res.writeHead(200, headers);
          res.write(data);
          res.end();
        }
      });
    };
    
    archive.isUrlInList(givenUrl, finalResponse);
  }
};
