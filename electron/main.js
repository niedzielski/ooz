var BrowserWindow = require('browser-window');
var electronApp = require('app');
var htmlApp = require('../app/main');
var keyboardAcceleratorProxy = require('./keyboard-accelerator-proxy');
var Menu = require('menu');
var path = require('path');
var windowTemplate = require('./window-template');
var menuTemplate = require('./menu-template');

var appWindow = null;

function main(argv) {
  electronApp.on('ready', onAppReady);
  electronApp.on('window-all-closed', onAllWindowsClosed);
  electronApp.on('quit', onAppQuit);
}

function onAppReady() {
  initAppMenu();
  keyboardAcceleratorProxy.register();
  launchAppWindow();
}

function initAppMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

function launchAppWindow() {
  appWindow = new BrowserWindow(windowTemplate);
  appWindow.webContents.on('devtools-opened', function() {
    appWindow.webContents.addWorkSpace(path.resolve(__dirname, '..'));
  });
  appWindow.on('closed', onAppWindowClosed);
  htmlApp.init().then(function() {
    appWindow.loadURL(htmlApp.url);
  });
}

function onAppWindowClosed() {
  appWindow = null;
}

function onAllWindowsClosed() {
  // On OS X, it's common for applications to stay active until the user quits
  // explicitly with Cmd + Q.
  if (!isMac()) {
    electronApp.quit();
  }
}

function onAppQuit() {
  htmlApp.deinit();
  keyboardAcceleratorProxy.unregister();
}

function isMac() {
  return process.platform === 'darwin';
}

require.main === module && main(process.argv);
