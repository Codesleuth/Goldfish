goldfish.controller('HomeCtrl', ($scope, $pouchService, $log) => {
  $scope.hasProfile = false;
  $pouchService.getProfile().then((profile) => {
      if(profile) { $scope.hasProfile = true; }
    }).catch($log.error);
  
  $scope.profileId = Math.floor((Math.random() * 10000) + 1);
  $scope.createProfile = (profile) => {
    $pouchService.setProfile($scope.profileId, profile.name).then(() => {
      $log.info('created profile');
      $scope.hasProfile = true;
    }).catch($log.error);
  };
});