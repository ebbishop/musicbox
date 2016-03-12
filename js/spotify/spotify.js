'use strict';

Player.factory('SpotifyFactory', ['$http', function($http){
  var SpotifyFactory = {};

  var baseUrl = 'https://api.spotify.com/v1/albums';
  var limit = 1;
  var songOffset = function(album){

  }
  SpotifyFactory.generateRandomAlbum = function(){};

  SpotifyFactory.getSong = function(){
    console.log('hit getsong');
    return $http.get('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=0&limit=1')
    .then(function(res){
      return res.data;
    });
  };

  return SpotifyFactory;
}]);


Player.config(function($stateProvider){
  $stateProvider.state('spotify', {
    url: '/spotify',
    templateUrl: 'js/spotify/spotify.html',
    controller: 'SpotifyCtrl',
    resolve: {
      spotifySong: function(SpotifyFactory){
        return SpotifyFactory.getSong();
      },
      getArtistNames: function(spotifySong){
        var artists = [];
        spotifySong.items[0].artists.forEach(function(artist){
          artists.push(artist.name);
        });
        return artists.join(', ');
      },
      getAlbumName: function(spotifySong){

      }
    }
  });
});


Player.controller('SpotifyCtrl', ['$scope', 'spotifySong', 'getArtistNames', function($scope, spotifySong, getArtistNames){
  $scope.spotifySong = angular.fromJson(spotifySong);
  $scope.song = spotifySong.items[0];
  $scope.artists = getArtistNames;
  console.log()
  if($scope.artists.indexOf(', ')>-1){
    $scope.multiArtist = true;
  }else{
    $scope.multiArtist = false;
  }
}]);
