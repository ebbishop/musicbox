'use strict';
var bases = require('bases');
var _ = require('lodash');

Player.factory('SpotifyFactory', ['$http', function($http){
  var SpotifyFactory = {};

  var baseUrl = 'https://api.spotify.com/v1/albums';
  var limit = 1;
  // var songOffset = function(album){

  // };

  // function generateBase62(){
  //   var n = _.random(0,61);
  //   return bases.toBase62(n).toString();
  // }

  SpotifyFactory.generateRandomAlbum = function(){
    //make a variable with some search queries and put it in an array. (you can create more search queries.
    var getRandomSongsArray = ['%25a%25', 'a%25', '%25e%25', 'e%25', '%25i%25', 'i%25', '%25o%25', 'o%25'];

    //This will get a random result out of the array above
    var getRandomSongs = getRandomSongsArray[_.random(0,getRandomSongsArray.length)];

    //This will get a random offset number between 1 and 1000. So you get a random track. (you can change the numbers btw)
    var getRandomOffset = _.random(1, 1000);

    //This is the url that gets the results out of the Spotify API. You have to put in the variables you created above.
    var url = "https://api.spotify.com/v1/search?query=" + getRandomSongs + "&offset=" + getRandomOffset + "&limit=1&type=track";
    // var str = '';
    // for (var i = 0; i < 22; i++){str+= generateBase62();}
    // return str;
    console.log(url);
    return url
  };

  // function albumIdExists(){
  //   var rand = generateRandomAlbum();
  //   return $http.get('https://api.spotify.com/v1/albums/' + rand)
  //   .then(function(res){
  //     if(res.data) return res.data;

  //   });
  // };

  SpotifyFactory.getSong = function(){
    var url = SpotifyFactory.generateRandomAlbum();
    console.log('newurl', url);
    // return $http.get('https://api.spotify.com/v1/albums/' + '6akEvsycLGftJxYudPjmqK' + '/tracks?offset=0&limit=1')
    return $http.get(url)
    .then(function(res){
      return res.data;
    });
  };

  SpotifyFactory.getAlbumInfo = function(albumId){
    console.log('getting album info');
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
        console.log('resolve SpotifySong')
        return SpotifyFactory.getSong();
      },
      ArtistNames: function(SpotifySong){
        console.log('resolve ArtistNames after SpotifySong', SpotifySong.tracks.items[0].album);
        var artists = [];
        SpotifySong.tracks.items[0].artists.forEach(function(artist){
          artists.push(artist.name);
        });
        console.log(artists);
        return artists.join(', ');
      },
      AlbumInfo: function(SpotifyFactory, SpotifySong){
        console.log('resolve getAlbumInfo');
        // SpotifySong.tracks.items[0].album.id
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

  // //set url for music factory
  // $scope.song.thispath = $scope.song.preview_url;

  //array of artist names
  $scope.artists = ArtistNames;
  if($scope.artists.indexOf(', ')>-1){ $scope.multiArtist = true;}
  else{ $scope.multiArtist = false; }

  //entire album response object
  $scope.album = angular.fromJson(AlbumInfo);
  // $scope.album = angular.fromJson(AlbumInfo).album;
  // console.log($scope.SpotifyAlbum.album);
  var playClip = function(){
    console.log('playing!!!!!!!!!!!!!!!!!', $scope.song);
    MusicFactory.preview($scope.song);
  };

  playClip();

}]);
