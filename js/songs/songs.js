'use strict';

Player.directive('songList', ['MusicFactory', function(MusicFactory){
  return {
    restrict: 'E',
    templateUrl: 'js/songs/song-list.html',
    scope: {
      song: '=',
      songs: '=',
      songlist: '='
    },
    link: function(scope){
      angular.extend(scope, MusicFactory);
      scope.toggle = function(song, songs){
        if(scope.getCurrentSong()===song){
          if(scope.getIsPlaying()) {MusicFactory.pause();}
          else{ MusicFactory.resume()}
        }else{
          MusicFactory.start(song, songs);
        }
      };
    }
  };
}]);
