var NativeImage = require('native-image');
var path = require('path');

var iconPath = path.resolve(__dirname, 'resources/app-icon.png');

module.exports = {
  width: 800,
  height: 600,
  icon: NativeImage.createFromPath(iconPath)
};