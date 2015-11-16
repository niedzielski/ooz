var BrowserWindow = require('browser-window');
var electronApp = require('app');
var htmlApp = require('../app/main');
var keyboardAccelerators = require('./keyboard-accelerators');
var Menu = require('menu');
var util = require('./util');
var windowTemplate = require('./window');

var appWindow = null;

function main(argv) {
  electronApp.on('ready', onAppReady);
  electronApp.on('window-all-closed', onAllWindowsClosed);
  electronApp.on('quit', onAppQuit);
}

function onAppReady() {
  hideAppMenu();
  keyboardAccelerators.register();
  launchAppWindow();
}

function hideAppMenu() {
  Menu.setApplicationMenu(null);
}

function launchAppWindow() {
  appWindow = new BrowserWindow(windowTemplate);
  appWindow.on('closed', onAppWindowClosed);
  htmlApp.init().then(function() {
    appWindow.loadUrl(htmlApp.url);
  });
}

function onAppWindowClosed() {
  appWindow = null;
}

function onAllWindowsClosed() {
  // On OS X, it's common for applications to stay active until the user quits
  // explicitly with Cmd + Q.
  if (!util.isMac()) {
    electronApp.quit();
  }
}

function onAppQuit() {
  htmlApp.deinit();
  keyboardAccelerators.unregister();
}

require.main === module && main(process.argv);
