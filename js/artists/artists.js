'use strict';

Player.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider.state('artists', {
    url: '/artists/{path}',
    templateUrl: 'js/artists/artists.html',
    controller: 'ArtistListCtrl',
    resolve: {
      artists: function(FileFactory, $stateParams){
        return FileFactory.getFileList($stateParams.path);
      }
    }
  });
}]);


Player.controller('ArtistListCtrl', ['$scope', 'artists', function($scope, artists){
  $scope.artists = artists;
}]);


Player.directive('oneArtistItem', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/artists/one-artist-item.html'
  };
});
