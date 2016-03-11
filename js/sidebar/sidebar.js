'use strict';
Player.directive('sidebar', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/sidebar/sidebar.html',
    link: function(scope){
      scope.items = [
        {label: 'Album', state: 'albums', icon: 'glyphicon glyphicon-book'},
        {label: 'Artist', state: 'artists', icon: 'glyphicon glyphicon-user'},
        {label: 'Playlist', state: 'playlists', icon: 'glyphicon glyphicon-list-alt'},
      ];
    }
  };
});
