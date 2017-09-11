/// <reference path="roads.d.ts" />

const loadingScreen = <HTMLElement>document.getElementById('load')
const startScreen = <HTMLElement>document.getElementById('home')
const startButton = <HTMLElement>document.getElementById('start')
const endScreen = <HTMLElement>document.getElementById('end')
const resetButton = <HTMLElement>document.getElementById('reset')

startScreen.addEventListener('mousedown', cancel)
startScreen.addEventListener('touchstart', cancel)

startButton.addEventListener('mousedown', start)
startButton.addEventListener('touchstart', start)

endScreen.addEventListener('mousedown', cancel)
endScreen.addEventListener('touchstart', cancel)

resetButton.addEventListener('mousedown', reset)
resetButton.addEventListener('touchstart', reset)

function cancel(event: Event) {
    const target = <HTMLElement>event.target
    if (target.tagName == 'INPUT' || target.tagName == 'LABEL' || target.id == 'start' || target.id == 'reset') {
        event.stopPropagation()
    }
}

function start() {
    container.removeChild(startScreen)

    aa.play('new')

    if ((isMobile || cscale > 1) && document.body.requestFullscreen) {
        document.body.requestFullscreen()
    }

    init()
}

function gameover() {
    document.getElementById('dist')!.innerHTML = formatDistance(distance)

    endScreen.style.display = 'block'

    aa.play('die')

    doDanger = false
    nextDanger = NO_DANGER
    if (dangerTimer) {
        clearTimeout(dangerTimer)
    }

    /* Randomize car color */
    CAR_COLOR[2] = CAR_VARIANTS[Math.floor(Math.random() * 3)]
    carSprite = makeSprite2(60, 39, car, CAR_COLOR)
    wheelSprites[0] = wheelSprites[4] = makeSprite2(24, 24, wheel0, CAR_COLOR)
    wheelSprites[1] = makeSprite2(24, 24, wheel1, CAR_COLOR)
    wheelSprites[2] = makeSprite2(24, 24, wheel2, CAR_COLOR)
    wheelSprites[3] = makeSprite2(24, 24, wheel3, CAR_COLOR)
}

function reset() {
    endScreen.style.display = 'none'

    aa.play('new')

    pointer.dragging = false

    init()
}
