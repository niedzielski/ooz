var webFrame = require('electron').webFrame;
var ipc = require('ipc-renderer');

ipc.on('CmdOrCtrl+=', function() {
  webFrame.setZoomLevel(webFrame.getZoomLevel() + 1);
});

ipc.on('CmdOrCtrl+0', function() {
  webFrame.setZoomLevel(0);
});

ipc.on('CmdOrCtrl+-', function() {
  webFrame.setZoomLevel(webFrame.getZoomLevel() - 1);
});

ipc.on('MediaPreviousTrack', function() {
  console.log('previous');
});

ipc.on('MediaPlayPause', function() {
  console.log('play / pause');
});

ipc.on('MediaNextTrack', function() {
  console.log('next');
});

ipc.on('MediaStop', function() {
  console.log('stop');
});