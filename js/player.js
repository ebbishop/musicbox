'use strict';

Player.directive('player', ['MusicFactory', function (MusicFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/player.html',
    scope: {},
    link: function (scope) {
      angular.extend(scope, MusicFactory);
      scope.toggle = function () {
        if ( MusicFactory.isPlaying() ) MusicFactory.pause();
          else MusicFactory.resume();
      };
      scope.getPercent = function () {
        return MusicFactory.getProgress() * 100;
      };
    }
  }
}])

Player.directive('scrubberClick', ['MusicFactory', function(MusicFactory){
  return{
    restrict: 'A',
    link: function(scope, element){
      element.on('click', function(event){
        var newProgress = (event.clientX - element[0].offsetLeft)/element[0].clientWidth;
        MusicFactory.setProgress(newProgress);
      });
    }
  }
}])
