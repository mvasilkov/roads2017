/// <reference path="roads.d.ts" />

let music: HTMLAudioElement | null = null

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

function initMainMenu() {
    if (isMobile) document.body.className = 'mobile'

    const musicToggle = <HTMLInputElement>document.getElementById('m')
    const soundToggle = <HTMLInputElement>document.getElementById('s')

    musicToggle.addEventListener('change', event => {
        if (!music) return

        if (musicToggle.checked) {
            music.currentTime = 0
            music.play()
        }
        else music.pause()
    })

    soundToggle.addEventListener('change', event => {
        aa.on = soundToggle.checked
    })

    container.removeChild(loadingScreen)
    if (music) music.play()
}

function init() {
    scrollAccel = 0
    initializePlayer()
    initializeDanger()
}

handleResize()

initMainMenu()
initializeCanvas()

requestAnimationFrame(mainloop)
