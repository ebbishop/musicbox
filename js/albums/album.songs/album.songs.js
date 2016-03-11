'use strict';

Player.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('albumsongs', {
    url: 'albumsongs/{artistName}/{albumName}',
    templateUrl: 'js/albums/album.songs/album.songs.html',
    controller: 'AlbumSongsCtrl',
    resolve: {
      getAlbumSongs: function(FileFactory, $stateParams){
        console.log('resolving album songs', $stateParams.albumName, $stateParams.artistName);
        return FileFactory.getFileList($stateParams.artistName + '/' + $stateParams.albumName);
      }
    }
  });
}]);

Player.controller('AlbumSongsCtrl', ['$stateParams', '$state', '$scope', 'FileFactory', 'getAlbumSongs', function($stateParams, $state, $scope, FileFactory, getAlbumSongs){
  $scope.cache=FileFactory.cache;
  $scope.artist = $stateParams.artistName;
  $scope.album = $stateParams.albumName;
  $scope.songs = getAlbumSongs;
}])
