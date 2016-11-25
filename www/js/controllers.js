angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $log, $ionicPlatform, $cordovaFlashlight, $interval) {

  $log.info('DashCtrl');

  var blinker;
  $scope.blinkSpeed = 1000;

  $ionicPlatform.ready(function() {

    $scope.turnOn = function() {
      var start = new Date();
      $cordovaFlashlight.switchOn()
          .then(
            function (success) {
              var end = new Date();
              var duration = end - start;
              console.log('duration:', duration);
            },
            function (error) { /* error */ });
    }

    $scope.turnOff = function() {
      $cordovaFlashlight.switchOff()
          .then(
            function (success) { /* success */ },
            function (error) { /* error */ });
    }

    $scope.blinkStart = function() {
      var intervalMS = $scope.blinkSpeed;
      console.log('start blinking with interval ' + intervalMS + 'ms');
      blinker = $interval(function() {
        $cordovaFlashlight.toggle();
      }, intervalMS);
    }

    $scope.blinkStop = function() {
      if (blinker) {
        console.log('stop blinking!');
        blinker.cancel();
      }
    }

  });

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
