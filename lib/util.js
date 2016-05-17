@import 'vendor/index.js'

var DATA_PATH = 'SubtlePatterns/';

function getDir(name) {
  var scriptPath = sketch.scriptPath;
  var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + '/';
  var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, '');
  return sketchPluginsPath + pluginFolder + name;
}

function getFilePath(dir, type) {
  var fileManager = NSFileManager.defaultManager();
  var imagesFileNames = fileManager.contentsOfDirectoryAtPath_error(dir, nil);
  var imgLen = imagesFileNames.count();
  var ran = random(imgLen);
  var fileName = imagesFileNames[ran];
  if (endsWith(fileName, 'png')) {
    return fileName;
  }
  return imagesFileNames[1];
}

function loadImage() {
  var imagesPath = getDir(DATA_PATH);
  var fullPath = imagesPath + getFilePath(imagesPath, '.png')
  return NSImage.alloc().initWithContentsOfFile(fullPath);
}

function setSelection() {
  var loop = selection.objectEnumerator();
  while (layer = loop.nextObject()) {
    var data = loadImage();
    setImage(layer, data);
  }
}
