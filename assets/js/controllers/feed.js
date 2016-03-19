goldfish.controller('FeedCtrl', ($scope) => {
  
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