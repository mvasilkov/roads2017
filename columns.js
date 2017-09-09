"use strict";
/// <reference path="roads.d.ts" />
var NO_DANGER = {
    a: -1, b: -1, a2: -1, b2: -1
};
function makeColumns() {
    var head = {
        height: STARTING_HEIGHT,
        danger: NO_DANGER,
        next: null,
    };
    var tail = head;
    for (var i = COLUMN_COUNT - 1; i; --i) {
        tail = tail.next = {
            height: STARTING_HEIGHT,
            danger: NO_DANGER,
            next: null,
        };
    }
    tail.next = head;
    return [head, tail];
}
var _a = makeColumns(), colBegin = _a[0], colEnd = _a[1];
function getColumn(x) {
    var col = colBegin;
    var pos = -colOffset;
    while (col != colEnd) {
        if ((pos += COLUMN_WIDTH) > x)
            return col;
        col = col.next;
    }
    return colEnd;
}
