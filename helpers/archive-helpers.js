var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
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
      console.log('readlist error', err);
    } else {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      console.log('readlist data', data);
      callback(data);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    //data = JSON.parse(data);
    console.log('this is data inside urlList', url, typeof data);
    if (data.hasOwnProperty(url)) {
      //check if in archive
      console.log('url matches data', data);
    } else {
      exports.addUrlToList(url);
      console.log('inside url in list', data);
      callback('./public/loading.html');
    }
  });
};

exports.addUrlToList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    data[url] = false;
    console.log('addUrlToList outisde write', data);
    // data = JSON.stringify(data);
    fs.writeFile(exports.paths.list, data, function(err) {
      if (err) {
        console.log('writeFile error', err);
      } else {
        console.log('writeFile success!', data);
      }
    });
  });
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
