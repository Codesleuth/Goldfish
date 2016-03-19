goldfish.factory('$pusherService', ($pusher) => {
  const client = new Pusher('e59022bc804f00e0add7', {
    cluster: 'eu',
    authEndpoint: 'http://127.0.0.1:5000/pusher/auth',
    encrypted: true
  });
  const pusher = $pusher(client);
  
  return {
    client: pusher
  };
});