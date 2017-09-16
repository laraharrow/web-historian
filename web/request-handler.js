var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var defaultHeaders = httpHelpers.headers;
  console.log('url', req.url);
  
  //this is GET request for Index.html
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(path.join(__dirname, './public/index.html'), function read(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.writeHead(200, defaultHeaders);
        res.end(data);
      }
    });
  } else {
    console.log('url', req.url);
    var givenUrl = req.url.split('?').splice(-1)[0];
    
    archive.readListOfUrls(function() {
      console.log('readList Success');
    });

    //archive.isUrlInList(givenUrl, function() {
    //});

    res.writeHead(200, defaultHeaders);
    res.end();
  }
  
};
