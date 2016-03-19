goldfish.controller('FriendsAddCtrl', ($scope, $http) => {
  $scope.requestMade = false;
  $scope.mobileNumber = "";
  $scope.friendCode = Math.floor((Math.random() * 10000) + 1);
  
  $scope.request = () => {
    //subscribe to pusher channel
    //hook up callback to send public channel id to received channel id
    //and also push info into db
    $http.post('http://friender.cloudapp.net/friendplox', {
        MobileNumber: $scope.mobileNumber,
        Code: $scope.friendCode,
        Name: "Moreton"
    }).then(() => {
        $scope.requestMade = true;
    }, (err) => {
        
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