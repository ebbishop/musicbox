// var clientId = '10c1ccf8e1234e2a8864ceb38cb4ba04';
// var clientSecret = '7a0f3b95ba774145abad51bdc210ef46';

Player.factory('AuthFactory', ['$http', function($http){
  var AuthFactory = {};

  AuthFactory.login = function(credentials){
    return $http.post('/api/login', credentials)
    .then(function(res){
      return res.data;
    });
  };

  AuthFactory.logout = function(){
    return $http.delete('/api/logout')
    .then(function(res){
      return res.data;
    });
  };

  return AuthFactory;
}]);


Player.config(function($stateProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/spotify/login.html',
    controller: 'LoginCtrl'
  });
});

Player.controller('LoginCtrl', ['$scope', 'AuthFactory', '$state', function($scope, AuthFactory, $state){
  $scope.loginMe = function(credentials){
    return AuthFactory.login(credentials)
    .then(function(user){
      $state.go('spotify');
    });
  };
}]);
