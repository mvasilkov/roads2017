"use strict";
/// <reference path="roads.d.ts" />
function makeColumns() {
    var head = {
        height: STARTING_HEIGHT,
        next: null,
    };
    var tail = head;
    for (var i = COLUMN_COUNT - 1; i; --i) {
        tail = tail.next = {
            height: STARTING_HEIGHT,
            next: null,
        };
    }
    tail.next = head;
    return [head, tail];
}
var _a = makeColumns(), colBegin = _a[0], colEnd = _a[1];
