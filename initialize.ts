/// <reference path="roads.d.ts" />

const CANVAS_WIDTH = 960
const CANVAS_HEIGTH = 540
const COLUMN_WIDTH = 48
const COLUMN_COUNT = (CANVAS_WIDTH / COLUMN_WIDTH) + 2
const STARTING_HEIGHT = CANVAS_HEIGTH * 0.25
const T = 0.02

const container: HTMLElement = document.getElementById('container')!
const canvas: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('canvas')).getContext('2d')!

let cscale = 1
