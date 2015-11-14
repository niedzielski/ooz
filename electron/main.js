var app = require('app');
var BrowserWindow = require('browser-window');
var keyboardAccelerators = require('./keyboard-accelerators');
var Menu = require('menu');
var path = require('path');
var url = require('url');
var util = require('./util');
var windowTemplate = require('./window');

var DEFAULT_URL = url.format({
  protocol: 'file',
  pathname: path.resolve(__dirname, '..', 'app', 'main.html'),
  slashes: true
});

var appWindow = null;

function main(argv) {
  var url = argv[2] || DEFAULT_URL;
  app.on('ready', onAppReady.bind(null, url));
  app.on('window-all-closed', onAllWindowsClosed);
  app.on('quit', onAppQuit);
}

function onAppReady(url) {
  hideAppMenu();
  keyboardAccelerators.register();
  launchAppWindow(url);
}

function hideAppMenu() {
  Menu.setApplicationMenu(null);
}

function launchAppWindow(url) {
  appWindow = new BrowserWindow(windowTemplate);
  appWindow.on('closed', onAppWindowClosed);
  appWindow.loadUrl(url);
}

function onAppWindowClosed() {
  appWindow = null;
}

function onAllWindowsClosed() {
  // On OS X, it's common for applications to stay active until the user quits
  // explicitly with Cmd + Q.
  if (!util.isMac()) {
    app.quit();
  }
}

function onAppQuit() {
  keyboardAccelerators.unregister();
}

require.main === module && main(process.argv);