'use strict';
var bases = require('bases');
var _ = require('lodash');

Player.factory('SpotifyFactory', ['$http', function($http){
  var SpotifyFactory = {};

  SpotifyFactory.generateRandomSong = function(){
    //make a variable with some search queries and put it in an array. (you can create more search queries.
    var getRandomSongsArray = ['%25a%25', 'a%25', '%25e%25', 'e%25', '%25i%25', 'i%25', '%25o%25', 'o%25'];

    //This will get a random result out of the array above
    var getRandomSongs = getRandomSongsArray[_.random(0,getRandomSongsArray.length)];

    //This will get a random offset number between 1 and 1000. So you get a random track. (you can change the numbers btw)
    var getRandomOffset = _.random(1, 1000);

    //This is the url that gets the results out of the Spotify API. You have to put in the variables you created above.
    var url = "https://api.spotify.com/v1/search?query=" + getRandomSongs + "&offset=" + getRandomOffset + "&limit=1&type=track";

    console.log(url);
    return url
  };

  SpotifyFactory.getSong = function(){
    var url = SpotifyFactory.generateRandomSong();
    return $http.get(url)
    .then(function(res){
      return res.data;
    });
  };

  SpotifyFactory.getAlbumInfo = function(albumId){
    return $http.get('https://api.spotify.com/v1/albums/' + albumId + '/')
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
        return SpotifyFactory.getSong();
      },
      ArtistNames: function(SpotifySong){
        var artists = [];
        SpotifySong.tracks.items[0].artists.forEach(function(artist){
          artists.push(artist.name);
        });
        return artists.join(', ');
      },
      AlbumInfo: function(SpotifyFactory, SpotifySong){
        return SpotifyFactory.getAlbumInfo(SpotifySong.tracks.items[0].album.id);
      }
    }
  });
});


Player.controller('SpotifyCtrl', ['$scope', 'SpotifySong', 'ArtistNames', 'AlbumInfo', 'MusicFactory',function($scope, SpotifySong, ArtistNames, AlbumInfo, MusicFactory){

  //entire song response object
  $scope.SpotifySong = angular.fromJson(SpotifySong);

  //first (only) song object
  $scope.song = SpotifySong.tracks.items[0];

  //array of artist names
  $scope.artists = ArtistNames;
  if($scope.artists.indexOf(', ')>-1){ $scope.multiArtist = true;}
  else{ $scope.multiArtist = false; }

  //entire album response object
  $scope.album = angular.fromJson(AlbumInfo);

  var playClip = function(){
    MusicFactory.preview($scope.song);
  };

  playClip();

}]);
