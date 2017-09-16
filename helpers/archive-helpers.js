var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var https = require('https');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function read(err, data) {
    if (err) {
    } else {
      data = data.toString();
      dataArr = data.split('\n');

      //console.log('this is data', dataArr);
      callback(dataArr);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    for (var i in data) {
      if (data[i] === url) {
        callback(true);
        return;
      }
    }
    callback(false);
  });
};

exports.addUrlToList = function(url, callback) {
  var urlStr = '\n' + url;
  fs.appendFile(exports.paths.list, urlStr, function(err) {
    if (err) {
      console.log('couldnt write file');
    } else {
      console.log(urlStr);
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(exports.paths.archivedSites + '/' + url, function(err, stats) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });

};

exports.downloadUrls = function(urls) {

  for (var i = 0; i < urls.length; i++) {
    https.get('https://' + urls[i], res => {
      res.on('data', (data) => {
        fs.writeFile(exports.paths.archivedSites + '/' + res.socket._host, data, err => {
          if (err) {
            console.error(err);
          }  
        });
      });

    }).on('error', (e) => {
      console.error(e);
    });
  }
};













