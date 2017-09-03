/// <reference path="roads.d.ts" />

function initializeCanvas() {
    canvas.translate(0, CANVAS_HEIGTH)
    canvas.scale(1, -1)
    canvas.translate(0.5, 0.5)
}

function paintColumn(x: number, height: number) {
    canvas.beginPath()
    canvas.rect(x - COLUMN_WIDTH * 0.5, 0, COLUMN_WIDTH, height)

    canvas.lineWidth = 1
    canvas.strokeStyle = '#2196F3'
    canvas.stroke()
}

function paintColumns(x: number) {
    let c = colBegin
    while (x < CANVAS_WIDTH) {
        paintColumn(x, c.height)
        c = c.next!
        x += COLUMN_WIDTH
    }
}
