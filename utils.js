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
 */
function setImage(layer, data) {
    var image = NSImage.alloc().initWithData(data);
    var fill = layer.style().fills().firstObject();
    fill.setFillType(4);
    fill.setPatternImage(image);
    fill.setPatternFillType(1);
}
