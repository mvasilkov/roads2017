/// <reference path="roads.d.ts" />

const BEFORE_DANGER = 960
const DANGER_DURATION = 960
const DANGER_PAUSE_EASY = 2400
const DANGER_PAUSE_HARD = 250

const DANGER_TABLE: [Danger] = [
    { a: 0, b: 100, a2: -1, b2: -1 },
    { a: 110, b: 100, a2: -1, b2: -1 },
    { a: 220, b: 100, a2: -1, b2: -1 },
    { a: 330, b: 100, a2: -1, b2: -1 },
    { a: 440, b: 100, a2: -1, b2: -1 },

    { a: 0, b: 220, a2: -1, b2: -1 },
    { a: 160, b: 220, a2: -1, b2: -1 },
    { a: 320, b: 220, a2: -1, b2: -1 },

    { a: 0, b: 100, a2: 440, b2: 100 },
    { a: 110, b: 100, a2: 330, b2: 100 },

    { a: 0, b: 144, a2: 396, b2: 144 },
]

let nextDanger: Danger = NO_DANGER
let doDanger = false
let dangerTimer = NaN
let dangerPause = DANGER_PAUSE_EASY

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
    dangerTimer = setTimeout(dangerEnd, DANGER_DURATION * (0.9 + Math.random() * 0.3))
}

function dangerEnd() {
    doDanger = false
    nextDanger = NO_DANGER
    dangerTimer = setTimeout(scheduleDanger, dangerPause = Math.max(dangerPause - 200, DANGER_PAUSE_HARD))
}

let nd = -1

function getDanger(): Danger {
    return DANGER_TABLE[nd = (nd + 1) % DANGER_TABLE.length]
}
