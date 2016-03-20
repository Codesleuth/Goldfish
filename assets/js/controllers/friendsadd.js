goldfish.controller('FriendsAddCtrl', ($scope, $friendService) => {
  $scope.requestMade = false;
  $scope.mobileNumber = "";
  $scope.friendCode = Math.floor((Math.random() * 10000) + 1);
  
  $scope.request = () => {
    $friendService.addFriend($scope.mobileNumber, $scope.friendCode).then(() => {
      $scope.requestMade = true;
    });
  };
  
  $scope.codeRedeemed = false;
  $scope.friend = "";
  
  $scope.redeem = () => {
    //broadcast public channel to code channel
    //hook up callback to listen on public channel for mirror event
    //and store them into the database
    $scope.codeRedeemed = true;
    $scope.friend = "Dave";
  };
});