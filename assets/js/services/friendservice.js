goldfish.factory('$friendService', ($rootScope, $pusherService, $pouchService, $http, $q, $log) => {
  const pusher = $pusherService.client;
  
  $rootScope.$on('new-friend', function (event, friend) {
    $pouchService.getProfile().then((profile) => {
      $log.info(friend);
      const channel = pusher.subscribe('private-' + friend.id);
      channel.bind('pusher:subscription_succeeded', () => {
        channel.trigger('client-friend-accept', profile);
        $log.info('sent client-friend-accept to private-' + friend.id);
        channel.unbind();
      });
    });
  });
  
  function addfriend(mobileNumber, code){
    const channel = pusher.subscribe('private-code-' + code);
    channel.bind('pusher:subscription_succeeded', () => {
      $log.info('subscribed to private-code-' + code);
      channel.bind('client-friend-request', (request) => {
        $log.log("received client-friend-request on private-code-" + code);
        channel.unbind();
        $log.log(request);
        $pouchService.addFriend(request.id, request.name)
      });
    });
    
    return $q((resolve, reject) => {
      $pouchService.getProfile().then((profile) => {
        $http.post('http://friender.cloudapp.net/friendplox', {
          MobileNumber: mobileNumber,
          Code: code,
          Name: profile.name
        }).then(resolve);
      });
      resolve();
    });
  }
  
  function redeemFriend(code){
    return $q((resolve, reject) => { 
      $pouchService.getProfile().then((profile) => {
        const channelName = 'private-code-' + code;
        const codeChannel = pusher.subscribe(channelName);
        codeChannel.bind('pusher:subscription_succeeded', () => {
          const sent = codeChannel.trigger('client-friend-request', profile);
          if (sent) {
            $log.info('sent client-friend-request to ' + channelName);
            return pusher.unsubscribe(channelName);
          }
          $log.error('Unable to send client-friend-request to ' + channelName);
        });
        
        const channel = pusher.subscribe('private-' + profile.id);
        channel.bind('pusher:subscription_succeeded', () => {
          $log.info('subscribed to private-' + profile.id);
          channel.bind('client-friend-accept', (request) => {
            $log.info('received client-friend-accept on private-' + profile.id);
            $log.info(request);
            $pouchService.addFriend(request.id, request.name);
            resolve(request.name);
          });
        });
      });
    });
  }
  
  return {
    add: addfriend,
    redeem: redeemFriend
  };
});