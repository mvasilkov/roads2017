if (!Element.prototype.requestFullscreen) {
    try {
        Element.prototype.requestFullscreen =
            Element.prototype.mozRequestFullScreen ||
            Element.prototype.msRequestFullscreen ||
            Element.prototype.webkitRequestFullscreen
    }
    catch (err) {
    }
}
