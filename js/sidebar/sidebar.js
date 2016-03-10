'use strict';
Player.directive('sidebar', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/sidebar/sidebar.html',
    link: function(scope){
      scope.items = [
        {label: 'Album', state: 'albums', icon: 'glyphicon-book', path: '~/'},
        {label: 'Artist', state: 'artists', icon: 'glyphicon-user', path: '~/'},
        {label: 'Playlist', state: 'playlists', icon: 'glyphicon-list-alt', path: '~/'},
      ];
    }
  };
});
