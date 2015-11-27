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
  KEYS.forEach(register);
};

module.exports.unregister = function() {
  KEYS.forEach(function(key) {
    globalShortcut.unregister(key);
  });
};

function register(key) {
  var callback = onKeyDown.bind(null, key);
  if (!globalShortcut.register(key, callback)) {
    process.stderr.write('failed to bind key=' + key + '\n');
  }
}

function onKeyDown(key) {
  var win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.send(key);
  }
}