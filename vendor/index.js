/**
 * AJAX request.
 *
 * @param {String} url
 * @return {NSString}
 */
function request(url) {
  var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  return NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
}

/**
 * Convert NSString to String.
 *
 * @param {NSString} response
 * @return {String}
 */
function toString(response) {
  return NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding);
}

/**
 * Fill layer with Image Data
 *
 * @param {Layer} layer
 * @param {Image} image
 * @return {Fill}
 */
function setImage(layer, image) {
  var version = sketchVersion()
  var fill = layer.style().fills().firstObject();
  fill.setFillType(4);
  fill.setPatternFillType(0);
  if (version > 370) {
    var imageData = MSImageData.alloc().initWithImage_convertColorSpace(image, false)
    fill.setImage(imageData)
  } else if (version < 350) {
    fill.setPatternImage_collection(image, fill.documentData().images())
  } else {
    fill.setPatternImage(image)
  }
  fill.setPatternFillType(0);
  return fill;
}

/**
 * Random number between 0 and limit
 *
 * @param {Number} limit
 * @return {Number}
 */
function random(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

/**
 * Determine if Str ends with a suffix
 *
 * @param {String} str
 * @param {String} suffix
 * @return {Boolean}
 */
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


/**
 * Sketch Version as a number
 *
 * @return {Number}
 */
function sketchVersion() {
  var version = NSBundle.mainBundle().objectForInfoDictionaryKey('CFBundleShortVersionString')
  var versionNumber = version.stringByReplacingOccurrencesOfString_withString('.', '') + ''
  if (versionNumber.length < 3) versionNumber += '0'
  return parseInt(versionNumber)
}
