var BrowserWindow = require('browser-window');
var app = require('app');
var keyboardAcceleratorProxy = require('./keyboard-accelerator-proxy');
var Menu = require('menu');
var path = require('path');
var windowTemplate = require('./window-template');
var menuTemplate = require('./menu-template');
var minimist = require('minimist');

var win = null;

function main(argv) {
  var url = minimist(argv.slice(2)).url;
  process.stdout.write(url + '\n');
  app.on('ready', onAppReady.bind(null, url));
  app.on('window-all-closed', onAllWindowsClosed);
  app.on('quit', onAppQuit);
}

function onAppReady(url) {
  initAppMenu();
  keyboardAcceleratorProxy.register();
  launchWin(url);
}

function initAppMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

function launchWin(url) {
  win = new BrowserWindow(windowTemplate);
  win.webContents.on('devtools-opened', function() {
    win.webContents.addWorkSpace(path.resolve(__dirname, '..'));
  });
  win.on('closed', onWinClosed);
  win.loadURL(url);
}

function onWinClosed() {
  win = null;
}

function onAllWindowsClosed() {
  // On OS X, it's common for applications to stay active until the user quits
  // explicitly with Cmd + Q.
  if (!isMac()) {
    app.quit();
  }
}

function onAppQuit() {
  keyboardAcceleratorProxy.unregister();
}

function isMac() {
  return process.platform === 'darwin';
}

require.main === module && main(process.argv);