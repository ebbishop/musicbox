'use strict';

Player.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('artistalbums', {
    url:'/artist/{path}',
    templateUrl: 'js/artists/artist.albums/artist.albums.html',
    controller: 'ArtistAlbumsCtrl',
    resolve: {
      getArtistAlbums: function(FileFactory, $stateParams){
        console.log('resolvign artistalbums for', $stateParams.path);
        return FileFactory.getFileList($stateParams.path);
      }
    }
  });
}]);

Player.controller('ArtistAlbumsCtrl', ['$stateParams', '$state', '$scope', 'getArtistAlbums', function($stateParams, $state, $scope, getArtistAlbums){
  $scope.artist = getArtistAlbums[0].prev;
  $scope.artistAlbums = getArtistAlbums;
}]);


