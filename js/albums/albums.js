'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');


Player.config(function($stateProvider){
  $stateProvider.state('albums', {
    templateUrl: 'js/albums/albums.html',
    controller: 'AlbumListCtrl',
    resolve: {
      albums: function(FileFactory){
        return FileFactory.getAlbumList();
      }
    }
  });
});


Player.controller('AlbumListCtrl', function($scope, albums, FileFactory){
  $scope.home = FileFactory.getHome();
  $scope.albums = albums;
});


Player.directive('oneAlbumItem', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/albums/one-album-item.html'
  };
});

