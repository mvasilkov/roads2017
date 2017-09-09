/// <reference path="roads.d.ts" />

let colOffset = -HALF_COLUMN_WIDTH
let scrollSpeed = 20
let newHeight = STARTING_HEIGHT

function update() {
    if ((colOffset += scrollSpeed) >= COLUMN_WIDTH) {
        colOffset -= COLUMN_WIDTH
        colEnd = colBegin
        colBegin = colBegin.next!
        colEnd.height = newHeight
    }

    updatePlayer()
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

    paint(t / T + 1)
}

initializeCanvas()
requestAnimationFrame(mainloop)
