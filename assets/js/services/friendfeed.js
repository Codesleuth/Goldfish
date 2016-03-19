// goldfish.factory('$friendFeedService', ($pusher, $rootScope, pouchDB) => {
//   const client = new Pusher('e59022bc804f00e0add7', {
//     cluster: 'eu',
//     authEndpoint: 'http://127.0.0.1:5000/pusher/auth',
//     encrypted: true
//   });
//   const pusher = $pusher(client);
//   const testChannel = pusher.subscribe('private-test');
  
//   var isolatedScope = $rootScope.$new();
//   console.log(isolatedScope.$broadcast);
//   isolatedScope.$on('update', (data) => {
//     console.log('"update" event received: ' + data.message);
//   });
  
//   isolatedScope.$on('test', (data) => {
//     console.log('isolatedScope.test received');
//     console.log('"test" event received: ' + data.message);
//   });
  
//   testChannel.bind('client-test', (data) => {
//     console.log('"client-test" event received');
//     isolatedScope.$broadcast('test', data);
//   });
  
//   return {
//     test() {
//       testChannel.trigger('client-test', {
//         message: 'this is a test'
//       });
//     }
//   }
// })