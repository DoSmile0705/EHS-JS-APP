function getURLBasedOnContentType(attachment, elseReturn) {
    if (attachment.contentType == "image/jpeg" | "image/png" | "image/webp")
        return attachment.url
    else return elseReturn
}

module.exports = { getURLBasedOnContentType };