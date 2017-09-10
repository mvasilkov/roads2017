"use strict";
/// <reference path="roads.d.ts" />
var loadingScreen = document.getElementById('load');
var startScreen = document.getElementById('home');
var startButton = document.getElementById('start');
var endScreen = document.getElementById('end');
var resetButton = document.getElementById('reset');
startScreen.addEventListener('mousedown', cancel);
startScreen.addEventListener('touchstart', cancel);
startButton.addEventListener('mousedown', start);
startButton.addEventListener('touchstart', start);
endScreen.addEventListener('mousedown', cancel);
endScreen.addEventListener('touchstart', cancel);
resetButton.addEventListener('mousedown', reset);
resetButton.addEventListener('touchstart', reset);
function cancel(event) {
    var target = event.target;
    if (target.tagName == 'INPUT' || target.tagName == 'LABEL' || target.id == 'start' || target.id == 'reset') {
        event.stopPropagation();
    }
}
function start() {
    container.removeChild(startScreen);
    aa.play('new');
    if ((isMobile || cscale > 1) && document.body.requestFullscreen) {
        document.body.requestFullscreen();
    }
    init();
}
function gameover() {
    document.getElementById('dist').innerHTML = formatDistance(distance);
    endScreen.style.display = 'block';
    aa.play('win');
    if (dangerTimer) {
        clearTimeout(dangerTimer);
    }
}
function reset() {
    endScreen.style.display = 'none';
    aa.play('new');
    pointer.dragging = false;
    init();
}
