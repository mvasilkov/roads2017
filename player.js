"use strict";
/// <reference path="roads.d.ts" />
var R = 20;
var R_CONTACT = R * 1.25;
var MINIMUM_Y_VELOCITY = 4;
var MAXIMUM_Y_VELOCITY = 30;
var IMPACT_FRICTION = 0.5;
var G = -1;
var x = CANVAS_WIDTH * 0.25;
var y = CANVAS_HEIGTH * 0.75;
var vy = 0;
var normal = new Vec2(0, 1);
var a = new Vec2;
var b = new Vec2;
var yTouch = 0;
var angle = 0;
var targetAngle = 0;
function updatePlayer() {
    y += vy;
    vy += G;
    var col = getColumn(x);
    var t = (colOffset + HALF_COLUMN_WIDTH) / COLUMN_WIDTH;
    a.set(t * COLUMN_WIDTH, yTouch = lerp(col.height, col.next.height, easeInOutQuad(t)));
    if (y - R_CONTACT < yTouch) {
        b.set((t + 0.05) * COLUMN_WIDTH, lerp(col.height, col.next.height, easeInOutQuad(t + 0.05)));
        normal.setNormal(a, b);
    }
    if (yTouch < 0)
        yTouch = 0;
    if (y - R < yTouch) {
        vy += (yTouch + R - y) * IMPACT_FRICTION;
        y = yTouch + R;
        if (vy > MAXIMUM_Y_VELOCITY) {
            vy = MAXIMUM_Y_VELOCITY;
        }
        else if (vy < 0) {
            vy *= -IMPACT_FRICTION;
        }
        if (Math.abs(vy) < MINIMUM_Y_VELOCITY) {
            vy = 0;
        }
    }
}
function paintPlayer(t) {
    targetAngle = Math.atan2(normal.y, normal.x) - Math.PI * 0.5;
    angle += clamp(targetAngle - angle, -Math.PI * 0.05, Math.PI * 0.05);
    canvas.save();
    canvas.translate(x, y + (vy < 0 ? vy - G : vy) * t);
    canvas.rotate(angle);
    canvas.fillStyle = '#CDDC39';
    canvas.fillRect(-30, -20, 60, 40);
    canvas.restore();
}
