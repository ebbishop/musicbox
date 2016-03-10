'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');


Player.config(function($stateProvider){
  $stateProvider.state('albums', {
    // url: '/albums',
    // template: '<one-album ng-repeat="album in albums"></one-album>',
    template: '<div>{{albums}}</div><div>{{home}}</div>',
    controller: 'AlbumListCtrl',
    resolve: {
      albums: function(FileFactory){
        return FileFactory.getDirectoryList();
      }
    }
  });
});


Player.controller('AlbumListCtrl', function($scope, albums, FileFactory){
  $scope.home = FileFactory.getHome();
  $scope.albums = albums;
});


Player.directive('oneAlbum', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/albums/one-album.html'
  };
});



Player.factory('FileFactory', function(){
  var defaultMusicPath = '/Music';

  var FileFactory = {};

  FileFactory.getHome = function(){
    return process.env.HOME;
  };

  FileFactory.getDirectoryList = function(){
    return fs.readdirAsync(process.env.HOME + defaultMusicPath);
  };

  return FileFactory;
});
