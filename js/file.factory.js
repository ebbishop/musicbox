'use strict';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

Player.factory('FileFactory', function(){
  var defaultMusicPath = process.env.HOME + '/Music/demo';

  var FileFactory = {};
  var audioFileTypes = ['.m4a', '.mp3', '.ogg', '.wav', '.mp4'];
  var delim = '/';
  FileFactory.getFileList = function(myDir){
    if(!myDir) {
      var myDir = defaultMusicPath;
    }
    console.log('getting files for', myDir);
    return fs.readdirAsync(myDir)
    .then(function(files){
      console.log('reading contents of:', myDir);
      return Promise.map(files, function(file){
        console.log('file in mydir:', file);
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

  // FileFactory.getArtistAlbums = function(){
  //   return fs.readdirAsync(defaultMusicPath)
  //   .then(function(artists){
  //     return Promise.map(artists, function(artist){
  //       var a = artist;
  //       return fs.readdirAsync(defaultMusicPath + '/' + artist)
  //       .then(function(files){
  //         FileFactory.cache[a] = files;
  //         return files;
  //       })
  //     })
  //   });
  // };


  return FileFactory;

});
