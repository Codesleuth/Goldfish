goldfish.controller('FriendsAddCtrl', ($scope, $friendService) => {
  $scope.requestMade = false;
  $scope.mobileNumber = "";
  $scope.friendCode = Math.floor((Math.random() * 10000) + 1);
  
  $scope.request = () => {
    $friendService.add($scope.mobileNumber, $scope.friendCode).then(() => {
      $scope.requestMade = true;
    });
  };
  
  $scope.codeRedeemed = false;
  $scope.friend = "";
  $scope.code = "";
  
  $scope.redeem = () => {
    $friendService.redeem($scope.code).then((profile) => {
      $scope.codeRedeemed = true;
      $scope.friend = profile.name;
    });
  };
});