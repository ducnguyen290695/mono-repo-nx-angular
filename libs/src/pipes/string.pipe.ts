import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncatePipe - Truncates a string to a specified length and adds a trailing string if necessary.
 * Input: 'This is a long sentence that needs truncating.'
 * Usage: {{ 'This is a long sentence that needs truncating.' | truncate:10:'...' }}
 * Output: 'This is a...'
 */
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

/**
 * ReversePipe - Reverses the characters in a string.
 * Input: 'Hello World'
 * Usage: {{ 'Hello World' | reverse }}
 * Output: 'dlroW olleH'
 */
@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}

/**
 * PluralizePipe - Appends a plural suffix to a word based on a count.
 * Input: ('apple', 2)
 * Usage: {{ 'apple' | pluralize:2 }}
 * Output: '2 apples'
 */
@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {
  transform(value: string, count: number, pluralForm: string = ''): string {
    if (count === 1) {
      return `${count} ${value}`;
    }

    return `${count} ${pluralForm || value + 's'}`;
  }
}

/**
 * RemoveSpacesPipe - Removes all spaces from a string.
 * Input: 'Hello World'
 * Usage: {{ 'Hello World' | removeSpaces }}
 * Output: 'HelloWorld'
 */
@Pipe({
  name: 'removeSpaces',
})
export class RemoveSpacesPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\s+/g, '');
  }
}

/**
 * HideEmailPipe - Obscures part of an email address for privacy.
 * Input: 'example@email.com'
 * Usage: {{ 'example@email.com' | hideEmail }}
 * Output: 'e***e@email.com'
 */
@Pipe({
  name: 'hideEmail',
})
export class HideEmailPipe implements PipeTransform {
  transform(email: string): string {
    if (!email.includes('@')) {
      return email;
    }

    const [name, domain] = email.split('@');

    return name.charAt(0) + '***' + name.charAt(name.length - 1) + '@' + domain;
  }
}

/**
 * PhoneFormatPipe - Formats a string of digits into a phone number format.
 * Input: '1234567890'
 * Usage: {{ '1234567890' | phoneFormat }}
 * Output: '(123) 456-7890'
 */
@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    const cleaned = value.replace(/\D/g, '');

    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}

/**
 * DefaultValuePipe - Returns a default value if the input is falsy.
 * Input: ('', 'N/A')
 * Usage: {{ '' | defaultValue:'N/A' }}
 * Output: 'N/A'
 */
@Pipe({
  name: 'defaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: any, defaultValue: string = 'N/A'): string {
    return value ? value : defaultValue;
  }
}

/**
 * RemoveSpecialCharsPipe - Removes all special characters from a string, leaving only alphanumeric characters and spaces.
 * Input: 'Hello, World!'
 * Usage: {{ 'Hello, World!' | removeSpecialChars }}
 * Output: 'Hello World'
 */
@Pipe({
  name: 'removeSpecialChars',
})
export class RemoveSpecialCharsPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  }
}

/**
 * MaskCreditCardPipe - Masks all but the last four digits of a credit card number.
 * Input: '1234567812345678'
 * Usage: {{ '1234567812345678' | maskCreditCard }}
 * Output: '************5678'
 */
@Pipe({
  name: 'maskCreditCard',
})
export class MaskCreditCardPipe implements PipeTransform {
  transform(value: string): string {
    return value.slice(-4).padStart(value.length, '*');
  }
}

/**
 * PascalToSentencePipe - Converts PascalCase strings to sentences.
 * Input: 'PascalCaseString'
 * Usage: {{ 'PascalCaseString' | pascalToSentence }}
 * Output: 'Pascal Case String'
 */
@Pipe({
  name: 'pascalToSentence',
})
export class PascalToSentencePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/([A-Z])/g, ' $1').trim();
  }
}

/**
 * ExtractDomainPipe - Extracts the domain from a URL.
 * Input: 'https://www.example.com/path'
 * Usage: {{ 'https://www.example.com/path' | extractDomain }}
 * Output: 'www.example.com'
 */
@Pipe({
  name: 'extractDomain',
})
export class ExtractDomainPipe implements PipeTransform {
  transform(url: string): string {
    return url.replace(/(^\w+:|^)\/\//, '').split('/')[0];
  }
}

/**
 * FormatCurrencyPipe - Formats a number as currency.
 * Input: (1234.56, 'USD', 'en-US')
 * Usage: {{ 1234.56 | formatCurrency:'USD':'en-US' }}
 * Output: '$1,234.56'
 */
@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currency: string = 'USD',
    locale: string = 'en-US',
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  }
}

/**
 * CamelToSpacesPipe - Converts camelCase strings to sentences with spaces.
 * Input: 'camelCaseString'
 * Usage: {{ 'camelCaseString' | camelToSpaces }}
 * Output: 'Camel Case String'
 */
@Pipe({
  name: 'camelToSpaces',
})
export class CamelToSpacesPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (str) => str.toUpperCase());
  }
}
