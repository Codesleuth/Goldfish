goldfish.controller('FriendsCtrl', ($scope, $pouchService, $log) => {
  $scope.friends = [];
  
  $pouchService.getFriends().then((friends) => {
    $scope.friends = [...$scope.friends, ...friends];
  }).catch($log.error);
  
  // $scope.friends = [{
  //   name: 'Gary Twitter',
  //   avatar: 'images/steve.jpg'
  // },{
  //   name: 'Paul Smythe',
  //   avatar: 'images/matthew.png'
  // }];
  
});