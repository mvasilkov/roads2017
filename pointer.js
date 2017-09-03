"use strict";
/// <reference path="roads.d.ts" />
var pointer = {
    dragging: false,
    x: 0,
    y: 0,
};
function setPointerPosition(event) {
    pointer.x = (event.clientX - container.offsetLeft) * cscale;
    pointer.y = (event.clientY - container.offsetTop) * cscale;
}
addEventListener('mousedown', function (event) {
    event.preventDefault();
    pointer.dragging = true;
    setPointerPosition(event);
});
addEventListener('mousemove', function (event) {
    event.preventDefault();
    setPointerPosition(event);
});
addEventListener('mouseup', function (event) {
    event.preventDefault();
    pointer.dragging = false;
});
document.addEventListener('touchstart', function (event) {
    var target = event.target;
    if (target.tagName != 'INPUT' && target.tagName != 'LABEL') {
        event.preventDefault();
    }
    pointer.dragging = true;
    setPointerPosition(event.targetTouches[0]);
});
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
    setPointerPosition(event.targetTouches[0]);
});
document.addEventListener('touchend', function (event) {
    pointer.dragging = false;
});
document.addEventListener('touchcancel', function (event) {
    pointer.dragging = false;
});
