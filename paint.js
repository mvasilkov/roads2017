"use strict";
/// <reference path="roads.d.ts" />
function initializeCanvas() {
    canvas.translate(0, CANVAS_HEIGTH);
    canvas.scale(1, -1);
    // canvas.translate(0.5, 0.5)
    canvas.font = "bold 24px 'Segoe UI','Helvetica Neue',sans-serif";
}
function paintColumn(x, col) {
    canvas.drawImage(columnSprite, x - HALF_COLUMN_WIDTH, -col.height);
    if (col.danger.a != -1) {
        canvas.fillRect(x - HALF_COLUMN_WIDTH, -col.danger.a - col.danger.b, COLUMN_WIDTH + 0.5, col.danger.b);
    }
    if (col.danger.a2 != -1) {
        canvas.fillRect(x - HALF_COLUMN_WIDTH, -col.danger.a2 - col.danger.b2, COLUMN_WIDTH + 0.5, col.danger.b2);
    }
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
    canvas.save();
    canvas.scale(1, -1);
    canvas.fillStyle = dangerPattern;
    var col = colBegin;
    while (x - HALF_COLUMN_WIDTH < CANVAS_WIDTH) {
        paintColumn(x, col);
        // paintEasing(x, col.height, col.next!.height)
        col = col.next;
        x += COLUMN_WIDTH;
    }
    canvas.restore();
}
function paintImpendingDoom(danger) {
    canvas.fillStyle = dangerPattern;
    if (danger.a != -1) {
        canvas.fillRect(0, danger.a, HALF_COLUMN_WIDTH, danger.b);
        canvas.fillRect(CANVAS_WIDTH - HALF_COLUMN_WIDTH, danger.a, HALF_COLUMN_WIDTH, danger.b);
    }
    if (danger.a2 != -1) {
        canvas.fillRect(0, danger.a2, HALF_COLUMN_WIDTH, danger.b2);
        canvas.fillRect(CANVAS_WIDTH - HALF_COLUMN_WIDTH, danger.a2, HALF_COLUMN_WIDTH, danger.b2);
    }
}
function paint(now, t) {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    paintColumns(-(colOffset + t * scrollSpeed));
    paintPlayer(t);
    if (nextDanger !== NO_DANGER && !doDanger && (now & 0xFF) < 0x7F) {
        paintImpendingDoom(nextDanger);
    }
}
