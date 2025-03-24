import DOMPurify from 'dompurify';
import { isEmpty } from 'lodash';
import { match } from 'path-to-regexp';
import queryString from 'query-string';

export class UrlHelper {
  /**
   * Replaces path parameters in a given URL with provided values.
   * @param {string} path - The URL path with placeholders.
   * @param {Record<string, string>} params - An object mapping placeholder keys to values.
   * @returns {string} - The updated path with replaced parameters.
   */
  static replacePathParams(
    path: string,
    params: Record<string, string>,
  ): string {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });

    return path;
  }

  /**
   * Checks if a given URL matches a specified pattern.
   * @param {Object} options - The options object.
   * @param {string} options.pattern - The pattern to match against.
   * @param {string} options.url - The URL to test.
   * @returns {boolean} - Returns true if the URL matches the pattern.
   */
  static isMatch({ pattern, url }: { pattern: string; url: string }): boolean {
    const result = match(pattern)(url);

    return !isEmpty(result);
  }

  /**
   * Extracts the pathname from a given URL.
   * @param {string} url - The full URL string.
   * @returns {string} - The extracted pathname, or an empty string if invalid.
   */
  static getPathFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);

      return parsedUrl.pathname;
    } catch {
      return '';
    }
  }

  /**
   * Securely parses a query string from a URL using DOMPurify.
   * @param {string} url - The full URL containing the query string.
   * @returns {Record<string, any>} - The parsed query string as an object.
   */
  static secureQueryStringParse(url: string): Record<string, any> {
    return queryString.parse(DOMPurify.sanitize(url));
  }

  /**
   * Builds a query string from an object.
   * @param {Record<string, any>} params - The query parameters.
   * @returns {string} - The formatted query string.
   */
  static buildQueryString(params: Record<string, any>): string {
    return queryString.stringify(params);
  }

  /**
   * Extracts a specific query parameter from a URL.
   * @param {string} url - The full URL.
   * @param {string} key - The query parameter key.
   * @returns {string | null} - The parameter value or null if not found.
   */
  static getQueryParam(url: string, key: string): string | null {
    try {
      const parsedUrl = new URL(url);

      return parsedUrl.searchParams.get(key);
    } catch {
      return null;
    }
  }

  /**
   * Sanitizes a given URL to prevent XSS attacks.
   * @param {string} url - The URL to sanitize.
   * @returns {string} - The sanitized URL.
   */
  static sanitizeUrl(url: string): string {
    return DOMPurify.sanitize(url);
  }

  /**
   * Joins multiple path segments into a single URL.
   * @param {...string} parts - The path segments to join.
   * @returns {string} - The joined path.
   */
  static joinPaths(...parts: string[]): string {
    return parts
      .map((part) => part.replace(/(^\/+|\/+$)/g, ''))
      .filter(Boolean)
      .join('/');
  }

  /**
   * Extracts the base URL (protocol + domain) from a given URL.
   * @param {string} url - The full URL.
   * @returns {string} - The base URL.
   */
  static getBaseUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);

      return `${parsedUrl.protocol}//${parsedUrl.host}`;
    } catch {
      return '';
    }
  }
}
