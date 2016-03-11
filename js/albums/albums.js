'use strict';

Player.config(function($stateProvider){
  $stateProvider.state('albums', {
    templateUrl: 'js/albums/albums.html',
    controller: 'AlbumListCtrl',
    resolve: {
      albums: function(FileFactory){
        return FileFactory.getSubFileList();
      }
    }
  });
});


Player.controller('AlbumListCtrl', function($scope, albums){
  $scope.albums = albums;
});


Player.directive('oneAlbumItem', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/albums/one-album-item.html'
  };
});

