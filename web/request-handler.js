var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var defaultHeaders = httpHelpers.headers;
var querystring = ('querystring');

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
  
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
      var reqUrl = body.split('=')[1];
      archive.addUrlToList(reqUrl, function() {
        res.writeHead(302, defaultHeaders);
        res.end();
      });
    });

  }

  //this is GET request for Index.html
  if (req.method === 'GET') {
    if (req.url === '/') {
      indexHandler(req, res);
    } else if (req.url === '/public/styles.css') {
      cssHandler(req, res);
    } else if (req.url === '/favicon.ico' || req.url === '/styles.css') {

    } else {
      var urlArr = req.url.split('.');
      var urlPath = '/' + urlArr[1] + '/';
      fs.readFile(archive.paths.archivedSites + req.url, function read(err, data) {
        if (err) {
          res.writeHead(404, defaultHeaders);
          res.end();
        } else {
          res.writeHead(200, defaultHeaders);
          res.end(data);
        }
      });
    // console.log('url', req.url);
    // var givenUrl = req.url.split('?').splice(-1)[0];
    }
  }
};
