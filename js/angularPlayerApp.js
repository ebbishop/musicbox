'use strict';

var Player = angular.module('Player', ['ui.router']);

Player.directive('sidebar', function(){
  return {
    restrict: 'E',
    templateUrl: './js/sidebar/sidebar.html'
  };
});
