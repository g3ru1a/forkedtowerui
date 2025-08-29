export default function() {
    function generateGradient(hex:string, percent = 20) {
        // Clamp percent between -100 and 100
        percent = Math.max(-100, Math.min(100, percent))

        // Convert hex → RGB
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)

        // Function to adjust channel by percent
        const adjust = (c: number, p: number) => {
            const newVal = Math.round(c + (p / 100) * (p > 0 ? 255 - c : c))
            return Math.min(255, Math.max(0, newVal))
        }

        // Lighter
        const r1 = adjust(r, percent)
        const g1 = adjust(g, percent)
        const b1 = adjust(b, percent)

        // Darker
        const r2 = adjust(r, -percent)
        const g2 = adjust(g, -percent)
        const b2 = adjust(b, -percent)

        // RGB → Hex
        const toHex = (c: number) => c.toString(16).padStart(2, '0')

        const start = `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`
        const end   = `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`

        return [start, end]
    }

    return {
        generateGradient
    }
}