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
var IMPENDING_DOOM_WIDTH = COLUMN_WIDTH / 3;
/* Utility functions */
function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}
function easeInOutQuad(t) {
    return t < 0.5 ?
        2 * t * t :
        2 * t * (2 - t) - 1;
}
function clamp(x, a, b) {
    return (x < a) ? a : (x > b) ? b : x;
}
/* Initialization */
var container = document.getElementById('container');
var hcanvas = document.getElementById('canvas');
var canvas = hcanvas.getContext('2d');
/* Handle resize */
var aspect = 16 / 9;
var cscale = 1;
var transformProperty = 'transform';
if (!(transformProperty in container.style)) {
    transformProperty = 'webkitTransform';
}
function setSize(x, property, value) {
    x.style[property] = value + "px";
}
function handleResize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (w / h > aspect)
        w = h * aspect;
    else
        h = w / aspect;
    cscale = CANVAS_WIDTH / w;
    setSize(container, 'width', w);
    setSize(container, 'height', h);
    setSize(container, 'left', 0.5 * (window.innerWidth - w));
    setSize(container, 'top', 0.5 * (window.innerHeight - h));
    var scale = 0.5 * w / CANVAS_WIDTH;
    var scale3d = "scale3d(" + scale + "," + scale + ",1)";
    startScreen.style[transformProperty] = scale3d;
    endScreen.style[transformProperty] = scale3d;
}
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);
hcanvas.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});
