goldfish.controller('FriendsCtrl', ($rootScope, $scope, $pouchService, $log) => {
  $scope.friends = [];
  
  $pouchService.getFriends().then((friends) => {
    $scope.friends = [...$scope.friends, ...friends];
  }).catch($log.error);
  
  $rootScope.$on('new-friend', (event, friend) => {
    $scope.friends.push(friend);
  });
    
  $rootScope.$on('remove-friend', (event, friend) => {
    const index = $scope.friends.findIndex((val) => val.id === friend.id);
    $scope.friends.splice(index, 1);
  });
  
});