'use strict';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

Player.factory('FileFactory', function(){
  var defaultMusicPath = process.env.HOME + '/Music/demo';

  var FileFactory = {};

  FileFactory.getHome = function(){
    return process.env.HOME;
  };

  FileFactory.getSubFileList = function(){
    return fs.readdirAsync(defaultMusicPath)
    .then(function(artists){
      return fs.readdirAsync(artists)
    });
  };

  FileFactory.getFileList = function(subdir){
    if(!subdir) {
      var subdir = '';
    }
    return fs.readdirAsync(defaultMusicPath + subdir);
  };

  FileFactory.getArtists = function(){
    return fs.readdirAsync(defaultMusicPath);
  };

  FileFactory.cache = {};

  FileFactory.getArtistAlbums = function(){
    return fs.readdirAsync(defaultMusicPath)
    .then(function(artists){
      return Promise.map(artists, function(artist){
        var a = artist;
        return fs.readdirAsync(defaultMusicPath + '/' + artist)
        .then(function(files){
          FileFactory.cache[a] = files;
          return files;
        })
      })
    });
  };

  return FileFactory;

});
