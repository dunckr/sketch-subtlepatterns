#import 'vendor/utils.js'

// get sketch versionse
function getSketchVersionNumber() {
    const version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"]
    var versionNumber = version.stringByReplacingOccurrencesOfString_withString(".", "") + ""
    while(versionNumber.length != 3) {
        versionNumber += "0"
    }
    return parseInt(versionNumber)
}

var sketchVersion = getSketchVersionNumber()

function setImage(layer, image) {
    var fill = layer.style().fills().firstObject();
    fill.setFillType(4);
    fill.setPatternFillType(0);
    if (sketchVersion > 370) {
		// you need to grab the image with MSImageData like this one
	    var imageData = [[MSImageData alloc] initWithImage: image convertColorSpace: false]]
		fill.setImage(imageData)
	} else if(sketchVersion < 350) {
	    [fill setPatternImage:image collection:[[fill documentData] images]]
	} else {
		fill.setPatternImage(image)
	}
    fill.setPatternFillType(0);
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
    return imagesFileNames[1];
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
