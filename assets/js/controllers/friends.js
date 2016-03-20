goldfish.controller('FriendsCtrl', ($scope, $pouchService) => {
  
  $scope.friends = [];
  
  $pouchService.getFriends().then((friends) => {
    $scope.friends = [...$scope.friends, ...friends];
  });
  
  // $scope.friends = [{
  //   name: 'Gary Twitter',
  //   avatar: 'images/steve.jpg'
  // },{
  //   name: 'Paul Smythe',
  //   avatar: 'images/matthew.png'
  // }];
  
});