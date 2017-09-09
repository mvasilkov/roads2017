/// <reference path="roads.d.ts" />

const BEFORE_DANGER = 960
const DANGER_DURATION = 1250
const DANGER_PAUSE_EASY = 2400
const DANGER_PAUSE_HARD = 125

let colOffset = -HALF_COLUMN_WIDTH
let scrollSpeed = 20
let newHeight = STARTING_HEIGHT

let nextDanger: Danger = NO_DANGER
let doDanger = false
let dangerTimer = NaN
let dangerPause = DANGER_PAUSE_EASY

function update() {
    if ((colOffset += scrollSpeed) >= COLUMN_WIDTH) {
        colOffset -= COLUMN_WIDTH
        colEnd = colBegin
        colBegin = colBegin.next!
        colEnd.height = newHeight
        colEnd.danger = doDanger ? nextDanger : NO_DANGER
    }

    updatePlayer()
}

function initializeDanger() {
    let col = colBegin
    for (let i = 0; i < COLUMN_COUNT; ++i) {
        col.danger = NO_DANGER
        col = col.next!
    }

    nextDanger = NO_DANGER
    doDanger = false
    dangerTimer = setTimeout(scheduleDanger, dangerPause = DANGER_PAUSE_EASY)
}

function scheduleDanger() {
    nextDanger = getDanger()
    dangerTimer = setTimeout(dangerBegin, BEFORE_DANGER)
}

function dangerBegin() {
    doDanger = true
    dangerTimer = setTimeout(dangerEnd, DANGER_DURATION * (0.9 + Math.random()))
}

function dangerEnd() {
    doDanger = false
    nextDanger = NO_DANGER
    dangerTimer = setTimeout(scheduleDanger, dangerPause = Math.max(dangerPause - 200, DANGER_PAUSE_HARD))
}

function getDanger(): Danger {
    return {
        a: 0,
        b: 100,
        a2: 440,
        b2: 540,
    }
}

let then = -1
let t = 0

function mainloop(now: number) {
    requestAnimationFrame(mainloop)

    if (pointer.dragging) {
        newHeight = clamp(CANVAS_HEIGTH - pointer.y, 20, CANVAS_HEIGTH - 60)
    }

    if (then == -1) {
        then = now
    }
    t += (now - then) * 0.001
    then = now

    while (t > 0) {
        t -= T
        update()
    }

    paint(now, t / T + 1)
}
