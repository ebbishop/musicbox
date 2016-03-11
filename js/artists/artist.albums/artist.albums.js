'use strict';

Player.config(function($stateProvider) {
  $stateProvider.state('artistalbums', {
    templateUrl: 'js/artists/artist.albums/artist.albums.html',
    controller: 'ArtistAlbumsCtrl',
    resolve: {
      getArtistAlbums: function(FileFactory){
        return FileFactory.getArtistAlbums()
      }
    }
  });
});

Player.controller('ArtistAlbumsCtrl', function($scope, FileFactory){
  $scope.cache = FileFactory.cache;
});


