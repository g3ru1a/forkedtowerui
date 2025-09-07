type RGB = [number, number, number];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const srgbToLinear = (c: number) =>
	c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const linearToSrgb = (c: number) =>
	c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

const to2 = (n: number) => n.toString(16).padStart(2, "0");

function normalizeHex(hex: string): string {
	let h = hex.trim().replace(/^#/, "").toLowerCase();
	if (h.length === 3) h = h.split("").map(ch => ch + ch).join("");        // #rgb -> #rrggbb
	if (h.length === 4) h = h.split("").map(ch => ch + ch).join("");        // #rgba -> #rrggbbaa
	if (h.length !== 6 && h.length !== 8) {
		throw new Error(`Unsupported hex: ${hex}`);
	}
	return h;
}

function hexToRgba(hex: string): { rgb: RGB; a: number } {
	const h = normalizeHex(hex);
	const r = parseInt(h.slice(0, 2), 16);
	const g = parseInt(h.slice(2, 4), 16);
	const b = parseInt(h.slice(4, 6), 16);
	const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
	return { rgb: [r, g, b], a };
}

function rgbaToHex(rgb: RGB, a: number): string {
	const [r, g, b] = rgb.map(v => Math.round(clamp01(v) * 255)) as RGB;
	const alpha = Math.round(clamp01(a) * 255);
	return a < 1 ? `#${to2(r)}${to2(g)}${to2(b)}${to2(alpha)}` : `#${to2(r)}${to2(g)}${to2(b)}`;
}

/** Mix two hex colors in linear-light sRGB. t=0.5 is the “middle”. */
export function mixHex(start: string, end: string, t = 0.5): string {
	const T = clamp01(t);
	const a = hexToRgba(start);
	const b = hexToRgba(end);

	// to linear-light space
	const la = a.rgb.map(v => srgbToLinear(v / 255)) as RGB;
	const lb = b.rgb.map(v => srgbToLinear(v / 255)) as RGB;

	// interpolate
	const lr = la.map((v, i) => v + (lb[i]! - v) * T) as RGB;
	const alpha = a.a + (b.a - a.a) * T;

	// back to sRGB
	const srgb = lr.map(v => linearToSrgb(v)) as RGB;
	return rgbaToHex(srgb as RGB, alpha);
}

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

	function midpointHex(hex1: string, hex2: string) {
		return mixHex(hex1, hex2, 0.5);
	}

    return {
        generateGradient,
		midpointHex
    }
}