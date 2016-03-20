goldfish.controller('DevToolsCtrl', ($scope, $pouchService, $log) => {
  $scope.addRandomFriend = () => {
    const id = Math.floor((Math.random() * 10000) + 1);
    $pouchService.addFriend({
      id: id,
      name: `Friend [${id}]`,
      avatar: 'images/steve.jpg'
    });
  };
  
  $scope.removeAllFriends = () => {
    $pouchService.purgeFriends()
      .then(() => $log.info('All friends removed'))
      .catch($log.error);
  };
  
  $scope.removeProfile = () => {
    $pouchService.removeProfile();
  };
});