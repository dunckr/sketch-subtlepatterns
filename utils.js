function request(url) {
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
    return response;
}

function toString(response) {
    return NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding);
}

function setImage(layer, data) {
    var image = NSImage.alloc().initWithData(data);
    var fill = layer.style().fills().firstObject();
    fill.setFillType(4);
    fill.setPatternImage(image);
    fill.setPatternFillType(1);
}

function setFillWithUrl(url) {
    var loop = [selection objectEnumerator];
    while (layer = [loop nextObject]) {
        var data = findColorGradient(url);
        setImage(layer, data);
    }
}
