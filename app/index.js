var webFrame = require('electron').webFrame;
var ipc = require('ipc');

ipc.on('CmdOrCtrl+=', function() {
  webFrame.setZoomLevel(webFrame.getZoomLevel() + 1);
});

ipc.on('CmdOrCtrl+0', function() {
  webFrame.setZoomLevel(0);
});

ipc.on('CmdOrCtrl+-', function() {
  webFrame.setZoomLevel(webFrame.getZoomLevel() - 1);
});