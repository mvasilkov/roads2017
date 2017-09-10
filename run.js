"use strict";
/// <reference path="roads.d.ts" />
var music = null;
/*
function initMusic() {
    const synth = new sonant
    for (let i = 0; i < 8; ++i) {
        synth.generate(i)
    }
    music = synth.createAudio()
    music.loop = true
    music.volume = 0.9
}

if (!isMobile) {
    try {
        initMusic()
    }
    catch (err) {
    }
}
*/
function initMainMenu() {
    if (isMobile)
        document.body.className = 'mobile';
    var musicToggle = document.getElementById('m');
    var soundToggle = document.getElementById('s');
    musicToggle.addEventListener('change', function (event) {
        if (!music)
            return;
        if (musicToggle.checked) {
            music.currentTime = 0;
            music.play();
        }
        else
            music.pause();
    });
    soundToggle.addEventListener('change', function (event) {
        aa.on = soundToggle.checked;
    });
    container.removeChild(loadingScreen);
    if (music)
        music.play();
}
function init() {
    scrollAccel = 0;
    initializePlayer();
    initializeDanger();
}
handleResize();
initMainMenu();
initializeCanvas();
requestAnimationFrame(mainloop);
