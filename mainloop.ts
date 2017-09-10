/// <reference path="roads.d.ts" />

let colOffset = -HALF_COLUMN_WIDTH
let scrollSpeed = 20
let scrollAccel = 0
let newHeight = STARTING_HEIGHT

function update() {
    if ((colOffset += (scrollSpeed + scrollAccel)) >= COLUMN_WIDTH) {
        colOffset -= COLUMN_WIDTH
        colEnd = colBegin
        colBegin = colBegin.next!
        // colEnd.height = newHeight
        colEnd.danger = doDanger ? nextDanger : NO_DANGER
    }

    if (pointer.dragging) {
        const col = getColumn(pointer.x)
        col.height = newHeight
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

    paint(now, t / T + 1)
}
