import { Pipe, PipeTransform } from '@angular/core';

/**
 * OrdinalPipe - Appends the appropriate ordinal suffix to a number.
 * Usage: {{ 1 | ordinal }}
 * Output: '1st'
 */
@Pipe({
  name: 'ordinal',
})
export class OrdinalPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || isNaN(value)) {
      return value.toString();
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = value % 100;

    return value + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }
}

/**
 * ConvertTempPipe - Converts temperature between Celsius and Fahrenheit.
 * Usage: {{ 32 | convertTemp:'C' }}
 * Output: '0.00 °C'
 */
@Pipe({
  name: 'convertTemp',
})
export class ConvertTempPipe implements PipeTransform {
  transform(value: number, unit: string): string {
    if (unit === 'C') {
      return `${(((value - 32) * 5) / 9).toFixed(2)} °C`;
    } else if (unit === 'F') {
      return `${((value * 9) / 5 + 32).toFixed(2)} °F`;
    }

    return `${value}°`;
  }
}

/**
 * NumberPipe - Formats a number according to locale rules.
 * Usage: {{ 1234.567 | number:'1.2-2' }}
 * Output: '1,234.57'
 */
@Pipe({
  name: 'number',
})
export class NumberPipe implements PipeTransform {
  transform(
    value: number,
    digitsInfo: string = '1.0-3',
    locale: string = 'en-US',
  ): string | null {
    return new Intl.NumberFormat(locale, {
      minimumIntegerDigits: parseInt(digitsInfo.split('.')[0], 10),
      minimumFractionDigits: parseInt(
        digitsInfo.split('.')[1].split('-')[0],
        10,
      ),
      maximumFractionDigits: parseInt(
        digitsInfo.split('.')[1].split('-')[1],
        10,
      ),
    }).format(value);
  }
}

/**
 * CurrencyPipe - Transforms a number to a currency string.
 * Usage: {{ 1234.567 | currency:'USD':'symbol':'1.2-2' }}
 * Output: '$1,234.57'
 */
@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = 'USD',
    display: 'symbol' | 'code' | 'symbol-narrow' = 'symbol',
    digitsInfo: string = '1.2-2',
    locale: string = 'en-US',
  ): string | null {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: parseInt(
        digitsInfo.split('.')[1].split('-')[0],
        10,
      ),
      maximumFractionDigits: parseInt(
        digitsInfo.split('.')[1].split('-')[1],
        10,
      ),
    }).format(value);
  }
}

/**
 * PercentPipe - Transforms a number to a percentage string.
 * Usage: {{ 0.85 | percent:'1.0-2' }}
 * Output: '85%'
 */
@Pipe({
  name: 'percent',
})
export class PercentPipe implements PipeTransform {
  transform(
    value: number,
    digitsInfo: string = '1.0-2',
    locale: string = 'en-US',
  ): string | null {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: parseInt(
        digitsInfo.split('.')[1].split('-')[0],
        10,
      ),
      maximumFractionDigits: parseInt(
        digitsInfo.split('.')[1].split('-')[1],
        10,
      ),
    }).format(value);
  }
}
