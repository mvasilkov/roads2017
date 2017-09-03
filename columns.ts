/// <reference path="roads.d.ts" />

interface LL {
    height: number
    next: LL | null
}

function makeColumns(): [LL, LL] {
    const head: LL = {
        height: STARTING_HEIGHT,
        next: null,
    }
    let tail: LL = head
    for (let i = COLUMN_COUNT - 1; i; --i) {
        tail = tail.next = {
            height: STARTING_HEIGHT,
            next: null,
        }
    }
    tail.next = head
    return [head, tail]
}

let [colBegin, colEnd] = makeColumns()
