# phone-lightrig
Turning smartphone flashlights into a remote-controllable lighting rig.

Start the server in server/server.js using `node .`

You can control the remote commands (currently, just "blink start" and "blink stop") by opening a browser and pointing to `localhost:9000` on the same machine as the server.

 We're using http://socket.io/ to do some realtime communication with a NodeJS server for controlling multiple phones remotely. Currently, the Ionic Framework / Cordova app on the phone(s) have a hardcoded IP address and port for the server as `192.168.1.5:9000`. Enough to get the proof of concept working.
