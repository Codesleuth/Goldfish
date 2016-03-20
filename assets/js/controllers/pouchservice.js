goldfish.factory('$pouchService', ($rootScope, pouchDB) => {
  const db = pouchDB('goldfish');
  
  function addfriend(friend){
    db.get('friends').then((friends) => {
      friends.push(friend);
      db.post('friends', friends).then(() => {
          $rootScope.$broadcast('new-friend', friend);
      });    
    });
  }
  
  function getprofile(callback){
    db.get('profile').then((profile) => {
      callback(profile);
    });
  }
  
  return {
    addFriend: addfriend,
    getProfile: getprofile
  };
});