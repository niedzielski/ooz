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

module.exports.proxyKey = function(key, win) {
  win.webContents.send(key);
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
  var win = BrowserWindow.getFocusedWindow();
  if (win) {
    module.exports.proxyKey(key, win);
  }
}