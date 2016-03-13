'use strict';

Player.directive('oneSongItem', ['MusicFactory', function(MusicFactory){
  return {
    restrict: 'E',
    templateUrl: 'js/songs/one-song-item.html',
    scope: {
      song: '=',
      songlist: '='
    },
    link: function(scope){
      angular.extend(scope, MusicFactory);
      scope.toggle = function(song){
        if(scope.getCurrentSong()===song){
          if(scope.getIsPlaying()) {MusicFactory.pause();}
          else{ MusicFactory.resume()}
        }else{
          MusicFactory.start(song);
        }
      }
    }
  };
}]);

