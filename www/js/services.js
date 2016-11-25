angular.module('starter.services', [])

.factory('LightFunctions', function($cordovaFlashlight, $interval) {

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


  return {

    turnOn: function() {
      var start = new Date();
      $cordovaFlashlight.switchOn()
        .then(
          function (success) {
            var end = new Date();
            var duration = end - start;
            console.log('duration:', duration);
          },
          function (error) { /* error */ });
    },

    turnOff: function() {
      $cordovaFlashlight.switchOff()
          .then(
            function (success) { /* success */ },
            function (error) { /* error */ });
    },

    blinkStart: function(intervalMS) {
      console.log('start blinking with interval ' + intervalMS + 'ms');
      var previous = new Date();
      // blink(previous, intervalMS);
      blinker = $interval(function() {
        blink(previous, intervalMS);
        previous = new Date();
      }, intervalMS);
    },

    blinkStop: function(chat) {
      console.log('stop blinking!');
      $interval.cancel(blinker);
    }

  };
});
