var goldfish = angular.module('goldfish', ['ui.router', 'pusher-angular', 'pouchdb', 'yaru22.angular-timeago']);

goldfish.run(() => {
  
});

goldfish.config(($stateProvider, $locationProvider, $urlRouterProvider) => {
  $locationProvider.html5Mode(false);

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'assets/partials/home.html',
    controller: 'HomeCtrl'
  }).state('friendsadd', {
    url: '/friends/add',
    templateUrl: 'assets/partials/friends.add.html',
    controller: 'FriendsAddCtrl'
  });

  $urlRouterProvider.otherwise('/');
});