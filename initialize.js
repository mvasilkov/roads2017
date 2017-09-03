"use strict";
/// <reference path="roads.d.ts" />
/* Constants */
var CANVAS_WIDTH = 960;
var CANVAS_HEIGTH = 540;
var COLUMN_WIDTH = 48;
var COLUMN_COUNT = (CANVAS_WIDTH / COLUMN_WIDTH) + 2;
var STARTING_HEIGHT = CANVAS_HEIGTH * 0.25;
var EASING_POINTS = 10;
var EASING_STEP = Math.pow(EASING_POINTS, -1);
var T = 0.02;
/* Other constants */
var HALF_COLUMN_WIDTH = COLUMN_WIDTH * 0.5;
/* Utility functions */
function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}
function easeInOutQuad(t) {
    return t < 0.5 ?
        2 * t * t :
        2 * t * (2 - t) - 1;
}
var container = document.getElementById('container');
var canvas = document.getElementById('canvas').getContext('2d');
var cscale = 1;
