goldfish.controller('FeedCtrl', ($scope, $log, $pusherService, pouchDB) => {
  
  const pusher = $pusherService.client;
  
  function bindFriends(friends) {
    friends.forEach((friend) => {
      $log.info('Subscribing to channel private-' + friend.id);
      const friendChannel = pusher.subscribe('private-' + friend.id);
      
      $log.info('Binding event client-update to channel private-' + friend.id);
      friendChannel.bind('client-update', (status) => {
        $log.info('Got a status!');
        $scope.statuses.push[{
          id: friend.id,
          date: new Date,
          name: status.name,
          status: status.status,
          avatar: friend.avatar
        }]
      });
      
    });
  }
  
  var db = pouchDB('goldfish');
  
  db.get('profile').catch((err) => {
    if (err.status !== 404) return $log.error(err);
    $log.info('Adding dummy profile...');
    const profile = {
      id: 1,
      name: 'Bobly Bobson'
    };
    db.post('profile', profile);
  });
  
  db.get('friends').then(bindFriends).catch((err) => {
    if (err.status !== 404) return $log.error(err);
    $log.info('Adding dummy friends...');
    const friends = [{
      id: 1,
      name: 'Bobly Bobson'
    },{
      id: 2,
      name: 'Freddy Fredson'
    }];
    db.post('friends', friends);
  });
  
  db.info().then((info) => {
    $log.info(info);
  });

  $scope.statuses = [{
    date: new Date(2016, 00, 01, 12, 01),
    name: 'Some guy',
    status: 'Hello I am some guy how are you',
    avatar: 'images/matthew.png'
  },{
    date: new Date(2016, 00, 02, 12, 01),
    name: 'Guy Some',
    status: 'Hello I am guy some how are you',
    avatar: 'images/elliot.jpg'
  }]
  
});