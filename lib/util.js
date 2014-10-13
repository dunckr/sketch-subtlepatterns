function setImage(layer, image) {
    var fill = layer.style().fills().firstObject();
    fill.setFillType(4);
    fill.setPatternFillType(0);
    fill.setPatternImage(image);
    fill.setPatternFillType(0);
}

function random(limit) {
    return Math.floor(Math.random() * limit) + 1;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function getDir(name) {
    var scriptPath = sketch.scriptPath;
    var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + "/";
    var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, "");
    return sketchPluginsPath + pluginFolder + name;
}

function getFilePath(dir, type) {
    var fileManager = [NSFileManager defaultManager];
    var imagesFileNames = [fileManager contentsOfDirectoryAtPath: dir error: nil],
        imgLen = [imagesFileNames count];
    var ran = random(imgLen);
    var fileName = imagesFileNames[ran];
    if (endsWith(fileName, 'png')) {
        return fileName;
    }
}

function loadImage() {
    var dataPath = 'SubtlePatterns/';
    var imagesPath = getDir(dataPath);
    var fullPath = imagesPath + getFilePath(imagesPath, '.png')
    return [[NSImage alloc] initWithContentsOfFile: fullPath];    
}

function setSelection() {
    var loop = [selection objectEnumerator];    
    while (layer = [loop nextObject]) {
        var image = loadImage();
        setImage(layer, image);
    }
}