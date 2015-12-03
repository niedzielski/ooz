var app = require('electron').app;

module.exports = [
  {
    label: '&ooz',
    submenu: [
      {
        label: '&Settings',
        accelerator: 'CmdOrCtrl+,',
        click: proxyAccelerator
      },
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
        click: proxyAccelerator
      },
      {
        label: '&Reset zoom',
        accelerator: 'CmdOrCtrl+0',
        click: proxyAccelerator
      },
      {
        label: 'Zoom &out',
        accelerator: 'CmdOrCtrl+-',
        click: proxyAccelerator
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
        click: function(item, win) {
          win && win.webContents.reloadIgnoringCache();
        }
      },
      {
        label: 'Toggle &DevTools',
        accelerator: 'F12',
        click: function(item, win) {
          win && win.toggleDevTools();
        }
      }
    ]
  }
];

function proxyAccelerator(item, win) {
  win && win.webContents.send(item.accelerator);
}