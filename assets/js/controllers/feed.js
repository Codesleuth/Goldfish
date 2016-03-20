goldfish.controller('FeedCtrl', ($scope, $log, $pusherService, pouchDB) => {
  
  $scope.timeago = (timestamp) => moment(timestamp).fromNow();
  
  const pusher = $pusherService.client;
  
  function bindFriends(friends) {
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
  }
  
  var db = pouchDB('goldfish');
  
  db.get('profile')
    // .catch((err) => {
    //   if (err.status !== 404) return $log.error(err);
    //   $log.info('Adding dummy profile...');
    //   const profile = {
    //     id: 1,
    //     name: 'Bobly Bobson'
    //   };
    //   db.post('profile', profile);
    // });
  
  db.get('friends').then(bindFriends)
    // .catch((err) => {
    //   if (err.status !== 404) return $log.error(err);
    //   $log.info('Adding dummy friends...');
    //   const friends = [{
    //     id: 1,
    //     name: 'Bobly Bobson'
    //   },{
    //     id: 2,
    //     name: 'Freddy Fredson'
    //   }];
    //   db.post('friends', friends);
    //   bindFriends(friends);
    // });
  
  db.info().then((info) => {
    $log.info(info);
  });

  $scope.statuses = []
  
});