var BrowserWindow = require('browser-window');
var electronApp = require('app');
var htmlApp = require('../app/main');
var keyboardAcceleratorProxy = require('./keyboard-accelerator-proxy');
var Menu = require('menu');
var path = require('path');
var windowTemplate = require('./window-template');
var menuTemplate = require('./menu-template');

var win = null;

function main(argv) {
  electronApp.on('ready', onAppReady);
  electronApp.on('window-all-closed', onAllWindowsClosed);
  electronApp.on('quit', onAppQuit);
}

function onAppReady() {
  initAppMenu();
  keyboardAcceleratorProxy.register();
  launchWin();
}

function initAppMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

function launchWin() {
  win = new BrowserWindow(windowTemplate);
  win.webContents.on('devtools-opened', function() {
    win.webContents.addWorkSpace(path.resolve(__dirname, '..'));
  });
  win.on('closed', onWinClosed);
  htmlApp.init().then(function() {
    win.loadURL(htmlApp.url);
  });
}

function onWinClosed() {
  win = null;
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