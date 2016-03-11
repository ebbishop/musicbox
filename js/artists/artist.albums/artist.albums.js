'use strict';

Player.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('artistalbums', {
    url:'/artistalbums/{artistName}',
    templateUrl: 'js/artists/artist.albums/artist.albums.html',
    controller: 'ArtistAlbumsCtrl',
    resolve: {
      getArtistAlbums: function(FileFactory, $stateParams){
        console.log('resolving artist albums', $stateParams.artistName);
        return FileFactory.getFileList($stateParams.artistName);
      }
    }
  });
}]);

Player.controller('ArtistAlbumsCtrl', ['$stateParams', '$state', '$scope', 'FileFactory', 'getArtistAlbums', function($stateParams, $state, $scope, FileFactory, getArtistAlbums){
  $scope.cache = FileFactory.cache;
  $scope.artist = $stateParams.artistName;
  $scope.artistAlbums = getArtistAlbums;
}]);


