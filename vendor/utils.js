/**
 * AJAX request.
 *
 * @param {String} url
 * @return {NSString}
 */
function request(url) {
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
    return response;
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
 * @param {Data} data
 * @return {Fill}
 */
function setImage(layer, data) {
    var image = NSImage.alloc().initWithData(data);
    var fill = layer.style().fills().firstObject();
    fill.setFillType(4);
    fill.setPatternImage(image);
    fill.setPatternFillType(1);
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
