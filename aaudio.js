"use strict";
/// <reference path="roads.d.ts" />
var AAudio = /** @class */ (function () {
    function AAudio() {
        this.on = true;
        this.sounds = {};
    }
    AAudio.prototype.add = function (name, count, settings) {
        this.sounds[name] = {
            tick: 0,
            count: count,
            pool: [],
        };
        for (var i = 0; i < count; ++i) {
            var audio = new Audio;
            audio.src = window.SOUND(settings);
            this.sounds[name].pool.push(audio);
        }
    };
    AAudio.prototype.play = function (name) {
        if (!this.on)
            return;
        var sound = this.sounds[name];
        sound.pool[sound.tick].play();
        if (++sound.tick >= sound.count) {
            sound.tick = 0;
        }
    };
    return AAudio;
}());
var aa = new AAudio;
var isMobile = navigator.userAgent.match(/Android|iPhone|iPad/i) != null;
if (isMobile) {
    aa.on = false;
}
else {
    aa.add('new', 1, [0, , 0.0108, 0.3989, 0.4412, 0.444, , , , , , 0.5147, 0.6024, , , , , , 1, , , , , 0.5]);
    aa.add('jmp', 1, [0, , 0.2086, , 0.2238, 0.3305, , 0.236, , , , , , 0.0687, , , , , 0.5894, , , 0.0532, , 0.5]);
    aa.add('hit', 1, [1, , 0.2548, , 0.1007, 0.7539, 0.0996, -0.5302, , , , , , 0.7769, -0.4436, , , , 1, , , , , 0.5]);
    aa.add('die', 1, [1, 0.0013, 0.3576, 0.0681, 0.8007, 0.5117, , -0.3453, 0.0049, 0.148, -0.2563, -0.2717, 0.2608, , -0.3543, -0.1884, -0.0106, -0.0281, 0.9971, -0.6629, -0.7531, 0.0097, -0.0086, 0.5]);
}
