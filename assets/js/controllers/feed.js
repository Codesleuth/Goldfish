goldfish.controller('FeedCtrl', ($scope, $log, $pusherService, $pouchService) => {
  
  $scope.timeago = (timestamp) => moment(timestamp).fromNow();
  
  const pusher = $pusherService.client;
  
  $pouchService.getFriends().then((friends) => {
    friends.forEach((friend) => {
      $log.info('Subscribing to channel private-' + friend.id);
      
      const channel = pusher.subscribe('private-' + friend.id);
      channel.bind('pusher:subscription_succeeded', () => {
        $log.info('Subscribed to channel private-' + friend.id);
        
        channel.bind('client-update', (status) => {
          $log.info('Got a status!');
          $scope.statuses.push({
            id: friend.id,
            timestamp: moment().valueOf(),
            name: status.name,
            status: status.status,
            avatar: friend.avatar
          });
        });
      });
    });
  }).catch($log.error);

  $scope.statuses = []
  
});