angular.module('starter.controllers', [])

.controller('ManualCtrl', function($scope, $log, $ionicPlatform, LightFunctions, $interval) {

  $log.info('ManualCtrl');

  var blinker;
  $scope.blinkSpeed = 1000;


  $scope.turnOn = function() {
    LightFunctions.turnOn();
  }

  $scope.turnOff = function() {
    LightFunctions.turnOff();
  }

  $scope.blinkStart = function(intervalMS) {
    LightFunctions.blinkStart(intervalMS);
  }

  $scope.blinkStop = function() {
    LightFunctions.blinkStop();
  }

})

.controller('AutoCtrl', function($scope, $log, LightFunctions) {
  $log.info('AutoCtrl');

  $scope.myId = 100;
  $scope.doing = 'nothing';

  var socket = io.connect('http://192.168.1.5:9000');

  socket.on('connect', function(socket) {
    $log.info('connected to server!');
  });

  socket.on('remote', function(data) {
    $log.debug('remote command received from server:', data);
    if (data.id == 'all' || data.id == $scope.myId) {
      console.log('applies to me!');

      if (data.command == 'blinkStart') {
        LightFunctions.blinkStart(1000);
        $scope.doing = "blinking";
      }
      if (data.command == 'blinkStop') {
        LightFunctions.blinkStop();
        $scope.doing = "nothing";
      }

    }
  });

  function sendId(newId) {
    socket.emit('config', { myId: newId} );
  }

  socket.on('config', function (data) {
    console.log(data);
    sendId($scope.myId);
  });

  $scope.updateId = function(newId) {
    console.log('Going to update to:', newId);
    sendId(newId);
  }

})


;
