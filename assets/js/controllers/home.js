goldfish.controller('HomeCtrl', ($scope, $pouchService, $log) => {
  $scope.hasProfile = false;
  $pouchService.getProfile().then((profile) => $scope.hasProfile = true).catch($log.error);
  
  $scope.createProfile = (profile) => {
    $pouchService.setProfile(1, profile.name).then(() => {
      $log.info('created profile');
      $scope.hasProfile = true;
    }).catch($log.error);
  };
});