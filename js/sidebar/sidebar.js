'use strict';
Player.directive('sidebar', ['SpotifyFactory', function(SpotifyFactory){
  return {
    restrict: 'E',
    templateUrl: 'js/sidebar/sidebar.html',
    // controller: 'SidebarCtrl',
    link: function(scope){
      scope.items = [
        {label: 'Album', state: 'albums', icon: 'glyphicon-book'},
        {label: 'Artist', state: 'artists', icon: 'glyphicon-user'},
        {label: 'Playlist', state: 'playlists', icon: 'glyphicon-list-alt'},
      ];
    }
  };
}]);
