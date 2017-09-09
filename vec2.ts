/// <reference path="roads.d.ts" />

interface IVec2 {
    x: number
    y: number
}

class Vec2 implements IVec2 {
    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    set(x: number, y: number) {
        this.x = x
        this.y = y
    }

    setTo(other: IVec2) {
        this.x = other.x
        this.y = other.y
    }

    setNormal(a: IVec2, b: IVec2) {
        // perpendicular
        const x = a.y - b.y
        const y = b.x - a.x

        // normalize
        const length = Math.sqrt(x * x + y * y)
        if (length < Number.MIN_VALUE) {
            this.x = x
            this.y = y
            return
        }

        const inverseLength = 1 / length
        this.x = x * inverseLength
        this.y = y * inverseLength
    }
}
