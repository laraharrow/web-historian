// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');

archive.readListOfUrls((urlList) => {
  var needToDownload = [];
  for (var i = 0; i < urlList.length; i++) {
    archive.isUrlArchived(urlList[i], (answer, url) => {
      if (!answer) {
        needToDownload.push(url);
      }
    });
  }
  setTimeout(function() {
    archive.downloadUrls(needToDownload);
  }, 5000);
});

var logString = new Date;
logString = logString + ' downloaded new links \n';

fs.appendFile(archive.paths.siteAssets + '/downloadLog.txt', logString);