goldfish.factory('$pouchService', ($rootScope, $log, pouchDB) => {
  const db = pouchDB('goldfish');
  
  function addfriend(friend){
    db.get('friends').then((friends) => {
      friends.push(friend);
      db.post('friends', friends).then(() => {
          $rootScope.$broadcast('new-friend', friend);
      });    
    });
  }
  
  function getprofile(){
    return db.get('profile').catch($log.error);
  }
  
  return {
    addFriend: addfriend,
    getProfile: getprofile
  };
});