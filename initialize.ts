/// <reference path="roads.d.ts" />

/* Constants */
const CANVAS_WIDTH = 960
const CANVAS_HEIGTH = 540
const COLUMN_WIDTH = 48
const COLUMN_COUNT = (CANVAS_WIDTH / COLUMN_WIDTH) + 2
const STARTING_HEIGHT = CANVAS_HEIGTH * 0.25
const EASING_POINTS = 10
const EASING_STEP = EASING_POINTS ** -1
const T = 0.02

/* Other constants */
const HALF_COLUMN_WIDTH = COLUMN_WIDTH * 0.5

/* Utility functions */
function lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t
}

function easeInOutQuad(t: number): number {
    return t < 0.5 ?
        2 * t * t :
        2 * t * (2 - t) - 1
}

/* Initialization */
const container: HTMLElement = document.getElementById('container')!
const canvas: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('canvas')).getContext('2d')!

let cscale = 1
