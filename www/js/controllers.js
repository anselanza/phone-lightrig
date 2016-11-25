angular.module('starter.controllers', [])

.controller('ManualCtrl', function($scope, $log, $ionicPlatform, $cordovaFlashlight, $interval) {

  $log.info('ManualCtrl');

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

    function blink(previous, intervalMS) {
      $cordovaFlashlight.toggle()
        .then(
          function(success) {
            var now = new Date();
            var actualInterval = now - previous;
            console.log('Blink! actualInterval = ' + actualInterval + 'ms / ' + intervalMS + 'ms');
          }
      );
    }

    $scope.blinkStart = function(intervalMS) {
      // var intervalMS = $scope.blinkSpeed;
      console.log('start blinking with interval ' + intervalMS + 'ms');
      var previous = new Date();
      // blink(previous, intervalMS);
      blinker = $interval(function() {
        blink(previous, intervalMS);
        previous = new Date();
      }, intervalMS);

    }

    $scope.blinkStop = function() {
      console.log('stop blinking!');
      $interval.cancel(blinker);
    }

  });

})

.controller('AutoCtrl', function($scope, $log) {
  $log.info('AutoCtrl');

  var socket = io.connect('http://192.168.1.5');

  socket.on('connect', function(socket) {
    $log.info('connected to server!');
  });

  // socket.on('news', function (data) {
  //   console.log(data);
  //   socket.emit('my other event', { my: 'data' });
  // });
})


;
