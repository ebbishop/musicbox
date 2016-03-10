'use strict';

Player.factory('FileFactory', function(){
  var defaultMusicPath = process.env.HOME + '/Music/demo';

  var FileFactory = {};

  FileFactory.getHome = function(){
    return process.env.HOME;
  };

  FileFactory.getAlbumList = function(){
    return fs.readdirAsync(process.env.HOME + defaultMusicPath)
    .then(function(artists){
      return fs.readdirAsync(artists)
    });
  };

  FileFactory.getArtistList = function(){
    return fs.readdirAsync(process.env.HOME + defaultMusicPath);
  };

  return FileFactory;
});
