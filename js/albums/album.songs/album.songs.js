'use strict';

Player.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('albumsongs', {
    url: '/album/{path}',
    templateUrl: 'js/albums/album.songs/album.songs.html',
    controller: 'AlbumSongsCtrl',
    resolve: {
      getAlbumSongs: function(FileFactory, $stateParams){
        console.log('getting songs for ', $stateParams.path)
        return FileFactory.getFileList($stateParams.path);
      }
    }
  });
}]);

Player.controller('AlbumSongsCtrl', ['$stateParams', '$state', '$scope', 'getAlbumSongs', function($stateParams, $state, $scope, getAlbumSongs){
  console.log(getAlbumSongs);
  $scope.artist = getAlbumSongs[0].prevpath.split('/')[getAlbumSongs[0].prevpath.split('/').length-2];
  $scope.album = getAlbumSongs[0].prev;
  $scope.songs = getAlbumSongs;
}])
