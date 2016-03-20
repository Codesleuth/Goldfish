goldfish.factory('$friendService', ($rootScope, $pusherService, $pouchService, $http, $q) => {
  const pusher = $pusherService.client;
  
  $rootScope.$on('new-friend', function (friend) {
    $pouchService.getProfile().then((profile) => {
      pusher.trigger('private-' + friend.id, 'client-friend-accept', profile);
    });
  });
  
  function addfriend(mobileNumber, code){
    const tempChannel = pusher.subscribe('private-' + code);
    tempChannel.bind('client-friend-request', (request) => {
      $pouchService.addFriend({id: request.id, name: request.name})
      tempChannel.unbind();
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
  
  return {
      addFriend: addfriend
  };
});