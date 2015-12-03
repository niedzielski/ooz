var BrowserWindow = require('browser-window');
var electron = require('electron');
var globalShortcut = electron.globalShortcut;

var KEYS = [
  'MediaPreviousTrack',
  'MediaPlayPause',
  'MediaNextTrack',
  'MediaStop'
];

module.exports.register = function() {
  KEYS.forEach(registerKey);
};

module.exports.unregister = function() {
  KEYS.forEach(function(key) {
    globalShortcut.unregister(key);
  });
};

function registerKey(key) {
  var callback = onKeyDown.bind(null, key);
  if (!globalShortcut.register(key, callback)) {
    process.stderr.write('failed to bind key=' + key + '\n');
  }
}

function onKeyDown(key) {
  BrowserWindow.getAllWindows().forEach(function (win) {
    win.webContents.send(key);
  });
}