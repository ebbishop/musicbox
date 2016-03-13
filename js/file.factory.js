'use strict';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var id3 = require('id3js');

Player.factory('FileFactory', function(){
  var defaultMusicPath = process.env.HOME + '/Music/demo';

  var FileFactory = {};
  var audioFileTypes = ['.ogg', '.wav', '.mp3'];
  var delim = '/';
  FileFactory.getFileList = function(myDir){
    if(!myDir) {
      var myDir = defaultMusicPath;
    }
    return fs.readdirAsync(myDir)
    .then(function(files){
      return Promise.map(files, function(file){
        if(path.extname(file)===''){
          return {
            type: 'directory',
            name: path.basename(file),
            prevpath: myDir,
            prev: myDir.split(delim)[myDir.split(delim).length-1],
            thispath: path.join(myDir, file),
            base: ''
          }
        } else if (audioFileTypes.indexOf(path.extname(file))>-1){
          return {
            type: 'audio',
            track: path.basename(file, path.extname(file)).split(' ')[0],
            name: path.basename(file, path.extname(file)).split(' ').slice(1).join(' '),
            prevpath: myDir,
            prev: myDir.split(delim)[myDir.split(delim).length-1],
            thispath: path.join(myDir, file),
            base: path.extname(file)
          }
        } else {
          return {
            type: 'probs not audio',
            name: path.basename(file, path.extname(file)),
            prevpath: myDir,
            prev: myDir.split(delim)[myDir.split(delim).length-1],
            thispath: path.join(myDir, file),
            base: path.extname(file)
          };
        }

      });
    });
  };

  FileFactory.getFileListSimple = function(subdir){
    if(!subdir) {
      var subdir = '';
    }
    return fs.readdirAsync(path.join(defaultMusicPath, subdir));
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
