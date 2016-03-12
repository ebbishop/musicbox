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

  SpotifyFactory.getAlbumInfo = function(){
    console.log('getting album info');
    return $http.get('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/')
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
      SpotifySong: function(SpotifyFactory){
        console.log('resolve SpotifySong')
        return SpotifyFactory.getSong();
      },
      ArtistNames: function(SpotifySong){
        console.log('resolve ArtistNames')
        var artists = [];
        SpotifySong.items[0].artists.forEach(function(artist){
          artists.push(artist.name);
        });
        return artists.join(', ');
      },
      AlbumInfo: function(SpotifyFactory){
        console.log('resolve getAlbumInfo')
        return SpotifyFactory.getAlbumInfo();
      }
    }
  });
});


Player.controller('SpotifyCtrl', ['$scope', 'SpotifySong', 'ArtistNames', 'AlbumInfo', 'MusicFactory',function($scope, SpotifySong, ArtistNames, AlbumInfo, MusicFactory){

  //entire song response object
  $scope.SpotifySong = angular.fromJson(SpotifySong);

  //first (only) song object
  $scope.song = SpotifySong.items[0];

  // //set url for music factory
  // $scope.song.thispath = $scope.song.preview_url;

  //array of artist names
  $scope.artists = ArtistNames;
  if($scope.artists.indexOf(', ')>-1){ $scope.multiArtist = true;}
  else{ $scope.multiArtist = false; }

  //entire album response object
  $scope.SpotifyAlbum = AlbumInfo;

  var playClip = function(){
    console.log('playing!!!!!!!!!!!!!!!!!', $scope.song);
    MusicFactory.preview($scope.song);
  };

  playClip();

}]);
