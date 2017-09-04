/// <reference path="roads.d.ts" />

function initializeCanvas() {
    canvas.translate(0, CANVAS_HEIGTH)
    canvas.scale(1, -1)
    canvas.translate(0.5, 0.5)
}

function paintColumn(x: number, height: number) {
    canvas.beginPath()
    canvas.rect(x - HALF_COLUMN_WIDTH, 0, COLUMN_WIDTH, height)

    canvas.lineWidth = 1
    canvas.strokeStyle = '#2196F3'
    canvas.stroke()
}

function paintEasing(x: number, a: number, b: number) {
    canvas.beginPath()
    canvas.moveTo(x, a)

    for (let i = 0; i <= EASING_POINTS; ++i) {
        const t = i * EASING_STEP
        canvas.lineTo(x + t * COLUMN_WIDTH, lerp(a, b, easeInOutQuad(t)))
    }

    canvas.lineWidth = 1
    canvas.strokeStyle = '#E91E63'
    canvas.stroke()
}

function paintColumns(x: number) {
    let col = colBegin
    while (x - HALF_COLUMN_WIDTH < CANVAS_WIDTH) {
        paintColumn(x, col.height)
        paintEasing(x, col.height, col.next!.height)
        col = col.next!
        x += COLUMN_WIDTH
    }
}

function paint(t: number) {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH)
    paintColumns(-(colOffset + t * scrollSpeed))
    paintPlayer(t)
}
