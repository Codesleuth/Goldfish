goldfish.factory('$pusherService', ($pusher) => {
  const client = new Pusher('e59022bc804f00e0add7', {
    cluster: 'eu',
    authEndpoint: 'https://goldfish-auth.herokuapp.com/pusher/auth',
    encrypted: true
  });
  const pusher = $pusher(client);
  
  return {
    client: pusher
  };
});