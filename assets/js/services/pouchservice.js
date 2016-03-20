goldfish.factory('$pouchService', ($rootScope, $log, pouchDB, $q) => {
  const db = new pouchDB('goldfish');
  
  function addFriend(id, name) {
    return $q((resolve, reject) => {
      const friend = { id: id, name: name };
      db.get('friends').then((friends) => {
        friends.profiles.push(friend);
        db.put(friends).then(() => {
          $log.log("added friend");
          $log.log(friend);
          $rootScope.$broadcast('new-friend', friend);
        }).catch(reject);    
      }).catch((err) => {
        if (err.status === 404) return db.put({
          _id: 'friends',
          profiles: [friend]
        }).then(resolve).catch(reject);
        reject(err);
      });
    });
  }
  
  function getProfile() {
    return $q((resolve, reject) => {
      db.get('profile').then(resolve).catch((err) => {
        if (err.status === 404) return resolve(null);
        reject(err);
      });
    });
  }
  
  function setProfile(id, name) {
    return $q((resolve, reject) => {
      const profile = { _id: 'profile', id: id, name: name };
      $log.info(profile);
      db.put(profile).then(resolve).catch(reject);
    });
  }
  
  function getFriends() {
    return $q((resolve, reject) => {
      db.get('friends').then((friends) => {
        resolve(friends.profiles);
      }).catch((err) => {
        if (err.status === 404) return resolve([]);
        reject(err);
      });
    });
  }
  
  return {
    addFriend: addFriend,
    getProfile: getProfile,
    getFriends: getFriends,
    setProfile: setProfile
  };
});