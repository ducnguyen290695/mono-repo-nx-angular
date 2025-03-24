/**
 * Angular Pipes for Color Conversion
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * RgbToHexPipe - Converts an RGB color string to a HEX color string.
 * Input: 'rgb(255, 0, 0)'
 * Usage: {{ 'rgb(255, 0, 0)' | rgbToHex }}
 * Output: '#FF0000'
 */
@Pipe({ name: 'rgbToHex' })
export class RgbToHexPipe implements PipeTransform {
  transform(value: string): string {
    const rgb = value.match(/\d+/g);
    if (!rgb || rgb.length < 3) return value;

    return `#${(
      (1 << 24) +
      (parseInt(rgb[0]) << 16) +
      (parseInt(rgb[1]) << 8) +
      parseInt(rgb[2])
    )
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }
}

/**
 * RgbToHslPipe - Converts an RGB color string to an HSL color string.
 * Input: 'rgb(255, 0, 0)'
 * Usage: {{ 'rgb(255, 0, 0)' | rgbToHsl }}
 * Output: 'hsl(0, 100.0%, 50.0%)'
 */
@Pipe({ name: 'rgbToHsl' })
export class RgbToHslPipe implements PipeTransform {
  transform(value: string): string {
    const rgb = value.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length < 3) return value;

    const [r, g, b] = rgb.map((x) => x / 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h = Math.round(Number(h) * 60);
    }

    return `hsl(${h}, ${(s * 100).toFixed(1)}%, ${(l * 100).toFixed(1)}%)`;
  }
}
