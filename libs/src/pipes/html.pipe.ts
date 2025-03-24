/**
 * Angular Pipes for HTML and Text Processing
 */

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * SafeHtmlPipe - Sanitizes HTML content for safe rendering.
 * Input: '<script>alert(1)</script><b>Safe</b>'
 * Usage: {{ '<script>alert(1)</script><b>Safe</b>' | safeHtml }}
 * Output: '<b>Safe</b>' (sanitized)
 */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

/**
 * TruncateHtmlPipe - Truncates HTML content while keeping plain text.
 * Input: '<p>This is a long text</p>'
 * Usage: {{ '<p>This is a long text</p>' | truncateHtml:10 }}
 * Output: 'This is a ...'
 */
@Pipe({ name: 'truncateHtml' })
export class TruncateHtmlPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    const div = document.createElement('div');
    div.innerHTML = value;

    return div.innerText.length > limit
      ? div.innerText.substring(0, limit) + '...'
      : div.innerText;
  }
}

/**
 * StripHtmlPipe - Removes all HTML tags from a string.
 * Input: '<b>Bold</b> text'
 * Usage: {{ '<b>Bold</b> text' | stripHtml }}
 * Output: 'Bold text'
 */
@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/<[^>]*>/g, '');
  }
}

/**
 * NlToBrPipe - Converts newline characters to <br> tags.
 * Input: 'Line1\nLine2'
 * Usage: {{ 'Line1\nLine2' | nlToBr }}
 * Output: 'Line1<br>Line2'
 */
@Pipe({ name: 'nlToBr' })
export class NlToBrPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }
}

/**
 * EncodeUrlPipe - Encodes a URL string.
 * Input: 'https://example.com?query=hello world'
 * Usage: {{ 'https://example.com?query=hello world' | encodeUrl }}
 * Output: 'https%3A%2F%2Fexample.com%3Fquery%3Dhello%20world'
 */
@Pipe({ name: 'encodeUrl' })
export class EncodeUrlPipe implements PipeTransform {
  transform(value: string): string {
    return encodeURIComponent(value);
  }
}

/**
 * DecodeHtmlPipe - Decodes HTML entities.
 * Input: '&lt;b&gt;Bold&lt;/b&gt;'
 * Usage: {{ '&lt;b&gt;Bold&lt;/b&gt;' | decodeHtml }}
 * Output: '<b>Bold</b>'
 */
@Pipe({ name: 'decodeHtml' })
export class DecodeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;

    return textarea.value;
  }
}

/**
 * PlainTextPipe - Extracts plain text from HTML.
 * Input: '<p>Hello <b>World</b></p>'
 * Usage: {{ '<p>Hello <b>World</b></p>' | plainText }}
 * Output: 'Hello World'
 */
@Pipe({ name: 'plainText' })
export class PlainTextPipe implements PipeTransform {
  transform(value: string): string {
    const div = document.createElement('div');
    div.innerHTML = value;

    return div.innerText;
  }
}

/**
 * HighlightPipe - Highlights search terms in a text.
 * Input: 'Hello World', 'World'
 * Usage: {{ 'Hello World' | highlight:'World' }}
 * Output: 'Hello <mark>World</mark>'
 */
@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search) return value;

    const regex = new RegExp(`(${search})`, 'gi');

    return value.replace(regex, `<mark>$1</mark>`);
  }
}

/**
 * MarkdownToHtmlPipe - Converts Markdown syntax to simple HTML.
 * Input: '**Bold** _Italic_'
 * Usage: {{ '**Bold** _Italic_' | markdownToHtml }}
 * Output: '<b>Bold</b> <i>Italic</i>'
 */
@Pipe({ name: 'markdownToHtml' })
export class MarkdownToHtmlPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
      .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italics
      .replace(/__(.*?)__/g, '<b>$1</b>') // Bold (alt)
      .replace(/_(.*?)_/g, '<i>$1</i>'); // Italics (alt)
  }
}
