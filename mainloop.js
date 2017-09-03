"use strict";
/// <reference path="roads.d.ts" />
var colOffset = -HALF_COLUMN_WIDTH;
var scrollSpeed = 4;
var newHeight = STARTING_HEIGHT;
function update() {
    if ((colOffset += scrollSpeed) >= HALF_COLUMN_WIDTH) {
        colOffset -= COLUMN_WIDTH;
        colEnd = colBegin;
        colBegin = colBegin.next;
        colEnd.height = newHeight;
    }
}
var then = -1;
var t = 0;
function mainloop(now) {
    requestAnimationFrame(mainloop);
    if (pointer.dragging) {
        newHeight = CANVAS_HEIGTH - pointer.y;
    }
    if (then == -1) {
        then = now;
    }
    t += (now - then) * 0.001;
    then = now;
    while (t > 0) {
        t -= T;
        update();
    }
    paint(t / T + 1);
}
initializeCanvas();
requestAnimationFrame(mainloop);
