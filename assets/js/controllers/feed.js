goldfish.controller('FeedCtrl', ($rootScope, $scope, $log, $pusherService, $pouchService) => {
  $scope.statuses = [];
  
  $scope.timeago = (timestamp) => moment(timestamp).fromNow();
  
  const pusher = $pusherService.client;
  
  function subscribeToFriend(friendId) {
    $log.info(`Subscribing to channel private-${friendId}`);
    
    const channel = pusher.subscribe(`private-${friendId}`);
    channel.bind('pusher:subscription_succeeded', () => {
      $log.info(`Subscribed to channel private-${friendId}`);
      
      channel.bind('client-update', (status) =>   {
        $log.info(`Got a status from friend ${friendId}!`);
        $pouchService.getFriend(friendId).then((friend) => {
          $scope.statuses.push({
            id: friend.id,
            timestamp: moment().valueOf(),
            name: status.name,
            status: status.status,
            avatar: friend.avatar
          });
        }).catch($log.error);
      });
    });
  }
  
  function unsubscribeFromFriend(friendId) {
    $log.info(`Unsubscribing from channel private-${friendId}`);
    
    const channelName = `private-${friendId}`;
    pusher.unsubscribe(channelName);
  }
  
  $pouchService.getFriends().then((friends) => {
    friends.forEach((friend) => {
      subscribeToFriend(friend.id);
    });
  }).catch($log.error);
  
  $rootScope.$on('new-friend', (event, friend) => {
    subscribeToFriend(friend.id);
  });
  
  $rootScope.$on('remove-friend', (event, friend) => {
    unsubscribeFromFriend(friend.id);
  });
  
});