var app = require('electron').app;

module.exports = [
  {
    label: '&ooz',
    submenu: [
      {
        label: '&Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {
          app.quit();
        }
      }
    ]
  },
  {
    label: '&Programmer Tools',
    submenu: [
      {
        label: '&Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.reloadIgnoringCache();
          }
        }
      },
      {
        label: 'Toggle &DevTools',
        accelerator: 'F12',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      }
    ]
  }
];