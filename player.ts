/// <reference path="roads.d.ts" />

const R = 20
const R_CONTACT = R * 1.25
const MINIMUM_Y_VELOCITY = 4
const MAXIMUM_Y_VELOCITY = 30
const IMPACT_FRICTION = 0.5
const G = -1

const x = CANVAS_WIDTH * 0.25
let y = CANVAS_HEIGTH * 0.75
let vy = 0

const normal = new Vec2(0, 1)
const a = new Vec2
const b = new Vec2
let yTouch = 0

let angle = 0
let targetAngle = 0

let isAlive = false
let isFlying = true

let distance = 0

function initializePlayer() {
    y = CANVAS_HEIGTH - 60
    vy = 0
    normal.set(0, 1)
    angle = targetAngle = 0
    isAlive = isFlying = true
    distance = 0
}

function hasCollided(danger: Danger): boolean {
    const { a, b, a2, b2 } = danger
    return (a != -1 && y + R >= a && y - R < a + b) || (a2 != -1 && y + R >= a2 && y - R < a2 + b2)
}

function updatePlayer() {
    if (!isAlive) return

    y += vy
    vy += G

    const col = getColumn(x + scrollAccel * 20)
    if (hasCollided(col.danger)) {
        isAlive = false
        gameover()
    }

    const t = (colOffset + HALF_COLUMN_WIDTH) / COLUMN_WIDTH
    a.set(t * COLUMN_WIDTH, yTouch = lerp(col.height, col.next!.height, easeInOutQuad(t)))

    if (y - R_CONTACT < yTouch) {
        b.set((t + 0.05) * COLUMN_WIDTH, lerp(col.height, col.next!.height, easeInOutQuad(t + 0.05)))
        normal.setNormal(a, b)
        isFlying = false
        scrollAccel = clamp(scrollAccel + normal.x, -4, 2)
    }
    else isFlying = true

    if (yTouch < 0) yTouch = 0

    if (y - R < yTouch) {
        vy += (yTouch + R - y) * IMPACT_FRICTION
        y = yTouch + R
        if (vy > MAXIMUM_Y_VELOCITY) {
            vy = MAXIMUM_Y_VELOCITY
        }
        else if (vy < 0) {
            vy *= -IMPACT_FRICTION
        }
        if (Math.abs(vy) < MINIMUM_Y_VELOCITY) {
            vy = 0
        }
    }

    distance += 4 * T * (scrollSpeed + scrollAccel)
}

function formatDistance(distance: number): string {
    return distance < 1000 ? `${Math.floor(distance)} m` : `${(distance * 0.001).toFixed(1)} km`
}

function paintPlayer(t: number) {
    if (!isAlive) return

    if (isFlying) targetAngle -= Math.PI * 0.005
    else targetAngle = Math.atan2(normal.y, normal.x) - Math.PI * 0.5
    angle += clamp(targetAngle - angle, -Math.PI * 0.05, Math.PI * 0.05)

    canvas.save()
    canvas.translate(x + scrollAccel * 20, y + (vy < 0 ? vy - G : vy) * t)
    canvas.rotate(angle)
    canvas.fillStyle = '#CDDC39'
    canvas.fillRect(-30, -20, 60, 40)
    canvas.restore()

    canvas.save()
    canvas.scale(1, -1)
    canvas.fillStyle = '#FFF'
    canvas.fillText(`Distance: ${formatDistance(distance)}`, CANVAS_WIDTH * 0.4, -CANVAS_HEIGTH * 0.94)
    canvas.restore()
}
