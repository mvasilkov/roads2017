/// <reference path="roads.d.ts" />

const R = 20,
    MINIMUM_X_VELOCITY = 0.1,
    MINIMUM_Y_VELOCITY = 3,
    ROLLING_FRICTION = 0.01,
    IMPACT_FRICTION = 0.25

let x = CANVAS_WIDTH * 0.25,
    vx = 4,
    y = CANVAS_HEIGTH * 0.75,
    vy = 0,
    ay = -1

const normal = new Vec2
const a = new Vec2
const b = new Vec2
let yTouch = 0

function updatePlayer() {
    y = y + vy
    vy = vy + ay
    x = x + vx

    const col = getColumn(x)
    const t = (colOffset + HALF_COLUMN_WIDTH) / COLUMN_WIDTH
    a.set(t * COLUMN_WIDTH, yTouch = lerp(col.height, col.next!.height, easeInOutQuad(t)))
    b.set((t + 0.05) * COLUMN_WIDTH, lerp(col.height, col.next!.height, easeInOutQuad(t + 0.05)))
    normal.setNormal(a, b)

    if (y - R < yTouch && vy < 0) {
        const v = new Vec2(vx, vy)
        const v2 = new Vec2
        v2.setMultiplyScalar(normal, v.dot(normal) * 2)
        v.subtract(v2)
        vx = (1 - IMPACT_FRICTION) * v.x
        vy = (1 - IMPACT_FRICTION) * v.y
    }

    if (y - R < 0 && vy < 0) {
        vx = (1 - ROLLING_FRICTION) * vx
        vy = -(1 - IMPACT_FRICTION) * vy
        if (Math.abs(vy) < MINIMUM_Y_VELOCITY) {
            vy = 0
        }
        if (Math.abs(vx) < MINIMUM_X_VELOCITY) {
            vx = 0
        }
    }

    if (x + R >= CANVAS_WIDTH && vx > 0) {
        vx = -(1 - IMPACT_FRICTION) * vx
    }

    if (x - R < 0 && vx < 0) {
        vx = -(1 - IMPACT_FRICTION) * vx
    }
}

function paintPlayer(t: number) {
    canvas.fillStyle = '#FF5722'
    canvas.fillRect(x - 5, yTouch - 5, 10, 10)

    canvas.beginPath()
    canvas.moveTo(x, yTouch)
    canvas.lineTo(x + normal.x * 40, yTouch + normal.y * 40)

    canvas.strokeStyle = '#FF5722'
    canvas.stroke()

    canvas.beginPath()
    canvas.arc(x + vx * t, y + vy * t, R, 0, Math.PI * 2)

    canvas.fillStyle = '#03A9F4'
    canvas.fill()
}
