/// <reference path="roads.d.ts" />

function initializeCanvas() {
    canvas.translate(0, CANVAS_HEIGTH)
    canvas.scale(1, -1)
    canvas.translate(0.5, 0.5)
}

function paintColumn(x: number, col: LL) {
    canvas.beginPath()
    canvas.rect(x - HALF_COLUMN_WIDTH, 0, COLUMN_WIDTH, col.height)

    canvas.lineWidth = 1
    canvas.strokeStyle = '#2196F3'
    canvas.stroke()

    canvas.fillStyle = '#000'
    if (col.danger.a != -1) {
        canvas.fillRect(x - HALF_COLUMN_WIDTH, col.danger.a, COLUMN_WIDTH, col.danger.b)
    }
    if (col.danger.a2 != -1) {
        canvas.fillRect(x - HALF_COLUMN_WIDTH, col.danger.a2, COLUMN_WIDTH, col.danger.b2)
    }
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
        paintColumn(x, col)
        paintEasing(x, col.height, col.next!.height)
        col = col.next!
        x += COLUMN_WIDTH
    }
}

function paintImpendingDoom(danger: Danger) {
    canvas.fillStyle = '#EF2929'
    if (danger.a != -1) {
        canvas.fillRect(0, danger.a, IMPENDING_DOOM_WIDTH, danger.b)
        canvas.fillRect(CANVAS_WIDTH - IMPENDING_DOOM_WIDTH, danger.a, IMPENDING_DOOM_WIDTH, danger.b)
    }
    if (danger.a2 != -1) {
        canvas.fillRect(0, danger.a2, IMPENDING_DOOM_WIDTH, danger.b2)
        canvas.fillRect(CANVAS_WIDTH - IMPENDING_DOOM_WIDTH, danger.a2, IMPENDING_DOOM_WIDTH, danger.b2)
    }
}

function paint(now: number, t: number) {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH)
    paintColumns(-(colOffset + t * scrollSpeed))
    paintPlayer(t)
    if (nextDanger !== NO_DANGER && (now & 0xFF) < 0x7F) {
        paintImpendingDoom(nextDanger)
    }
}
