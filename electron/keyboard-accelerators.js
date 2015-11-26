var app = require('app');
var globalShortcut = require('global-shortcut');
var BrowserWindow = require('browser-window');
var util = require('./util');

var KEYS_DEV_TOOLS = [
  util.isMac() ? 'Cmd+Alt+I' : 'Ctrl+Shift+I',
  'F12'
];

var KEYS_REFRESH = [
  'CmdOrCtrl+R',
  'F5'
];

var KEYS_QUIT = [
  'CmdOrCtrl+Q'
];

var KEYS_ALL = [].concat.apply(KEYS_DEV_TOOLS, KEYS_REFRESH, KEYS_QUIT);

module.exports.register = function() {
  registerKeys(KEYS_DEV_TOOLS, toggleWindowDevTools);
  registerKeys(KEYS_REFRESH, refreshWindow);
  registerKeys(KEYS_QUIT, quit);
};

module.exports.unregister = function() {
  KEYS_ALL.forEach(function (key) { globalShortcut.unregister(key); });
};

function registerKeys(keys, callback) {
  keys.forEach(function(key) { globalShortcut.register(key, callback); });
}

function toggleWindowDevTools() {
  var win = BrowserWindow.getFocusedWindow();

  if (win) {
    win.toggleDevTools();
  }
}

function refreshWindow() {
  var win = BrowserWindow.getFocusedWindow();

  if (win) {
    win.webContents.reloadIgnoringCache();
  }
}

function quit() {
  app.quit();
}