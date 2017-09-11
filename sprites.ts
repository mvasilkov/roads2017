/// <reference path="roads.d.ts" />

const grass = [
    '2211112222111222',
    '3222223333222333',
    '3333033333333333',
    '0333033303330333',
    '0302030203030203',
    '0301020102030102',
    '0300010001020001',
    '020  00  0010  0',
    '010       00    ',
    ' 0              ',
]

const car = [
    '    0000000000      ',
    '   000101100110     ',
    '  00000000100010    ',
    ' 001000000000000000 ',
    '00221000000000001110',
    '02222122222222222220',
    '02222220020000222220',
    ' 000002222222210000 ',
    '      022222210     ',
    '       0000000      ',
    '        0000        ',
    '  00000000000000000 ',
    '  00000000000000000 ',
]

const wheel0 = [
    '  0000  ',
    ' 011110 ',
    '01111110',
    '00000000',
    '00000000',
    '02111120',
    ' 022220 ',
    '  0000  ',
]

const wheel1 = [
    '   000  ',
    '  01110 ',
    ' 0001110',
    '01000110',
    '01100010',
    '0211000 ',
    ' 02220  ',
    '  000   ',
]

const wheel2 = [
    '  0000  ',
    ' 010010 ',
    '01100110',
    '01100110',
    '01100110',
    '02100120',
    ' 020020 ',
    '  0000  ',
]

const wheel3 = [
    '  000   ',
    ' 01110  ',
    '0111000 ',
    '01100010',
    '01000110',
    ' 0001120',
    '  02220 ',
    '   000  ',
]

const GRASS_COLOR = ['#000', '#00E700', '#00C700', '#008200']
const GROUND_COLOR = ['#422021', '#844121', '#A56121']
const BRICK_COLOR = ['#000', '#A40000', '#CC0000', '#EF2929']
const CAR_COLOR = ['#000', '#FFF', '#FF0080']

function makeSprite(width: number, height: number, callback: (canvas: CanvasRenderingContext2D) => void): HTMLCanvasElement {
    const hcanvas = document.createElement('canvas')
    hcanvas.width = width
    hcanvas.height = height
    const canvas = hcanvas.getContext('2d')!
    callback(canvas)

    /* Used for debugging * /
    hcanvas.style.width = width + 'px'
    hcanvas.style.height = height + 'px'
    hcanvas.style.backgroundColor = '#FF0080'
    hcanvas.style.border = '20px solid #FF0080'
    document.body.appendChild(hcanvas)
    /* End debugging */

    return hcanvas
}

function makeSprite2(width: number, height: number, bitmap: string[], colors: string[]): HTMLCanvasElement {
    return makeSprite(width, height, canvas => {
        canvas.scale(3, 3)
        width /= 3
        height /= 3

        for (let i = 0; i < height; ++i) {
            for (let j = 0; j < width; ++j) {
                if (bitmap[i][j] == ' ') continue
                canvas.fillStyle = colors[+bitmap[i][j]]
                canvas.fillRect(j, height - i - 1, 1, 1)
            }
        }
    })
}

const columnSprite = makeSprite(COLUMN_WIDTH, CANVAS_HEIGTH, canvas => {
    canvas.save()
    canvas.scale(8, 8)

    canvas.fillStyle = GRASS_COLOR[0]
    canvas.fillRect(0, 2, 6, CANVAS_HEIGTH * 0.125 - 2)

    for (let i = 2; i < CANVAS_HEIGTH * 0.125; ++i) {
        for (let j = 0; j < 6; ++j) {
            canvas.fillStyle = GROUND_COLOR[(i + j) % 3]
            canvas.fillRect(j, i, 1, 1)
        }
        canvas.globalAlpha -= 0.0125
    }

    canvas.restore()
    canvas.scale(3, 3)

    canvas.fillStyle = GRASS_COLOR[0]
    canvas.fillRect(1, 0, 14, 1)
    canvas.fillRect(0, 1, 1, 1)
    canvas.fillRect(15, 1, 1, 1)
    canvas.fillStyle = GRASS_COLOR[2]
    canvas.fillRect(1, 1, 14, 1)
    canvas.fillStyle = GRASS_COLOR[1]
    canvas.fillRect(0, 2, 16, 1)

    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 16; ++j) {
            if (grass[i][j] == ' ') continue
            canvas.fillStyle = GRASS_COLOR[+grass[i][j]]
            canvas.fillRect(j, i + 3, 1, 1)
        }
    }
})

const dangerPattern = canvas.createPattern(makeSprite(COLUMN_WIDTH, COLUMN_WIDTH * 0.5, canvas => {
    canvas.scale(3, 3)
    canvas.fillStyle = BRICK_COLOR[2]
    canvas.fillRect(0, 0, 16, 8)

    canvas.fillStyle = BRICK_COLOR[0]
    canvas.fillRect(8, 0, 1, 3)
    canvas.fillRect(0, 3, 16, 1)
    canvas.fillRect(0, 4, 1, 3)
    canvas.fillRect(0, 7, 16, 1)

    canvas.fillStyle = BRICK_COLOR[1]
    canvas.fillRect(7, 0, 1, 3)
    canvas.fillRect(15, 4, 1, 3)

    canvas.fillStyle = BRICK_COLOR[3]
    canvas.fillRect(9, 0, 1, 3)
    canvas.fillRect(1, 4, 1, 3)
    canvas.fillRect(0, 0, 7, 1)
    canvas.fillRect(9, 0, 7, 1)
    canvas.fillRect(1, 4, 14, 1)
}), 'repeat')

const carSprite = makeSprite2(60, 39, car, CAR_COLOR)

const wheelSprites = [
    makeSprite2(24, 24, wheel0, CAR_COLOR),
    makeSprite2(24, 24, wheel1, CAR_COLOR),
    makeSprite2(24, 24, wheel2, CAR_COLOR),
    makeSprite2(24, 24, wheel3, CAR_COLOR),
]
wheelSprites.push(wheelSprites[0])
