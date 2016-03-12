'use strict';

Player.directive('oneSongItem', ['MusicFactory', function(MusicFactory){
  return {
    restrict: 'E',
    templateUrl: 'js/songs/one-song-item.html',
    scope: {
      song: '='
    },
    link: function(scope){
      angular.extend(scope, MusicFactory);
      scope.toggle = function(song){
        MusicFactory.start(song);
      }
    }
  };
}]);


