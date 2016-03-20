goldfish.controller('UpdateCtrl', ($log, $scope, $pusherService) => {
  const pusher = $pusherService.client;
  const channel = pusher.subscribe('private-1');
  channel.bind('pusher:subscription_succeeded', () => {
    $log.info('pusher:subscription_succeeded!');
  });
  
  $scope.status = { status: 'Hello...?' };
  
  $scope.testUpdate = (status) => {
    var triggered = channel.trigger('client-update', {
      name: 'kajshdkjashdjkajdkjasd',
      status: status.status,
      avatar: 'images/kristy.png'
    });
    
    if (!triggered) return $log.error('Could not send client-update');
    $log.info('triggered!');
  };
});