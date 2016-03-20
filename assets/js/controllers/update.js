goldfish.controller('UpdateCtrl', ($log, $scope, $pusherService, $pouchService) => {
  
  const pusher = $pusherService.client;
  
  $scope.status = { status: 'Hello...?' };
  
  var userProfile = null;
  var profileChannel = null;
  
  function sendUpdate(status) {
    var sent = profileChannel.trigger('client-update', {
      name: userProfile.name,
      status: status.status,
      avatar: userProfile.avatar || 'images/kristy.png'
    });
    if (!sent) return $log.error('Could not send client-update');
    $log.info('Sent client-update');
  }
  
  $scope.testUpdate = (status) => {
    if (profileChannel) return sendUpdate(status);
    
    $pouchService.getProfile().then((profile) => {
      userProfile = profile;
      const channelName = `private-${profile.id}`;
      profileChannel = pusher.subscribe(channelName);
      profileChannel.bind('pusher:subscription_succeeded', () => {
        sendUpdate(status);
      });
    }).catch($log.error);
  };
});