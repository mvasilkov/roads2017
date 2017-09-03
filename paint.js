"use strict";
/// <reference path="roads.d.ts" />
function initializeCanvas() {
    canvas.translate(0, CANVAS_HEIGTH);
    canvas.scale(1, -1);
    canvas.translate(0.5, 0.5);
}
function paintColumn(x, height) {
    canvas.beginPath();
    canvas.rect(x - HALF_COLUMN_WIDTH, 0, COLUMN_WIDTH, height);
    canvas.lineWidth = 1;
    canvas.strokeStyle = '#2196F3';
    canvas.stroke();
}
function paintEasing(x, a, b) {
    canvas.beginPath();
    canvas.moveTo(x, a);
    for (var i = 0; i <= EASING_POINTS; ++i) {
        var t_1 = i * EASING_STEP;
        canvas.lineTo(x + t_1 * COLUMN_WIDTH, lerp(a, b, easeInOutQuad(t_1)));
    }
    canvas.lineWidth = 1;
    canvas.strokeStyle = '#E91E63';
    canvas.stroke();
}
function paintColumns(x) {
    var c = colBegin;
    while (x - HALF_COLUMN_WIDTH < CANVAS_WIDTH) {
        paintColumn(x, c.height);
        paintEasing(x, c.height, c.next.height);
        c = c.next;
        x += COLUMN_WIDTH;
    }
}
function paint(t) {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    paintColumns(-(colOffset + t * scrollSpeed));
}
