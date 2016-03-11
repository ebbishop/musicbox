'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');


Player.config(function($stateProvider){
  $stateProvider.state('artists', {
    templateUrl: 'js/artists/artists.html',
    controller: 'ArtistListCtrl',
    resolve: {
      artists: function(FileFactory){
        return FileFactory.getFileList();
      }
    }
  });
});


Player.controller('ArtistListCtrl', function($scope, artists, $rootScope){
  $scope.artists = artists;
  $scope.gotoArtistAlbums = function(artist){
    $state.go('artistalbums', {artistName: artist});
  };
});


Player.directive('oneArtistItem', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/artists/one-artist-item.html'
  };
});
