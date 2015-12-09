var webFrame;
var ipc;
initModules();



var app = document.querySelector('#app');
app.baseUrl = '/';
app.addEventListener('dom-change', onAppReady);


function onAppReady() {
  setUpControls();
  setUpPlaylist();
  registerShortcuts();
}

function setUpControls() {
  var controls = document.getElementById('controls');
  controls.addEventListener('play', function() {
    console.log('playing');
  });
  controls.addEventListener('pause', function() {
    console.log('paused');
  });
  controls.addEventListener('previous', function() {
    console.log('previous');
  });
  controls.addEventListener('next', function() {
    console.log('next');
  });
}

function setUpPlaylist() {
  var container = document.getElementById('container');
  var playlist = document.getElementById('playlist');
  window.addEventListener('dragover', function(event) {
    event.preventDefault();
  });
  window.addEventListener('drop', function(event) {
    event.preventDefault();
  });
  container.addEventListener('drop', function(event) {
    playlist.items = [].slice.call(event.dataTransfer.files);
  });
}

function registerShortcuts() {
  if (!ipc) return;

  var controls = document.getElementById('controls');

  ipc.on('CmdOrCtrl+,', function() {
    window.location.href = '/#!settings';
  });

  ipc.on('CmdOrCtrl+=', function() {
    webFrame.setZoomLevel(webFrame.getZoomLevel() + 1);
  });

  ipc.on('CmdOrCtrl+0', function() {
    webFrame.setZoomLevel(0);
  });

  ipc.on('CmdOrCtrl+-', function() {
    webFrame.setZoomLevel(webFrame.getZoomLevel() - 1);
  });

  ipc.on('MediaPreviousTrack', function() {
    controls.previous();
  });
  
  ipc.on('MediaPlayPause', function() {
    controls.toggle();
  });

  ipc.on('MediaNextTrack', function() {
    controls.nextTrack();
  });
  
  ipc.on('MediaStop', function() {
    controls.stop();
  });
}

function initModules() {
  try {
    webFrame = require('electron').webFrame;
    ipc = require('ipc-renderer');
  } catch (e) {
    console.log(e);
  }
}