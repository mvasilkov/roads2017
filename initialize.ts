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

function clamp(x: number, a: number, b: number): number {
    return (x < a) ? a : (x > b) ? b : x
}

/* Initialization */
const container: HTMLElement = document.getElementById('container')!
const hcanvas = <HTMLCanvasElement>document.getElementById('canvas')
const canvas: CanvasRenderingContext2D = hcanvas.getContext('2d')!

/* Handle resize */
const aspect = 16 / 9
let cscale = 1

let transformProperty = 'transform'
if (!(transformProperty in container.style)) {
    transformProperty = 'webkitTransform'
}

function setSize(x: HTMLElement, property: string, value: number) {
    x.style[<any>property] = `${value}px`
}

function handleResize() {
    let w = window.innerWidth
    let h = window.innerHeight

    if (w / h > aspect)
        w = h * aspect
    else
        h = w / aspect

    cscale = CANVAS_WIDTH / w

    setSize(container, 'width', w)
    setSize(container, 'height', h)
    setSize(container, 'left', 0.5 * (window.innerWidth - w))
    setSize(container, 'top', 0.5 * (window.innerHeight - h))

    const scale = 0.5 * w / CANVAS_WIDTH
    const scale3d = `scale3d(${scale},${scale},1)`

    startScreen.style[<any>transformProperty] = scale3d
    endScreen.style[<any>transformProperty] = scale3d
}

window.addEventListener('resize', handleResize)
window.addEventListener('orientationchange', handleResize)

hcanvas.addEventListener('contextmenu', event => {
    event.preventDefault()
})
