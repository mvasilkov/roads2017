/// <reference path="roads.d.ts" />

interface Danger {
    a: number
    b: number
    a2: number
    b2: number
}

const NO_DANGER: Danger = {
    a: -1, b: -1, a2: -1, b2: -1
}

interface LL {
    height: number
    danger: Danger
    next: LL | null
}

function makeColumns(): [LL, LL] {
    const head: LL = {
        height: STARTING_HEIGHT,
        danger: NO_DANGER,
        next: null,
    }
    let tail: LL = head
    for (let i = COLUMN_COUNT - 1; i; --i) {
        tail = tail.next = {
            height: STARTING_HEIGHT,
            danger: NO_DANGER,
            next: null,
        }
    }
    tail.next = head
    return [head, tail]
}

let [colBegin, colEnd] = makeColumns()

function getColumn(x: number): LL {
    let col = colBegin
    let pos = -colOffset
    while (col != colEnd) {
        if ((pos += COLUMN_WIDTH) > x) return col
        col = col.next!
    }
    return colEnd
}
