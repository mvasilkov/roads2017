"use strict";
/// <reference path="roads.d.ts" />
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vec2.prototype.setTo = function (other) {
        this.x = other.x;
        this.y = other.y;
    };
    Vec2.prototype.setNormal = function (a, b) {
        // perpendicular
        var x = a.y - b.y;
        var y = b.x - a.x;
        // normalize
        var length = Math.sqrt(x * x + y * y);
        if (length < Number.MIN_VALUE) {
            this.x = x;
            this.y = y;
            return;
        }
        var inverseLength = 1 / length;
        this.x = x * inverseLength;
        this.y = y * inverseLength;
    };
    return Vec2;
}());
