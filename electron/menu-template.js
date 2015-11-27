var app = require('electron').app;
var keyboardAcceleratorProxy = require('./keyboard-accelerator-proxy');

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
    label: '&window',
    submenu: [
      {
        label: '&Zoom in',
        accelerator: 'CmdOrCtrl+=',
        click: proxyKey.bind(null, 'CmdOrCtrl+=')
      },
      {
        label: '&Reset zoom',
        accelerator: 'CmdOrCtrl+0',
        click: proxyKey.bind(null, 'CmdOrCtrl+0')
      },
      {
        label: 'Zoom &out',
        accelerator: 'CmdOrCtrl+-',
        click: proxyKey.bind(null, 'CmdOrCtrl+-')
      },
      {
        label: '&Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  },
  {
    label: '&dev',
    submenu: [
      {
        label: '&Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWin) {
          if (focusedWin) {
            focusedWin.webContents.reloadIgnoringCache();
          }
        }
      },
      {
        label: 'Toggle &DevTools',
        accelerator: 'F12',
        click: function(item, focusedWin) {
          if (focusedWin) {
            focusedWin.toggleDevTools();
          }
        }
      }
    ]
  }
];

function proxyKey(accelerator, item, focusedWin) {
  keyboardAcceleratorProxy.proxyKey(accelerator, focusedWin);
}