goldfish.factory('$friendService', ($rootScope, $pusherService, $pouchService, $http, $q) => {
  const pusher = $pusherService.client;
  
  $rootScope.$on('new-friend', function (friend) {
    $pouchService.getProfile().then((profile) => {
      const channel = pusher.subscribe('private-' + friend.id);
      channel.bind('pusher:subscription_succeeded', () => {
        channel.trigger('client-friend-accept', profile);
        channel.unbind();
      });
    });
  });
  
  function addfriend(mobileNumber, code){
    const channel = pusher.subscribe('private-' + code);
    channel.bind('client-friend-request', (request) => {
      channel.unbind();
      $pouchService.addFriend({id: request.id, name: request.name})
    });
    
    return $q((resolve, reject) => {
      $pouchService.getProfile().then((profile) => {
        $http.post('http://friender.cloudapp.net/friendplox', {
          MobileNumber: mobileNumber,
          Code: code,
          Name: profile.name
        }).then(resolve);
      });
    });
  }
  
  function redeemFriend(code){
    $q((resolve, reject) => { 
      $pouchService.getProfile().then((profile) => {
        const codeChannel = pusher.subscribe('private-code-' + code);
        codeChannel.bind('pusher:subscription_succeeded', () => {
          codeChannel.trigger('client-friend-request', profile);
          codeChannel.unbind();
        });
        
        const channel = pusher.subscribe('private-' + profile.id);
        channel.bind('client-friend-accept', (request) => {
          channel.unbind();
          $pouchService.addFriend({id: request.id, name: request.name})
          resolve(profile);
        });
      });
    });
  }
  
  return {
      add: addfriend,
      redeem: redeemFriend
  };
});